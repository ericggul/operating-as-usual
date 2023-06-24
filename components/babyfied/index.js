import * as S from "./styles";
import { useRef, useEffect, useState, useMemo } from "react";
import * as Tone from "tone";
import { SampleLibrary } from "utils/hoc/tonejs-instruments";

const CODES = ["C", "D", "E", "F", "G", "A", "B"];
function codeConverter(state) {
  let floored = Math.floor(state);
  return `${CODES[floored % 7]}${Math.floor(floored / 7)}`;
}

export default function Component() {
  const delay = useMemo(
    () =>
      new Tone.FeedbackDelay({
        delayTime: "32n", // Adjust the delay time as needed
        feedback: 0.2, // Adjust the feedback amount as needed
      }).toDestination(),
    []
  );

  const reverb = useMemo(
    () =>
      new Tone.Reverb({
        decay: 5, // Adjust the decay time as needed
        wet: 0.8, // Adjust the wetness of the effect as needed
      })
        .toDestination()
        .connect(delay),
    [delay]
  );

  const recorder = useMemo(() => new Tone.Recorder(), [reverb]);

  const [instrumentReady, setInstrumentReady] = useState(null);

  useEffect(() => {
    //prepare tone js instruments
    let inst = SampleLibrary.load({
      instruments: ["piano"],
    });
    setInstrumentReady(inst);
  }, []);
  console.log(instrumentReady);

  const pianoSynth = useMemo(() => instrumentReady && instrumentReady.piano.connect(recorder).toDestination(), [recorder, instrumentReady]);
  const polySynth = useMemo(() => new Tone.PolySynth().connect(recorder).toDestination(), [recorder, reverb]);

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (recording) {
      recorder.start();

      console.log("17");
      Tone.start();
      Tone.Transport.start();
      Tone.Transport.bpm.value = 120;

      polySynth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    }
  }, [recording, polySynth]);

  async function stopRecording() {
    try {
      const recording = await recorder.stop();
      // download the recording by creating an anchor element and blob url
      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = url;
      anchor.click();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [pianoSynth]);
  const [text, setText] = useState("");

  function handleKeyDown(e) {
    let key = e.keyCode;
    //letter input: key to letter/code

    //key to melody converter
    let keyToConvert = Math.min(Math.abs(key - 50), 50);
    console.log(keyToConvert);
    let code = codeConverter(keyToConvert);

    //codeConverter

    Tone.start();
    if (pianoSynth) polySynth.triggerAttackRelease(code, "8n");
    setRecording(true);
    setText((t) => t + String.fromCharCode(key));
    // try {
    //   if (pianoSynth) polySynth.triggerAttackRelease(code, "4n");
    //   setRecording(true);
    //   setText((t) => t + String.fromCharCode(key));
    // } catch (e) {
    //   polySynth.triggerAttackRelease(code, "64n");
    // }
  }

  return (
    <S.Container onClick={stopRecording}>
      {recording ? "recording" : "not recording"}
      <br />
      Meaning… Meaning… How do we perceive the meaning of this sequence of melody? How will we know that this melody, which might be perceived to be a random signifier, does actually imply a signified
      - That this text itself is transitioned into the melody? Disorder emerges from Order. Disorder emerges from Order. So do Order emerges from Disorder. Meaningless emerges from Meaningful.
      Meaningless emerges from Meaningful. So do Meaningful emerges from Meaningless. What we might perceive as meaningful should be a meaningless sequence of numbers and codes to a Computer. What we
      might perceive as meaningful should be a meaningless sequence of numbers and codes to AI. When we think that ‘AI is thinking’ by looking at its generative result, we are in fact, implying that
      AI’s generative result will come as some sort of meaningful result on its own self - when in fact, it’s just the meaningless sequence of numbers, just like the melody you are hearing now. So
      next time when you confuse AI as a real intellectual being, or if you see anybody else thought so, play this recording at its maximum volume.
    </S.Container>
  );
}
