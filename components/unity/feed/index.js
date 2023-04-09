import * as S from "./styles";
import { useState, useEffect } from "react";

import OverviewComp from "foundations/unity/feed/OverView";
import DetailedViewComp from "foundations/unity/feed/DetailedView";

const DATA = [
  { imgSrc: "/assets/images/unity/feed/1.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/2.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/3.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/4.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/5.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/6.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/7.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { imgSrc: "/assets/images/unity/feed/8.jpg", date: "13 Feburary", location: "London, UK", contents: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
];

export default function Component() {
  const [section, setSection] = useState("overview");
  const [focus, setFocus] = useState(-1);

  return (
    <S.Wrapper>
      {section === "overview" && (
        <OverviewComp
          data={DATA}
          handleClick={(idx) => {
            setFocus(idx);
            setSection("detailedView");
          }}
        />
      )}
      {section === "detailedView" && <DetailedViewComp data={DATA} focusIdx={focus} backToDetailedView={() => setSection("overview")} />}
    </S.Wrapper>
  );
}
