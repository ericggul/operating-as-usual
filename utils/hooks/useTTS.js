import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak) {
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    getTTS(text);
  }, [text]);

  useEffect(() => {
    if (speak && audioBuffer) {
      handleAudio();
    }
  }, [speak, audioBuffer]);

  async function handleAudio() {
    await playAudio(audioBuffer);
    setSpeak(false);
  }

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

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const audioBuffer = await audioCtx.decodeAudioData(data);
      setAudioBuffer(audioBuffer);
    } catch (e) {
      console.log(e);
    }
  }
}

async function playAudio(buffer) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  } catch (e) {
    console.log(e);
  }
}
