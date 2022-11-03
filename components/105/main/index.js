import React, { useMemo, useState, useEffect, useRef } from "react";

import dynamic from "next/dynamic";

//three
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Effects as EffectsComposer } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";

//foundations
import ModelAndLights from "foundations/105/main/ModelAndLights";
import CaptchaModal from "foundations/105/main/CaptchaModal";
import CalculationModal from "foundations/105/main/CalculationModal";
import VoiceModal from "foundations/105/main/VoiceModal";

import ProgressBar from "foundations/105/main/ProgressBar";
import Congratulations from "foundations/105/main/Congratulations";

//loplat
import { LineLoading, toast, Toast } from "loplat-ui";

const FaceModal = dynamic(() => import("foundations/105/main/FaceModal"), { ssr: false });

//styles
import * as S from "./styles";

export default function MainComponent({ order, id, handleFinish }) {
  // const [transitionState, setTransitionState] = useState(false);
  const [transitionState, setTransitionState] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const [activateCaptcha, setActivateCaptcha] = useState(false);
  const [activateCalculation, setActivateCalculation] = useState(false);
  const [activateVoice, setActivateVoice] = useState(false);
  const [faceModalLoading, setFaceModalLoading] = useState(false);
  const [activateFace, setActivateFace] = useState(false);
  const [activateTounge, setActivateTounge] = useState(false);

  function handleClick() {
    setActivateCaptcha(true);
  }

  //guidance when user does not do anything
  useEffect(() => {
    if (transitionState === false && !activateCaptcha) {
      const timeout = setTimeout(() => {
        toast.info("What are you waiting for? Click on the geometry.");
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [transitionState, activateCaptcha]);

  const [activateDashboard, setActivateDashboard] = useState(false);

  useEffect(() => {
    if (transitionState === 5) {
      handleFinish();
      toast.success("Congratulations!");

      const timeout2 = setTimeout(() => {
        toast.info(`Now checkout the archive to view your progress!`);
        setActivateDashboard(true);
      }, 3000);

      return () => {
        clearTimeout(timeout2);
      };
    }
  }, [transitionState]);

  return (
    <S.Container>
      <S.Background />
      <S.CanvasContainer>
        <Canvas onClick={handleClick} shadows dpr={[1, 2]} gl={{ alpha: false, antialias: false }} camera={{ fov: 80, position: [10, 8, 10], near: 1, far: 5000 }}>
          <ModelAndLights order={order} transitionState={transitionState} />
          <Effect />
        </Canvas>
      </S.CanvasContainer>

      {activateCaptcha && (
        <CaptchaModal
          closeModal={() => {
            setActivateCaptcha(false);
            if (transitionState === false) {
              setTransitionState(1);
            } else if (transitionState === 1) {
              setActivateCalculation(true);
            } else if (transitionState === 2) {
              setActivateVoice(true);
            } else if (transitionState === 3) {
              setActivateFace(true);
              setActivateTounge(false);
            } else if (transitionState === 4) {
              setActivateFace(true);
              setActivateTounge(true);
            }
          }}
        />
      )}
      {activateCalculation && (
        <CalculationModal
          transitionState={transitionState}
          closeModal={() => {
            setActivateCalculation(false);
            setTransitionState(2);
            // if (transitionState === 1) {
            //   setTransitionState(2);
            // } else {
            //   setActivateVoice(true);
            // }
          }}
        />
      )}
      {activateVoice && (
        <VoiceModal
          transitionState={transitionState}
          closeModal={() => {
            setActivateVoice(false);
            setTransitionState(3);
          }}
        />
      )}
      {activateFace && (
        <FaceModal
          onAppear={() => setFaceModalLoading(false)}
          activateTounge={activateTounge}
          closeModal={() => {
            setActivateFace(false);
            setActivateTounge(false);
            const timeout = setTimeout(() => {
              setTransitionState((st) => st + 1);
              clearTimeout(timeout);
            }, 100);
          }}
        />
      )}

      <Congratulations activateCongratulations={transitionState >= 5} activateDashboard={activateDashboard} order={order} />
      {faceModalLoading && (
        <S.Loading>
          <LineLoading color="#fc3ff2" />
        </S.Loading>
      )}
      {transitionState > 0 && <ProgressBar progress={transitionState} />}
      <Toast duration={5500} />
    </S.Container>
  );
}

extend({ UnrealBloomPass });

export function Effect() {
  const { size, scene, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size]);

  return (
    <EffectsComposer multisamping={8} renderIndex={1} disableGamma disableRenderPass>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.5, 0.5, 0]} />
    </EffectsComposer>
  );
}
