import * as S from "./styles";
import { useRef, useState } from "react";

export default function ProgressBar({ progress }) {
  return (
    <S.Container>
      <S.Bar>
        <S.InnerBar
          style={{
            width: `${progress * 20}%`,
          }}
        />
        <S.NumberLeft>{`${progress * 20}%`}</S.NumberLeft>
        <S.Number>{`${progress}/5`}</S.Number>
      </S.Bar>
    </S.Container>
  );
}
