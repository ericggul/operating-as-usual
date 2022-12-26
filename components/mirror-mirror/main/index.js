import * as S from "./styles";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import useTTSFilter from "utils/hooks/useTTSFilter";

export default function Component() {
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [translateSpeech, setTranslateSpeech] = useState(false);
  const [listenActivated, setListenActivated] = useState(true);

  useEffect(() => {
    SpeechRecognition.startListening({ language: "en-GB", continuous: true });
  }, []);

  useEffect(() => {
    if (listenActivated) {
      setDisplayedTranscript(transcript);
    }
  }, [transcript, listenActivated]);

  useEffect(() => {
    if (listenActivated) {
      resetTranscript();
    }
  }, [listenActivated]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTranslateSpeech(true);
      resetTranscript();
    }, 3 * 1000);
    return () => clearTimeout(timeout);
  }, [displayedTranscript]);

  useTTSFilter(displayedTranscript, translateSpeech, setTranslateSpeech, setListenActivated);

  return <S.Container>{listenActivated && displayedTranscript}</S.Container>;
}
