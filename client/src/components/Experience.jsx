import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 relative">
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
            <span>// 03. WORK_EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Industry <span className="text-[#00ffc2]">Experience Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1c282b] max-w-4xl space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-8 h-8 rounded-full bg-[#111719] border-2 border-[#00ffc2] flex items-center justify-center shadow-[0_0_12px_rgba(0,255,194,0.4)] text-[#00ffc2]">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Main Card */}
              <div className="bg-[#111719] border border-[#1c282b] group-hover:border-[#00ffc2]/40 rounded-xl p-6 sm:p-8 space-y-4 shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1c282b] pb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-[#00ffc2] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#ffb454] font-mono">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8892b0]">
                    <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0a0e0f] border border-[#1c282b]">
                      <Calendar className="w-3.5 h-3.5 text-[#00ffc2]" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0a0e0f] border border-[#1c282b]">
                      <MapPin className="w-3.5 h-3.5 text-[#ffb454]" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-3 font-sans text-sm text-[#c3d1d5] pt-2">
                  {exp.description.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00ffc2] shrink-0 mt-1" />
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1c282b]">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-[#0a0e0f] border border-[#1c282b] text-xs font-mono text-[#00ffc2]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
