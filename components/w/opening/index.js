import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import * as Tone from "tone";

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CODES = ["C", "E", "G"];

export default function Pyramid({ opening }) {
  const synth = useMemo(() => new Tone.PolySynth().toDestination(), []);

  useEffect(() => {
    if (opening) {
      openingMelody();
    }
  }, [opening]);

  useEffect(() => {
    document.addEventListener("click", openingMelody);
    return () => document.removeEventListener("click", openingMelody);
  }, []);

  function openingMelody() {
    Tone.start();
    createHarmony(synth, ["C"], 0);
    createHarmony(synth, ["E"], 0.2);
    createHarmony(synth, ["G"], 0.4);
    createHarmony(synth, ["C"], 0.6, 1);

    createHarmony(synth, ["F"], 1.2);
    createHarmony(synth, ["A"], 1.4);
    createHarmony(synth, ["C"], 1.6, 1);
    createHarmony(synth, ["F"], 1.8, 1);

    createHarmony(synth, ["G"], 2.4);
    createHarmony(synth, ["B"], 2.6);
    createHarmony(synth, ["D"], 2.8, 1);
    createHarmony(synth, ["G"], 3.0, 1);
    createHarmony(synth, ["D"], 3.4, 1);

    createHarmony(synth, ["E"], 3.6, 1);
    createHarmony(synth, ["C"], 3.8, 1);
    createHarmony(synth, ["G"], 4.0);
    createHarmony(synth, ["C"], 4.2, -1);
  }

  return <S.Container opening={opening}>opening</S.Container>;
}

function playRandom(synth, i) {
  const now = Tone.now();
  synth.triggerAttackRelease(`${getRandomFromArray(CODES)}${getRandomInt(3, 7)}`, "16n", now + i * 0.1);
}

function createHarmony(synth, codes, time, octave = 0) {
  const now = Tone.now();

  let convertedCodes = [];

  for (let i = 0; i < 5; i++) {
    convertedCodes = [...convertedCodes, ...codes.map((code) => `${code}${i + 3 + octave}`)];
  }

  synth.triggerAttackRelease(convertedCodes, "8n", now + time);
}
