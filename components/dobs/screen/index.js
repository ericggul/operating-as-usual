import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";

//useswr
import useSWR from "swr";

//axios
import axios from "axios";

import useResize from "utils/hooks/useResize";

export default function Screen() {
  //useSWR: Retrive Data Logic
  c;

  const [windowWidth, windowHeight] = useResize();

  console.log(displayedData);
  return <S.Container></S.Container>;
}
