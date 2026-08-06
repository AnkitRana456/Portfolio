import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export default function WorkstationScene({ mousePosition }) {
  const groupRef = useRef();
  const laptopScreenRef = useRef();
  const dbRingsRef = useRef();
  const nodeGraphRef = useRef();
  const idleTimeRef = useRef(0);

  useFrame((state, delta) => {
    idleTimeRef.current += delta;
    
    if (groupRef.current) {
      // Idle bobbing + rotation + mouse parallax tilt
      const idleY = Math.sin(idleTimeRef.current * 1.5) * 0.08;
      const idleRotZ = Math.sin(idleTimeRef.current * 0.8) * 0.03;

      const targetRotationY = (mousePosition.x * 0.35);
      const targetRotationX = (-mousePosition.y * 0.25);

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX + 0.2, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, idleRotZ, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.4 + idleY, 0.05);
    }

    if (dbRingsRef.current) {
      dbRingsRef.current.rotation.y += delta * 1.2;
    }

    if (nodeGraphRef.current) {
      nodeGraphRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.2, -0.3, 0]}>
      {/* Ambient and Accent Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#00ffc2" />
      <pointLight position={[-4, 3, -2]} intensity={3} color="#ffb454" />
      <pointLight position={[0, 1, 2]} intensity={2.5} color="#00ffc2" />

      {/* Main Base Grid / Workstation Desk */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0b1214" wireframe transparent opacity={0.25} />
      </mesh>

      {/* 1. Stylized Floating Laptop Workstation */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {/* Laptop Base / Keyboard */}
          <mesh position={[0, -0.1, 0.4]}>
            <boxGeometry args={[2.5, 0.1, 1.7]} />
            <meshStandardMaterial color="#162024" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Trackpad & Key Details */}
          <mesh position={[0, -0.04, 0.95]}>
            <boxGeometry args={[0.7, 0.02, 0.4]} />
            <meshStandardMaterial color="#00ffc2" emissive="#00ffc2" emissiveIntensity={0.4} />
          </mesh>

          {/* Laptop Screen Frame */}
          <group position={[0, 0.85, -0.35]} rotation={[-0.15, 0, 0]}>
            <mesh>
              <boxGeometry args={[2.5, 1.65, 0.1]} />
              <meshStandardMaterial color="#0f171a" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Screen Display Face */}
            <mesh ref={laptopScreenRef} position={[0, 0, 0.06]}>
              <planeGeometry args={[2.3, 1.45]} />
              <meshBasicMaterial color="#050a0c" />
            </mesh>
            {/* Screen Content HTML Overlay */}
            <Html
              transform
              position={[0, 0, 0.07]}
              distanceFactor={2.2}
              className="pointer-events-none select-none"
            >
              <div className="w-[320px] h-[200px] bg-[#0a0e0f] border border-[#00ffc2]/50 rounded p-3 font-mono text-[10px] text-[#00ffc2] flex flex-col justify-between shadow-[0_0_30px_rgba(0,255,194,0.25)]">
                <div className="flex justify-between border-b border-[#1c282b] pb-1 text-[#ffb454]">
                  <span>ankit@workstation:~</span>
                  <span>MERN_STACK_v2.0</span>
                </div>
                <div className="space-y-1.5 my-auto">
                  <p className="text-white">&gt; const stack = ["MongoDB", "Express", "React", "Node"];</p>
                  <p className="text-[#00ffc2]">&gt; dsaProblemsSolved: 1500+;</p>
                  <p className="text-[#ffb454]">&gt; leetCodeRating: 1860 [PEAK];</p>
                  <p className="text-emerald-400">&gt; Status: ALL_SYSTEMS_OPERATIONAL;</p>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] text-[#8892b0]">
                  <span className="w-2 h-2 rounded-full bg-[#00ffc2] animate-ping inline-block"></span>
                  <span>System operational & ready</span>
                </div>
              </div>
            </Html>
          </group>
        </group>
      </Float>

      {/* 2. Abstract Database Cylinder with Glowing Rings */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <group position={[-2.2, 0.2, 0.5]}>
          {/* Cylinder Shell */}
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 1.2, 24]} />
            <meshStandardMaterial color="#111c20" metalness={0.7} roughness={0.3} wireframe />
          </mesh>
          {/* Internal Glowing Core */}
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 1.1, 16]} />
            <meshBasicMaterial color="#00ffc2" transparent opacity={0.35} />
          </mesh>
          {/* Rotating Query Rings */}
          <group ref={dbRingsRef}>
            <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.63, 32]} />
              <meshBasicMaterial color="#00ffc2" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.63, 32]} />
              <meshBasicMaterial color="#ffb454" side={THREE.DoubleSide} />
            </mesh>
          </group>
          <Text
            position={[0, -0.85, 0]}
            fontSize={0.22}
            color="#00ffc2"
          >
            MongoDB
          </Text>
        </group>
      </Float>

      {/* 3. API Node Graph Object */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.6}>
        <group position={[2.2, 0.4, -0.2]}>
          <group ref={nodeGraphRef}>
            {/* Center Node */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshStandardMaterial color="#ffb454" emissive="#ffb454" emissiveIntensity={0.6} />
            </mesh>
            {/* Surrounding Nodes */}
            {[
              [0.8, 0.6, 0],
              [-0.7, 0.7, 0.3],
              [0.5, -0.8, -0.3],
              [-0.6, -0.6, 0.4]
            ].map((pos, idx) => (
              <group key={idx}>
                <mesh position={pos}>
                  <sphereGeometry args={[0.16, 16, 16]} />
                  <meshStandardMaterial color="#00ffc2" emissive="#00ffc2" emissiveIntensity={0.8} />
                </mesh>
              </group>
            ))}
          </group>
          <Text
            position={[0, -1.05, 0]}
            fontSize={0.22}
            color="#ffb454"
          >
            REST API Graph
          </Text>
        </group>
      </Float>

      {/* 4. Floating 3D Terminal Console Window */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.7}>
        <group position={[1.4, -0.6, 1.2]} rotation={[-0.2, -0.4, 0]}>
          <mesh>
            <boxGeometry args={[1.65, 1.05, 0.05]} />
            <meshStandardMaterial color="#0c1417" />
          </mesh>
          <Text
            position={[-0.65, 0.3, 0.04]}
            fontSize={0.09}
            color="#00ffc2"
            anchorX="left"
          >
            $ git commit -m "feat: MERN App"
          </Text>
          <Text
            position={[-0.65, 0.08, 0.04]}
            fontSize={0.08}
            color="#ffb454"
            anchorX="left"
          >
            [100%] Built with React & Node
          </Text>
          <Text
            position={[-0.65, -0.16, 0.04]}
            fontSize={0.08}
            color="#c3d1d5"
            anchorX="left"
          >
            $ npm run deploy --prod
          </Text>
        </group>
      </Float>
    </group>
  );
}

