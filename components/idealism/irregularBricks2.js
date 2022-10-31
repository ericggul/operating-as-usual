import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
const getRandom = (a, b) => Math.random() * (b - a) + a;
export default function Test() {
  const EDGE = 10;
  const INTERVAL = 3;
  const SIZE = 1;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        {new Array(100).fill(0).map((_, j) => (
          <group key={j} rotation={[getRandom(0, Math.PI), getRandom(0, Math.PI), getRandom(0, Math.PI)]}>
            {new Array(30).fill(0).map((_, i) => (
              <mesh key={i} position={[0, Math.sqrt(2) * i, 0]}>
                <boxGeometry attach="geometry" args={[Math.sqrt(i), Math.sqrt(i), Math.sqrt(i)]} />
                <meshStandardMaterial attach="material" color={`hsl(${getRandom(0, 100)}, 100%, 80%)`} />
              </mesh>
            ))}
          </group>
        ))}

        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
