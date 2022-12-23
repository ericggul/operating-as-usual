import * as S from "./styles";
import { useEffect, useState, useRef, useMemo } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import * as Tone from "tone";

///three js
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { SpotLight, OrbitControls, Effects as EffectsComposer, MeshReflectorMaterial } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";

export default function Container() {
  const [second, setSecond] = useState(0);
  const [i, setI] = useState(0);

  useRandomInterval(() => setSecond((s) => (s + 1) % 15), 998, 1002);

  const SECONDS = 273;

  useEffect(() => {
    if (second === 0) {
      triggerSound();
    }
    setI(second);
  }, [second]);

  function triggerSound() {
    const synth = new Tone.PolySynth().toDestination();

    //intermission melody

    try {
      const now = Tone.now();
      synth.triggerAttackRelease("C4", "8n");
      synth.triggerAttackRelease("C4", "8n");
      synth.triggerAttackRelease("C4", "8n");
      synth.triggerAttackRelease("C4", "8n");
    } catch (e) {
      console.log(e);
    }
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

      <S.Calculation>
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
