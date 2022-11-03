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
  const INTERVAL = 2;
  const SIZE = 1;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        {new Array(100).fill(0).map((_, i) => {
          const width = getRandom(5, 10);
          const height = getRandom(5, 10);
          return (
            <group key={i}>
              <mesh key={i} position={[5, i, 0.5]}>
                <boxGeometry attach="geometry" args={[10, 1, 1]} />
                <meshStandardMaterial attach="material" color={"black"} />
              </mesh>
              <mesh key={i} position={[width / 2, i, height / 2]}>
                <boxGeometry attach="geometry" args={[width, 1, height]} />
                <meshStandardMaterial attach="material" color={"black"} />
              </mesh>
              <mesh key={i} position={[0.5, i, 5]}>
                <boxGeometry attach="geometry" args={[1, 1, 10]} />
                <meshStandardMaterial attach="material" color={"black"} />
              </mesh>
            </group>
          );
        })}

        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
