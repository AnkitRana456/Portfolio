import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative bg-[#06090a]/60">
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
            <span>// 06. ACADEMIC_BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Education <span className="text-[#00ffc2]">& Academic Standing</span>
          </h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2]/50 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-[#0a0e0f] border border-[#1c282b] text-[#00ffc2]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded bg-[#00ffc2]/10 border border-[#00ffc2]/40 font-mono text-xs text-[#00ffc2] font-bold flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.grade}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-mono group-hover:text-[#00ffc2] transition-colors">
                    {edu.institution}
                  </h3>
                  <div className="text-sm font-semibold text-[#ffb454] font-mono mt-1">
                    {edu.degree}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1c282b] flex flex-wrap items-center justify-between font-mono text-xs text-[#8892b0] gap-2">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00ffc2]" />
                  <span>{edu.period}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ffb454]" />
                  <span>{edu.location}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
