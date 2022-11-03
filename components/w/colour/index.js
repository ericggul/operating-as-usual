import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

const getRandom = (a, b) => Math.random() * (b - a) + a;

function Colour() {
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
    window.addEventListener("mousemove", onMouseClick);
    return () => window.removeEventListener("mousemove", onMouseClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyW") {
        setRandomnessState((s) => s + randomnessStep);
      }
    };
    const handleKeyUp = (e) => console.log(e.code);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [randomnessStep]);

  useEffect(() => {
    if (randomnessState >= 50) {
      setRandomnessState(0);
      setCycleState((s) => s + 1);
      if (cycleState < 15) {
        setRandomnessStep((s) => s * 1.22);
      } else {
        setRandomnessStep((s) => s * 1.025);
      }
    }
  }, [randomnessState, randomnessStep]);

  const router = useRouter();
  useEffect(() => {
    if (randomnessStep > 50) {
      router.push("/w/tunnel");
    }
  }, [randomnessStep]);

  return (
    <S.Container>
      {new Array(50).fill(0).map((_, i) => (
        <Inner i={i} key={i} elements={elements} randomnessState={randomnessState} />
      ))}
    </S.Container>
  );
}

const Inner = ({ i, elements, randomnessState }) => {
  const [windowWidth, windowHeight] = useResize();

  const widthRandomness = useMemo(() => {
    if (randomnessState < 35) {
      const min = 0.92;
      const max = 0.92 + (0.0001 + randomnessState * 0.000015) * randomnessState;
      return getRandom(min, max) ** i;
    } else {
      const min = Math.max(0.92 - 0.002 * Math.pow(randomnessState - 35, 2.2), -2);
      const max = Math.min(0.99, 0.92 + 0.0005 * (randomnessState + 6));
      return getRandom(min, max) ** i;
    }
  }, [i, elements, randomnessState]);
  const heightRandomness = useMemo(() => {
    // if (randomnessState < 100) {
    const min = 0.92;
    const max = 0.92 + (0.0001 + randomnessState * 0.00001) * randomnessState;
    return getRandom(min, max) ** i;
  }, [i, elements, randomnessState]);

  return (
    <S.Square
      style={{
        background: `rgb(${i ** 0.8 * 8 + 10},${randomnessState ** 1.2},${140 - i ** 2 * 0.3})`,
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
