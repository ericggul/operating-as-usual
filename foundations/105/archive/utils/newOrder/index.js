import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import Model from "./model";

export default function ArchiveIntro({ order, closeModal }) {
  const [archiveState, setArchiveState] = useState(0);
  const [textState, setTextState] = useState(1);

  const audioRef = useRef();

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.playbackRate = 3;
      audioRef.current.play();
    }
    const timeoutA = setTimeout(() => {
      setArchiveState(1);
    }, 2000);

    const timeoutB = setTimeout(() => {
      setTextState(1);
    }, 5200);

    const timeoutC = setTimeout(handleButtonClick, 15 * 1000);

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
      clearTimeout(timeoutC);
    };
  }, []);

  function handleButtonClick() {
    setTextState(2);
    const timeout = setTimeout(() => {
      closeModal();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }

  return (
    <S.Container textState={textState}>
      <audio src="/assets/sound/Applause.wav" ref={audioRef} />
      {archiveState === 0 && <h1>Congratulations</h1>}
      <S.Inner opacity={archiveState === 0 ? 0 : 1}>
        <p>{`Your status just rose from ${order}th to ${order + 1}th`}</p>

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
        <p style={{ marginTop: "1rem", opacity: textState === 0 ? 0 : 1 }}>{"By sacrificing your humaneness"}</p>
      </S.Inner>
    </S.Container>
  );
}
