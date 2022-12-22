import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";

import Clock from "foundations/chronology/UIUtils/clock";
import useMouseInteraction from "utils/hooks/useMouseInteraction";
export default function UIUtils({ current, clicked, resetPos, realTimeMode, alterTimeMode, layout, progress }) {
  const [showUtils, setShowUtils] = useState(false);
  const containerRef = useRef(null);

  const { handlePointerDown, handleClick } = useMouseInteraction({
    containerRef,

    setShowUtils,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowUtils(true);
    }, 3000);

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("click", handleClick);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {showUtils && (
        <S.UtilsContainer ref={containerRef}>
          <S.RealTimeModal>
            Contemporary Mode
            <S.Box>
              <S.El
                selected={realTimeMode}
                onClick={function (e) {
                  alterTimeMode(true);
                  e.stopPropagation();
                }}
              >
                {"On"}
              </S.El>
              <S.El
                selected={!realTimeMode}
                onClick={function (e) {
                  alterTimeMode(false);
                  e.stopPropagation();
                }}
              >
                {"Off"}
              </S.El>
            </S.Box>
          </S.RealTimeModal>

          <Clock current={current} clicked={clicked} realTime={realTimeMode} layout={layout} progress={progress} />
          <S.ResetPosition
            onClick={(e) => {
              e.preventDefault();
              resetPos();
            }}
          >
            Reset Perspective Position
          </S.ResetPosition>
        </S.UtilsContainer>
      )}
    </>
  );
}
