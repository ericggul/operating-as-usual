import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak) {
  useEffect(() => {
    if (text.length > 0 && speak) {
      getTTS(text);
    }
  }, [text, speak]);

  async function getTTS(text) {
    try {
      const res = await axios.post("/api/google/tts", { text });

      console.log(res);
      const snd = new Audio("data:audio/wav;base64," + res.data);
      console.log(snd);
      snd.play();
      setSpeak(false);
    } catch (e) {
      console.log(e);
    }
  }
}
