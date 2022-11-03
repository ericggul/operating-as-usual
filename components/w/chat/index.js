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
        {Array.from({ length: chatContainerNumber }).map((_, i) => (
          <S.Column key={i}>
            {Array.from({ length: chatContainerNumber }).map((_, j) => (
              <SingleChat key={j} />
            ))}
          </S.Column>
        ))}
      </S.Inner>
    </S.Container>
  );
}

function SingleChat() {
  return (
    <S.SingleChatContainer>
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
