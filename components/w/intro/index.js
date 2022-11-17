import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Link from "next/link";

import { AiFillCamera } from "react-icons/ai";
import { MdSettingsVoice } from "react-icons/md";
import { toast, Toast, LineLoading } from "loplat-ui";

export default function Intro() {
  const [loading, setLoading] = useState(false);

  return (
    <S.Container>
      <S.Header>Instructions</S.Header>
      <S.Text>
        <p>
          1. Please make sure you are using <b>Desktop</b>.
        </p>
        <p>
          2. Please continuously press <b>W</b> on your keyboard to view the artwork.
        </p>
        <p>3. Make sure your audio is on.</p>
      </S.Text>

      <Link href="/w/phase1">
        <S.Proceed onClick={() => setLoading(true)}>Proceed</S.Proceed>
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
