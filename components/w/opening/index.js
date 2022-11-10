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

  useEffect(() => {
    document.addEventListener("click", openingMelody);
    return () => document.removeEventListener("click", openingMelody);
  }, []);

  const [visualState, setVisualState] = useState(11);
  const [closingAnimation, setClosingAnimation] = useState(false);

  function openingMelody() {
    Tone.start();
    const now = Tone.now();
    const TEMP_CODES = ["B", "G", "F", "D", "B"];
    synth.triggerAttack("C8", now);
    synth.triggerRelease("C8", now + 0.1);
    for (let i = 0; i <= 32; i++) {
      synth.triggerAttackRelease(`${TEMP_CODES[i % 4]}${8 - Math.ceil(i / 4)}`, "64n", now + i * (0.08 + (i * 0.1) / 40));
    }

    // synth.triggerAttack(["B7"], now);
    // synth.triggerAttack(["G6"], now + 0.1);
    // synth.triggerAttack(["F6"], now + 0.2);
    // synth.triggerAttack(["D6"], now + 0.3);
    // synth.triggerAttack(["B6"], now + 0.4);
    // synth.triggerRelease(["B7", "G6", "F6", "D6", "B6"], now + 1.5);
    // const osc = new Tone.Oscillator().toDestination();

    // osc.frequency.value = "B7";
    // // ramp to "C2" over 2 seconds
    // osc.frequency.rampTo("C3", 1);
    // // start the oscillator for 2 seconds
    // osc.start().stop("+1.5");
  }

  return <S.Container opening={opening}></S.Container>;
}

function MessUp({ word, repeat = 80 }) {
  return (
    <>
      {new Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: getRandom(20, 80) + "vw",
            width: "25vw",
            textAlign: "center",
            fontSize: "2.3vw",
            color: "white",
            opacity: 1,
            transform: `translate(-50%, -50%) rotate(80deg)`,
          }}
        >
          {word}
        </div>
      ))}
    </>
  );
}

function playRandom(synth, i) {
  const now = Tone.now();
  synth.triggerAttackRelease(`${getRandomFromArray(CODES)}${getRandomInt(3, 7)}`, "16n", now + i * 0.1);
}

function createHarmony(synth, codes, time, octave = 0) {
  const now = Tone.now();

  let convertedCodes = [];

  for (let i = 0; i < 3; i++) {
    let randomIdx = getRandomInt(i * 2 + 2, i * 2 + 4);
    convertedCodes = [...convertedCodes, ...codes.map((code) => `${code}${randomIdx}`)];
  }

  synth.triggerAttackRelease(convertedCodes, "8n", now + time);
}
