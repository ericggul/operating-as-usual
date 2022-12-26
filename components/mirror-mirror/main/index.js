import * as S from "./styles";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import useTTSFilter from "utils/hooks/useTTSFilter";

export default function Component() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [translateSpeech, setTranslateSpeech] = useState(false);
  const [listenToVoice, setListenToVoice] = useState(true);

  useEffect(() => {
    if (listenToVoice) {
      SpeechRecognition.startListening({ language: "en-GB", continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listenToVoice]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTranslateSpeech(true);
      resetTranscript();
    }, 3 * 1000);
    return () => clearTimeout(timeout);
  }, [transcript]);

  useTTSFilter(transcript, translateSpeech, setTranslateSpeech, setListenToVoice);

  return <S.Container>{transcript}</S.Container>;
}
