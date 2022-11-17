import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo, useRef } from "react";
import { toast, Toast } from "loplat-ui";
import * as Tone from "tone";

const getRandom = (a, b) => Math.random() * (b - a) + a;

const CODES = ["C", "D", "E", "F", "G", "A", "B"];
function randomnessStepToCodeConverter(randomnessState) {
  let floored = Math.floor(randomnessState);
  return `${CODES[floored % 7]}${Math.floor(floored / 7)}`;
}

function Colour({ opening, setOpening }) {
  const [windowWidth, windowHeight] = useResize();
  const [elements, setElements] = useState({ x: windowWidth / 2, y: windowHeight / 2 });

  useEffect(() => {
    setElements({ x: windowWidth / 2, y: windowHeight / 2 });
  }, [windowWidth, windowHeight]);

  const [cycleState, setCycleState] = useState(0);
  const [randomnessStep, setRandomnessStep] = useState(1);
  const [randomnessState, setRandomnessState] = useState(0);

  const onMouseClick = (e) => {
    setElements({ x: (e.clientX - windowWidth / 2) * 0.1 + windowWidth / 2, y: (e.clientY - windowHeight / 2) * 0.1 + windowHeight / 2 });
    setElements({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!opening) {
      window.addEventListener("mousemove", onMouseClick);
      return () => window.removeEventListener("mousemove", onMouseClick);
    }
  }, [opening]);

  useEffect(() => {
    if (!opening) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [randomnessStep, opening]);

  //timer adjust
  const nowRef = useRef(Date.now());
  const thenRef = useRef(Date.now());

  const handleKeyDown = (e) => {
    nowRef.current = Date.now();
    if (nowRef.current - thenRef.current > 50 && !opening) {
      thenRef.current = nowRef.current;
      Tone.start();
      if (e.code === "KeyW") {
        setRandomnessState((s) => s + randomnessStep);
      }
    }
  };

  useEffect(() => {
    if (randomnessState >= 60 && !opening) {
      setRandomnessState(0);
      setCycleState((s) => s + 1);
      if (cycleState < 9) {
        setRandomnessStep((s) => s * 1.35);
      } else {
        setRandomnessStep((s) => s * 1.04);
      }
    }
  }, [randomnessState, randomnessStep, opening]);

  useEffect(() => {
    if (randomnessStep > 55) {
      setOpening(true);
    }
  }, [randomnessStep]);

  //if key isn't pressed
  useEffect(() => {
    if (randomnessState === 0 && cycleState === 0) {
      const timeout = setTimeout(() => {
        toast.info("Press W on your keyboard to start");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [randomnessState, cycleState]);

  return (
    <S.Container>
      {new Array(50).fill(0).map((_, i) => (
        <Inner i={i} key={i} elements={elements} randomnessState={opening ? 60 : randomnessState} opening={opening} />
      ))}
      <Toast duration={7000} />
    </S.Container>
  );
}

const Inner = ({ i, elements, randomnessState, opening }) => {
  const synth = useMemo(() => new Tone.PolySynth().toDestination(), []);

  useEffect(() => {
    if (i === 0 && !opening) {
      try {
        const now = Tone.now();
        synth.triggerAttackRelease(randomnessStepToCodeConverter(randomnessState), "32n", now);
      } catch (e) {
        console.log(e);
      }
    }
  }, [i, randomnessState, opening]);

  const [windowWidth, windowHeight] = useResize();

  const heightRandomness = useMemo(() => {
    if (randomnessState < 35) {
      const min = 0.92;
      const max = 0.92 + (0.0001 + randomnessState * 0.000015) * randomnessState;
      return getRandom(min, max) ** i;
    } else {
      const min = Math.max(0.92 - 0.002 * Math.pow(randomnessState - 35, 2), -2);
      const max = Math.min(0.99, 0.92 + 0.0005 * (randomnessState + 6));
      return getRandom(min, max) ** i;
    }
  }, [i, elements, randomnessState]);
  const widthRandomness = useMemo(() => {
    const min = 0.92;
    const max = 0.92 + (0.0001 + randomnessState * 0.00001) * randomnessState;
    return getRandom(min, max) ** i;
  }, [i, elements, randomnessState]);

  return (
    <S.Square
      i={i}
      style={{
        background: `rgb(${i ** 0.8 * 10 + 10},${randomnessState ** 1.2},${40 - i ** 2 * 0.3 + randomnessState ** 1.2 * 0.4})`,
        top: `${elements.y}px`,
        left: `${elements.x}px`,
        height: `${heightRandomness * windowHeight}px`,
        width: `${widthRandomness * windowHeight}px`,
        transform: `translate(-${(elements.x / windowWidth) * 100}%, -${(elements.y / windowHeight) * 100}%)`,
      }}
    />
  );
};

export default Colour;
