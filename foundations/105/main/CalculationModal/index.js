import * as S from "./styles";
import { useEffect, useState, useMemo } from "react";

import CheckMark from "foundations/105/main/CheckMark";

const getRandomInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export default function CalculationModal({ transitionState, closeModal }) {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [inputD, setInputD] = useState("");

  const [checkMark, setCheckMark] = useState(false);

  const questionVals = useMemo(() => {
    const a = getRandomInt(3, 5 + transitionState * 1);
    const b = getRandomInt(3, 5 + transitionState * 1);
    const c = getRandomInt(40, 100);
    const d = getRandomInt(10, 40);
    return { a, b, c, d };
  }, [transitionState]);

  useEffect(() => {
    if (inputA == 4 && inputB == 4 && inputC == questionVals.a * questionVals.b && inputD == questionVals.c - questionVals.d) {
      const timeoutA = setTimeout(() => {
        setCheckMark(true);
      }, 500);
      const timeoutB = setTimeout(() => {
        closeModal();
      }, 2500);

      return () => {
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
      };
    }
  }, [inputA, inputB, inputC, inputD, questionVals]);

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <S.Inner>
        <S.GridBackground />
        <S.Title>Math Worksheet</S.Title>
        <S.Title>{`Verify You're a Human`}</S.Title>
        <S.Questions>
          <S.Question>
            <S.Index>1.</S.Index>
            <S.Text>2 + 2 </S.Text>
            <span>=</span>
            <S.Input type="number" value={inputA} onChange={(e) => setInputA(e.target.value)} />
          </S.Question>
          <S.Question>
            <S.Index>2.</S.Index>
            <S.Text>2 &#215; 2 </S.Text>
            <span>=</span>
            <S.Input type="number" value={inputB} onChange={(e) => setInputB(e.target.value)} />
          </S.Question>
          <S.Question>
            <S.Index>3.</S.Index>
            <S.Text>
              {questionVals.a} &#215; {questionVals.b}{" "}
            </S.Text>
            <span>=</span>
            <S.Input type="number" value={inputC} onChange={(e) => setInputC(e.target.value)} />
          </S.Question>
          <S.Question>
            <S.Index>4.</S.Index>
            <S.Text>
              {questionVals.c} - {questionVals.d}{" "}
            </S.Text>
            <span>=</span>
            <S.Input type="number" value={inputD} onChange={(e) => setInputD(e.target.value)} />
          </S.Question>
        </S.Questions>
        {checkMark && <CheckMark />}
      </S.Inner>
    </S.Container>
  );
}
