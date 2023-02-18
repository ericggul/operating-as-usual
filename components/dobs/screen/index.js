import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";

//useswr
import useSWR from "swr";

//axios
import axios from "axios";

import useResize from "utils/hooks/useResize";

export default function Screen() {
  //useSWR: Retrive Data Logic
  const fetcher = (...args) => fetch(...args).then((r) => r.json());
  const { data, error } = useSWR("/api/dobs/fetchInteractions", fetcher);

  const [displayedData, setDisplayedData] = useState(null);

  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    //data sort by createdat
    if (data) {
      let sortedData = data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      let mappedData = sortedData.slice(0, 200).map((item, i) => ({
        text: item.answer,
        loc: {
          x: (new Date(item.createdAt) % 437) / 437,
          y: (new Date(item.createdAt) % 613) / 613,
        },
      }));
      setDisplayedData(mappedData);
    }
  }, [data]);

  console.log(displayedData);
  return (
    <S.Container>
      {displayedData &&
        displayedData.map((item, index) => (
          <S.Item
            key={index}
            style={{
              transform: `translate(${item.loc.x * windowWidth}px, ${item.loc.y * windowHeight}px)`,
            }}
          >
            {item.text}
          </S.Item>
        ))}
    </S.Container>
  );
}
