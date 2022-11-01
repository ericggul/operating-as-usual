import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky, CameraShake, Environment, Instances, Instance, OrbitControls } from "@react-three/drei";

const getRandom = (a, b) => Math.random() * (b - a) + a;

const Cloud = () => {
  const ref = useRef(null);

  const position = useMemo(
    () => ({
      x: getRandom(-100, 100),
      y: 0,
      z: getRandom(-50, 20),
    }),
    []
  );
  const rotation = useMemo(
    () => ({
      x: 0,
      y: 0,
      z: getRandom(0, 360),
    }),
    []
  );

  const positionSpeed = useMemo(
    () => ({
      x: getRandom(-10, 10),
      y: getRandom(-30, 30),
      z: getRandom(-5, 5),
    }),
    []
  );

  const elapsedTime = useMemo(() => getRandom(0, 100), []);

  const rotationSpeed = useMemo(
    () => ({
      z: getRandom(-0.08, 0.05),
    }),
    []
  );

  const opacity = useMemo(() => getRandom(0.5, 0.7), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref && ref.current) {
      ref.current.position.x = position.x + Math.sin(t + elapsedTime) * positionSpeed.x;
      ref.current.position.y = position.y + Math.cos(t * 0.5 + elapsedTime) * positionSpeed.y;
      ref.current.position.z = position.z;
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y = rotation.y;
      ref.current.rotation.z = rotation.z - rotationSpeed.z * t;
      ref.current.material.opacity = opacity;
    }
  });
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" transparent opacity={opacity} />
    </mesh>
  );
};

const Text = () => {
  extend({ TextGeometry });
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 30,
      height: 1,
      curveSegments: 10,
      // bevelEnabled: true,
    }),
    [font]
  );

  return (
    <mesh position={[-80, 0, 0]}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshStandardMaterial attach="material" color={"pink"} />
    </mesh>
  );
};

function Loading() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 60, position: [0, 0, 200], near: 1, far: 1000 }}>
        <ambientLight color={0x555555} />
        <directionalLight color={0xffeedd} position={[0, 0, 1]} />
        <pointLight color={"rgb(230, 0, 220)"} position={[200, 300, 100]} intensity={30} distance={500} decay={1.7} />
        <Suspense fallback={null}>
          <Environment preset="apartment" />
        </Suspense>

        {new Array(35).fill(0).map((_, i) => (
          <Cloud key={i} />
        ))}
        <Text />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
export default Loading;
