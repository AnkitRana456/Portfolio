import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Award, Trophy, Target, ShieldCheck, Flame } from 'lucide-react';

const iconMap = [Trophy, Target, ShieldCheck];

function RatingRingGauge({ rating = 1860, max = 2200 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, rating, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => setVal(Math.floor(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, rating]);

  const percentage = Math.min((val / max) * 100, 100);
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  return (
    <div ref={ref} className="flex items-center space-x-4 my-4 p-3 rounded-xl bg-[#0a0e0f] border border-[#1c282b]">
      {/* SVG Progress Ring */}
      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#1c282b"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#ffb454"
            strokeWidth="5"
            strokeDasharray="175.9"
            strokeDashoffset={175.9 - (175.9 * val) / max}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300"
          />
        </svg>
        <Flame className="w-5 h-5 text-[#ffb454] absolute inset-0 m-auto animate-pulse" />
      </div>

      <div>
        <div className="font-mono text-xl font-bold text-[#ffb454]">
          {val} <span className="text-xs text-[#8892b0]">/ {max}</span>
        </div>
        <div className="font-mono text-[11px] text-[#00ffc2]">
          KNIGHT LEVEL TIER
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-16"
        >
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffc2]">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 05. HONORS_&_MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Competitive <span className="text-[#00ffc2]">Milestones</span> & Hackathons
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const IconComp = iconMap[idx % iconMap.length];
            const isMint = item.color === 'mint';
            const isRatingCard = item.title.includes('1860');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2]/50 rounded-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-[0_0_25px_rgba(0,255,194,0.15)] transition-all duration-300"
              >
                {/* Background watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <Award className={`w-24 h-24 ${isMint ? 'text-[#00ffc2]' : 'text-[#ffb454]'}`} />
                </div>

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-[#0a0e0f] border border-[#1c282b] ${isMint ? 'text-[#00ffc2]' : 'text-[#ffb454]'}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                      isMint
                        ? 'bg-[#00ffc2]/10 border border-[#00ffc2]/40 text-[#00ffc2]'
                        : 'bg-[#ffb454]/10 border border-[#ffb454]/40 text-[#ffb454]'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white font-mono mb-1 group-hover:text-[#00ffc2] transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-[#ffb454] mb-3">
                    {item.subtitle}
                  </div>

                  {/* Rating Animated Ring for LeetCode Card */}
                  {isRatingCard && <RatingRingGauge rating={1860} max={2200} />}

                  {/* Description */}
                  <p className="text-sm text-[#8892b0] font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Verification Seal */}
                <div className="pt-6 mt-6 border-t border-[#1c282b] flex items-center justify-between font-mono text-[11px] text-[#62767d]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffc2]"></span>
                    <span>VERIFIED_METRIC</span>
                  </div>
                  <span className="text-[#00ffc2]">OFFICIAL</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
