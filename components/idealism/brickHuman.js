import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export default function Test() {
  const INTERVAL = 0;
  const LEFT_ARM_ROTATION = Math.PI / 2;
  const RIGHT_ARM_ROTATION = 0;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          {/* head */}
          <mesh>
            <boxGeometry attach="geometry" args={[2.2, 2, 2]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* neck */}
          <mesh position={[0, -1.5 - INTERVAL, 0]}>
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* body */}
          <mesh position={[0, -4 - INTERVAL * 2, 0]}>
            <boxGeometry attach="geometry" args={[4, 4, 1.4]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* left arm */}
          <mesh position={[-2.5 - INTERVAL, -2.5 - INTERVAL * 2, 0]} rotation={[0, 0, LEFT_ARM_ROTATION]}>
            <boxGeometry attach="geometry" args={[1, 4, 1]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* right arm */}
          <mesh position={[2.5 + INTERVAL, -2.5 - INTERVAL * 2, 0]} rotation={[0, 0, RIGHT_ARM_ROTATION]}>
            <boxGeometry attach="geometry" args={[1, 4, 1]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* left leg */}
          <mesh position={[-1, -8 - INTERVAL * 3, 0]}>
            <boxGeometry attach="geometry" args={[1, 4, 1]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
          {/* right leg */}
          <mesh position={[1, -8 - INTERVAL * 3, 0]}>
            <boxGeometry attach="geometry" args={[1, 4, 1]} />
            <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
          </mesh>
        </group>
        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
