import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Plane = ({ position, rotation, color }) => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
    </mesh>
  );
};

const PlanesBackground = ({ darkMode }) => {
  const planes = useMemo(() => {
    const planesArray = [];
    for (let i = 0; i < 20; i++) {
      planesArray.push({
        position: [
          THREE.MathUtils.randFloatSpread(20),
          THREE.MathUtils.randFloatSpread(20),
          THREE.MathUtils.randFloatSpread(20),
        ],
        rotation: [
          THREE.MathUtils.randFloatSpread(Math.PI),
          THREE.MathUtils.randFloatSpread(Math.PI),
          THREE.MathUtils.randFloatSpread(Math.PI),
        ],
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      });
    }
    return planesArray;
  }, []);

  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      onCreated={({ gl }) => {
        gl.setClearColor(darkMode ? 'black' : 'white');
      }}
    >
      {planes.map((plane, index) => (
        <Plane key={index} position={plane.position} rotation={plane.rotation} color={plane.color} />
      ))}
    </Canvas>
  );
};

export default PlanesBackground;
