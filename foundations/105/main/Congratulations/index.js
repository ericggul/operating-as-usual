import { useState, useEffect, useRef, useCallback } from "react";

import DashboardLinkModal from "foundations/105/main/DashboardLinkModal";

//final expression
import { toast, Toast } from "loplat-ui";
import ReactCanvasConfetti from "react-canvas-confetti";

import * as S from "./styles";

export default function Congratulations({ activateCongratulations, order }) {
  //conffetti
  const canvasStyles = {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  };

  function getAnimationSettings(angle, originX) {
    return {
      particleCount: 3,
      angle,
      spread: 55,
      origin: { x: originX },
      colors: ["#fc3ff2", "#ff6a00"],
    };
  }

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  useEffect(() => {
    if (activateCongratulations) {
      startAnimation();
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [intervalId, activateCongratulations]);

  return (
    <S.Container>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Toast duration={3000} />
    </S.Container>
  );
}
