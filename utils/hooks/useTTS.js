import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak) {
  const [arrayBufferData, setArrayBufferData] = useState(null);

  useEffect(() => {
    getTTS(text);
  }, [text]);

  useEffect(() => {
    if (speak && arrayBufferData) {
      playAudio(arrayBufferData);
      setSpeak(false);
    }
  }, [speak, arrayBufferData]);

  async function getTTS(text) {
    try {
      const res = await axios.post(
        "/api/google-tts",
        { text },
        {
          responseType: "arraybuffer",
        }
      );
      let data = res.data;

      setArrayBufferData(data);
    } catch (e) {
      console.log(e);
    }
  }
}

async function playAudio(data) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(data);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  } catch (e) {
    console.log(e);
  }
}
