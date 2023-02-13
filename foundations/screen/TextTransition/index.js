import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

//usespring
import { useSpring } from "react-spring";

const getRandom = (min, max) => Math.random() * (max - min) + min;

export default function TextTransition({ fromText, toText, startTransition }) {
  const fromTextLength = useMemo(() => fromText.length, [fromText]);
  const toTextLength = useMemo(() => toText.length, [toText]);
  const maxLength = useMemo(() => Math.max(fromTextLength, toTextLength), [fromTextLength, toTextLength]);

  //use spring logic
  const [start, setStart] = useState(0);
  const [to, setTo] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (startTransition) {
      storedTextUrl.current = toText;
      setStart(0);
      setTo(1);
    } else {
      setProgress(0);
      setStart(0);
      setTo(0);
    }
  }, [startTransition, toText]);

  const storedTextUrl = useRef(toText);

  useSpring({
    from: { progress: start },
    to: { progress: to },
    config: { duration: 2500, tension: 170, friction: 26 },
    reset: storedTextUrl.current != toText,
    onChange: ({ value }) => {
      setProgress(value.progress);
    },
    onRest: () => {
      storedTextUrl.current = toText;
    },
  });
  return (
    <S.TextWrapper>
      {new Array(maxLength).fill(0).map((_, i) => (
        <SingleText key={i} from={fromText[i] || " "} to={toText[i] || " "} progress={progress} />
      ))}
    </S.TextWrapper>
  );
}

function SingleText({ from, to, progress }) {
  let randomA = useMemo(() => getRandom(0, 0.5), []);
  let randomB = useMemo(() => getRandom(0.5, 1), []);

  return <S.Text>{progress < randomA ? from : progress > randomB ? to : String.fromCharCode(Math.floor(from.charCodeAt(0) + (to.charCodeAt(0) - from.charCodeAt(0)) * 0.5))}</S.Text>;
}
