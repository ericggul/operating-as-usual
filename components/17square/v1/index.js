import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import * as Tone from "tone";
import axios from "axios";

const getRandom = (min, max) => Math.random() * (max - min) + min;
const getRandomChord = () => {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const note = notes[Math.floor(Math.random() * notes.length)];
  const octave = Math.floor(Math.random() * 3) + 4;
  return `${note}${octave}`;
};

export default function Container() {
  const [second, setSecond] = useState(0);
  const [i, setI] = useState(0);

  useRandomInterval(() => setSecond((s) => (s + 1) % 15), 998, 1002);

  const SECONDS = 273;
  const audioRef = useRef();

  useEffect(() => {
    if (second === 0) {
      if (audioRef && audioRef.current) {
        audioRef.current.playbackRate = 7;
        audioRef.current.play();
      }
    }
    setI(second);
  }, [second]);

  return (
    <S.Container>
      <S.BoxContainer>
        <S.BoxSector>
          {new Array(17).fill(0).map((_, i) => {
            return new Array(17).fill(0).map((_, j) => <S.Box key={17 * i + j} targetNumber={i >= 6 && i <= 9 && j >= 2 && j <= 5} isActivated={(i - 6) * 4 + (j - 2) < second + 1} />);
          })}
        </S.BoxSector>
      </S.BoxContainer>

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
      <audio id="audio" src={"/assets/sound/Applause.wav"} ref={audioRef} />
    </S.Container>
  );
}
