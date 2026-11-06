import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Stage from './Stage';

// Stable 7-char id so a line keeps its "commit hash" between builds.
function shortHash(text) {
  let h = 5381;
  for (const ch of text) h = ((h * 33) ^ ch.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(8, '0').slice(0, 7);
}

const rowMotion = {
  initial: { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 }
};

export default function Experience() {
  const { experience, education } = portfolioData;
  const graphRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: graphRef, offset: ['start 0.8', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const college = education[0];

  return (
    <Stage id="experience" cmd="git log --graph experience" title="From coursework to client code in production.">
      <div ref={graphRef} className="relative pl-8 sm:pl-10 max-w-4xl font-mono">
        <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#1c2126]" />
        <motion.span
          style={{ scaleY }}
          className="absolute left-[7px] top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-[#ffb454] to-accent"
        />

        {experience.map((exp) => (
          <div key={exp.company} className="space-y-6 mb-10">
            <motion.div {...rowMotion} className="relative">
              <span className="absolute -left-8 sm:-left-10 top-1 w-4 h-4 rounded-full bg-[#050607] border-2 border-[#ffb454] shadow-[0_0_12px_rgba(255,180,84,0.5)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  <span className="text-[#ffb454] text-xs font-normal mr-2">{shortHash(exp.company)}</span>
                  {exp.role} <span className="text-[#8a939b]">@ {exp.company}</span>
                </h3>
                <span className="text-xs text-[#6b747c]">{exp.period} · {exp.location}</span>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 rounded border border-[#ffb454]/40 text-[10px] text-[#ffb454]">
                HEAD -&gt; main
              </span>
            </motion.div>

            {exp.description.map((line) => (
              <motion.div key={line} {...rowMotion} className="relative pl-5 sm:pl-7">
                <span className="absolute -left-8 sm:-left-10 top-2 ml-[7px] w-[calc(2rem+2px)] sm:w-[calc(2.5rem+2px)] h-px bg-[#2a3036]" />
                <span className="absolute left-0 top-[5px] w-2 h-2 rounded-full bg-accent" />
                <p className="text-sm text-[#d6dadd] leading-relaxed">
                  <span className="text-[#6b747c] text-xs mr-2">{shortHash(line)}</span>
                  {line}
                </p>
              </motion.div>
            ))}

            <motion.div {...rowMotion} className="flex flex-wrap gap-2 pl-5 sm:pl-7">
              {exp.tech.map((t) => (
                <span key={t} className="px-2 py-1 rounded bg-[#0b0d0f] border border-[#1c2126] text-[11px] text-accent">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        ))}

        <motion.div {...rowMotion} className="relative">
          <span className="absolute -left-8 sm:-left-10 top-1 w-4 h-4 rounded-full bg-[#050607] border-2 border-accent" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white">
              <span className="text-[#6b747c] text-xs font-normal mr-2">{shortHash(college.institution)}</span>
              init: {college.degree}
            </h3>
            <span className="text-xs text-[#6b747c]">{college.period}</span>
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}
