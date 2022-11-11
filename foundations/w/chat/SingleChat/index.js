import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useEffect, useState, useRef, useMemo } from "react";

export default function SingleChat({ width, height, windowHeight, locationIdx, chatContainerNumber, conversationNumber, loadingLevel, handleLoadingLevelReset }) {
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

  const [getNewLeftChat, setGetNewLeftChat] = useState(false);

  useEffect(() => {
    if (loadingLevel > 100 && !getNewLeftChat) {
      setChats((c) => [...c, { text: `Why?`, left: false }]);
      setGetNewLeftChat(true);
    }
  }, [loadingLevel, getNewLeftChat]);

  useEffect(() => {
    console.log("31");
    if (getNewLeftChat) {
      console.log("32");
      const timeout = setTimeout(() => {
        handleLoadingLevelReset();
        setChats((c) => [...c, { text: `I'm feeling sad...`, left: true }]);
        setGetNewLeftChat(false);
      }, 2000 / (conversationNumber + 1) + 300);
      return () => clearTimeout(timeout);
    }
  }, [getNewLeftChat]);

  return (
    <S.SingleChatContainer width={width} height={height} x={i * (width + windowHeight * 0.016)} y={j * (height + windowHeight * 0.02)}>
      <S.ChatInner>
        {chats.map((chat, i) => (
          <S.Chat i={i} locationIdx={Math.floor(i / 2)} left={chat.left} key={i}>
            {chat.text}
          </S.Chat>
        ))}
        {!getNewLeftChat && <LoadingRight loadingLevel={Math.min(loadingLevel, 100)} />}
        {getNewLeftChat && <LoadingLeft locationIdx={conversationNumber + 1} />}
      </S.ChatInner>
    </S.SingleChatContainer>
  );
}

function LoadingRight({ loadingLevel }) {
  return (
    <S.Chat left={false} loadingLevel={loadingLevel}>
      <S.HiddenText>Why?</S.HiddenText>
    </S.Chat>
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
