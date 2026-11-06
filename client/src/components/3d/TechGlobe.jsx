import React, { useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Billboard, OrbitControls, Sparkles, Text } from '@react-three/drei';
import { useInView } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { useAccent } from './useAccent';

const RADIUS = 1.85;

// Fibonacci sphere: spreads the labels evenly with no clustering at the poles.
function spherePoint(i, total) {
  const y = 1 - (i / (total - 1)) * 2;
  const ring = Math.sqrt(1 - y * y);
  const angle = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(angle) * ring * RADIUS, y * RADIUS, Math.sin(angle) * ring * RADIUS];
}

export default function TechGlobe() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '100px' });
  const accent = useAccent();
  const labels = useMemo(() => {
    const items = portfolioData.skills.filter((s) => s.category !== 'Core CS').flatMap((s) => s.items);
    return items.map((text, i) => ({ text, position: spherePoint(i, items.length) }));
  }, []);

  return (
    <div ref={ref} className="w-full h-full cursor-grab active:cursor-grabbing" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} frameloop={inView ? 'always' : 'never'} gl={{ alpha: true, antialias: true }}>
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={0.14} />
        </mesh>
        <Sparkles count={50} scale={5.5} size={2} speed={0.3} color={accent} opacity={0.5} />
        {labels.map(({ text, position }, i) => (
          <Billboard key={text} position={position}>
            <Text fontSize={0.16} color={i % 4 === 0 ? '#ffb454' : accent} anchorX="center" anchorY="middle">
              {text}
            </Text>
          </Billboard>
        ))}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.4} />
      </Canvas>
    </div>
  );
}
