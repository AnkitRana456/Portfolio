import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "> git clone ankit-rana/portfolio",
  "> npm ci --stack react,node,postgres",
  "> compiling 1500+ DSA modules...",
  "> syncing leetcode peak rating [1860]...",
  "> starting 3D workstation...",
  "> pipeline ready. deploying to: you"
];

export default function LoadingScreen({ onComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Progress interval
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const skip = () => setProgress(100);
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  useEffect(() => {
    // Increment log lines as progress increases
    const lineIndex = Math.min(
      Math.floor((progress / 100) * bootLogs.length),
      bootLogs.length - 1
    );
    setCurrentLineIndex(lineIndex);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050607] text-accent font-mono px-6"
        >
          {/* Terminal Window Box */}
          <div className="w-full max-w-xl bg-[#0b0d0f] border border-[#1c2126] rounded-lg p-6 shadow-2xl shadow-black relative overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1c2126] mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-accent/80 inline-block"></span>
              </div>
              <span className="text-xs text-[#6b747c]">ankit@portfolio ~%</span>
            </div>

            {/* Terminal Lines Output */}
            <div className="space-y-2 h-40 overflow-y-auto text-xs sm:text-sm">
              {bootLogs.slice(0, currentLineIndex + 1).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={index === bootLogs.length - 1 ? 'text-[#ffb454] font-bold' : 'text-[#d6dadd]'}
                >
                  {log}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1 text-[#8a939b]">
                <span>pipeline</span>
                <span className="text-accent font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#1c2126] rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-[#ffb454] rounded-full shadow-[0_0_12px_rgb(var(--accent))]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Status text */}
            <div className="mt-4 text-center text-[10px] tracking-widest text-[#6b747c] uppercase">
              press any key to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
