import * as S from "./styles";
import { useRef, useState } from "react";

function progressConverter(progress) {
  if (progress === 1) return 30;
  if (progress === 2) return 45;
  if (progress === 3) return 60;
  if (progress === 4) return 75;
  if (progress === 5) return 100;
  else return 0;
}

export default function ProgressBar({ progress }) {
  return (
    <S.Container>
      <S.Bar>
        <S.InnerBar
          style={{
            width: `${progressConverter(progress)}%`,
          }}
        />
        <S.NumberLeft>{progress ? `${progress * 20}%` : "0%"}</S.NumberLeft>
        <S.Number>{progress ? `${progress}/5` : "0/5"}</S.Number>
      </S.Bar>
    </S.Container>
  );
}
