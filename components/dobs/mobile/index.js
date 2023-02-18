import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";

import useResize from "utils/hooks/useResize";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import useVideo from "utils/hooks/useVideo";

import axios from "axios";

//toast
import { toast, Toast } from "loplat-ui";

const QUESTIONS = [
  "What is your first reaction to the work?",
  "What does it make you feel or think like that?",
  "What is it made of?",
  "Why has the artist chosen those materials?",
  "Does the size of the work affect your experience?",
  "Where is the artist from and where did they live?",
  "How has this influenced them?",
  "What do you think the work is about?",
  "Why don't you take a photograph of this list, so you can refer to it when you look at the art?",
];

export default function Mobile() {
  const [prepared, setPrepared] = useState(false);
  const [idx, setIdx] = useState(0);
  const [getAudioResponse, setGetAudioResponse] = useState(false);

  useEffect(() => {
    if (prepared && idx < QUESTIONS.length) {
      speak(QUESTIONS[idx]);
    }
    if (idx === QUESTIONS.length) {
      const timeout = setTimeout(() => {
        setPrepared(false);
        setIdx(0);
        setGetAudioResponse(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [idx, prepared]);

  async function speak(sentence) {
    const synth = window.speechSynthesis;
    var msg = new SpeechSynthesisUtterance(sentence);
    msg.pitch = 1;
    msg.rate = 1;
    synth.speak(msg);
    msg.addEventListener("end", () => {
      setGetAudioResponse(true);
    });
  }

  //prepare video

  const videoRef = useRef(null);
  const videoReady = useVideo(videoRef ? videoRef.current : null, 16 / 9, "environment");

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
    });
    const timeout = setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (getAudioResponse) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [getAudioResponse]);

  useEffect(() => {
    if (getAudioResponse && transcript && transcript.length > 3) {
      const timeout = setTimeout(moveNext, 2000);
      return () => clearTimeout(timeout);
    }
  }, [listening, transcript]);

  const [timer, setTimer] = useState(10);

  const idxRef = useRef(idx);
  const transcriptRef = useRef(transcript);
  useEffect(() => {
    idxRef.current = idx;
    transcriptRef.current = transcript;
    if (transcript.length === 0 && getAudioResponse && idx < QUESTIONS.length) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [transcript, getAudioResponse, idx]);

  useEffect(() => {
    if (timer <= 0) {
      moveNext();
    }
  }, [timer]);

  function moveNext() {
    if (transcriptRef.current != null) {
      uploadResponse(idxRef.current, transcriptRef.current);
    }

    setTimer(10);
    setGetAudioResponse(false);
    resetTranscript();
    setIdx((idx) => idx + 1);
    SpeechRecognition.stopListening();
  }

  //take photo of video
  useEffect(() => {
    if (idx === 8 && getAudioResponse) {
      videoScreenShot();
    }
  }, [idx, getAudioResponse]);

  function videoScreenShot() {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const dataURL = canvas.toDataURL("image/png");

    //download with a tag
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "death_of_blue_screen.png";
    a.click();
  }

  //db update
  useEffect(() => {
    if (prepared) {
      newReply();
    }
  }, [prepared]);

  const replyIdRef = useRef(null);

  async function newReply() {
    try {
      const response = await axios.get("/api/dobs/createNewReply");
      replyIdRef.current = response.data.id;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function uploadResponse(idx, response) {
    try {
      if (replyIdRef && replyIdRef.current && response) {
        const res = await axios.post("/api/dobs/uploadAnswer", {
          replyId: replyIdRef.current,
          idx,
          response,
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <S.StyledFriendlyGuideToEnjoyThisArtwork onClick={() => setPrepared(true)}>
      <S.Video ref={videoRef}>
        <source ref={videoRef} type="video/mp4" autoPlay="autoplay" loop playsInline muted preload="auto" controls={false} />
      </S.Video>
      {prepared && idx < QUESTIONS.length && (
        <S.Text
          style={{
            marginBottom: "8vw",
          }}
        >{`${idx + 1}/${QUESTIONS.length} \n`}</S.Text>
      )}
      <S.Text> {prepared ? (idx < QUESTIONS.length ? QUESTIONS[idx] : "The End") : "CLICK TO START"}</S.Text>
      {getAudioResponse && !transcript && (
        <S.Answer
          style={{
            height: "8vw",
          }}
          opacity={0.5}
        >
          Speak out
        </S.Answer>
      )}
      <S.Answer opacity={transcript ? 1 : 0.5}>{getAudioResponse ? (transcript ? transcript : `${timer}s left to response`) : ""}</S.Answer>

      {prepared && idx < QUESTIONS.length && <S.Next onClick={moveNext}>Skip to Next Question</S.Next>}
      <Toast duration={5000} />
    </S.StyledFriendlyGuideToEnjoyThisArtwork>
  );
}
