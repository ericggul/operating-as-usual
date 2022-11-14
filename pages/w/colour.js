import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import * as S from "components/105/archive/styles";

const ColourComponent = dynamic(() => import("components/w/colour"), { ssr: false });
const OpeningComponent = dynamic(() => import("components/w/opening"), { ssr: false });
const ClockComponent = dynamic(() => import("components/w/clock"), { ssr: false });

export default function Tunnel() {
  const [colourVisible, setColourVisible] = useState(true);
  const [clockVisible, setClockVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  function toClock() {
    setClockVisible(true);
    setColourVisible(false);
  }

  return (
    <S.Container>
      {colourVisible && <ColourComponent opening={opening} setOpening={setOpening} />}
      {colourVisible && <OpeningComponent opening={opening} toClock={toClock} />}
      {clockVisible && <ClockComponent />}
    </S.Container>
  );
}
