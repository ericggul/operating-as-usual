import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import * as Tone from "tone";

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CODES = ["C", "E", "G"];

export default function Opening({ opening }) {
  const synth = useMemo(() => new Tone.PolySynth().toDestination(), []);

  //please make sure to uncancel on non-developmode
  useEffect(() => {
    if (opening) {
      const timeout = setTimeout(() => {
        openingMelody();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [opening]);

  // useEffect(() => {
  //   document.addEventListener("click", openingMelody);
  //   return () => document.removeEventListener("click", openingMelody);
  // }, []);

  const [visualState, setVisualState] = useState(11);
  const [closingAnimation, setClosingAnimation] = useState(false);

  function openingMelody() {
    Tone.start();
    const now = Tone.now();
    const TEMP_CODES = ["B", "G", "F", "D"];
    synth.triggerAttack("C8", now);
    synth.triggerRelease("C8", now + 0.1);
    for (let i = 0; i <= 24; i++) {
      synth.triggerAttackRelease(`${TEMP_CODES[i % 4]}${8 - Math.ceil(i / 4)}`, "64n", now + i * (0.08 + (i * 0.06) / 40));
    }
  }

  return <S.Container opening={opening}></S.Container>;
}
