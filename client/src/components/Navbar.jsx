import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Menu, X, Code, ExternalLink } from 'lucide-react';

const navItems = [
  { name: '// About', href: '#about' },
  { name: '// Skills', href: '#skills' },
  { name: '// Experience', href: '#experience' },
  { name: '// Projects', href: '#projects' },
  { name: '// Achievements', href: '#achievements' },
  { name: '// Contact', href: '#contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scrollspy
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e0f]/85 backdrop-blur-md border-b border-[#1c282b] py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center space-x-2 font-mono text-sm sm:text-base font-bold text-[#00ffc2] group"
        >
          <span className="p-1.5 rounded bg-[#111719] border border-[#1c282b] group-hover:border-[#00ffc2] transition-colors">
            <Terminal className="w-4 h-4 text-[#00ffc2]" />
          </span>
          <span className="tracking-tight">
            ANKIT.<span className="text-[#ffb454]">RANA</span>
            <span className="animate-pulse text-[#00ffc2]">_</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-mono text-xs">
          {navItems.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 rounded transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#00ffc2] bg-[#111719] border border-[#00ffc2]/30 shadow-[0_0_10px_rgba(0,255,194,0.1)]'
                    : 'text-[#8892b0] hover:text-white hover:bg-[#111719]/50'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#00ffc2]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="https://github.com/AnkitRana456"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-1.5 rounded bg-[#00ffc2]/10 border border-[#00ffc2]/40 text-[#00ffc2] hover:bg-[#00ffc2] hover:text-[#0a0e0f] transition-all font-semibold flex items-center space-x-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#111719] border border-[#1c282b] text-[#00ffc2] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0e0f]/95 backdrop-blur-xl border-b border-[#1c282b] px-4 py-4 space-y-2 font-mono text-sm"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-[#c3d1d5] hover:text-[#00ffc2] hover:bg-[#111719]"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://github.com/AnkitRana456"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 mt-2 rounded bg-[#00ffc2] text-[#0a0e0f] font-bold"
          >
            GitHub Profile
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
