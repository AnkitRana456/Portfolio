import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Code2, Layout, Server, Database, Wrench, Cpu, Check, Filter } from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Layout: Layout,
  Server: Server,
  Database: Database,
  Wrench: Wrench,
  Cpu: Cpu
};

function SkillTiltCard({ category, items, iconName, index }) {
  const IconComponent = iconMap[iconName] || Terminal;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="perspective-1000 interactive-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full h-full bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2]/50 rounded-xl p-6 shadow-xl transition-colors duration-300 relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(0,255,194,0.15)] transform-style-3d flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffc2]/5 rounded-bl-full group-hover:bg-[#00ffc2]/15 transition-all duration-300 pointer-events-none"></div>

        <div>
          {/* Card Header */}
          <div className="flex items-center space-x-3 mb-6 border-b border-[#1c282b] pb-4">
            <div className="p-2.5 rounded-lg bg-[#0a0e0f] border border-[#1c282b] group-hover:border-[#00ffc2] transition-colors text-[#00ffc2]">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-base font-bold text-white group-hover:text-[#00ffc2] transition-colors">
              {category}
            </h3>
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-2">
            {items.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#0a0e0f] border border-[#1c282b] text-xs font-mono text-[#c3d1d5] group-hover:border-[#00ffc2]/30 hover:text-[#00ffc2] hover:bg-[#162124] transition-all"
              >
                <Check className="w-3 h-3 text-[#ffb454]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1c282b] flex items-center justify-between text-[10px] font-mono text-[#62767d]">
          <span>{items.length} TECHNOLOGIES</span>
          <span className="text-[#00ffc2]">MODULE_VERIFIED</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filterOptions = ['ALL', ...skills.map((s) => s.category)];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#06090a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-8"
        >
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffc2]">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 02. TECHNICAL_SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Stack & <span className="text-[#00ffc2]">Tooling Matrix</span>
          </h2>
          <p className="text-sm text-[#8892b0] font-mono">
            Filter categories or hover cards to engage interactive 3D perspective tilt
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto font-mono text-xs">
          <div className="flex items-center space-x-1 text-[#62767d] mr-2">
            <Filter className="w-3.5 h-3.5 text-[#00ffc2]" />
            <span>FILTER:</span>
          </div>
          {filterOptions.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#00ffc2] text-[#0a0e0f] font-bold shadow-[0_0_15px_rgba(0,255,194,0.3)]'
                    : 'bg-[#111719] border border-[#1c282b] text-[#c3d1d5] hover:border-[#00ffc2]/40 hover:text-[#00ffc2]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Filterable Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skillGroup, idx) => (
              <SkillTiltCard
                key={skillGroup.category}
                category={skillGroup.category}
                items={skillGroup.items}
                iconName={skillGroup.icon}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
