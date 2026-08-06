import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import WorkstationCanvas from './3d/WorkstationCanvas';
import { Terminal, ChevronDown, ArrowRight, Code, Download } from 'lucide-react';

export default function Hero() {
  const { roles } = portfolioData.personal;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timer;

    if (!isDeleting && displayedText.length < currentRole.length) {
      // Typing
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next word
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00ffc2]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#ffb454]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Terminal Bio Header & Action CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 z-10"
        >
          {/* CLI Prompt badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#111719] border border-[#1c282b] font-mono text-xs text-[#00ffc2]">
            <Terminal className="w-3.5 h-3.5 text-[#00ffc2]" />
            <span>sys.status = "AVAILABLE_FOR_HIRING"</span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-sans">
              Hi, I'm <span className="text-[#00ffc2] font-mono font-bold">Ankit Rana</span>
            </h1>

            {/* Typewriter role cycling */}
            <div className="h-12 mt-3 flex items-center font-mono text-xl sm:text-2xl text-[#ffb454]">
              <span className="text-[#62767d] mr-2">$</span>
              <span>{displayedText}</span>
              <span className="animate-blink text-[#00ffc2] ml-0.5">|</span>
            </div>
          </div>

          {/* Brief tagline summary */}
          <p className="text-sm sm:text-base text-[#8892b0] max-w-xl leading-relaxed">
            Computer Science undergraduate at MAIT specializing in high-performance MERN web applications, scalable REST APIs, and algorithmic efficiency with <strong className="text-[#00ffc2]">1500+ DSA problems solved</strong>.
          </p>

          {/* Quick stats pills */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#c3d1d5]">
            <span className="px-3 py-1 rounded bg-[#111719] border border-[#1c282b] text-[#00ffc2]">
              1500+ DSA Solved
            </span>
            <span className="px-3 py-1 rounded bg-[#111719] border border-[#1c282b] text-[#ffb454]">
              LeetCode Peak 1860
            </span>
            <span className="px-3 py-1 rounded bg-[#111719] border border-[#1c282b] text-emerald-400">
              CGPA 9.20/10
            </span>
          </div>

          {/* 3D Press CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Primary CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96, y: 3 }}
              className="px-6 py-3.5 rounded-lg bg-[#00ffc2] text-[#0a0e0f] font-mono font-bold text-sm flex items-center space-x-2 shadow-[0_4px_0_0_#00b388,0_10px_20px_rgba(0,255,194,0.3)] transition-all cursor-pointer"
            >
              <span>EXPLORE_PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96, y: 3 }}
              className="px-6 py-3.5 rounded-lg bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2] text-[#c3d1d5] hover:text-[#00ffc2] font-mono font-semibold text-sm flex items-center space-x-2 shadow-[0_4px_0_0_#1c282b] transition-all cursor-pointer"
            >
              <Code className="w-4 h-4 text-[#ffb454]" />
              <span>EXECUTE_CONTACT</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: 3D Workstation Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 flex items-center justify-center relative"
        >
          <WorkstationCanvas />
        </motion.div>
      </div>

      {/* Scroll Down Bounce Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="flex flex-col items-center justify-center pt-8 cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-mono text-[10px] tracking-widest text-[#62767d] uppercase mb-1">
          SCROLL_DOWN
        </span>
        <ChevronDown className="w-5 h-5 text-[#00ffc2]" />
      </motion.div>
    </section>
  );
}
