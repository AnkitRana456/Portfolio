import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Line, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useAccent } from './useAccent';

const AMBER = '#ffb454';
const LID_CLOSED = Math.PI / 2;
const LID_OPEN = -0.15;
const GRAPH_NODES = [
  [0.8, 0.6, 0],
  [-0.7, 0.7, 0.3],
  [0.5, -0.8, -0.3],
  [-0.6, -0.6, 0.4]
];

export default function WorkstationScene({ mousePosition }) {
  const accent = useAccent();
  const groupRef = useRef();
  const lidRef = useRef();
  const screenRef = useRef();
  const dbRingsRef = useRef();
  const nodeGraphRef = useRef();
  const packetRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    const { x, y } = mousePosition.current;
    // Scrolling past the hero turns the desk away and drops it.
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);

    const group = groupRef.current;
    // damp, not lerp: same speed on a 30fps laptop as on a 144Hz monitor.
    const { damp } = THREE.MathUtils;
    group.rotation.y = damp(group.rotation.y, x * 0.3 + scroll * 1.1, 4, delta);
    group.rotation.x = damp(group.rotation.x, -y * 0.2 + 0.2 + scroll * 0.35, 4, delta);
    group.rotation.z = damp(group.rotation.z, Math.sin(t * 0.8) * 0.03, 3, delta);
    group.position.y = damp(group.position.y, 0.05 + Math.sin(t * 1.5) * 0.08 - scroll * 0.6, 4, delta);

    // Laptop opens once on load, then the screen fades in.
    lidRef.current.rotation.x = damp(lidRef.current.rotation.x, LID_OPEN, 2.2, delta);
    if (screenRef.current) {
      const open = 1 - (lidRef.current.rotation.x - LID_OPEN) / (LID_CLOSED - LID_OPEN);
      screenRef.current.style.opacity = Math.max(0, (open - 0.75) * 4);
    }

    dbRingsRef.current.rotation.y += delta * 1.2;
    nodeGraphRef.current.rotation.z += delta * 0.5;

    // A request hopping from the hub out to each service and back.
    const leg = Math.floor(t / 1.2) % GRAPH_NODES.length;
    const phase = (t % 1.2) / 1.2;
    const reach = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
    packetRef.current.position.set(...GRAPH_NODES[leg].map((v) => v * reach));
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} rotation={[0.2, -0.3, 0]} scale={0.92}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color={accent} />
      <pointLight position={[-4, 3, -2]} intensity={3} color={AMBER} />
      <pointLight position={[0, 1, 2]} intensity={2.5} color={accent} />

      <Sparkles count={70} scale={[8, 4, 5]} size={2} speed={0.35} color={accent} opacity={0.6} />

      <gridHelper args={[9, 18, accent, '#1c2126']} position={[0, -1.2, 0]} />

      {/* Laptop */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          <mesh position={[0, -0.1, 0.4]}>
            <boxGeometry args={[2.5, 0.1, 1.7]} />
            <meshStandardMaterial color="#16191c" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.04, 0.95]}>
            <boxGeometry args={[0.7, 0.02, 0.4]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
          </mesh>

          {/* Hinge pivot: the lid rotates around the back edge of the base */}
          <group ref={lidRef} position={[0, -0.05, -0.43]} rotation={[LID_CLOSED, 0, 0]}>
            <group position={[0, 0.83, 0]}>
              <mesh>
                <boxGeometry args={[2.5, 1.65, 0.1]} />
                <meshStandardMaterial color="#0e1012" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[2.3, 1.45]} />
                <meshBasicMaterial color="#050607" />
              </mesh>
              <Html transform position={[0, 0, 0.07]} distanceFactor={2.2} className="pointer-events-none select-none">
                <div ref={screenRef} style={{ opacity: 0 }} className="w-[320px] h-[200px] bg-[#050607] border border-accent/50 rounded p-3 font-mono text-[10px] text-accent flex flex-col justify-between">
                  <div className="flex justify-between border-b border-[#1c2126] pb-1 text-[#ffb454]">
                    <span>ankit@workstation:~</span>
                    <span>main</span>
                  </div>
                  <div className="space-y-1.5 my-auto">
                    <p className="text-white">&gt; stack = ["React", "Node", "Postgres"];</p>
                    <p className="text-accent">&gt; dsaProblemsSolved: 1500+;</p>
                    <p className="text-[#ffb454]">&gt; leetCodeRating: 1860 [PEAK];</p>
                    <p className="text-emerald-400">&gt; openToSDERoles: true;</p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[9px] text-[#8a939b]">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping inline-block"></span>
                    <span>pipeline passing</span>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        </group>
      </Float>

      {/* Database cylinder */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <group position={[-2.05, 0.2, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 1.2, 24]} />
            <meshStandardMaterial color="#14181b" metalness={0.7} roughness={0.3} wireframe />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 1.1, 16]} />
            <meshBasicMaterial color={accent} transparent opacity={0.35} />
          </mesh>
          <group ref={dbRingsRef}>
            <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.63, 32]} />
              <meshBasicMaterial color={accent} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.63, 32]} />
              <meshBasicMaterial color={AMBER} side={THREE.DoubleSide} />
            </mesh>
          </group>
          <Text position={[0, -0.85, 0]} fontSize={0.2} color={accent}>pgvector</Text>
        </group>
      </Float>

      {/* API graph with a request packet travelling along its edges */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.6}>
        <group position={[2.05, 0.4, -0.2]}>
          <group ref={nodeGraphRef}>
            <mesh>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.6} />
            </mesh>
            {GRAPH_NODES.map((pos) => (
              <group key={pos.join()}>
                <Line points={[[0, 0, 0], pos]} color={accent} lineWidth={1} transparent opacity={0.5} />
                <mesh position={pos}>
                  <sphereGeometry args={[0.16, 16, 16]} />
                  <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
                </mesh>
              </group>
            ))}
            <mesh ref={packetRef}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
          <Text position={[0, -1.05, 0]} fontSize={0.2} color={AMBER}>REST API</Text>
        </group>
      </Float>

      {/* Floating terminal */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.7}>
        <group position={[1.4, -0.6, 1.2]} rotation={[-0.2, -0.4, 0]}>
          <mesh>
            <boxGeometry args={[1.65, 1.05, 0.05]} />
            <meshStandardMaterial color="#0b0d0f" />
          </mesh>
          <Text position={[-0.65, 0.3, 0.04]} fontSize={0.09} color={accent} anchorX="left">$ git commit -m "feat: ship it"</Text>
          <Text position={[-0.65, 0.08, 0.04]} fontSize={0.08} color={AMBER} anchorX="left">[100%] CI passed</Text>
          <Text position={[-0.65, -0.16, 0.04]} fontSize={0.08} color="#d6dadd" anchorX="left">$ npm run deploy --prod</Text>
        </group>
      </Float>
    </group>
  );
}
