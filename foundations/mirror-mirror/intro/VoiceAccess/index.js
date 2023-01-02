import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";

import CheckMark from "foundations/mirror-mirror/intro/CheckMark";

import { MdSettingsVoice } from "react-icons/md";
import { toast, Toast, LineLoading } from "loplat-ui";

export default function Intro({ handleGranted }) {
  const [granted, setGranted] = useState(false);
  const [checkMark, setCheckMark] = useState(false);

  async function handleVoiceAccess() {
    if ("speechSynthesis" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setCheckMark(true);
        setTimeout(() => {
          setGranted(true);
          handleGranted();
        }, 1000);
      } catch (e) {
        toast.danger("It seems like your browser is blocking us to use microphone. Please allow the browser's microphone access to continue.");
      }
    } else {
      toast.danger("Your device has no microphone.");
      location.href = "https://internetinental.herokuapp.com/mirror-mirror";
    }
  }

  return (
    <S.Container isHiding={granted}>
      <S.Text>Please grant the voice access by clicking on the button.</S.Text>

      <S.Buttons>
        <S.Button onClick={handleVoiceAccess} granted={checkMark}>
          <S.Icon granted={checkMark}>
            <MdSettingsVoice />
          </S.Icon>
          <S.ButtonText>Voice Access</S.ButtonText>
        </S.Button>
      </S.Buttons>
      <Toast duration={7000} />

      {checkMark && <CheckMark />}
    </S.Container>
  );
}
