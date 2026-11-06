import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const boot = (step) => ({ className: 'animate-boot-in', style: { animationDelay: `${step * 90}ms` } });

function useTypedRoles(roles) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[index];
    if (!deleting && text === role) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return undefined;
    }
    const step = setTimeout(
      () => setText(role.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? 40 : 75
    );
    return () => clearTimeout(step);
  }, [text, deleting, index, roles]);

  return text;
}

function PhotoCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="animate-boot-in lg:col-span-6" style={{ animationDelay: '270ms' }}>
      <motion.div
        className="perspective-1000 w-full"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="rounded-xl bg-[#0b0d0f]/70 border border-[#1c2126] overflow-hidden transform-style-3d"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2126] font-mono text-[11px] text-[#6b747c]">
            <span>~/me.jpg</span>
            <span className="text-emerald-400">● online</span>
          </div>
          <div className="relative">
            <img
              src="/ankit.webp"
              alt="Ankit Rana"
              className="w-full object-cover object-top"
              style={{ maxHeight: '460px' }}
            />
            {/* subtle accent glow overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgb(var(--accent)/0.08), transparent 70%)' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { roles, tagline, email } = portfolioData.personal;
  const { socials } = portfolioData;
  const role = useTypedRoles(roles);
  const links = [
    { label: 'mail', href: `mailto:${email}` },
    ...['GitHub', 'LinkedIn', 'LeetCode'].map((name) => ({
      label: name.toLowerCase(),
      href: socials.find((s) => s.name === name).url,
      external: true
    }))
  ];

  return (
    <section id="hero" data-label="oh — that's Ankit 👋" className="relative min-h-screen flex items-center pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 font-mono">
          <p {...boot(0)}>
            <span className="text-xs text-[#6b747c]">$ whoami</span>
          </p>

          <h1 {...boot(1)}>
            <span className="block mt-3 text-[clamp(3.5rem,10vw,6.5rem)] font-extrabold leading-[0.98] tracking-tight text-chrome">
              Ankit
              <br />
              Rana<span className="animate-blink">_</span>
            </span>
          </h1>

          <p {...boot(2)}>
            <span className="flex items-center h-8 mt-5 text-sm sm:text-base text-[#ffb454]" aria-label={roles.join(', ')}>
              <span className="text-[#6b747c] mr-2">&gt;</span>
              <span aria-hidden="true">{role}</span>
              <span aria-hidden="true" className="animate-blink text-accent ml-0.5">▍</span>
            </span>
          </p>

          <p {...boot(3)}>
            <span className="block mt-3 max-w-md text-sm text-[#d6dadd] leading-relaxed">{tagline}</span>
          </p>

          <div {...boot(4)}>
            <div className="flex flex-wrap items-center gap-2.5 mt-7 text-xs">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2.5 rounded bg-accent text-[#050607] font-bold"
              >
                ./resume.pdf
              </motion.a>
              {links.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2.5 rounded bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/50 text-[#d6dadd] hover:text-accent transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <PhotoCard />
      </div>
    </section>
  );
}
