import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import SingleChat from "foundations/w/chat/SingleChat";
import SingleDot from "foundations/w/chat/SingleDot";

//tunnel
import Tunnel from "components/w/tunnel";

import React, { useEffect, useState, useRef, useMemo } from "react";

import axios from "axios";
import * as Tone from "tone";

//DUMMY_DATA
import { DUMMY_DATA } from "./data";

const WORDS = ["We Are", "History", "Identity", "Home", "World"];

export default function Chat() {
  //posiiton, layout
  const [windowWidth, windowHeight] = useResize();
  const [chatContainerSize, setChatContainerSize] = useState({ width: 0, height: 0 });
  const [chatContainerNumber, setChatContainerNumber] = useState(0);

  useEffect(() => {
    if (chatContainerSize.width === 0) {
      let width = (windowHeight * 0.88) / 1.9;
      let height = windowHeight * 0.88;
      setChatContainerSize({ width, height });
      setChatContainerNumber({ x: 1, y: 1 });
    }
  }, [chatContainerSize, windowWidth, windowHeight]);

  //key down
  // const [conversationNumber, setConversationNumber] = useState(0);
  // const [loadingLevel, setLoadingLevel] = useState(0);
  // const [accelerateSpeed, setAccelerateSpeed] = useState(3);
  const [conversationNumber, setConversationNumber] = useState(30);
  const [loadingLevel, setLoadingLevel] = useState(0);
  const [accelerateSpeed, setAccelerateSpeed] = useState(100);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accelerateSpeed]);

  const handleKeyDown = (e) => {
    Tone.start();
    if (e.code === "KeyW") {
      setLoadingLevel((l) => Math.min(l + accelerateSpeed, 100));
    }
  };

  function handleLoadingLevelReset() {
    setConversationNumber((n) => n + 1);
    setAccelerateSpeed((s) => (s <= 3 ? 4.3 : Math.min(s * 1.15, 100)));
    setLoadingLevel(accelerateSpeed >= 100 ? 100 : 0);
  }

  const [scaleInner, setScaleInner] = useState(1);
  useEffect(() => {
    console.log("cn", conversationNumber);
    if (conversationNumber === 10) {
      setChatContainerNumber({ x: 3, y: 1 });
    } else if (conversationNumber === 12) {
      setChatContainerNumber({ x: 5, y: 1 });
    } else if (conversationNumber === 14) {
      setChatContainerNumber({ x: 7, y: 1 });
    } else if (conversationNumber >= 16 && conversationNumber <= 37 && conversationNumber % 4 === 1) {
      let idx = conversationNumber - 1;
      setChatContainerNumber({ x: Math.floor((idx % 8) / 2) + 7, y: 1 });
    } else if (conversationNumber >= 39 && conversationNumber <= 53 && conversationNumber % 2 === 1) {
      setChatContainerNumber({ x: Math.min(conversationNumber - 37 + 7, 28), y: Math.min(conversationNumber - 37 + 1, 15) });
    } else if (conversationNumber >= 38 && conversationNumber <= 53 && conversationNumber % 2 === 0) {
      setScaleInner((s) => Math.max(s * 0.5, 0.01));
    }
  }, [conversationNumber]);

  //chat retrival
  const [chats, setChats] = useState([{ text: `Wow that was scary... Earth is gonna die`, left: false, loading: true }]);
  const [getNewLeftChat, setGetNewLeftChat] = useState(false);

  //right chat finish
  useEffect(() => {
    if (loadingLevel >= 100 && !getNewLeftChat && conversationNumber <= 60) {
      if (chats.length === 1) {
        setChats((c) => {
          let chats = [...c];
          chats[0] = { text: `Wow that was scary... Earth is gonna die`, left: false, loading: false };
          return chats;
        });
      }
      if (chats.length > 1) {
        setChats((c) => {
          let chats = [...c];
          chats[chats.length - 1] = { text: `Why?`, left: false, loading: false };
          return chats;
        });
      }
      setGetNewLeftChat(true);
    }
  }, [loadingLevel, getNewLeftChat, chats, conversationNumber]);

  //generate left chat
  useEffect(() => {
    if (getNewLeftChat) {
      let timeOut = Math.max(3000 / 1.1 ** conversationNumber, 500);
      //tone
      const osc = new Tone.Oscillator().toDestination();
      osc.frequency.value = "C2";
      const randomLetter = ["C", "D", "E", "F", "G"][(conversationNumber + 2) % 5];
      osc.frequency.rampTo(`${randomLetter}4`, (timeOut / 1000) * 0.95);
      osc.start().stop(`+${timeOut / 1000}`);

      const timeout = setTimeout(() => {
        let remain = conversationNumber * 2 + 1 - DUMMY_DATA.length;
        let target;
        if (remain < 0) {
          target = DUMMY_DATA[conversationNumber * 2 + 1];
        } else {
          target = DUMMY_DATA[DUMMY_DATA.length + ((remain % 10) - 10)];
        }

        speak(conversationNumber < 17 ? "w" : conversationNumber === 17 ? "x" : "why");
        setChats((c) => [...c, target, { text: "Why?", left: false, loading: true }]);

        handleLoadingLevelReset();
        setGetNewLeftChat(false);
      }, timeOut);
      return () => clearTimeout(timeout);
    }
  }, [getNewLeftChat, chats, accelerateSpeed, conversationNumber]);

  const [flash, setFlash] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  useEffect(() => {
    if (conversationNumber >= 54 && conversationNumber <= 60) {
      setFlash(true);
      const timeout = setTimeout(() => {
        setFlash(false);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (conversationNumber >= 61) {
      setFlash(true);
      setBackgroundColor("#ff0000");
    }
  }, [conversationNumber]);

  return (
    <S.Container>
      <S.Inner scaleInner={scaleInner}>
        {Array.from({ length: chatContainerNumber.x * chatContainerNumber.y }).map((_, i) => (
          <React.Fragment key={i}>
            {conversationNumber <= 37 ? (
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
            ) : (
              <SingleDot
                key={i}
                locationIdx={i - (chatContainerNumber.x * chatContainerNumber.y - 1) / 2}
                width={chatContainerSize.width}
                height={chatContainerSize.height}
                windowHeight={windowHeight}
                chatContainerNumber={chatContainerNumber}
                flash={flash}
                backgroundColor={backgroundColor}
                conversationNumber={conversationNumber}
              />
            )}
          </React.Fragment>
        ))}
      </S.Inner>
      {conversationNumber >= 37 && <S.Text>{WORDS[(conversationNumber + 2) % 5]}</S.Text>}
      {/* {conversationNumber >= 50 && (
        <S.TunnelContainer>
          <Tunnel />
        </S.TunnelContainer>
      )} */}
    </S.Container>
  );
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.rate = 1.5;
  synth.speak(utterThis);
}
