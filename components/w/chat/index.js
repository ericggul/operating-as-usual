import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useEffect, useState, useRef } from "react";

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
        <S.Row>
          {Array.from({ length: chatContainerNumber }).map((_, i) => (
            <SingleChat key={i} />
          ))}
        </S.Row>
        <S.Row>
          {Array.from({ length: chatContainerNumber }).map((_, i) => (
            <SingleChat key={i} />
          ))}
        </S.Row>
        <S.Row>
          {Array.from({ length: chatContainerNumber }).map((_, i) => (
            <SingleChat key={i} />
          ))}
        </S.Row>
      </S.Inner>
    </S.Container>
  );
}

function SingleChat({ color }) {
  return (
    <S.SingleChatContainer>
      <S.ChatInner>
        <S.Chat>Hey! What are you doing? I mean what the fuck are you doing?</S.Chat>
        <S.Chat left={true}>I'm doing my stuffs!</S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true}>I'm doing my stuffs!</S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true}>Because it's how i do things everyday!</S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true}>I'm doing my stuffs!</S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true}>I'm doing my stuffs!</S.Chat>
        <S.Chat>Why?</S.Chat>
        <S.Chat left={true}>I'm doing my stuffs!</S.Chat>
        <S.Chat>HEY</S.Chat>
      </S.ChatInner>
    </S.SingleChatContainer>
  );
}
