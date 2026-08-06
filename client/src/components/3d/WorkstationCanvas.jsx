import React, { useState, useEffect, Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import WorkstationScene from './WorkstationScene';
import { motion } from 'framer-motion';
import { Terminal, Database, Server, Cpu, Code, Layers } from 'lucide-react';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Canvas fallback triggered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Workstation2DFallback() {
  return (
    <div className="w-full h-[400px] lg:h-[480px] flex items-center justify-center relative p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111719] border border-[#00ffc2]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,255,194,0.15)] relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#00ffc2]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Console Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1c282b] mb-6">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#00ffc2]" />
            <span className="font-mono text-sm text-[#00ffc2] font-bold">ANKIT_DEV_WORKSTATION</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-[#00ffc2] font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ffc2] animate-ping"></span>
            <span>LIVE</span>
          </div>
        </div>

        {/* 2D Layered Workstation Display */}
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-3.5 rounded-lg bg-[#0a0e0f] border border-[#1c282b] flex items-center space-x-3"
            >
              <Server className="w-5 h-5 text-[#00ffc2] shrink-0" />
              <div>
                <div className="text-[#c3d1d5] font-bold">Node / Express</div>
                <div className="text-[10px] text-[#8892b0]">REST & Auth</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-3.5 rounded-lg bg-[#0a0e0f] border border-[#1c282b] flex items-center space-x-3"
            >
              <Database className="w-5 h-5 text-[#ffb454] shrink-0" />
              <div>
                <div className="text-[#c3d1d5] font-bold">MongoDB Atlas</div>
                <div className="text-[10px] text-[#8892b0]">Document Schemas</div>
              </div>
            </motion.div>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0e0f] border border-[#1c282b] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#ffb454] border-b border-[#1c282b] pb-2">
              <span className="flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-[#00ffc2]" />
                <span>active_session.js</span>
              </span>
              <span>1500+ DSA SOLVED</span>
            </div>
            <div className="text-[#00ffc2] space-y-1 text-[11px]">
              <p>&gt; const engineer = "Ankit Rana";</p>
              <p className="text-[#c3d1d5]">&gt; leetCodePeakRating = 1860;</p>
              <p className="text-emerald-400">&gt; readyForHiring = true;</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkstationCanvas() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return <Workstation2DFallback />;
  }

  return (
    <div className="w-full h-[450px] lg:h-[520px] relative">
      <CanvasErrorBoundary fallback={<Workstation2DFallback />}>
        <Suspense fallback={<Workstation2DFallback />}>
          <Canvas
            camera={{ position: [0, 0.5, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <WorkstationScene mousePosition={mousePosition} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
