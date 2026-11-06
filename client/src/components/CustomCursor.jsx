import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Glowing rings that trail behind the cursor
const TRAIL = [
  { stiffness: 130, size: 10, opacity: 0.7, glow: 6 },
  { stiffness: 70,  size: 7,  opacity: 0.4, glow: 4 },
  { stiffness: 38,  size: 4,  opacity: 0.2, glow: 2 },
];

function TrailDot({ x, y, stiffness, opacity, size, glow }) {
  const sx = useSpring(x, { stiffness, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping: 22, mass: 0.4 });
  return (
    <motion.div
      style={{
        x: sx, y: sy,
        width: size, height: size,
        opacity,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        boxShadow: `0 0 ${glow}px ${glow}px rgb(var(--accent) / 0.6)`,
      }}
      className="fixed top-0 left-0 rounded-full bg-accent pointer-events-none z-[9998]"
    />
  );
}

export default function CustomCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [isHovered, setIsHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    if (!enabled) return undefined;
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsHovered(!!e.target.closest?.('a, button, input, textarea, [role="button"], .interactive-card'));

      // detect which stage section the cursor is over
      const stage = e.target.closest?.('[data-label]');
      setLabel(stage ? stage.dataset.label : '');
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = isHovered ? 40 : 12;

  return (
    <div aria-hidden="true" className="hidden md:block">
      {TRAIL.map((dot) => <TrailDot key={dot.stiffness} x={x} y={y} {...dot} />)}

      <motion.div style={{ x, y }} className="fixed top-0 left-0 pointer-events-none z-[9999]">
        {/* main cursor dot */}
        <motion.div
          animate={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: isHovered ? 8 : 999 }}
          transition={{ type: 'spring', damping: 26, stiffness: 400, mass: 0.3 }}
          className={`flex items-center justify-center font-bold text-[10px] text-accent transition-colors ${
            isHovered ? 'bg-accent/10 border-2 border-accent' : 'bg-accent'
          }`}
        >
          {isHovered && '< >'}
        </motion.div>

        {/* section label — appears like friend's "oh — Akshat's contribution graph" */}
        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute left-5 top-1 whitespace-nowrap bg-[#0b0d0f]/90 border border-[#1c2126] rounded-full px-3 py-1 font-mono text-[11px] text-[#d6dadd] backdrop-blur-sm"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
