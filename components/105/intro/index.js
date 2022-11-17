import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Link from "next/link";

import { AiFillCamera } from "react-icons/ai";
import { MdSettingsVoice } from "react-icons/md";
import { toast, Toast, LineLoading } from "loplat-ui";

export default function Intro() {
  const [granted, setGranted] = useState([]);

  async function handleCameraAccess() {
    if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
        });
        setGranted((s) => [...s, "video"]);
      } catch (error) {
        console.log(error);
        toast.danger("It seems like your browser is blocking us to use camera. Please allow the browser's camera access to continue.");
      }
    } else {
      toast.danger("Your device has no camera.");
      location.href = "https://operating-as-usual.vercel.app/105";
    }
  }

  async function handleVoiceAccess() {
    if ("speechSynthesis" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setGranted((s) => [...s, "audio"]);
      } catch (e) {
        toast.danger("It seems like your browser is blocking us to use microphone. Please allow the browser's microphone access to continue.");
      }
    } else {
      toast.danger("Your device has no microphone.");
      location.href = "https://operating-as-usual.vercel.app/105";
    }
  }

  const [loading, setLoading] = useState(false);

  return (
    <S.Container>
      <S.Text>Before you enter the artwork, make sure your device has an access to the followings.</S.Text>

      <S.Buttons>
        <S.Button onClick={handleCameraAccess} granted={granted.includes("video")}>
          <S.Icon granted={granted.includes("video")}>
            <AiFillCamera />
          </S.Icon>
          <S.ButtonText>Camera Access</S.ButtonText>
        </S.Button>
        <S.Button onClick={handleVoiceAccess} granted={granted.includes("audio")}>
          <S.Icon granted={granted.includes("audio")}>
            <MdSettingsVoice />
          </S.Icon>
          <S.ButtonText>Voice Access</S.ButtonText>
        </S.Button>
      </S.Buttons>

      <Link href="/105/main">
        <S.Proceed check={granted.length >= 2} onClick={() => setLoading(true)}>
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
