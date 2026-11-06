import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Award, Code, Github, Linkedin, Loader2, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Stage from './Stage';
import Terminal from './Terminal';

const iconMap = { Github, Linkedin, Code, Terminal: TerminalIcon, Award };
const EMPTY = { name: '', email: '', message: '' };
const fieldClass = 'w-full bg-[#050607] border border-[#1c2126] rounded-md px-3 py-2.5 text-sm text-white placeholder-[#6b747c] focus:outline-none focus:border-accent transition-colors';

export default function Contact() {
  const { socials, personal } = portfolioData;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const { data } = await axios.post(`${apiUrl}/contact`, form);
      if (!data.success) throw new Error('Rejected by server');

      setStatus({ state: 'sent' });
      setForm(EMPTY);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#bbccd7', '#ffb454', '#ffffff'],
        disableForReducedMotion: true
      });
    } catch (err) {
      console.error('Contact Form Error:', err);
      // Keep the typed message: the visitor can still send it by email.
      setStatus({ state: 'failed' });
    }
  };

  const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(`Portfolio message from ${form.name}`)}&body=${encodeURIComponent(form.message)}`;

  return (
    <Stage id="contact" cmd="./send-message --interactive" title="Last stage needs your input.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch font-mono">
        <div className="flex flex-col">
          <p className="text-xs text-[#6b747c] mb-2">interactive terminal, try <span className="text-white font-semibold">help</span></p>
          <div className="flex-1">
            <Terminal />
          </div>
          {/* floating mascot — mirrors the friend's portfolio cat */}
          <motion.div
            className="mt-4 self-start group cursor-default select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative inline-block">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0b0d0f] border border-[#1c2126] rounded-full px-3 py-1 text-[11px] text-[#d6dadd] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                ooh — say hi to Ankit here
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0b0d0f] border border-[#1c2126] flex items-center justify-center text-3xl shadow-lg shadow-black/40">
                🧑‍💻
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs text-[#6b747c] mb-2">or just write</p>
          <form onSubmit={handleSubmit} className="flex-1 rounded-xl bg-[#0b0d0f] border border-[#1c2126] p-5 sm:p-6 space-y-4">
            <p className="text-sm text-[#d6dadd] leading-relaxed">
              Hiring, or want to talk tech? Reach me at{' '}
              <a href={`mailto:${personal.email}`} className="text-accent hover:text-[#ffb454] transition-colors break-words">{personal.email}</a>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-[11px] text-[#8a939b]">
                --name
                <input required name="name" value={form.name} onChange={handleChange} placeholder="jane-doe" autoComplete="name" className={`${fieldClass} mt-1.5`} />
              </label>
              <label className="block text-[11px] text-[#8a939b]">
                --email
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" autoComplete="email" className={`${fieldClass} mt-1.5`} />
              </label>
            </div>

            <label className="block text-[11px] text-[#8a939b]">
              --message
              <textarea required name="message" rows={4} value={form.message} onChange={handleChange} placeholder="type your message..." className={`${fieldClass} mt-1.5 resize-y`} />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                type="submit"
                disabled={status.state === 'sending'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2.5 rounded bg-accent text-[#050607] font-bold text-xs flex items-center gap-2 disabled:opacity-60"
              >
                {status.state === 'sending' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {status.state === 'sending' ? 'running...' : 'run send()'}
              </motion.button>

              <span role="status" className="text-xs">
                {status.state === 'sent' && <span className="text-emerald-400">✓ 200 OK, message delivered.</span>}
                {status.state === 'failed' && (
                  <span className="text-[#ff7a6b]">
                    ✗ send failed.{' '}
                    <a href={mailto} className="underline hover:text-white">Send it by email instead</a>
                  </span>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        {socials.map((soc) => {
          const Icon = iconMap[soc.icon] || Code;
          return (
            <motion.a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#0b0d0f] border border-[#1c2126] hover:border-accent/50 font-mono text-xs text-[#d6dadd] hover:text-accent transition-colors"
            >
              <Icon className="w-4 h-4" />
              {soc.name}
            </motion.a>
          );
        })}
      </div>
    </Stage>
  );
}
