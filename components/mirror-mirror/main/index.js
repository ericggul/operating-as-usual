import * as S from "./styles";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import useTTS from "utils/hooks/useTTS";

export default function Component() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ language: "en-GB", continuous: true });
  }, []);

  const [translateSpeech, setTranslateSpeech] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTranslateSpeech(true);
      resetTranscript();
    }, 3 * 1000);
    return () => clearTimeout(timeout);
  }, [transcript]);

  useTTS(transcript, translateSpeech, setTranslateSpeech);

  return <S.Container>{transcript}</S.Container>;
}
