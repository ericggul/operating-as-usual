import * as S from "./styles";
import { useEffect, useState, useRef, useMemo } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import useTTS from "utils/hooks/useTTS";
import * as Tone from "tone";

///three js
import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";

const TEXT = `That was 4 33 by John Cage, give an applause! Help yourself during this 16 seconds intermission, and we will be resuming shortly.`;

export default function Container() {
  const [wholeSecond, setWholeSecond] = useState(0);
  const [second, setSecond] = useState(-1);
  const [i, setI] = useState(0);

  useRandomInterval(() => setWholeSecond((s) => (s + 1) % 289), 998, 1002);

  const audioRef = useRef();

  const [speak, setSpeak] = useState(false);
  useTTS(TEXT, speak, setSpeak);

  useEffect(() => {
    if (wholeSecond >= 273) {
      setSecond(wholeSecond - 273);
    } else if (wholeSecond === 0) {
      setSecond(-1);
    }
  }, [wholeSecond]);

  useEffect(() => {
    if (second === 0) {
      if (audioRef && audioRef.current) {
        audioRef.current.playbackRate = 4;
        audioRef.current.play();
        handleSpeak();
      }
    }
    setI(second);
  }, [second]);

  const timeoutRef = useRef();
  function handleSpeak() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setSpeak(true);
    }, 4000);
  }

  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: false, antialias: false }} camera={{ fov: 75, position: [0, 0, 20], near: 1, far: 5000 }}>
        <ambientLight intensity={0.1} />

        <group>
          {new Array(16).fill(0).map((_, i) => i <= second && <SingleLight key={i} i={i} />)}
          {new Array(17).fill(0).map((_, i) => (
            <group key={-i}>
              {new Array(17).fill(0).map((_, j) => (
                <mesh
                  key={j * 100 + i}
                  position={[(i - 7.5) * 1.5, (j - 7.5) * 1.5, 0]}

                  // scale={i >= 6 && i <= 9 && j >= 6 && j <= 9 ? [1.5, 1.5, 1.5] : [1, 1, 1]}
                >
                  <boxGeometry args={[1.2, 1.2, 1.2]} />
                  <meshStandardMaterial color="white" metalness={0.99} roughness={0.01} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
        <MirrorBottom />
      </Canvas>

      <S.Calculation visible={second >= 0}>
        <p>4m 33s + {i + 1}s</p>
        <p>
          {Math.floor((i + 1 + 273) / 60)}m {(i + 1 + 273) % 60}s
        </p>

        <p>{i + 1 + 273}s</p>
        <p>
          {289}s - {16 - i - 1}s
        </p>
        <p>
          {289}s - {16}s + {i + 1}s
        </p>
        <p>
          17<sup>2</sup>s - 4<sup>2</sup>s + {i + 1}s
        </p>
      </S.Calculation>
      <audio id="audio" src={"/assets/sound/Applause.wav"} ref={audioRef} />
    </S.Container>
  );
}

function SingleLight({ i }) {
  return (
    <>
      <pointLight position={[((i % 4) - 1.5) * 1.5, (Math.floor(i / 4) - 1.5) * 1.5, -1.3]} color={`hsl(0, 100%, 100%)`} intensity={0.6} />
      <pointLight position={[((i % 4) - 1.5) * 2, (Math.floor(i / 4) - 1.5) * 2, 10]} color={`hsl(180, 100%, 100%)`} intensity={0.1} />
    </>
  );
}

function MirrorBottom() {
  return (
    <>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -2]}>
        <planeGeometry args={[128, 128]} />
        <MeshReflectorMaterial
          mixBlur={0}
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    </>
  );
}
