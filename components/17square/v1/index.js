import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import useRandomInterval from "utils/hooks/useRandomInterval";

import * as Tone from "tone";

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

  useEffect(() => {
    if (second === 0) {
      triggerSound();
    }
    setI(second);
  }, [second]);

  return (
    <S.Container>
      <S.BoxContainer>
        <S.BoxSector>
          {new Array(17).fill(0).map((_, i) => {
            return new Array(17).fill(0).map((_, j) => <S.Box key={17 * i + j} target={i >= 6 && i <= 9 && j >= 2 && j <= 5} activated={(i - 6) * 4 + (j - 2) < second + 1} />);
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
    </S.Container>
  );
}

function triggerSound() {
  const lowPass = new Tone.Filter({
    frequency: 16000,
  }).toDestination();

  // we can make our own hi hats with
  // the noise synth and a sharp filter envelope
  const openHiHat = new Tone.NoiseSynth({
    volume: -10,
    envelope: {
      attack: 0.01,
      decay: 0.3,
    },
  }).connect(lowPass);

  const openHiHatPart = new Tone.Part(
    (time) => {
      openHiHat.triggerAttack(time);
    },
    [{ "8n": 2 }, { "8n": 6 }, { "16n": 7 }]
  ).start(0);

  for (let i = 0; i < 10; i++) {
    const passTest = new Tone.Filter({
      frequency: getRandom(8000, 64000),
    }).toDestination();

    let hiHatTest = new Tone.NoiseSynth({
      volume: -getRandom(20, 3),
      envelope: {
        attack: getRandom(0.01, 0.03),
        decay: 0.12,
      },
    }).connect(passTest);

    const hatPart = new Tone.Part(
      (time) => {
        hiHatTest.triggerAttack(time);
      },
      [0, { "16n": 1 }, { "16n": 2 }, { "16n": 5 }, { "16n": 7 }, { "8n": 8 }]
    ).start(Math.floor(getRandom(0, 8)) / 8);
  }

  // KICK
  // const kickEnvelope = new Tone.AmplitudeEnvelope({
  //   attack: 0.01,
  //   decay: 0.2,
  //   sustain: 0,
  // }).toDestination();

  // const kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

  // const kickSnapEnv = new Tone.FrequencyEnvelope({
  //   attack: 0.005,
  //   decay: 0.01,
  //   sustain: 0,
  //   baseFrequency: "A2",
  //   octaves: 2.7,
  // }).connect(kick.frequency);

  // const kickPart = new Tone.Part(
  //   (time) => {
  //     kickEnvelope.triggerAttack(time);
  //     kickSnapEnv.triggerAttack(time);
  //   },
  //   ["0", "0:0:3", "0:2:0", "0:3:1"]
  // ).start(0);

  // TRANSPORT
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = "1:0";
  Tone.Transport.loop = true;

  try {
    // filtering the hi-hats a bit
    // to make them sound nicer

    Tone.Transport.start();
  } catch (e) {
    console.log(e);
  }
}
