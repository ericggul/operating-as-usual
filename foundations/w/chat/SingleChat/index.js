import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";

export default function SingleChat({ width, height, windowHeight, locationIdx, chatContainerNumber, conversationNumber, loadingLevel, chats, getNewLeftChat }) {
  //layout related
  const [i, setI] = useState((((locationIdx % chatContainerNumber.x) + chatContainerNumber.x) % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
  const [j, setJ] = useState(Math.floor((locationIdx + (chatContainerNumber.x - 1) / 2) / chatContainerNumber.x));

  useEffect(() => {
    setI((((locationIdx % chatContainerNumber.x) + chatContainerNumber.x) % chatContainerNumber.x) - (chatContainerNumber.x - 1) / 2);
    setJ(Math.floor((locationIdx + (chatContainerNumber.x - 1) / 2) / chatContainerNumber.x));
  }, [locationIdx, chatContainerNumber]);

  return (
    <S.SingleChatContainer width={width} height={height} x={i * (width + windowHeight * 0.016)} y={j * (height + windowHeight * 0.02)}>
      <S.ChatInner>
        {chats.map((chat, i) => (
          <S.Chat i={i} locationIdx={Math.floor(i / 2)} left={chat.left} key={i} isLoading={chat.loading || false} loadingLevel={chat.loading ? loadingLevel : false}>
            {chat.text}
            {chat.loading && <S.ChatLoading locationIdx={conversationNumber} loadingLevel={loadingLevel} />}
          </S.Chat>
        ))}
        {getNewLeftChat && <LoadingLeft locationIdx={conversationNumber + 1} />}
      </S.ChatInner>
    </S.SingleChatContainer>
  );
}

function LoadingLeft({ locationIdx }) {
  return (
    <S.Chat left={true} locationIdx={locationIdx}>
      {Array.from({ length: 3 }).map((_, i) => (
        <S.Loading key={i} i={i} />
      ))}
    </S.Chat>
  );
}
