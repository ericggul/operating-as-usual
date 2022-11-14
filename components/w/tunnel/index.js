import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, Stars, MeshReflectorMaterial } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { useState, useEffect, useRef } from "react";

//foundations
import BaseCharacter from "foundations/w/tunnel/baseCharacter";
import Mirror from "foundations/w/tunnel/mirror";
import TubeSet from "foundations/w/tunnel/tubeset";
import CreditText from "foundations/w/tunnel/creditText";
const TEXT_CONFIGS = [
  { size: 300, yPos: 210, text: "W" },
  { size: 300, yPos: 255, text: "JYC" },
  { size: 180, yPos: 300, text: "Fin" },
];

export default function TunnelComponent() {
  const [curve, setCurve] = useState(null);
  useEffect(() => {
    createCurve();
  }, []);

  function createCurve() {
    let points = [];
    for (let i = 0; i < 100; i++) {
      points.push(new THREE.Vector3(0, 0, -4 * i));
    }
    setCurve(new THREE.CatmullRomCurve3(points));
  }

  //when character is about to go up,
  const [firstLayer, setFirstLayer] = useState(false);
  const [secondLayer, setSecondLayer] = useState(false);
  const [thirdLayer, setThirdLayer] = useState(false);

  function characterUpPrepare() {
    setFirstLayer(true);
    const timeoutA = setTimeout(() => {
      setSecondLayer(true);
    }, 12000);
    const timeoutB = setTimeout(() => {
      setThirdLayer(true);
    }, 28000);
    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }

  //when character is going up play zarathustra music
  const [musicPlayed, setMusicPlayed] = useState(false);
  const zarathustraAudioRef = useRef();
  function characterUp() {
    if (zarathustraAudioRef && zarathustraAudioRef.current && !musicPlayed) {
      setMusicPlayed(true);
      zarathustraAudioRef.current.play();
    }
  }

  //based on time after music played, set additional animations
  const [textState, setTextState] = useState(-1);
  const [fadeOut, setFadeOut] = useState(false);
  const [backgroundPlay, setBackgroundPlay] = useState(true);

  useEffect(() => {
    if (musicPlayed) {
      const timeoutZero = setTimeout(() => {
        setBackgroundPlay(false);
      }, 1300);
      const timeoutA = setTimeout(() => {
        setTextState(0);
      }, 44.1 * 1000);
      const timeoutB = setTimeout(() => {
        setTextState(1);
      }, 52.2 * 1000);
      const timeoutC = setTimeout(() => {
        setTextState(2);
      }, 61.5 * 1000);

      const timeoutD = setTimeout(() => {
        setFadeOut(true);
      }, 71 * 1000);

      return () => {
        clearTimeout(timeoutZero);
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
        clearTimeout(timeoutC);
        clearTimeout(timeoutD);
      };
    }
  }, [musicPlayed]);

  return (
    <S.Container>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false }}
        camera={{
          fov: 50,
          near: 2,
          far: 2000,
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.03} />
        <spotLight position={[0, 100, -200]} intensity={1.8} penumbra={1} color="hsl(200, 100%, 50%)" />
        <spotLight position={[0, -15, 300]} intensity={4} penumbra={1} color="hsl(350, 100%, 50%)" />

        <Physics gravity={[0, -10, 0]}>
          {new Array(70).fill(0).map((_, i) => (
            <TubeSet curve={curve} position={[10 * (i - 35), 0, 0]} key={i} containsAudio={i === 35} playAudio={backgroundPlay} />
          ))}
          {secondLayer && new Array(70).fill(0).map((_, i) => <TubeSet curve={curve} position={[10 * (i - 35), 0, -200]} key={i} containsAudio={false} />)}
          {thirdLayer && new Array(70).fill(0).map((_, i) => <TubeSet curve={curve} position={[10 * (i - 35), 0, -400]} key={i} containsAudio={false} />)}
          <BaseCharacter controls characterUpPrepare={characterUpPrepare} characterUp={characterUp} />
        </Physics>
        {/* <PointerLockControls /> */}
        {/* <OrbitControls /> */}

        {firstLayer && <Mirror position={[0, 25, -200]} rotation={[0, 0, 0]} size={[700, 50]} />}
        {firstLayer && <Mirror position={[0, 50, -400]} rotation={[0, 0, 0]} size={[700, 100]} />}
        {firstLayer && <Mirror position={[0, 400, -600]} rotation={[0, 0, 0]} size={[700, 800]} />}
        {textState >= 0 && <CreditText {...TEXT_CONFIGS[textState]} />}
      </Canvas>
      <audio id="audio" src={"/assets/sound/Zarathustra.mp3"} ref={zarathustraAudioRef} />
      {fadeOut && <S.FadeOut />}
    </S.Container>
  );
}
