import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Stage from './Stage';
import { Terminal, Code2, Layout, Server, Database, Wrench, Cpu, Check, Filter } from 'lucide-react';

const TechGlobe = lazy(() => import('./3d/TechGlobe'));

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

  const x = useSpring(0, { stiffness: 220, damping: 22 });
  const y = useSpring(0, { stiffness: 220, damping: 22 });

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
        className="w-full h-full bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/50 rounded-xl p-6 shadow-xl transition-colors duration-300 relative overflow-hidden group hover:shadow-[0_10px_30px_rgb(var(--accent)/0.15)] transform-style-3d flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full group-hover:bg-accent/15 transition-all duration-300 pointer-events-none"></div>

        <div>
          {/* Card Header */}
          <div className="flex items-center space-x-3 mb-6 border-b border-[#1c2126] pb-4">
            <div className="p-2.5 rounded-lg bg-[#050607] border border-[#1c2126] group-hover:border-accent transition-colors text-accent">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-base font-bold text-white group-hover:text-accent transition-colors">
              {category}
            </h3>
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-2">
            {items.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#050607] border border-[#1c2126] text-xs font-mono text-[#d6dadd] group-hover:border-accent/30 hover:text-accent hover:bg-[#14181b] transition-all"
              >
                <Check className="w-3 h-3 text-[#ffb454]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1c2126] flex items-center justify-between text-[10px] font-mono text-[#6b747c]">
          <span>{items.length} packages</span>
          <span className="text-accent">build passed</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Marquee({ items, direction }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track flex w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2 mr-2.5 px-3 py-1.5 rounded-md bg-[#0b0d0f] border border-[#1c2126] font-mono text-xs text-[#d6dadd] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filterOptions = ['ALL', ...skills.map((s) => s.category)];
  const filteredSkills = selectedCategory === 'ALL' ? skills : skills.filter((s) => s.category === selectedCategory);
  const tools = skills.filter((s) => s.category !== 'Core CS').flatMap((s) => s.items);
  const half = Math.ceil(tools.length / 2);

  return (
    <Stage id="skills" cmd="ls node_modules/.toolbox" title="The stack behind the systems.">
      <div className="space-y-2.5 mb-10">
        <Marquee items={tools.slice(0, half)} direction="left" />
        <Marquee items={tools.slice(half)} direction="right" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="hidden lg:block lg:col-span-5 sticky top-24 h-[460px]">
          <Suspense fallback={null}>
            <TechGlobe />
          </Suspense>
          <p className="text-center font-mono text-[10px] text-[#6b747c]">drag to spin</p>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 text-accent" />
            {filterOptions.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-[#050607] border-accent font-semibold'
                    : 'bg-[#0b0d0f] border-[#1c2126] text-[#d6dadd] hover:border-accent/40 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
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
      </div>
    </Stage>
  );
}
