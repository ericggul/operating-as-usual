import * as S from "./styles";
import { useEffect, useState } from "react";
import Model from "./model";

export default function ArchiveIntro({ order, closeArchiveIntro }) {
  const [archiveState, setArchiveState] = useState(0);
  const [textState, setTextState] = useState(1);

  useEffect(() => {
    const timeoutA = setTimeout(() => {
      setArchiveState(1);
    }, 2000);

    const timeoutB = setTimeout(() => {
      setTextState(1);
    }, 5200);

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }, []);

  function handleButtonClick() {
    setTextState(2);
    const timeout = setTimeout(() => {
      closeArchiveIntro();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }

  return (
    <S.Container textState={textState}>
      {archiveState === 0 && <h1>Archive</h1>}
      <S.Inner opacity={archiveState === 0 ? 0 : 1} onClick={handleButtonClick}>
        <p>{`You had moved the ${order}th state to the ${order + 1}th state`}</p>

        <S.StateContainer>
          <S.State color={textState === 0 ? "transparent" : "#8888ff"}>
            <S.HeaderLabel>Before</S.HeaderLabel>
            <S.ImgContainer>
              <Model order={order} />
            </S.ImgContainer>
            <S.Label>
              {`${order}th`}
              <span>/105 States</span>
            </S.Label>
          </S.State>

          <S.State color={textState === 0 ? "transparent" : "#ff8888"}>
            <S.HeaderLabel>After</S.HeaderLabel>
            <S.ImgContainer>
              <Model order={order + 1} />
            </S.ImgContainer>
            <S.Label>
              {`${order + 1}th`}
              <span>/105 States</span>
            </S.Label>
          </S.State>
        </S.StateContainer>
        <p style={{ marginTop: "1rem", opacity: textState === 0 ? 0 : 1 }}>{"Now checkout the archive to see the state you just moved"}</p>

        <S.Button opacity={textState === 0 ? 0 : 1} onClick={handleButtonClick}>
          Go
        </S.Button>
      </S.Inner>
    </S.Container>
  );
}
