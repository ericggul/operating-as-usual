import * as S from "./styles";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import useTTSFilter from "utils/hooks/useTTSFilter";

export default function Component() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  //diplayed Transcript: Displayed Transcript on UI, synced with transcript only when 'listenActivated'
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  //state triggering to translate the speech to text
  const [translateSpeech, setTranslateSpeech] = useState(false);
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

  //translate if displayedtranscript is not altered
  useEffect(() => {
    if (displayedTranscript) {
      const timeout = setTimeout(() => {
        setTranslateSpeech(true);
        resetTranscript();
      }, 1.5 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayedTranscript]);

  useTTSFilter(displayedTranscript, translateSpeech, setTranslateSpeech, setListenActivated);
  return <S.Container>{listenActivated && displayedTranscript}</S.Container>;
}
