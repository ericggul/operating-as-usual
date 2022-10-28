import React, { useEffect, useRef, useMemo, useState, Suspense } from "react";
import * as S from "./styles";

//foundations
import Balls from "foundations/105/archive/balls";
import Mirrors from "foundations/105/archive/mirrors";
import Effect from "foundations/105/archive/effect";
import Line from "foundations/105/archive/line";
import Utils from "components/105/archive/utils";

//toast
import { toast, Toast } from "loplat-ui";

//three
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Effects as EffectsComposer, OrbitControls, Environment, Stars } from "@react-three/drei";

export default function Archive({ completedIdxs, order, isAdmin }) {
  return (
    <S.Container>
      <S.CanvasContainer>
        <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: false }} camera={{ fov: 75, position: !isAdmin ? [150, 150, 150] : [1000, 1000, 500], near: 1, far: 5000 }}>
          <group>
            <ambientLight intensity={0.4} />
            <directionalLight position={[-10, -20, -10]} intensity={1.5} color="#00ff6a" />
            <directionalLight position={[20, -30, 10]} intensity={1.5} color="#006aff" />
            <directionalLight position={[10, 20, -20]} intensity={1.5} color="#00ffff" />
            <directionalLight position={[-20, 30, 40]} intensity={1.7} color="#ff006a" />
          </group>
          <BallsAndLineGroup completedIdxs={completedIdxs} order={order} />
          <OrbitControls />
          <group>
            <Mirrors MIRROR_SIZE={110} MIRROR_DISTANCE={160} />
            <Mirrors MIRROR_SIZE={200} MIRROR_DISTANCE={220} />
            <Mirrors MIRROR_SIZE={400} MIRROR_DISTANCE={320} />
            <Mirrors MIRROR_SIZE={600} MIRROR_DISTANCE={420} />
            <Mirrors MIRROR_SIZE={1000} MIRROR_DISTANCE={620} />
          </group>

          {isAdmin && <CameraAnimation />}
          <Stars radius={100} depth={800} count={1000} factor={4} saturation={0} fade speed={1} />
          <Effect />
        </Canvas>
      </S.CanvasContainer>
      <Utils order={order} isAdmin={isAdmin} />
      <Toast duration={5000} />
    </S.Container>
  );
}

const TARGETS = [
  new THREE.Vector3(6, 100, -4),
  new THREE.Vector3(-1000, -570, 1000),
  new THREE.Vector3(300, 0, -300),
  new THREE.Vector3(0, 1000, 0),
  new THREE.Vector3(-340, -540, 400),
  new THREE.Vector3(400, 100, 0),
  new THREE.Vector3(-1500, 0, 0),
  new THREE.Vector3(0, 3000, 1000),
  new THREE.Vector3(6, -600, 1500),
  new THREE.Vector3(1000, 1000, 0),
  new THREE.Vector3(-500, -1000, -300),
  new THREE.Vector3(1500, -400, 300),
  new THREE.Vector3(0, -40, 1000),
  new THREE.Vector3(-1000, 400, 0),
  new THREE.Vector3(0, 0, 2000),
  new THREE.Vector3(1000, 1000, 500),
];
function CameraAnimation() {
  const [lerpTargetIdx, setLerpTargetIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLerpTargetIdx((idx) => (idx + 1) % TARGETS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
    state.camera.position.lerp(TARGETS[lerpTargetIdx], 0.01);
    return null;
  });
  return null;
}

function BallsAndLineGroup({ completedIdxs, order }) {
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 105; i++) {
      data.push({
        x: i % 7,
        y: i % 5,
        z: i % 3,
      });
    }
    return data;
  }, []);

  const ref = useRef(null);

  return (
    <group ref={ref}>
      <Balls particles={particles} completedIdxs={completedIdxs} order={order} />
      {completedIdxs.map((number, i) => (
        <Line key={i} i={number} j={(number + 1) % 105} highlight={order ? order === number : false} />
      ))}
    </group>
  );
}
