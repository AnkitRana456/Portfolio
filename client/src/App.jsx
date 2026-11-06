import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import PipelineRail from './components/PipelineRail';
import ResumeDuck from './components/ResumeDuck';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activity from './components/Activity';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip, not hidden: hidden would break the sticky globe */}
      <div className="min-h-screen bg-[#050607] text-[#d6dadd] relative overflow-x-clip font-sans">
        <LoadingScreen onComplete={() => setIsLoading(false)} />

        {!isLoading && (
          <>
            <CustomCursor />
            <ParticleBackground />
            <PipelineRail />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Activity />
              <Experience />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
            </main>
            <Footer />
            <ResumeDuck />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
