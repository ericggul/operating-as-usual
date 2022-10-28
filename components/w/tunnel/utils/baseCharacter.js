import { useSphere, Physics, usePlane } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { usePlayerControls } from "./helpers.js";
import * as THREE from "three";

const BaseCharacter = (props) => {
  const [planeRef] = usePlane((index) => ({ type: "Static", mass: 0, ...props }));

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
  const currentSpeed = useRef(20);
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, -3, -10]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.position.subscribe((p) => (position.current = p));
  }, []);

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed.current).applyEuler(camera.rotation);

    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 3, velocity.current[2]);

    if (currentSpeed.current > 1250) {
      api.velocity.set(0, 10, 0);
    }
    if (Math.abs(position.current[2]) > 165) {
      api.position.set(0, -3, -10);

      if (currentSpeed.current > 800) {
        currentSpeed.current = currentSpeed.current * 1.01;
      } else {
        currentSpeed.current = currentSpeed.current * 1.3;
      }
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]} ref={planeRef}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="hsl(350, 100%, 50%)" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default BaseCharacter;
