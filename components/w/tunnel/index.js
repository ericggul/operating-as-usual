import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { useState, useEffect } from "react";

import BaseCharacter from "./utils/baseCharacter";

export default function TunnelComponent() {
  const [curve, setCurve] = useState(null);
  useEffect(() => {
    createCurve();
  }, []);

  function createCurve() {
    let points = [];
    for (let i = 0; i < 100; i++) {
      points.push(new THREE.Vector3(0, 0, -4 * i));
    }
    setCurve(new THREE.CatmullRomCurve3(points));
  }

  return (
    <S.Container>
      <Canvas camera={{ fov: 50 }}>
        <ambientLight intensity={0.03} />
        <spotLight position={[0, 100, -200]} intensity={1.8} penumbra={1} color="hsl(200, 100%, 50%)" />
        <spotLight position={[0, -15, 300]} intensity={4} penumbra={1} color="hsl(350, 100%, 50%)" />

        <Physics gravity={[0, -10, 0]}>
          {new Array(100).fill(0).map((_, i) => (
            <TubeSet curve={curve} position={[10 * (i - 50), 0, 0]} key={i} />
          ))}
          <BaseCharacter controls rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]} args={[0.5]} color="yellow" />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </S.Container>
  );
}

function TubeSet({ curve, position }) {
  return (
    <group position={position}>
      <mesh>
        <tubeGeometry args={[curve, 2, 5, 25, true]} />
        <meshStandardMaterial color="white" roughness={0} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, -200]}>
        <sphereGeometry args={[9, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
      </mesh>
    </group>
  );
}
