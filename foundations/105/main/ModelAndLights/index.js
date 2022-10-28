import React, { useMemo, useState, useEffect, useRef } from "react";

//three
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";

//usespring
import { useSpring } from "@react-spring/three";
import * as easings from "d3-ease";

//size_utils
import { scaleArray, animationArray } from "./transformUtils";

const RAINBOW = [
  { r: 148, g: 0, b: 211 },
  { r: 75, g: 0, b: 130 },
  { r: 0, g: 0, b: 255 },
  { r: 0, g: 255, b: 0 },
  { r: 255, g: 255, b: 0 },
  { r: 255, g: 127, b: 0 },
  { r: 255, g: 0, b: 0 },
];

export default function ModelAndLights({ order, transitionState }) {
  const [lightColor, setLightColor] = useState(
    `rgb(${Math.floor((RAINBOW[(Math.ceil(order) * 3) % 7].r - RAINBOW[(Math.floor(order) * 3) % 7].r) * (order % 1) + RAINBOW[(Math.floor(order) * 3) % 7].r)},${Math.floor(
      (RAINBOW[(Math.ceil(order) * 3) % 7].g - RAINBOW[(Math.floor(order) * 3) % 7].g) * (order % 1) + RAINBOW[(Math.floor(order) * 3) % 7].g
    )},${Math.floor((RAINBOW[(Math.ceil(order) * 3) % 7].b - RAINBOW[(Math.floor(order) * 3) % 7].b) * (order % 1) + RAINBOW[(Math.floor(order) * 3) % 7].b)})`
  );
  const [materialColorState, setMaterialColorState] = useState(order % 3);

  const groupRef = useRef();
  const tetrahedronRef = useRef();
  const cubeRef = useRef();
  const octahedronRef = useRef();
  const dodecahedronRef = useRef();
  const icosahedronRef = useRef();

  const materialColorConverter = (state) => `rgb(${Math.floor(Math.max(Math.abs(1.5 - (state % 3)) - 0.5, 0) * 255)}, 
        ${Math.floor(Math.max(1 - Math.abs(1 - (state % 3)), 0) * 255)}, 
        ${Math.floor(Math.max(1 - Math.abs(2 - (state % 3)), 0) * 255)})`;

  const meshScaleA = useMemo(() => scaleArray[(0 + order * 2) % 5], [order]);
  const meshScaleB = useMemo(() => scaleArray[(1 + order * 2) % 5], [order]);
  const meshScaleC = useMemo(() => scaleArray[(2 + order * 2) % 5], [order]);
  const meshScaleD = useMemo(() => scaleArray[(3 + order * 2) % 5], [order]);
  const meshScaleE = useMemo(() => scaleArray[(4 + order * 2) % 5], [order]);

  const meshAnimationA = useMemo(() => animationArray[(0 + order * 2) % 5], [order]);
  const meshAnimationB = useMemo(() => animationArray[(1 + order * 2) % 5], [order]);
  const meshAnimationC = useMemo(() => animationArray[(2 + order * 2) % 5], [order]);
  const meshAnimationD = useMemo(() => animationArray[(3 + order * 2) % 5], [order]);
  const meshAnimationE = useMemo(() => animationArray[(4 + order * 2) % 5], [order]);

  useSpring({
    from: { state: order, time: 0 },
    to: { state: order + transitionState / 5, time: transitionState },
    config: { duration: 1500, easing: easings.easeLinear },
    onChange: (progress) => {
      const st = progress.value.state;
      const t = progress.value.time;
      setMaterialColorState(st % 3);
      setLightColor(
        `rgb(${Math.floor((RAINBOW[Math.ceil(st) % 7].r - RAINBOW[Math.floor(st) % 7].r) * (st % 1) + RAINBOW[Math.floor(st) % 7].r)},${Math.floor(
          (RAINBOW[Math.ceil(st) % 7].g - RAINBOW[Math.floor(st) % 7].g) * (st % 1) + RAINBOW[Math.floor(st) % 7].g
        )},${Math.floor((RAINBOW[Math.ceil(st) % 7].b - RAINBOW[Math.floor(st) % 7].b) * (st % 1) + RAINBOW[Math.floor(st) % 7].b)})`
      );

      ///
      const tetrahedronSize = meshScaleA(t);
      const cubeSize = meshScaleB(t);
      const octahedronSize = meshScaleC(t);
      const dodecahedronSize = meshScaleD(t);
      const icosahedronSize = meshScaleE(t);

      //tetrahedron
      if (tetrahedronSize) {
        tetrahedronRef.current.scale.x = tetrahedronSize;
        tetrahedronRef.current.scale.y = tetrahedronSize;
        tetrahedronRef.current.scale.z = tetrahedronSize;
      }

      //cube
      if (cubeSize) {
        cubeRef.current.scale.x = cubeSize;
        cubeRef.current.scale.y = cubeSize;
        cubeRef.current.scale.z = cubeSize;
      }

      //octahedron
      if (octahedronSize) {
        octahedronRef.current.scale.x = octahedronSize;
        octahedronRef.current.scale.y = octahedronSize;
        octahedronRef.current.scale.z = octahedronSize;
      }

      //dodecahedron
      if (dodecahedronSize) {
        dodecahedronRef.current.scale.x = dodecahedronSize;
        dodecahedronRef.current.scale.y = dodecahedronSize;
        dodecahedronRef.current.scale.z = dodecahedronSize;
      }

      //icosahedron
      if (icosahedronSize) {
        icosahedronRef.current.scale.x = icosahedronSize;
        icosahedronRef.current.scale.y = icosahedronSize;
        icosahedronRef.current.scale.z = icosahedronSize;
      }
    },
  });

  const nowRef = useRef(0);
  const pastRef = useRef(0);

  useFrame(
    ({ clock }) => {
      nowRef.current = clock.getElapsedTime();
      const delta = nowRef.current - pastRef.current;

      if (delta > 0.01) {
        if (transitionState === 2 || transitionState === 3 || transitionState === 4) {
          meshAnimationA(nowRef.current, delta, transitionState, tetrahedronRef.current);
          meshAnimationB(nowRef.current, delta, transitionState, cubeRef.current);
          meshAnimationC(nowRef.current, delta, transitionState, octahedronRef.current);
          meshAnimationD(nowRef.current, delta, transitionState, dodecahedronRef.current);
          meshAnimationE(nowRef.current, delta, transitionState, icosahedronRef.current);
        }

        pastRef.current = nowRef.current;
      }
    },
    [transitionState, meshAnimationA, meshAnimationB, meshAnimationC, meshAnimationD, meshAnimationE]
  );

  return (
    <group ref={groupRef}>
      <pointLight castShadow position={[17, 13, 10]} color={lightColor} intensity={3} />

      <mesh castShadow ref={tetrahedronRef}>
        <tetrahedronGeometry attach="geometry" args={[3, 0]} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh castShadow ref={cubeRef}>
        <boxGeometry attach="geometry" args={[3, 3, 3, 1, 1, 1]} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh castShadow ref={octahedronRef}>
        <octahedronGeometry attach="geometry" args={[3, 0]} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh castShadow ref={dodecahedronRef}>
        <dodecahedronGeometry attach="geometry" args={[2.7, 0]} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh castShadow ref={icosahedronRef}>
        <icosahedronGeometry attach="geometry" args={[2.5, 0]} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>

      <mesh position={[0, 0, -40]} receiveShadow>
        <planeGeometry attach="geometry" args={[80, 80]} />
        <meshStandardMaterial attach="material" color={materialColorConverter(materialColorState)} />
      </mesh>

      <mesh position={[0, -40, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[80, 80]} />
        <meshStandardMaterial attach="material" color={materialColorConverter(materialColorState + 1)} />
      </mesh>

      <mesh position={[-40, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[80, 80]} />
        <meshStandardMaterial attach="material" color={materialColorConverter(materialColorState + 2)} />
      </mesh>
    </group>
  );
}
