import * as S from "./styles";
import { useRef, useState } from "react";

export default function ProgressBar({ progress }) {
  return (
    <S.Container>
      <S.Bar>
        <S.InnerBar
          style={{
            width: `${progress * 16 + 10}%`,
          }}
        />
        <S.NumberLeft>{progress ? `${progress * 20}%` : "0%"}</S.NumberLeft>
        <S.Number>{progress ? `${progress}/5` : "0/5"}</S.Number>
      </S.Bar>
    </S.Container>
  );
}
