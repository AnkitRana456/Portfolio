import React, { useEffect, useRef, useState } from 'react';
import { commandNames, runCommand } from '../data/terminal';
import { setTheme } from '../theme';

const WELCOME = { output: ["Welcome to Ankit's terminal. Type 'help' to see available commands."] };
const PROMPT = 'ankit@portfolio ~ %';

export default function Terminal() {
  const [entries, setEntries] = useState([WELCOME]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    // Scrolls the terminal box only, so typing never moves the page.
    screenRef.current.scrollTop = screenRef.current.scrollHeight;
  }, [entries]);

  const submit = () => {
    const input = value.trim();
    const { lines, action } = runCommand(input);
    setValue('');
    if (input) {
      const next = [...history, input];
      setHistory(next);
      setCursor(next.length);
    }

    if (action?.type === 'clear') return setEntries([]);
    setEntries((prev) => [...prev, { input, output: lines }]);
    if (action?.type === 'theme') setTheme(action.name);
    if (action?.type === 'goto') document.getElementById(action.id)?.scrollIntoView({ behavior: 'smooth' });
    if (action?.type === 'open') window.open(action.url, '_blank', 'noopener,noreferrer');
    return undefined;
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(Math.max(cursor + (e.key === 'ArrowUp' ? -1 : 1), 0), history.length);
      setCursor(next);
      setValue(history[next] ?? '');
    } else if (e.key === 'Tab' && value) {
      const match = commandNames.find((c) => c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current.focus({ preventScroll: true })}
      className="h-full min-h-[380px] flex flex-col rounded-xl bg-black border border-[#1c2126] focus-within:border-accent/50 transition-colors overflow-hidden cursor-text"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#1c2126]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4047]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4047]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4047]" />
        <span className="ml-2 font-mono text-[11px] text-[#6b747c]">zsh — ankit@portfolio</span>
      </div>

      <div ref={screenRef} className="flex-1 max-h-[400px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
        {entries.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.input !== undefined && (
              <div>
                <span className="text-accent font-semibold">{PROMPT}</span> <span className="text-white">{entry.input}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className="text-[#d6dadd] whitespace-pre-wrap break-words">{line}</div>
            ))}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-accent font-semibold shrink-0">{PROMPT}</label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="flex-1 min-w-0 bg-transparent text-white caret-accent outline-none focus-visible:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
