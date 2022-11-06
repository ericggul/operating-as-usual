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

    //visual state
    setVisualState(1);
    const timeout1 = setTimeout(() => setVisualState(2), 600);
    const timeout2 = setTimeout(() => setVisualState(3), 1000);
    const timeout3 = setTimeout(() => setVisualState(4), 1200);
    const timeout4 = setTimeout(() => setVisualState(5), 1800);
    const timeout5 = setTimeout(() => setVisualState(6), 2200);
    const timeout6 = setTimeout(() => setVisualState(7), 2400);
    const timeout7 = setTimeout(() => setVisualState(8), 3000);
    const timeout8 = setTimeout(() => setVisualState(9), 3400);
    const timeout9 = setTimeout(() => setVisualState(10), 3600);
    const timeout10 = setTimeout(() => setVisualState(11), 4200);
    const timeout11 = setTimeout(() => setClosingAnimation(true), 4200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
      clearTimeout(timeout6);
      clearTimeout(timeout7);
      clearTimeout(timeout8);
      clearTimeout(timeout9);
      clearTimeout(timeout10);
      clearTimeout(timeout11);
    };
  }

  return (
    <S.Container opening={opening}>
      {(visualState === 1 || visualState === 2) && <p>W</p>}
      {visualState === 2 && <MessUp word="WWWW" />}
      {visualState === 3 && <p style={{ fontSize: "6vw" }}>by</p>}
      {(visualState === 4 || visualState === 5) && <p>JYC</p>}
      {visualState === 5 && <MessUp word="Jeanyoon Choi" />}
      {visualState === 6 && <p style={{ fontSize: "6vw" }}>Starring</p>}
      {(visualState === 7 || visualState === 8) && <p>You</p>}
      {visualState === 8 && <MessUp word="You and Me" />}
      {visualState === 9 && <p style={{ fontSize: "6vw" }}>With</p>}
      {(visualState === 10 || visualState === 11) && <p style={{ fontSize: "9vw" }}>Modern Society</p>}
      {visualState === 11 && <MessUp word="Modern Society" />}

      {closingAnimation && <S.Closing />}
    </S.Container>
  );
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

  for (let i = 0; i < 5; i++) {
    convertedCodes = [...convertedCodes, ...codes.map((code) => `${code}${i + 3 + octave}`)];
  }

  synth.triggerAttackRelease(convertedCodes, "8n", now + time);
}
