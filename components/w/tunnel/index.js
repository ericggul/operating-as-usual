import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, Stars, MeshReflectorMaterial } from "@react-three/drei";
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
      <Canvas
        camera={{
          fov: 50,

          // position: [0, 100, 100],

          near: 1,
          far: 10000,
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.03} />
        {/* <fog attach="fog" args={["#333", 250, 1000]} /> */}
        <spotLight position={[0, 100, -200]} intensity={1.8} penumbra={1} color="hsl(200, 100%, 50%)" />
        <spotLight position={[0, -15, 300]} intensity={4} penumbra={1} color="hsl(350, 100%, 50%)" />

        <Physics gravity={[0, -10, 0]}>
          {new Array(70).fill(0).map((_, i) => (
            <TubeSet curve={curve} position={[10 * (i - 35), 0, 0]} key={i} />
          ))}
          {new Array(70).fill(0).map((_, i) => (
            <TubeSet curve={curve} position={[10 * (i - 35), 0, -200]} key={i} />
          ))}
          {new Array(70).fill(0).map((_, i) => (
            <TubeSet curve={curve} position={[10 * (i - 35), 0, -400]} key={i} />
          ))}
          <BaseCharacter controls rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]} args={[0.5]} />
        </Physics>
        <PointerLockControls />
        {/* <OrbitControls /> */}

        <Mirror position={[0, 25, -200]} rotation={[0, 0, 0]} size={[700, 50]} />
        <Mirror position={[0, 50, -400]} rotation={[0, 0, 0]} size={[700, 100]} />
        <Mirror position={[0, 400, -600]} rotation={[0, 0, 0]} size={[700, 800]} />
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

function Mirror(props) {
  return (
    <mesh {...props}>
      <planeGeometry args={props.size} />
      <MeshReflectorMaterial
        mixBlur={0}
        mixStrength={1} // Strength of the reflections
        mixContrast={1}
        resolution={2048} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}
