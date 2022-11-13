import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";

const getRandom = (a, b) => Math.random() * (b - a) + a;

const WORDS = ["We Are", "History", "Identity", "Home", "World"];

export default function SingleDot({ width, height, windowHeight, locationIdx, chatContainerNumber, flash, backgroundColor, conversationNumber }) {
  //layout related
  const [i, setI] = useState((((locationIdx % chatContainerNumber.x) + chatContainerNumber.x) % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
  const [j, setJ] = useState(Math.floor((locationIdx + (chatContainerNumber.x - 1) / 2) / chatContainerNumber.x));

  useEffect(() => {
    setI((((locationIdx % chatContainerNumber.x) + chatContainerNumber.x) % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
    setJ(Math.floor((locationIdx + (chatContainerNumber.x - 1) / 2) / chatContainerNumber.x));
  }, [locationIdx, chatContainerNumber]);

  return <S.SingleDot width={width} height={height} x={i * (width + windowHeight * 0.016)} y={j * (height + windowHeight * 0.02)} flash={flash} backgroundColor={backgroundColor}></S.SingleDot>;
}
