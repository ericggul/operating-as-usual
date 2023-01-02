import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Link from "next/link";

import VoiceAccess from "foundations/mirror-mirror/intro/VoiceAccess";
import Icons from "foundations/mirror-mirror/intro/Icons";

export default function Intro() {
  const [voiceGranted, setVoiceGranted] = useState(false);

  return (
    <S.Container>
      <VoiceAccess
        handleGranted={() => {
          setTimeout(() => {
            setVoiceGranted(true);
          }, 700);
        }}
      />
      <Icons voiceGranted={voiceGranted} />
    </S.Container>
  );
}
