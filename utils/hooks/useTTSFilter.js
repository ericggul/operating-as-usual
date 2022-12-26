import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak, setListenToVoice) {
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    if (text.length > 0 && speak) {
      console.log("8", text, speak);
      getTTS(text);
    }
  }, [text, speak]);

  useEffect(() => {
    if (speak && audioBuffer) {
      handleAudio();
    }
  }, [speak, audioBuffer]);

  async function handleAudio() {
    setListenToVoice(false);
    await playAudio(audioBuffer, () => setListenToVoice(true));
    setSpeak(false);
  }

  async function getTTS(text) {
    try {
      console.log("27");
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

async function playAudio(buffer, handleAudioEnded) {
  try {
    if (buffer.duration > 0) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const source = audioCtx.createBufferSource();

      source.buffer = buffer;

      console.log(buffer.duration);

      source.connect(audioCtx.destination);

      // let filter = audioCtx.createBiquadFilter();
      // filter.type = "peaking";
      // filter.frequency.value = 1000;
      // filter.gain.value = 25;
      // source.connect(filter);
      // filter.connect(audioCtx.destination);

      source.start();

      const timeout = setTimeout(() => {
        handleAudioEnded();
      }, (buffer.duration + 0.5) * 1000);
      return () => clearTimeout(timeout);
    }
  } catch (e) {
    console.log(e);
  }
}
