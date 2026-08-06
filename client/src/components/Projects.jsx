import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Terminal, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';

function ProjectTiltCard({ project, index, isFeatured }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

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

  const hasGithubLink = project.github && !project.github.includes('YOUR_GITHUB');
  const hasLiveLink = project.live && !project.live.includes('YOUR_LIVE');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`perspective-1000 interactive-card ${isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className={`w-full h-full bg-[#111719] border border-[#1c282b] hover:border-[#00ffc2]/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative overflow-hidden group hover:shadow-[0_15px_35px_rgba(0,255,194,0.18)] transform-style-3d ${
          isFeatured ? 'bg-gradient-to-br from-[#111719] via-[#141d20] to-[#0c1416]' : ''
        }`}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#00ffc2]/5 group-hover:bg-[#00ffc2]/15 rounded-bl-full pointer-events-none transition-all duration-500"></div>

        <div>
          {/* Top Bar: Title & Featured Badge */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-[#00ffc2] mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>PROJECT_0{index + 1}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-[#00ffc2] transition-colors">
                {project.title}
              </h3>
            </div>

            {isFeatured && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#00ffc2]/10 border border-[#00ffc2]/40 font-mono text-xs text-[#00ffc2]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED_SHOWCASE</span>
              </span>
            )}
          </div>

          {/* Tagline & Description */}
          <p className="font-mono text-xs text-[#ffb454] mb-3">{project.tagline}</p>
          <p className="text-sm text-[#c3d1d5] font-sans leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-2 mb-6 font-sans text-xs text-[#8892b0]">
            {project.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffc2] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tech Stack Badges & Links */}
        <div className="pt-6 border-t border-[#1c282b] space-y-4">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {project.tech.map((t, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded bg-[#0a0e0f] border border-[#1c282b] text-[#c3d1d5] group-hover:border-[#00ffc2]/30 group-hover:text-[#00ffc2] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3 font-mono text-xs pt-2">
            {hasGithubLink ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-[#0a0e0f] border border-[#1c282b] hover:border-[#00ffc2] text-[#00ffc2] flex items-center space-x-2 transition-all font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB_REPO</span>
              </a>
            ) : (
              <span className="px-4 py-2 rounded bg-[#0a0e0f]/50 border border-[#1c282b] text-[#62767d] flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>[GITHUB_LINK_PENDING]</span>
              </span>
            )}

            {hasLiveLink ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-[#00ffc2] text-[#0a0e0f] font-bold flex items-center space-x-2 hover:bg-[#ffb454] transition-all shadow-[0_0_12px_rgba(0,255,194,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE_DEMO</span>
              </a>
            ) : project.live ? (
              <span className="px-4 py-2 rounded bg-[#0a0e0f]/50 border border-[#1c282b] text-[#62767d] flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>[DEMO_PENDING]</span>
              </span>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative bg-[#06090a]/60">
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
            <span>// 04. FEATURED_PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            Full-Stack <span className="text-[#00ffc2]">MERN Applications</span> & Systems
          </h2>
          <p className="text-sm text-[#8892b0] font-mono">
            Hover cards for 3D depth tilt & hover action reveals
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <ProjectTiltCard
              key={proj.id}
              project={proj}
              index={idx}
              isFeatured={proj.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
