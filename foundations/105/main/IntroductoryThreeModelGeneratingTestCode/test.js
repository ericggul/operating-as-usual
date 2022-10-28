import dynamic from "next/dynamic";

//exporter
import { useRef, useState, useEffect } from "react";
import DownloadThreeScene from "utils/hoc/downloadThreeScene";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";

const RAINBOW = ["rgb(148,0,211)", "rgb(75,0,130)", "rgb(0,0,255)", "rgb(0,255,0)", "rgb(255,255,0)", "rgb(255,127,0)", "rgb(255,0,0)"];

export default function Test() {
  const materialColorConverter = (state) => `rgb(${Math.floor(Math.max(Math.abs(1.5 - (state % 3)) - 0.5, 0) * 255)}, 
        ${Math.floor(Math.max(1 - Math.abs(1 - (state % 3)), 0) * 255)}, 
        ${Math.floor(Math.max(1 - Math.abs(2 - (state % 3)), 0) * 255)})`;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [100, 100, 100] }}>
        <ambientLight intensity={1} />

        {new Array(3).fill(0).map((_, colorState) =>
          new Array(5).fill(0).map((_, shapeState) =>
            new Array(7).fill(0).map((_, materialColorState) => (
              <group position={[(shapeState - 2) * 10, (colorState - 1) * 10, (materialColorState - 3) * 10]}>
                {shapeState === 0 && (
                  <mesh castShadow>
                    <tetrahedronGeometry attach="geometry" args={[3, 0]} />
                    <meshStandardMaterial attach="material" color={RAINBOW[materialColorState]} />
                  </mesh>
                )}
                {shapeState === 1 && (
                  <mesh castShadow>
                    <boxGeometry attach="geometry" args={[3, 3, 3]} />
                    <meshStandardMaterial attach="material" color={RAINBOW[materialColorState]} />
                  </mesh>
                )}
                {shapeState === 2 && (
                  <mesh castShadow>
                    <octahedronGeometry attach="geometry" args={[3, 0]} />
                    <meshStandardMaterial attach="material" color={RAINBOW[materialColorState]} />
                  </mesh>
                )}
                {shapeState === 3 && (
                  <mesh castShadow>
                    <dodecahedronGeometry attach="geometry" args={[2.7, 0]} />
                    <meshStandardMaterial attach="material" color={RAINBOW[materialColorState]} />
                  </mesh>
                )}
                {shapeState === 4 && (
                  <mesh castShadow>
                    <icosahedronGeometry attach="geometry" args={[2.5, 0]} />
                    <meshStandardMaterial attach="material" color={RAINBOW[materialColorState]} />
                  </mesh>
                )}

                <mesh position={[0, 0, -4]} receiveShadow>
                  <planeGeometry attach="geometry" args={[8, 8]} />
                  <meshStandardMaterial attach="material" color={materialColorConverter(colorState)} />
                </mesh>

                <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry attach="geometry" args={[8, 8]} />
                  <meshStandardMaterial attach="material" color={materialColorConverter(colorState + 1)} />
                </mesh>

                <mesh position={[-4, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                  <planeGeometry attach="geometry" args={[8, 8]} />
                  <meshStandardMaterial attach="material" color={materialColorConverter(colorState + 2)} />
                </mesh>
              </group>
            ))
          )
        )}

        <DownloadThreeScene />
      </Canvas>
    </div>
  );
}
