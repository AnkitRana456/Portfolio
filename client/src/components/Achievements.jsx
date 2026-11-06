import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Flame } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Stage from './Stage';

const CIRCUMFERENCE = 175.9;

function RatingRing({ rating = 1860, max = 2200 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const controls = animate(0, rating, { duration: 2, ease: 'easeOut', onUpdate: (v) => setVal(Math.floor(v)) });
    return () => controls.stop();
  }, [isInView, rating]);

  return (
    <div ref={ref} className="flex items-center gap-3 mt-3">
      <div className="relative w-16 h-16 shrink-0">
        <svg className="w-16 h-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r="28" stroke="#1c2126" strokeWidth="5" fill="transparent" />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#ffb454"
            strokeWidth="5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * val) / max}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <Flame className="w-5 h-5 text-[#ffb454] absolute inset-0 m-auto animate-pulse" />
      </div>
      <div className="font-mono text-xl font-bold text-[#ffb454]">{val}</div>
    </div>
  );
}

function LogEntry({ title, side, body, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <span className="text-[11px] text-[#6b747c] whitespace-nowrap">{side}</span>
      </div>
      <p className="text-sm text-[#8a939b] leading-relaxed mt-1">{body}</p>
      {children}
    </motion.div>
  );
}

export default function Achievements() {
  const { achievements, education } = portfolioData;

  return (
    <Stage id="log" cmd="tail achievements.log education.log" title="The record so far.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-mono">
        <div>
          <p className="text-xs text-[#6b747c] mb-5">achievements.log</p>
          <div className="space-y-6">
            {achievements.map((a, i) => (
              <LogEntry key={a.title} title={a.title} side={a.subtitle.length < 18 ? a.subtitle : ''} body={a.description} delay={i * 0.08}>
                {a.ring && <RatingRing />}
              </LogEntry>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-[#6b747c] mb-5">education.log</p>
          <div className="space-y-6">
            {education.map((e, i) => (
              <LogEntry key={e.institution} title={e.institution} side={e.grade} body={`${e.degree} · ${e.period}`} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
