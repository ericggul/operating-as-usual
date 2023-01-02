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

  //reset transcript when listenActivated is turned on
  useEffect(() => {
    if (listenActivated) {
      resetTranscript();
    }
  }, [listenActivated]);

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
    const snd = new Audio("data:audio/wav;base64," + data);
    snd.play();
    setTriggerTranslate(false);
    snd.onended = () => {
      const timeout = setTimeout(() => {
        setListenActivated(true);
        setDisplayedTranscript("");
      }, 400);
      return () => clearTimeout(timeout);
    };
  }

  useTTSFilter(displayedTranscript, triggerTranslate, handleSpeechGenerated);
  return <S.Container>{displayedTranscript}</S.Container>;
}
