import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Award, Code, CheckCircle, Cpu } from 'lucide-react';

function StatCounter({ label, value, suffix, isDecimal }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (isDecimal) {
            setDisplayValue(latest.toFixed(2));
          } else {
            setDisplayValue(Math.floor(latest));
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, isDecimal]);

  return (
    <div
      ref={ref}
      className="p-6 rounded-xl bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2]/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,255,194,0.1)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
        <Award className="w-12 h-12 text-[#00ffc2]" />
      </div>
      <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#00ffc2] mb-1 tracking-tight">
        {displayValue}
        {suffix}
      </div>
      <div className="font-mono text-xs text-[#8892b0] group-hover:text-[#c3d1d5] transition-colors">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { summary } = portfolioData.personal;
  const { stats } = portfolioData;

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-12"
        >
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffc2]">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 01. ABOUT_ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Architecting <span className="text-[#00ffc2]">Scalable Systems</span> & Solving <span className="text-[#ffb454]">Complex Algorithms</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Resume Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#111719] border border-[#1c282b] rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffc2]/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#00ffc2] font-mono text-sm border-b border-[#1c282b] pb-3">
                <Code className="w-4 h-4" />
                <span>executive_summary.txt</span>
              </div>
              <p className="text-[#c3d1d5] text-base leading-relaxed font-sans">
                {summary}
              </p>
            </div>

            {/* Core Competencies Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1c282b] font-mono text-xs">
              <div className="flex items-start space-x-2 text-[#8892b0]">
                <CheckCircle className="w-4 h-4 text-[#00ffc2] shrink-0 mt-0.5" />
                <span>Full-Stack MERN Architecture</span>
              </div>
              <div className="flex items-start space-x-2 text-[#8892b0]">
                <CheckCircle className="w-4 h-4 text-[#00ffc2] shrink-0 mt-0.5" />
                <span>REST API & JWT Security</span>
              </div>
              <div className="flex items-start space-x-2 text-[#8892b0]">
                <CheckCircle className="w-4 h-4 text-[#ffb454] shrink-0 mt-0.5" />
                <span>DSA & Problem Solving</span>
              </div>
              <div className="flex items-start space-x-2 text-[#8892b0]">
                <CheckCircle className="w-4 h-4 text-[#ffb454] shrink-0 mt-0.5" />
                <span>WebSockets & Real-time Scraping</span>
              </div>
            </div>
          </motion.div>

          {/* Animated Stat Counters (2x2 Grid) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <StatCounter key={idx} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
