import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import activity from '../data/activity.json';
import Stage from './Stage';

const SOURCES = [
  { key: 'all', label: 'all', count: (d) => d.leetcode + d.github },
  { key: 'leetcode', label: 'leetcode', count: (d) => d.leetcode },
  { key: 'github', label: 'github', count: (d) => d.github }
];

const LEVELS = ['bg-[#14181b]', 'bg-accent/25', 'bg-accent/45', 'bg-accent/70', 'bg-accent'];
const level = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4);

// Dates are stored as UTC strings, so all date maths stays in UTC.
const parse = (date) => new Date(`${date}T00:00:00Z`);

function buildWeeks(days) {
  const pad = parse(days[0].date).getUTCDay();
  const cells = [...Array(pad).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabel(week, previous) {
  const first = week.find(Boolean);
  const prior = previous?.find(Boolean);
  if (!first) return '';
  const month = parse(first.date).getUTCMonth();
  if (prior && parse(prior.date).getUTCMonth() === month) return '';
  return parse(first.date).toLocaleString('en', { month: 'short', timeZone: 'UTC' });
}

function DifficultyBar({ label, value, total, className }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-[#8a939b]">{label}</span>
        <span className="text-white font-semibold">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#14181b] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / total) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${className}`}
        />
      </div>
    </div>
  );
}

export default function Activity() {
  const { days, stats, generatedAt } = activity;
  const [source, setSource] = useState(SOURCES[0]);
  const [hovered, setHovered] = useState(null);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-80px' });
  const weeks = useMemo(() => buildWeeks(days), [days]);
  const total = days.reduce((sum, d) => sum + source.count(d), 0);

  // On narrow screens the grid scrolls: start at the most recent weeks.
  useEffect(() => {
    if (gridRef.current) gridRef.current.scrollLeft = gridRef.current.scrollWidth;
  }, []);

  const tiles = [
    { value: stats.solved, label: 'solved on leetcode' },
    { value: `Top ${stats.topPercent}%`, label: 'contest ranking' },
    { value: stats.contests, label: 'rated contests' },
    { value: stats.maxStreak, label: 'day best streak' }
  ];

  return (
    <Stage id="activity" cmd="cat activity.log" title="Consistency you can measure.">
      <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs" role="group" aria-label="Activity source">
        {SOURCES.map((s) => (
          <button
            key={s.key}
            onClick={() => setSource(s)}
            aria-pressed={source.key === s.key}
            className={`px-3 py-1.5 rounded border transition-colors ${
              source.key === s.key ? 'bg-accent text-[#050607] border-accent font-semibold' : 'border-[#1c2126] text-[#8a939b] hover:text-white'
            }`}
          >
            --{s.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className={`overflow-x-auto pb-3 ${inView ? 'heat-on' : ''}`}>
        <div className="inline-flex flex-col min-w-full">
          <div className="flex gap-[3px] mb-1 text-[10px] text-[#6b747c] h-4">
            {weeks.map((week, i) => (
              <span key={i} className="w-[13px] xl:w-[17px] shrink-0 whitespace-nowrap overflow-visible">
                {monthLabel(week, weeks[i - 1])}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]" onMouseLeave={() => setHovered(null)}>
            {weeks.map((week, col) => (
              <div key={col} className="flex flex-col gap-[3px]">
                {week.map((day, row) =>
                  day ? (
                    <span
                      key={day.date}
                      style={{ '--col': col }}
                      onMouseEnter={() => setHovered(day)}
                      title={`${source.count(day)} on ${day.date}`}
                      className={`heat-cell w-[13px] h-[13px] xl:w-[17px] xl:h-[17px] rounded-[3px] ${LEVELS[level(source.count(day))]}`}
                    />
                  ) : (
                    <span key={`pad-${row}`} className="w-[13px] h-[13px] xl:w-[17px] xl:h-[17px]" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-2 font-mono text-[11px] text-[#8a939b]">
        <span aria-live="polite">
          {hovered
            ? `${hovered.date}: ${hovered.leetcode} leetcode submissions, ${hovered.github} github contributions`
            : `${total.toLocaleString('en-IN')} ${source.key === 'github' ? 'contributions' : 'submissions and contributions'} in the last year`}
        </span>
        <span className="flex items-center gap-1 text-[#6b747c]">
          Less
          {LEVELS.map((c) => <span key={c} className={`w-[11px] h-[11px] rounded-[3px] ${c}`} />)}
          More
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8 font-mono">
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tiles.map((t) => (
            <div key={t.label} className="p-4 rounded-lg bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/40 transition-colors">
              <div className="text-xl font-bold text-accent whitespace-nowrap">{t.value}</div>
              <div className="text-[11px] text-[#8a939b] mt-1">{t.label}</div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-5 p-4 rounded-lg bg-[#0b0d0f] border border-[#1c2126] space-y-3">
          <DifficultyBar label="easy" value={stats.easy} total={stats.solved} className="bg-accent/50" />
          <DifficultyBar label="medium" value={stats.medium} total={stats.solved} className="bg-[#ffb454]" />
          <DifficultyBar label="hard" value={stats.hard} total={stats.solved} className="bg-[#ff7a6b]" />
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-[#6b747c]">snapshot from LeetCode and GitHub, {generatedAt}</p>
    </Stage>
  );
}
