import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useEffect, useState, useRef, useMemo } from "react";

export default function SingleChat({ width, height, windowHeight, locationIdx, chatContainerNumber, chatNumber, loadingLevel }) {
  //layout related
  const [i, setI] = useState((locationIdx % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
  const [j, setJ] = useState(Math.floor(locationIdx / chatContainerNumber.x) - (chatContainerNumber.y - 1) / 2);

  useEffect(() => {
    setI((locationIdx % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
    setJ(Math.floor(locationIdx / chatContainerNumber.x) - (chatContainerNumber.y - 1) / 2);
  }, [locationIdx, chatContainerNumber]);

  //chat related
  const [chats, setChats] = useState([
    { text: `Hey! How are you doing?`, left: false },
    { text: `I'm feeling sad...`, left: true },
  ]);

  useEffect(() => {}, [loadingLevel]);

  return (
    <S.SingleChatContainer width={width} height={height} x={i * (width + windowHeight * 0.016)} y={j * (height + windowHeight * 0.02)}>
      <S.ChatInner>
        {chats.map((chat, i) => (
          <S.Chat i={i} locationIdx={Math.floor(i / 2)} left={chat.left}>
            {chat.text}
          </S.Chat>
        ))}
        <Loading left={false} />
      </S.ChatInner>
    </S.SingleChatContainer>
  );
}

function Loading({ left = false, locationIdx = 0 }) {
  return (
    <S.Chat left={left} locationIdx={locationIdx}>
      {Array.from({ length: 3 }).map((_, i) => (
        <S.Loading key={i} i={i} left={left} />
      ))}
    </S.Chat>
  );
}
