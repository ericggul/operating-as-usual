import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
const reverseNormalDistribution = (x) => Math.sqrt(1 / Math.pow(x, 3)) * Math.exp(-x / 2);

const getRandom = (min, max) => Math.random() * (max - min) + min;
export default function Test() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          {new Array(200).fill(0).map((_, i) => {
            const angle = Math.PI / 240;
            const ratio = Math.sin(angle) + Math.cos(angle);
            const scale = Math.pow(ratio, i) * getRandom(0.9, 1.2);
            const MAX_SCALE = Math.pow(ratio, 14);
            return (
              <mesh key={i} scale={[1, scale, scale]} rotation={[i * angle * getRandom(1, 5), 0, 0]} position={[0, getRandom(-1, 1), getRandom(-1, 1)]}>
                <boxGeometry attach="geometry" args={[2, 2, 2, 1, 6, 6]} />
                <meshStandardMaterial attach="material" color={`hsl(${getRandom(80, 120)}, 100%, ${getRandom(50, 100)}%)`} wireframe />
              </mesh>
            );
          })}
        </group>
        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
