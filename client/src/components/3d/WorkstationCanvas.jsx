import React, { useState, useEffect, useRef, Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import WorkstationScene from './WorkstationScene';
import { motion, useInView } from 'framer-motion';
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
    <div className="w-full h-full flex items-center justify-center relative p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0b0d0f] border border-accent/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgb(var(--accent)/0.15)] relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Console Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1c2126] mb-6">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-accent" />
            <span className="font-mono text-sm text-accent font-bold">ankit@workstation</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-accent font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span>LIVE</span>
          </div>
        </div>

        {/* 2D Layered Workstation Display */}
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-3.5 rounded-lg bg-[#050607] border border-[#1c2126] flex items-center space-x-3"
            >
              <Server className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-[#d6dadd] font-bold">Node / Express</div>
                <div className="text-[10px] text-[#8a939b]">REST & Auth</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-3.5 rounded-lg bg-[#050607] border border-[#1c2126] flex items-center space-x-3"
            >
              <Database className="w-5 h-5 text-[#ffb454] shrink-0" />
              <div>
                <div className="text-[#d6dadd] font-bold">Postgres + Mongo</div>
                <div className="text-[10px] text-[#8a939b]">pgvector & schemas</div>
              </div>
            </motion.div>
          </div>

          <div className="p-4 rounded-xl bg-[#050607] border border-[#1c2126] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#ffb454] border-b border-[#1c2126] pb-2">
              <span className="flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-accent" />
                <span>session.ts</span>
              </span>
              <span>1500+ DSA SOLVED</span>
            </div>
            <div className="text-accent space-y-1 text-[11px]">
              <p>&gt; const engineer = "Ankit Rana";</p>
              <p className="text-[#d6dadd]">&gt; leetCodePeakRating = 1860;</p>
              <p className="text-emerald-400">&gt; readyForHiring = true;</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkstationCanvas() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const inView = useInView(containerRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
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
    <div ref={containerRef} className="w-full h-full relative">
      <CanvasErrorBoundary fallback={<Workstation2DFallback />}>
        <Suspense fallback={<Workstation2DFallback />}>
          <Canvas
            camera={{ position: [0, 0.4, 6.9], fov: 45 }}
            dpr={[1, 1.75]}
            frameloop={inView ? 'always' : 'never'}
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
