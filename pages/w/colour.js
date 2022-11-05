import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ColourComponent = dynamic(() => import("components/w/colour"), { ssr: false });
const OpeningComponent = dynamic(() => import("components/w/opening"), { ssr: false });

export default function Tunnel() {
  const [opening, setOpening] = useState(false);

  return (
    <>
      <ColourComponent opening={opening} setOpening={setOpening} />
      <OpeningComponent opening={opening} />
    </>
  );
}
