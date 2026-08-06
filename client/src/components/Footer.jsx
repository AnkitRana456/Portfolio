import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1c282b] bg-[#06090a] py-8 text-xs font-mono text-[#62767d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Status */}
        <div className="flex items-center space-x-2 text-[#00ffc2]">
          <span className="w-2 h-2 rounded-full bg-[#00ffc2] animate-ping"></span>
          <span>● ALL SYSTEMS OPERATIONAL</span>
        </div>

        {/* Center Code Comment Credit */}
        <div className="text-[#8892b0] hover:text-[#00ffc2] transition-colors">
          <span className="text-[#62767d]">// </span>
          <span>built with React, Node, Express, MongoDB + Three.js + Framer Motion</span>
        </div>

        {/* Right Terminal Tag */}
        <div>
          <span className="text-[#ffb454]">© {new Date().getFullYear()} ANKIT.RANA_DEV_CONSOLE</span>
        </div>
      </div>
    </footer>
  );
}
