import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import * as Tone from "tone";

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
      <S.BoxSector>
        {new Array(17).fill(0).map((_, i) => {
          return new Array(17).fill(0).map((_, j) => <S.Box key={17 * i + j} target={i >= 6 && i <= 9 && j >= 6 && j <= 9} activated={(i - 6) * 4 + (j - 6) < second + 1} />);
        })}
      </S.BoxSector>

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
