import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { stages } = portfolioData;

export default function PipelineRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.5;
      let current = -1;
      stages.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < line) current = i;
      });
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 inset-x-0 h-0.5 z-50 origin-left bg-gradient-to-r from-accent to-[#ffb454]"
      />

      <nav aria-label="Pipeline stages" className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col font-mono text-[10px]">
        {stages.map((s, i) => {
          const passed = i < active;
          const running = i === active;
          return (
            <a key={s.id} href={`#${s.id}`} className="group relative flex items-center py-2.5">
              <span
                className={`relative w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  passed ? 'bg-accent border-accent text-[#050607]' : running ? 'border-[#ffb454]' : 'border-[#2a3036]'
                }`}
              >
                {passed && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                {running && <span className="w-1.5 h-1.5 rounded-full bg-[#ffb454] animate-pulse" />}
              </span>
              {i < stages.length - 1 && (
                <span className={`absolute left-[7px] top-[29px] w-px h-4 transition-colors duration-300 ${passed ? 'bg-accent' : 'bg-[#2a3036]'}`} />
              )}
              <span className={`ml-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${running ? 'text-[#ffb454]' : 'text-[#8a939b]'}`}>
                {s.name}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
