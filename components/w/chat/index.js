import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import SingleChat from "foundations/w/chat/SingleChat";
import { useEffect, useState, useRef, useMemo } from "react";

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
  const [chatNumber, setChatNumber] = useState(0);
  const [loadingLevel, setLoadingLevel] = useState(0);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    Tone.start();
    if (e.code === "KeyW") {
      setLoadingLevel((l) => l + 1);
    }
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
            chatNumber={chatNumber}
            loadingLevel={loadingLevel}
          />
        ))}
      </S.Inner>
    </S.Container>
  );
}
