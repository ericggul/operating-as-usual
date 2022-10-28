import { useEffect, useRef } from "react";
import axios from "axios";

export default function Tfl() {
  const LINES = ["victoria", "jubilee", "piccadilly"];
  const LINE_COLORS = ["#0098D4", "#A0A5A9", "#003688"];

  useEffect(() => {
    const interval = setInterval(fetchTfl, 2000);
    return () => clearInterval(interval);
  }, []);

  const lineIdxRef = useRef(0);

  async function fetchTfl() {
    try {
      const { data } = await axios.get("/api/ied/tfl", {
        params: {
          line: LINES[lineIdxRef.current],
        },
      });
      let sorted = data.result.sort((a, b) => a.timeToStation - b.timeToStation);
      console.log(sorted);
      console.log(sorted[0].timeToStation);
      lineIdxRef.current = (lineIdxRef.current + 1) % LINES.length;
    } catch (e) {
      console.log("tfl error");
      console.log(e);
    }
  }

  return <></>;
}
