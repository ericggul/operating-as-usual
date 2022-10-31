import * as S from "./styles";

const EDGES = 10;
const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function VisualTest({ data }) {
  return (
    <S.Container>
      <S.Inner edges={EDGES}>
        {data.map((val, i) => (
          <S.Item key={i}>
            <S.Square key={i} val={val} />
          </S.Item>
        ))}
      </S.Inner>
    </S.Container>
  );
}
