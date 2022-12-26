import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak, setListenToVoice) {
  useEffect(() => {
    if (text.length > 0 && speak) {
      getTTS(text);
    }
  }, [text, speak]);

  async function getTTS(text) {
    try {
      const res = await axios.post(
        "/api/google-tts",
        { text },
        {
          responseType: "string",
        }
      );
      let data = res.data;

      const snd = new Audio("data:audio/wav;base64," + data);
      snd.play();
      setSpeak(false);
      setListenToVoice(false);
      snd.onended = () => setListenToVoice(true);
    } catch (e) {
      console.log(e);
    }
  }
}
