import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export default function Test() {
  const VERTICAL_NUMBERS = 21;
  const HORIZONTAL_NUMBERS = 51;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
            new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
              const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
              const y = j - (VERTICAL_NUMBERS - 1) / 2;

              const UNIT_SIZE = 0.75;
              const MID_RELATIVE_SIZE = 0.6;
              const SLOPE = 4;
              const scale = Math.min(Math.abs(MID_RELATIVE_SIZE - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE)) + 0.05, 1);

              return (
                <mesh position={[x, 0, normalDistribution(x / 10) * 2.5 * y]} scale={[scale, scale, scale]} key={i}>
                  <sphereGeometry attach="geometry" args={[UNIT_SIZE, 32, 32]} />
                  <meshStandardMaterial attach="material" color="rgb(0,0,0)" />
                </mesh>
              );
            })
          )}
        </group>
        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
