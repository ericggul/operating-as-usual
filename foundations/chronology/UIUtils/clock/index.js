import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

export default function Clock({
  current,
  clicked,
  realTime,
  layout,
  progress,
}) {
  let unitWidth = 12;
  let largeSize = { width: 0.25, height: 3 };
  let smallSize = { width: 0.125, height: 2 };
  let innerRadius = unitWidth / 2 - largeSize.height;
  let adjustedOuter = innerRadius + largeSize.height / 2;
  let adjustedInner = innerRadius + smallSize.height / 2;
  let adjustedText = innerRadius + 4;

  const [realTimeMode, setRealTimeMode] = useState(progress != null);
  const [currentLayout, setCurrentLayout] = useState(
    realTimeMode ? 0.5 : current
  );

  useEffect(() => {
    setCurrentLayout(progress != null ? 0.5 : current);
    setRealTimeMode(progress != null);
  }, [progress]);
  return (
    <S.ClockElement>
      {[0, 1, 2, 3].map((e, i) => (
        <S.Large
          key={i + 20}
          top={unitWidth / 2 + adjustedOuter * Math.cos((e / 2) * Math.PI)}
          left={unitWidth / 2 - adjustedOuter * Math.sin((e / 2) * Math.PI)}
          angle={90 * e}
          onClick={() => {
            !realTimeMode && clicked(((e + 2) % 4) * 3);
            !realTimeMode && setCurrentLayout(((e + 2) % 4) * 3);
          }}
          current={currentLayout % 3 === 0 && (currentLayout / 3 + 2) % 4 === e}
        />
      ))}

      {!realTimeMode &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((e, i) => (
          <S.Text
            top={unitWidth / 2 - adjustedText * Math.cos((e / 6) * Math.PI)}
            left={unitWidth / 2 + adjustedText * Math.sin((e / 6) * Math.PI)}
            angle={30 * e}
            onClick={(ev) => {
              ev.preventDefault();
              !realTimeMode && clicked(e);
              !realTimeMode && setCurrentLayout(e);
            }}
            show={e === currentLayout}
          >
            {e}
          </S.Text>
        ))}

      {[1, 2, 4, 5, 7, 8, 10, 11].map((e, i) => (
        <S.Small
          key={i}
          top={unitWidth / 2 + adjustedInner * Math.cos((e / 6) * Math.PI)}
          left={unitWidth / 2 - adjustedInner * Math.sin((e / 6) * Math.PI)}
          angle={30 * e}
          onClick={(ev) => {
            ev.preventDefault();
            !realTimeMode && clicked((e + 6) % 12);
            !realTimeMode && setCurrentLayout((e + 6) % 12);
          }}
          current={(currentLayout + 6) % 12 === e}
        />
      ))}

      {realTimeMode && (
        <>
          <S.Hour
            top={
              unitWidth / 2 +
              (smallSize.height / 2) *
                Math.cos(((layout + progress + 6) / 6) * Math.PI)
            }
            left={
              unitWidth / 2 -
              (smallSize.height / 2) *
                Math.sin(((layout + progress + 6) / 6) * Math.PI)
            }
            angle={30 * (layout + progress + 6)}
          />
          <S.Min
            top={
              unitWidth / 2 +
              (largeSize.height / 2) *
                Math.cos(((progress * 60 + 30) / 30) * Math.PI)
            }
            left={
              unitWidth / 2 -
              (largeSize.height / 2) *
                Math.sin(((progress * 60 + 30) / 30) * Math.PI)
            }
            angle={6 * (progress * 60 + 30)}
          />
        </>
      )}
    </S.ClockElement>
  );
}
