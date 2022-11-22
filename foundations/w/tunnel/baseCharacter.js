import { useSphere, Physics, usePlane } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { usePlayerControls } from "./helpers.js";
import * as THREE from "three";

const BaseCharacter = ({ characterUpPrepare, characterUp }) => {
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

  const forward = usePlayerControls();

  //settings
  const currentSpeed = useRef(20);
  //testing
  // const currentSpeed = useRef(1000);
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, -3, -10]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.position.subscribe((p) => (position.current = p));
  }, []);

  //state checker to ensure that function won't be fired twice
  const [characterUpPrepareFired, setCharacterUpPrepareFired] = useState(false);
  const [characterUpFired, setCharacterUpFired] = useState(false);

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, -Number(forward));
    sideVector.set(0, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed.current).applyEuler(camera.rotation);

    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (currentSpeed.current > 1000 && !characterUpPrepareFired) {
      setCharacterUpPrepareFired(true);
      characterUpPrepare();
      currentSpeed.current = currentSpeed.current * 1.07;
    }

    if (currentSpeed.current > 1200 && !characterUpFired) {
      setCharacterUpFired(true);
      characterUp();
    }

    if (currentSpeed.current > 1250 && position.current[1] <= 30) {
      api.velocity.set(0, 15 - position.current[1] / 3, 0);
    } else if (position.current[1] > 30 && position.current[1] <= 300) {
      api.velocity.set(0, 5, 0);
    } else if (position.current[1] > 300) {
      api.velocity.set(0, 0, 0);
    }

    if (Math.abs(position.current[2]) > 165) {
      api.position.set(0, -3, -10);
      if (currentSpeed.current > 800) {
        currentSpeed.current = currentSpeed.current * 1.008;
      } else {
        currentSpeed.current = currentSpeed.current * 1.32;
      }
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]} ref={planeRef}>
        <planeGeometry args={[1000, 400]} />
        <meshStandardMaterial color="hsl(350, 100%, 50%)" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default BaseCharacter;
