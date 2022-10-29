import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export default function Test() {
  const VERTICAL_NUMBERS = 11;
  const HORIZONTAL_NUMBERS = 51;
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          {new Array(VERTICAL_NUMBERS).fill(0).map((_, height) =>
            new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => (
              <mesh position={[i - (HORIZONTAL_NUMBERS - 1) / 2, 0, normalDistribution((i - (HORIZONTAL_NUMBERS - 1) / 2) / 10) * 5 * (height - (VERTICAL_NUMBERS - 1) / 2)]} key={i}>
                <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
              </mesh>
            ))
          )}
        </group>
        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
