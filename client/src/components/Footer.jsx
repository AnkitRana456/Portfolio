import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="relative z-10 font-mono">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-[#1c2126] py-8 text-lg sm:text-2xl text-[#8a939b]"
        >
          <span className="text-emerald-400">✓ pipeline passed</span> · {portfolioData.stages.length} stages · deployed to:{' '}
          <span className="text-white">you</span>
        </motion.p>

        {/* Right padding keeps the copyright clear of the fixed duck */}
        <div className="flex items-center justify-between gap-4 border-t border-[#1c2126] py-5 pr-24 text-[11px] text-[#6b747c]">
          <span>⎇ main &nbsp; UTF-8</span>
          <span>© {new Date().getFullYear()} {portfolioData.personal.name}</span>
        </div>
      </div>
    </footer>
  );
}
