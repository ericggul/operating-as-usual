import * as S from "./styles";

const EDGES = 20;
const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function VisualTest() {
  const DATA = new Array(EDGES * EDGES).fill(getRandom(0, 2));

  return (
    <S.Container>
      <S.Inner edges={EDGES}>
        {DATA.map((val, i) => (
          <S.Item key={i}>
            <S.Square key={i} val={getRandom(0, 3)} />
          </S.Item>
        ))}
      </S.Inner>
    </S.Container>
  );
}
