import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, triggerConvert, speechGenerated) {
  useEffect(() => {
    if (text.length > 0 && triggerConvert) {
      getTTS(text);
    }
  }, [text, triggerConvert]);

  async function getTTS(text) {
    try {
      const res = await axios.post("/api/google/tts", { text });
      let { data, voice } = res.data;

      console.log(text);
      console.log(voice.languageCodes[0], voice.name, voice.ssmlGender);
      speechGenerated(data);
    } catch (e) {
      console.log(e);
    }
  }
}
