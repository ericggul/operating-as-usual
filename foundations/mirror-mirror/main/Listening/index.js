import * as S from "./styles";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import useTTSFilter from "utils/hooks/useTTSFilter";

export default function Component() {
  //use speech recognition operations
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  //diplayed Transcript: Displayed Transcript on UI, synced with transcript only when 'listenActivated'
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  //state triggering to translate the speech to text
  const [triggerTranslate, setTriggerTranslate] = useState(false);
  //turned off when speech is on
  const [listenActivated, setListenActivated] = useState(true);

  useEffect(() => {
    SpeechRecognition.startListening({ language: "en-GB", continuous: true });
  }, []);

  async function recordAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    const start = () => {
      mediaRecorder.start();
    };

    const stop = () => {
      return new Promise((resolve) => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => {
            audio.play();
          };
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });
    };

    return { start, stop };
  }

  //translate if triggerTranslate is true
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (triggerTranslate && audio) {
      setTriggerTranslate(false);
      // requestSTT(audio);
    }
  }, [triggerTranslate, audio]);

  //reset transcript when listenActivated is turned on
  useEffect(() => {
    if (listenActivated) {
      // startAudio();
      resetTranscript();
    }
  }, [listenActivated]);

  async function startAudio() {
    const audio = await recordAudio();
    console.log(audio, audio.start);
    await audio.start();
    setAudio(audio);
  }

  //sync displayed transcript with transcript
  useEffect(() => {
    if (listenActivated) {
      setDisplayedTranscript(transcript);
    }
  }, [transcript, listenActivated]);

  //translate if displayedtranscript is not altered for 1.5s
  useEffect(() => {
    if (displayedTranscript) {
      const timeout = setTimeout(() => {
        setListenActivated(false);
        setTriggerTranslate(true);
        resetTranscript();
      }, 1.5 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayedTranscript]);

  function handleSpeechGenerated(data) {
    setTriggerTranslate(false);

    //echo playing
    //audiocontext
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 10; i++) {
      (function (i) {
        const sound = new Audio("data:audio/wav;base64," + data);
        const source = audioCtx.createMediaElementSource(sound);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = (1 + i) ** -1.7;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        setTimeout(() => {
          sound.play();
        }, 300 * i);

        if (i === 9) {
          sound.onended = () => {
            setTimeout(() => {
              setListenActivated(true);
              setDisplayedTranscript("");
            }, 700);
          };
        }
      })(i);
    }
  }

  useTTSFilter(displayedTranscript, triggerTranslate, handleSpeechGenerated);

  return <S.Container>{displayedTranscript}</S.Container>;
}
