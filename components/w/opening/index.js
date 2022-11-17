import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import * as Tone from "tone";

export default function Opening({ opening, toClock }) {
  const synth = useMemo(() => new Tone.PolySynth().toDestination(), []);

  useEffect(() => {
    if (opening) {
      const T = 23 * (0.08 + (23 * 0.06) / 40);
      const timeoutA = setTimeout(() => {
        openingMelody();
      }, 200);
      const timeoutB = setTimeout(() => {
        clockTransition();
      }, T * 1000 + 200);
      return () => {
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
      };
    }
  }, [opening]);

  let intervalRef = useRef(null);
  function clockTransition() {
    intervalRef.current = setInterval(() => {
      const synth = new Tone.PolySynth().toDestination();
      const now = Tone.now();
      synth.triggerAttackRelease("B2", "64n", now + 0.05);
    }, 1000);

    const timeout = setTimeout(() => {
      toClock();
    }, 4900);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }

  useEffect(() => {
    return () => {
      if (intervalRef && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalRef]);

  function openingMelody() {
    Tone.start();
    const now = Tone.now();
    const TEMP_CODES = ["B", "G", "F", "D"];
    synth.triggerAttack("C8", now);
    synth.triggerRelease("C8", now + 0.1);
    for (let i = 0; i <= 24; i++) {
      const code = `${TEMP_CODES[i % 4]}${8 - Math.ceil(i / 4)}`;
      synth.triggerAttackRelease(code, "64n", now + i * (0.08 + (i * 0.06) / 40));
    }
  }

  return <S.Container opening={opening}></S.Container>;
}
