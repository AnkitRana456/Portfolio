import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import FlowDiagram from './FlowDiagram';
import Stage from './Stage';

function ProjectCard({ project, wide }) {
  const x = useSpring(0, { stiffness: 220, damping: 22 });
  const y = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgb(var(--accent) / 0.1), transparent 65%)`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPublic = project.live || project.github;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className={`perspective-1000 interactive-card ${wide ? 'lg:col-span-2' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="group relative h-full flex flex-col rounded-xl bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/50 transition-colors duration-300 overflow-hidden transform-style-3d"
      >
        <motion.div aria-hidden="true" style={{ background: glare }} className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2126] font-mono text-[11px] text-[#6b747c]">
          <span>~/projects/{project.id}</span>
          <span className={project.live ? 'text-emerald-400' : 'text-[#8a939b]'}>
            {project.live ? '● live' : project.github ? '○ source' : `◐ private · ${project.org}`}
          </span>
        </div>

        <div className="px-4 sm:px-6 pt-3 border-b border-[#1c2126] bg-[#050607]/60 overflow-x-auto">
          <FlowDiagram nodes={project.flow} />
        </div>

        <div className="flex-1 flex flex-col p-5 sm:p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{project.title}</h3>
          <p className="font-mono text-xs text-[#ffb454] mt-1 mb-3">{project.tagline}</p>
          <p className="text-sm text-[#d6dadd] leading-relaxed mb-4">{project.description}</p>

          <ul className={`space-y-2 mb-5 text-xs text-[#8a939b] ${wide ? 'lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0 lg:gap-y-2' : ''}`}>
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-1 rounded bg-[#14181b] text-[#d6dadd]">{t}</span>
              ))}
            </div>

            {isPublic && (
              <div className="flex items-center gap-5 font-mono text-xs mt-4 pt-4 border-t border-[#1c2126]">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-[#ffb454] transition-colors">
                    --live ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#8a939b] hover:text-accent transition-colors">
                    --source ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const main = projects.filter((p) => !p.more);
  const more = projects.filter((p) => p.more);

  return (
    <Stage id="projects" cmd="ls -la ./projects" title="Shipped beyond localhost.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {main.map((p) => <ProjectCard key={p.id} project={p} wide={p.featured} />)}
      </div>

      <button
        onClick={() => setShowAll((v) => !v)}
        aria-expanded={showAll}
        className="mt-6 font-mono text-xs text-[#d6dadd] hover:text-accent transition-colors"
      >
        $ ls ~/projects --all {showAll ? '↑' : '→'}
      </button>

      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
              {more.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}
