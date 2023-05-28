import * as S from "./styles";

//hooks
import { useEffect, useState, useMemo, useRef } from "react";
import { toast, Toast } from "loplat-ui";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const COMMANDS = [`Click on the Rec Button`, `Speak 'I'm not a human'`];

export default function VoiceModal({ transitionState, closeModal }) {
  const [uiState, setUiState] = useState(0);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const timeoutRef = useRef(null);

  const [succeed, setSucceed] = useState(false);

  useEffect(() => {
    if (uiState === 1 && !succeed) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          handleRetry();
        }, 3000);
      } else {
        timeoutRef.current = setTimeout(() => {
          handleRetry();
        }, 3000);
      }
      return () => clearTimeout(timeoutRef.current);
    }
  }, [uiState, succeed, transcript]);

  useEffect(() => {
    const includes = ["human", "not"].every((word) => transcript.includes(word));
    if (includes) {
      setSucceed(true);
    }
  }, [transcript]);

  useEffect(() => {
    if (succeed) {
      handleSucceed();
    }
  }, [succeed]);

  function handleSucceed() {
    SpeechRecognition.stopListening();
    if (transitionState === 2) {
      toast.success("Verified your humanity!!");
    } else {
      toast.success("Voice confirmed. Please wait for an additional verification.");
    }

    const timeout = setTimeout(() => {
      closeModal();
    }, 1000);
    return () => clearTimeout(timeout);
  }

  function handleRetry() {
    setUiState(0);
    SpeechRecognition.stopListening();
    toast.danger("Try Again");
    if (transcript) {
      toast.warning(`You said "${transcript}"`);
    } else {
      toast.warning(`You hadn't said anything!`);
    }
  }

  function handleRecordingButtonClick() {
    setUiState((st) => 1 - st);
  }

  useEffect(() => {
    if (uiState === 1) {
      toast.info(`Speak "I'm not a human"`);
      SpeechRecognition.startListening({ language: "en-GB" });
    }
  }, [uiState]);

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <S.Inner>
        <S.Verify>
          Verify Your Humanity
          {/* <S.Eye>Verify Your</S.Eye>
          <S.Eye>Humanity</S.Eye> */}
        </S.Verify>
        <S.Command>{COMMANDS[uiState]}</S.Command>
        <S.RecordingButton onClick={handleRecordingButtonClick} progress={uiState === 1}>
          REC
        </S.RecordingButton>
      </S.Inner>
      <Toast />
    </S.Container>
  );
}
