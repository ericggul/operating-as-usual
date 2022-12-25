import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import useTTS from "utils/hooks/useTTS";

import * as Tone from "tone";

const TEXT = `That was 4 33 by John Cage, give an applause! Help yourself during this 16 seconds intermission, and we will be resuming in two seconds.`;

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
    }, 5500);
  }

  function isTarget(i, j, cut = 16) {
    if (i === 10) {
      if (j >= 7 && j <= 13) return j - 7 < cut;
    }
    if (i === 11) {
      if (j >= 9 && j <= 13) return 7 + (j - 9) < cut;
    }
    if (i === 12) {
      if (j >= 11 && j <= 13) return 12 + (j - 11) < cut;
    }
    if (i === 13) {
      if (j === 13) return 15 < cut;
    } else {
      return false;
    }
  }

  return (
    <S.Container>
      <S.TriangleSector>
        {new Array(17).fill(0).map((_, i) => (
          <S.Row key={i}>
            {new Array(2 * i + 1).fill(0).map((_, j) => (
              <S.Triangle key={50 * i + j} up={j % 2 === 0} isTarget={isTarget(i, j)} activated={isTarget(i, j, second + 1)} />
            ))}
          </S.Row>
        ))}
      </S.TriangleSector>

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
