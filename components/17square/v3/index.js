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
          <S.Row>
            {new Array(2 * i + 1).fill(0).map((_, j) => (
              <S.Triangle key={50 * i + j} up={j % 2 === 0} target={isTarget(i, j)} activated={isTarget(i, j, second + 1)} />
            ))}
          </S.Row>
        ))}
      </S.TriangleSector>

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
