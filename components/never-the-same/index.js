import * as S from "./styles";

import { useMemo, useState, useEffect, useRef } from "react";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, CuboidCollider, CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { PointerLockControls, KeyboardControls, useKeyboardControls } from "@react-three/drei";

export default function NeverTheSame() {
  const map = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "w", "W"] },
      { name: "back", keys: ["ArrowDown", "s", "S"] },
      { name: "left", keys: ["ArrowLeft", "a", "A"] },
      { name: "right", keys: ["ArrowRight", "d", "D"] },
      { name: "jump", keys: ["Space"] },
    ],
    []
  );

  return (
    <S.Container>
      <KeyboardControls map={map}>
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Physics gravity={[0, -9.81, 0]}>
            <RigidBody type="fixed" colliders={false}>
              <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="green" />
              </mesh>
              <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
            </RigidBody>
            <RigidBody>
              <mesh position={[0, 100, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="red" />
              </mesh>
            </RigidBody>

            <Player />
          </Physics>

          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </S.Container>
  );
}

function Player() {
  const ref = useRef();
  const { camera } = useThree();
  const [sub, get] = useKeyboardControls();
  const rapier = useRapier();

  const SPEED = 5;
  const direction = new THREE.Vector3(0, 0, 0);
  const frontVector = new THREE.Vector3(0, 0, 0);
  const sideVector = new THREE.Vector3(0, 0, 0);
  const rotation = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    const { forward, back, left, right, jump } = get();
    const velocity = ref.current.linvel();
    camera.position.set(...ref.current.translation());

    // console.log(back, forward);

    frontVector.set(0, 0, back - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    console.log(frontVector, sideVector, direction, camera.rotation);

    const world = rapier.world.raw();
    if (jump) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  });

  return (
    <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  );
}

function Test({ lerp = THREE.MathUtils.lerp }) {
  const axe = useRef();
  const ref = useRef();
  const rapier = useRapier();
  const { camera } = useThree();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, back, left, right, jump } = get();
    const velocity = ref.current.linvel();
    // update camera
    camera.position.set(...ref.current.translation());
    // update axe
    axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1);
    axe.current.rotation.copy(camera.rotation);
    axe.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1));
    // movement
    frontVector.set(0, 0, back - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  });
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
}
