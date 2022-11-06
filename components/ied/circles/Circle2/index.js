import * as S from "./styles";

import { useState, useEffect } from "react";

const REPEAT = 4;
const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function Circle({ data }) {
  const [bubbledData, setBubbledData] = useState(new Array(REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));

  useEffect(() => {
    setBubbledData(new Array(REPEAT * REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));
  }, [data]);

  return (
    <S.Container>
      <S.Inner edges={Math.sqrt(data.length) * REPEAT}>
        {bubbledData.map((val, i) => (
          <S.Item key={i}>
            <S.Circle key={i} val={val} />
          </S.Item>
        ))}
      </S.Inner>
    </S.Container>
  );
}
