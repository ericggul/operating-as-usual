import { useSphere, Physics, usePlane } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import usePlayerControls from "./helpers.js";
import * as THREE from "three";

export default function BaseCharacter() {
  const [planeRef] = usePlane((index) => ({ type: "Static", mass: 0, rotation: [-Math.PI * 0.5, 0, 0], position: [0, -4, 0], args: [0.5] }));

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();

  const { camera } = useThree();

  const [ref, api] = useSphere((index) => ({
    mass: 1,
    type: "Dynamic",
    position: [0, -3, -10],
  }));

  const { forward, backward, left, right, jump } = usePlayerControls();

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.position.subscribe((p) => (position.current = p));
  }, []);

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(forward) - Number(backward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed.current).applyEuler(camera.rotation);

    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]} ref={planeRef}>
      <planeGeometry args={[1000, 400]} />
      <meshStandardMaterial color="hsl(350, 100%, 50%)" transparent opacity={0.2} />
    </mesh>
  );
}
