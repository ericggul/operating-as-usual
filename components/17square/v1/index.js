import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import useTTS from "utils/hooks/useTTS";

const TEXT = `That was 4 33 by John Cage, give an applause! Help yourself during this 16 seconds intermission, and we will be resuming shortly.`;

export default function Container() {
  const [wholeSecond, setWholeSecond] = useState(0);
  const [second, setSecond] = useState(-1);
  const [i, setI] = useState(0);

  useRandomInterval(() => setWholeSecond((s) => (s + 1) % 289), 998, 1002);

  const audioRef = useRef();
  const audioRef2 = useRef();

  const [speak, setSpeak] = useState(false);
  // useTTS(TEXT, speak, setSpeak);

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

  console.log(speak);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setSpeak(true);
    }, 4000);

    if (speak) {
      if (audioRef2 && audioRef2.current) {
        audioRef2.current.play();
      }
    }
  }, [speak]);

  return (
    <S.Container>
      <S.BoxContainer>
        <S.BoxSector>
          {new Array(17).fill(0).map((_, i) => {
            return new Array(17).fill(0).map((_, j) => <S.Box key={17 * i + j} targetNumber={i >= 6 && i <= 9 && j >= 2 && j <= 5} isActivated={(i - 6) * 4 + (j - 2) < second + 1} />);
          })}
        </S.BoxSector>
      </S.BoxContainer>

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
      <audio id="audio2" src={"/assets/sound/Narration.mp3"} ref={audioRef2} />
    </S.Container>
  );
}
