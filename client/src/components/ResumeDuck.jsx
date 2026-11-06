import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileText, X } from 'lucide-react';

const FEED_RADIUS = 44;

function Duck({ mood }) {
  const animation = { idle: 'animate-duck-bob', excited: 'animate-duck-excited', eating: 'animate-duck-eat' }[mood];
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className={`w-14 h-11 sm:w-20 sm:h-16 ${animation}`}>
      <path d="M12 38c0-3 2-5 5-4l13 3c4-11 13-17 23-14 8 2 12 10 9 18-3 11-14 16-28 15-13-1-22-8-22-18z" fill="rgb(var(--accent))" />
      <circle cx="49" cy="17" r="13" fill="rgb(var(--accent))" />
      <path d={mood === 'idle' ? 'M60 14l14 3-14 5z' : 'M60 11l14 1-13 5 13 2-14 4z'} fill="#ffb454" />
      <circle cx="52" cy="13" r="2.2" fill="#050607" />
      <path d="M26 42c5 5 14 5 20 0" stroke="#050607" strokeOpacity="0.35" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ResumeSheet({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Resume" onClick={onClose} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="animate-sheet-in w-full max-w-3xl h-[85vh] flex flex-col rounded-xl bg-[#0b0d0f] border border-[#1c2126] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2126] font-mono text-xs">
          <span className="text-[#8a939b]">~/resume.pdf</span>
          <div className="flex items-center gap-3">
            <a href="/resume.pdf" download="Ankit_Rana_Resume.pdf" className="flex items-center gap-1.5 text-accent hover:text-[#ffb454] transition-colors">
              <Download className="w-3.5 h-3.5" /> download
            </a>
            <button ref={closeRef} onClick={onClose} aria-label="Close resume" className="text-[#8a939b] hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <iframe src="/resume.pdf" title="Ankit Rana resume" className="flex-1 w-full bg-white" />
      </div>
    </div>
  );
}

// Rubber-duck debugging, but the duck reads resumes: drag the PDF onto it, or just click it.
export default function ResumeDuck() {
  const [mood, setMood] = useState('idle');
  const [open, setOpen] = useState(false);
  const duckRef = useRef(null);
  const pressRef = useRef(null);
  const closeSheet = useRef(() => setOpen(false)).current;

  const isNearDuck = (point) => {
    const rect = duckRef.current.getBoundingClientRect();
    return Math.hypot(point.x - window.scrollX - (rect.left + rect.width / 2), point.y - window.scrollY - (rect.top + rect.height / 2)) < FEED_RADIUS;
  };

  const feed = () => {
    setMood('eating');
    setTimeout(() => {
      setMood('idle');
      setOpen(true);
    }, 650);
  };

  return (
    <>
      <div className="fixed bottom-3 right-3 z-40 flex flex-col items-center select-none">
        <div className="relative">
          <AnimatePresence>
            {mood !== 'eating' && (
              <motion.button
                drag
                dragSnapToOrigin
                dragMomentum={false}
                exit={{ scale: 0, opacity: 0 }}
                onPointerDown={(e) => { pressRef.current = { x: e.clientX, y: e.clientY }; }}
                onDrag={(_, info) => setMood(isNearDuck(info.point) ? 'excited' : 'idle')}
                onDragEnd={(_, info) => (isNearDuck(info.point) ? feed() : setMood('idle'))}
                onClick={(e) => {
                  // A browser click also fires when a drag ends. detail 0 is a keyboard press, which has no pointer position.
                  const press = pressRef.current;
                  const dragged = e.detail > 0 && press && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 6;
                  if (!dragged) setOpen(true);
                }}
                whileDrag={{ scale: 1.15 }}
                aria-label="Open resume"
                title="Drag me to the duck"
                className="absolute -top-2 -left-5 z-10 w-8 h-8 rounded-full bg-[#14181b] border border-[#ffb454]/60 flex items-center justify-center text-[#ffb454] cursor-grab active:cursor-grabbing"
              >
                <FileText className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
          <button ref={duckRef} onClick={() => setOpen(true)} aria-label="Open resume" className="block">
            <Duck mood={mood} />
          </button>
        </div>
        <span className="hidden sm:block font-mono text-[10px] text-[#8a939b]">$ feed duck</span>
      </div>

      {open && <ResumeSheet onClose={closeSheet} />}
    </>
  );
}
