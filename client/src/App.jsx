import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0e0f] text-[#c3d1d5] relative overflow-hidden font-sans">
      {/* CLI Boot Sequence Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Main Portfolio Content */}
      {!isLoading && (
        <>
          <CustomCursor />
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10 space-y-12">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Education />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
