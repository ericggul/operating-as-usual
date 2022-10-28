import { useEffect, useRef } from "react";
import axios from "axios";

export default function Avis() {
  useEffect(() => {
    fetchAvis();
    // const interval = setInterval(fetchTfl, 2000);
    // return () => clearInterval(interval);
  }, []);

  async function fetchAvis() {
    try {
      const { data } = await axios.get("/api/ied/avis");
    } catch (e) {
      console.log("avis error");
      console.log(e);
    }
  }

  return <></>;
}
