import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL = [
  { stiffness: 260, size: 10, opacity: 0.45 },
  { stiffness: 160, size: 7, opacity: 0.3 },
  { stiffness: 100, size: 5, opacity: 0.18 }
];

function TrailDot({ x, y, stiffness, size, opacity }) {
  const sx = useSpring(x, { stiffness, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping: 24, mass: 0.4 });
  return (
    <motion.span
      style={{ x: sx, y: sy, width: size, height: size, opacity, marginLeft: -size / 2, marginTop: -size / 2 }}
      className="fixed top-0 left-0 rounded-full bg-accent pointer-events-none z-[9998]"
    />
  );
}

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    if (!enabled) return undefined;
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsHovered(!!e.target.closest?.('a, button, input, textarea, [role="button"], .interactive-card'));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = isHovered ? 40 : 12;

  return (
    <div aria-hidden="true" className="hidden md:block">
      {TRAIL.map((dot) => <TrailDot key={dot.stiffness} x={x} y={y} {...dot} />)}
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <motion.div
          animate={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: isHovered ? 8 : 999 }}
          transition={{ type: 'spring', damping: 26, stiffness: 400, mass: 0.3 }}
          className={`flex items-center justify-center font-bold text-[10px] text-accent transition-colors ${
            isHovered ? 'bg-accent/10 border-2 border-accent' : 'bg-accent'
          }`}
        >
          {isHovered && '< >'}
        </motion.div>
      </motion.div>
    </div>
  );
}
