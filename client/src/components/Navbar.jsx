import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { getTheme, setTheme } from '../theme';

const navItems = [
  { name: './about', id: 'about' },
  { name: './work', id: 'experience' },
  { name: './stack', id: 'skills' },
  { name: './projects', id: 'projects' },
  { name: './log', id: 'log' },
  { name: './contact', id: 'contact' }
];

function ThemeToggle() {
  const [theme, setLocalTheme] = useState(getTheme);

  useEffect(() => {
    const sync = () => setLocalTheme(getTheme());
    window.addEventListener('themechange', sync);
    return () => window.removeEventListener('themechange', sync);
  }, []);

  const next = theme === 'steel' ? 'mint' : 'steel';

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`theme ${next}`}
      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#1c2126] hover:border-accent/50 text-[#8a939b] hover:text-accent transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-accent" />
      {theme}
    </button>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const line = window.innerHeight * 0.4;
      const current = navItems.filter(({ id }) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top < line && el.getBoundingClientRect().bottom > line;
      })[0];
      setActiveSection(current?.id ?? '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 border-b ${
        isScrolled || mobileMenuOpen ? 'bg-[#050607]/85 backdrop-blur-md border-[#1c2126]' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between font-mono">
        <a href="#hero" className="text-sm font-bold text-white">
          ankit@portfolio <span className="text-[#6b747c] font-normal">~%</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-2.5 py-1.5 transition-colors ${isActive ? 'text-accent' : 'text-[#8a939b] hover:text-white'}`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-2.5 right-2.5 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </nav>

        <div className="flex md:hidden items-center gap-2 text-xs">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded border border-[#1c2126] text-accent"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[#1c2126] px-5 font-mono text-sm"
          >
            <div className="py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#d6dadd] hover:text-accent"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
