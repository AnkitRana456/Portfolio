import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL = [
  { stiffness: 120, delay: 0, opacity: 0.7, size: 22 },
  { stiffness: 70,  delay: 1, opacity: 0.45, size: 18 },
  { stiffness: 40,  delay: 2, opacity: 0.25, size: 14 }
];

function TrailDot({ x, y, stiffness, opacity, size }) {
  const sx = useSpring(x, { stiffness, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness, damping: 24, mass: 0.5 });
  return (
    <motion.span
      style={{ x: sx, y: sy, opacity, fontSize: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      className="fixed top-0 left-0 pointer-events-none z-[9998] select-none"
    >
      🧑‍💻
    </motion.span>
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
