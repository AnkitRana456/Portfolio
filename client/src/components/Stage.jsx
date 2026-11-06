import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

function TypedCommand({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) clearInterval(timer);
        return Math.min(c + 1, text.length);
      });
    }, 28);
    return () => clearInterval(timer);
  }, [inView, text]);

  return (
    <span ref={ref} aria-label={`$ ${text}`} className="hidden sm:inline text-xs text-[#6b747c]">
      $ {text.slice(0, count)}
      {count < text.length && <span className="animate-blink">▍</span>}
    </span>
  );
}

const titleVariants = { show: { transition: { staggerChildren: 0.05 } } };
const wordVariants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }
};

export default function Stage({ id, cmd, title, children }) {
  const index = portfolioData.stages.findIndex((s) => s.id === id);
  const { name } = portfolioData.stages[index];

  return (
    <section id={id} data-stage className="relative scroll-mt-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="border-t border-[#1c2126] pt-10">
          <div className="flex items-center justify-between font-mono text-xs mb-3">
            <span className="text-[#6b747c]">
              stage {String(index + 1).padStart(2, '0')} / <span className="text-white font-semibold">{name}</span>
            </span>
            <TypedCommand text={cmd} />
          </div>

          <motion.h2
            aria-label={title}
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-10"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-1 mr-[0.3em]">
                <motion.span variants={wordVariants} className="inline-block text-chrome">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {children}
        </div>
      </div>
    </section>
  );
}

function ScrollWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

// Text brightens word by word as it scrolls through the viewport.
export function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord
          key={i}
          word={word}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </p>
  );
}
