import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Link from "next/link";

import { MdSettingsVoice } from "react-icons/md";
import { toast, Toast, LineLoading } from "loplat-ui";

export default function Intro() {
  const [granted, setGranted] = useState(false);

  async function handleVoiceAccess() {
    if ("speechSynthesis" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("21");
        setGranted(true);
      } catch (e) {
        toast.danger("It seems like your browser is blocking us to use microphone. Please allow the browser's microphone access to continue.");
      }
    } else {
      toast.danger("Your device has no microphone.");
      location.href = "https://operating-as-usual.vercel.app/105";
    }
  }

  console.log(granted);

  const [loading, setLoading] = useState(false);

  return (
    <S.Container>
      <S.Text>Before you enter the artwork, make sure your device has an access to the followings.</S.Text>

      <S.Buttons>
        <S.Button onClick={handleVoiceAccess} granted={granted}>
          <S.Icon granted={granted}>
            <MdSettingsVoice />
          </S.Icon>
          <S.ButtonText>Voice Access</S.ButtonText>
        </S.Button>
      </S.Buttons>

      <Link href="/mirror-mirror/main">
        <S.Proceed check={granted} onClick={() => setLoading(true)}>
          Proceed
        </S.Proceed>
      </Link>

      {loading && (
        <S.Top>
          <LineLoading color="white" />
        </S.Top>
      )}
      <Toast duration={7000} />
    </S.Container>
  );
}
