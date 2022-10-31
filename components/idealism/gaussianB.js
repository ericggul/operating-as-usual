import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const normalDistribution = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export default function Test() {
  const VERTICAL_NUMBERS = 21;
  const HORIZONTAL_NUMBERS = 51;

  const UNIT_SIZE = 0.9;
  const SLOPE = 1.4;
  const VERTICAL_INTERVAL = 3.3;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={1} />

        <group>
          <group>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>

          <group rotation={[0, Math.PI / 2, 0]}>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>
        </group>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>

          <group rotation={[0, Math.PI / 2, 0]}>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>
        </group>
        <group rotation={[0, 0, Math.PI / 2]}>
          <group>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>

          <group rotation={[0, Math.PI / 2, 0]}>
            {new Array(VERTICAL_NUMBERS).fill(0).map((_, j) =>
              new Array(HORIZONTAL_NUMBERS).fill(0).map((_, i) => {
                const x = i - (HORIZONTAL_NUMBERS - 1) / 2;
                const y = j - (VERTICAL_NUMBERS - 1) / 2;

                const scale = 1 - Math.abs(y) / ((VERTICAL_NUMBERS + 1) / SLOPE);

                return (
                  <mesh position={[x, 0, normalDistribution(x / 10) * VERTICAL_INTERVAL * y]} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]} key={i}>
                    <boxGeometry attach="geometry" args={[UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]} />
                    <meshStandardMaterial attach="material" color={`hsl(${(x * 7 + y * 5 + 180) % 360}, 100%, 70%)`} />
                  </mesh>
                );
              })
            )}
          </group>
        </group>

        <OrbitControls />
        {/* <DownloadThreeScene /> */}
      </Canvas>
    </div>
  );
}
