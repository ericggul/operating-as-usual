import useResize from "utils/hooks/useResize";
import { useEffect, useState, useRef } from "react";

//react-gl imports
import { Surface } from "gl-react-dom";
import GLTransition from "./GLTransitionGL";

//glsls
import { glTransitions } from "./glsls";

//usespring
import { useSpring } from "react-spring";

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export default function App({ startTransition, fromImgUrl, toImgUrl }) {
  const [windowWidth, windowHeight] = useResize();

  const [start, setStart] = useState(0);
  const [to, setTo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glTransitionsIdx, setGLTransitionsIdx] = useState(0);
  const storedImgUrl = useRef(toImgUrl);

  useEffect(() => {
    if (startTransition) {
      setGLTransitionsIdx(getRandomInt(8));
      storedImgUrl.current = toImgUrl;
      setStart(0);
      setTo(1);
    } else {
      setStart(0);
      setTo(0);
    }
  }, [startTransition, toImgUrl]);

  useSpring({
    from: { progress: start },
    to: { progress: to },
    config: { duration: 5000, tension: 170, friction: 26 },
    reset: storedImgUrl.current != toImgUrl,
    onChange: ({ value }) => {
      setProgress(value.progress);
    },
    onRest: () => {
      storedImgUrl.current = toImgUrl;
    },
  });

  return (
    <Surface width={windowHeight} height={windowHeight}>
      <GLTransition from={fromImgUrl} to={toImgUrl} transition={glTransitions[glTransitionsIdx]} progress={progress} />
    </Surface>
  );
}
