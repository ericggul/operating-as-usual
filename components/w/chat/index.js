import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import SingleChat from "foundations/w/chat/SingleChat";
import { useEffect, useState, useRef, useMemo } from "react";

import axios from "axios";
import * as Tone from "tone";

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
    setAccelerateSpeed((s) => s * 1.3);
  }

  //chat retrival
  const [chats, setChats] = useState([{ text: `Hey! What are you doing?`, left: false }]);
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
      handleGenerateLeftChat();
    }
  }, [getNewLeftChat, chats]);

  const handleGenerateLeftChat = async () => {
    const inputText = chatsToConversationConverter(chats);
    let { text } = await generateSentences(inputText);
    const timeout = setTimeout(() => {
      setChats((c) => [...c, { text: text.replace(/(\r\n|\n|\r)/gm, ""), left: true }, { text: "Why?", left: false, loading: true }]);
      handleLoadingLevelReset();
      setGetNewLeftChat(false);
    }, 2000 / (conversationNumber + 1));
    return () => clearTimeout(timeout);
  };

  const chatsToConversationConverter = (chats) => {
    let conversation = "Casual Conversation \n";
    chats.forEach((chat) => {
      conversation += chat.left ? "B" : "A";
      conversation += ": " + chat.text + "\n";
    });
    conversation += "B: ";
    return conversation;
  };

  const generateSentences = async (text) => {
    const { data } = await axios.post("/api/gpt3", { text });
    return data;
  };

  return (
    <S.Container>
      <S.Inner>
        {Array.from({ length: chatContainerNumber.x * chatContainerNumber.y }).map((_, i) => (
          <SingleChat
            key={i}
            width={chatContainerSize.width}
            height={chatContainerSize.height}
            windowHeight={windowHeight}
            locationIdx={i}
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
