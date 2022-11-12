import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import SingleChat from "foundations/w/chat/SingleChat";
import { useEffect, useState, useRef, useMemo } from "react";

import axios from "axios";
import * as Tone from "tone";

//DUMMY_DATA
import { DUMMY_DATA } from "./data";

export default function Chat() {
  //posiiton, layout
  const [windowWidth, windowHeight] = useResize();
  const [chatContainerSize, setChatContainerSize] = useState({ width: 0, height: 0 });
  const [chatContainerNumber, setChatContainerNumber] = useState(0);

  useEffect(() => {
    let width = (windowHeight * 0.88) / 2;
    let height = windowHeight * 0.88;
    let horizontalNumber = Math.floor(windowWidth / (2 * width)) * 2 + 1;
    setChatContainerSize({ width, height });
    setChatContainerNumber({ x: 1, y: 1 });
  }, [windowWidth, windowHeight]);

  //key down
  const [conversationNumber, setConversationNumber] = useState(0);
  const [loadingLevel, setLoadingLevel] = useState(0);
  const [accelerateSpeed, setAccelerateSpeed] = useState(3);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accelerateSpeed]);

  const handleKeyDown = (e) => {
    Tone.start();
    if (e.code === "KeyW") {
      setLoadingLevel((l) => l + accelerateSpeed);
    }
  };

  function handleLoadingLevelReset() {
    setConversationNumber((n) => n + 1);
    setLoadingLevel(0);
    setAccelerateSpeed((s) => s * 1.15);
  }

  const [scaleInner, setScaleInner] = useState(1);
  useEffect(() => {
    if (conversationNumber === 5) {
      setChatContainerNumber({ x: 3, y: 1 });
    } else if (conversationNumber === 7) {
      setChatContainerNumber({ x: 5, y: 1 });
    } else if (conversationNumber === 9) {
      setChatContainerNumber({ x: 7, y: 1 });
    } else if (conversationNumber === 11) {
      setChatContainerNumber({ x: 7, y: 3 });
      setScaleInner(0.99);
    }
  }, [conversationNumber]);

  //chat retrival
  const [chats, setChats] = useState([{ text: `Wow that was scary... Earth is gonna die`, left: false }]);
  const [getNewLeftChat, setGetNewLeftChat] = useState(false);

  //right chat finish
  useEffect(() => {
    if (loadingLevel > 100 && !getNewLeftChat) {
      if (chats.length > 1) {
        setChats((c) => {
          let chats = [...c];
          chats[chats.length - 1] = { text: `Why?`, left: false, loading: false };
          return chats;
        });
      }
      setGetNewLeftChat(true);
    }
  }, [loadingLevel, getNewLeftChat, chats]);

  //generate left chat
  useEffect(() => {
    if (getNewLeftChat) {
      //dummy code
      const timeout = setTimeout(() => {
        let remain = conversationNumber * 2 + 1 - DUMMY_DATA.length;
        console.log(remain);
        let target;
        if (remain < 0) {
          target = DUMMY_DATA[conversationNumber * 2 + 1];
        } else {
          target = DUMMY_DATA[DUMMY_DATA.length + ((remain % 10) - 10)];
        }

        setChats((c) => [...c, target, { text: "Why?", left: false, loading: true }]);
        handleLoadingLevelReset();
        setGetNewLeftChat(false);
      }, 2000 / (conversationNumber + 1));
      return () => clearTimeout(timeout);
    }
  }, [getNewLeftChat, chats]);

  return (
    <S.Container>
      <S.Inner scaleInner={scaleInner}>
        {Array.from({ length: chatContainerNumber.x * chatContainerNumber.y }).map((_, i) => (
          <SingleChat
            key={i}
            locationIdx={i - (chatContainerNumber.x * chatContainerNumber.y - 1) / 2}
            width={chatContainerSize.width}
            height={chatContainerSize.height}
            windowHeight={windowHeight}
            chatContainerNumber={chatContainerNumber}
            loadingLevel={loadingLevel}
            conversationNumber={conversationNumber}
            chats={chats}
            getNewLeftChat={getNewLeftChat}
          />
        ))}
      </S.Inner>
    </S.Container>
  );
}
