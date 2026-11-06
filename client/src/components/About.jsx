import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Stage, { ScrollWords } from './Stage';

function StatCounter({ label, value, suffix, isDecimal }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(isDecimal ? latest.toFixed(2) : Math.floor(latest))
    });
    return () => controls.stop();
  }, [isInView, value, isDecimal]);

  return (
    <div ref={ref} className="p-5 rounded-lg bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/40 transition-colors">
      <div className="font-mono text-2xl sm:text-3xl font-bold text-accent">
        {displayValue}
        {suffix}
      </div>
      <div className="font-mono text-[11px] text-[#8a939b] mt-1">{label}</div>
    </div>
  );
}

export default function About() {
  const { personal, stats } = portfolioData;

  return (
    <Stage id="about" cmd="cat README.md" title="Final-year CS. Production mindset.">
      <ScrollWords text={personal.summary} className="max-w-4xl text-lg sm:text-2xl leading-relaxed text-[#e8ebed] mb-10" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => <StatCounter key={stat.label} {...stat} />)}
      </div>
    </Stage>
  );
}
