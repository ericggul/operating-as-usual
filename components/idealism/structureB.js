import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
const reverseNormalDistribution = (x) => Math.sqrt(1 / Math.pow(x, 3)) * Math.exp(-x / 2);

export default function Test() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          {new Array(15).fill(0).map((_, i) => {
            const scale = i;
            return (
              <mesh key={i} scale={[scale, scale, scale]} rotation={[(i * Math.PI) / 31, -(i * Math.PI) / 71, (i * Math.PI) / 11]}>
                <sphereGeometry attach="geometry" args={[2, 32, 32]} />
                <meshStandardMaterial attach="material" color={`hsl(${170 + i * 3},100%,50%)`} wireframe />
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
