import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useEffect, useState, useRef, useMemo } from "react";

export default function Chat() {
  const [windowWidth, windowHeight] = useResize();

  const [chatContainerSize, setChatContainerSize] = useState({ width: 0, height: 0 });
  const [chatContainerNumber, setChatContainerNumber] = useState(0);

  useEffect(() => {
    let width = (windowHeight * 0.75) / 2;
    let height = windowHeight * 0.75;
    let horizontalNumber = Math.ceil(windowWidth / (2 * width)) * 2 + 1;
    setChatContainerSize({ width, height });
    setChatContainerNumber(horizontalNumber);
  }, [windowWidth, windowHeight]);

  return (
    <S.Container>
      <S.Inner>
        {Array.from({ length: chatContainerNumber * 3 }).map((_, i) => (
          <SingleChat
            key={i}
            width={chatContainerSize.width}
            height={chatContainerSize.height}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            idx={i}
            chatContainerNumber={chatContainerNumber}
          />
        ))}
      </S.Inner>
    </S.Container>
  );
}

function SingleChat({ width, height, windowWidth, windowHeight, idx, chatContainerNumber }) {
  const [i, setI] = useState((idx % chatContainerNumber) - (chatContainerNumber - 1) / 2);
  const [j, setJ] = useState(Math.floor(idx / chatContainerNumber) - 1);

  useEffect(() => {
    setI((idx % chatContainerNumber) - (chatContainerNumber - 1) / 2);
    setJ(Math.floor(idx / chatContainerNumber) - 1);
  }, [idx, chatContainerNumber]);

  //to do:swap
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (i === -1) {
        if (j == 0) {
          setJ(-1);
        }
        if (j == -1) {
          setJ(0);
        }
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [j, i]);

  return (
    <S.SingleChatContainer width={width} height={height} x={i * (width + windowHeight * 0.016)} y={j * (height + windowHeight * 0.02)}>
      <S.ChatInner>
        <S.Chat>Hey! What are you doing? I mean what the fuck are you doing?</S.Chat>
        <S.Chat left={true} idx={0}>
          I'm doing my stuffs!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={1}>
          I'm doing my stuffs!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={2}>
          Because it's how i do things everyday!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={3}>
          I'm doing my stuffs!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={4}>
          I'm doing my stuffs!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={5}>
          I'm doing my stuffs!
        </S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true} idx={6}>
          I'm doing my stuffs!
        </S.Chat>
        <Loading left={false} />
      </S.ChatInner>
    </S.SingleChatContainer>
  );
}

function Loading({ left = false, idx = 0 }) {
  return (
    <S.Chat left={left} idx={idx}>
      {Array.from({ length: 3 }).map((_, i) => (
        <S.Loading key={i} i={i} left={left} />
      ))}
    </S.Chat>
  );
}
