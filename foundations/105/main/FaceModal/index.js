import * as S from "./styles";

import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

//utils
import { prepareModel } from "./utils/prepareModel";
import { prepareVideo } from "./utils/prepareVideo";
import { drawResults } from "./utils/draw";

import CheckMark from "foundations/105/main/CheckMark";
import useResize from "utils/hooks/useResize";

//hooks
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { toast, Toast } from "loplat-ui";

export default function FaceModal({ onAppear, activateTounge, closeModal }) {
  //uiElements
  const [checkMark, setCheckMark] = useState(false);
  const [uiState, setUiState] = useState(0);

  const animationRef = useRef(null);
  const canvasRef = useRef(null);

  const [detector, setDetector] = useState(null);

  useEffect(() => {
    onAppear();
    prepareModel({ detector, setDetector });
  }, []);

  //prepare video
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (videoRef && videoRef.current) {
      prepareVideo({ videoRef, toast, closeModal, setVideoReady });
    }
  }, [videoRef]);

  useEffect(() => {
    if (detector && videoReady && canvasRef && canvasRef.current) {
      setUiState(1);
      detectFace();
    }
  }, [detector, videoReady, canvasRef]);

  const [windowWidth, windowHeight] = useResize();
  const [yDevAvg, setYDevAvg] = useState({ count: 0, avg: 0 });
  const [yDevLastVal, setYDevLastVal] = useState(0);
  const [abnormalYDevCount, setAbnormalYDevCount] = useState(0);

  const detectFace = async () => {
    if (canvasRef && canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");

      ctx.scale(1, 1);
      ctx.width = Math.min(windowWidth * 0.9, 400);
      ctx.height = Math.min(windowWidth * 0.9, 400);

      let result = await detector.estimateFaces(videoRef.current);
      if (result && result[0] && result[0].keypoints && result[0].box) {
        let res = drawResults(ctx, result, true, true, Math.min(windowWidth * 0.9, 400), Math.min(windowWidth * 0.9, 400));
        setYDevAvg((curr) => {
          let newAvg = (curr.avg * curr.count + res) / (curr.count + 1);
          return { count: curr.count + 1, avg: newAvg };
        });
        setYDevLastVal(res);
      }
    }

    animationRef.current = window.requestAnimationFrame(detectFace);
  };

  useEffect(() => {
    if (uiState === 3) {
      toast.info("Now, stick out your tounge.");
    }
  }, [uiState]);

  useEffect(() => {
    if (uiState === 1) {
      setUiState(2);
    }
    if (uiState === 3) {
      if (yDevLastVal > yDevAvg.avg * 1.4) {
        setAbnormalYDevCount((c) => c + 1);
      }
    }
  }, [uiState, yDevAvg]);

  const [toungeBackgroundHue, setToungeBackgroundHue] = useState(200);

  useEffect(() => {
    setToungeBackgroundHue(200 + abnormalYDevCount);
    if (abnormalYDevCount === 20) {
      toast.info("Keep on!");
    }
    if (abnormalYDevCount === 30) {
      handleToungeVerified();
    }
  }, [abnormalYDevCount]);

  function handleToungeVerified() {
    const interval = setInterval(() => {
      setToungeBackgroundHue((h) => (h + 17) % 360);
    }, 200);

    const timeoutB = setTimeout(() => {
      toast.info("Keep on! A bit longer!!");
    }, 2000);

    const timeoutA = setTimeout(() => {
      toast.success("Congratulations! Verified your humanity!!");
      setCheckMark(true);
      const timeout = setTimeout(() => {
        closeModal();
      }, 4500);
      return () => clearTimeout(timeout);
    }, 4500);
    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
      clearInterval(interval);
    };
  }

  //voice
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (uiState === 2) {
      const timeout = setTimeout(() => {
        toast.success("Human face Detected!");
      }, 1500);

      const timeout2 = setTimeout(() => {
        toast.info(`Now Speak "I'm not really a human"`);
        SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
      }, 3500);

      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, [uiState]);

  const timeoutRef = useRef(null);
  const [retry, setRetry] = useState(false);
  useEffect(() => {
    if (transcript) {
      const includes = ["human", "not"].every((word) => transcript.includes(word));
      console.log(includes);
      if (includes) {
        handleSucceed();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setRetry(true);
          }, 1000);
        } else {
          timeoutRef.current = setTimeout(() => {
            setRetry(true);
          }, 1000);
        }
      }
    }
  }, [transcript]);

  function handleSucceed() {
    SpeechRecognition.stopListening();
    if (!activateTounge) {
      toast.success("Verified your humanity!!");
      setCheckMark(true);
      const timeout = setTimeout(() => {
        closeModal();
      }, 2100);
      return () => clearTimeout(timeout);
    } else {
      toast.success("Voice Detected!");
      const timeout = setTimeout(() => {
        setUiState(3);
      }, 2100);

      return () => clearTimeout(timeout);
    }
  }

  useEffect(() => {
    if (retry) {
      handleRetry();
    }
  }, [retry]);

  function handleRetry() {
    toast.danger("Say That Again");
    toast.warning(`You said "${transcript}"`);
    setRetry(false);
    resetTranscript();
  }

  useEffect(() => {
    if (animationRef && animationRef.current) {
      return () => window.cancelAnimationFrame(animationRef.current);
    }
  }, [animationRef]);

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <S.Video ref={videoRef} autoPlay="autoplay" loop playsinline muted preLoad="auto" />
      <S.Inner style={{ background: uiState === 3 && `hsl(${toungeBackgroundHue}, 100%, 50%)` }}>
        {Array.from({ length: 5 }, (_, k) => (
          <S.Surrounders key={k} idx={k} />
        ))}

        {uiState === 0 && <S.Title>Are you a human?</S.Title>}
        {uiState === 0 && <S.Text>We will try to regonise your face.</S.Text>}
        {uiState === 2 && <S.Title uiState={2}>{`Now Speak "I'm not really a human"`}</S.Title>}
        {uiState === 3 && <S.Title uiState={3}>{`Now, Stick out your tongue and keep it there for a while.`}</S.Title>}
        <S.Canvas ref={canvasRef} width={Math.min(windowWidth * 0.9, 400)} height={Math.min(windowWidth * 0.9, 400)} />

        {checkMark && <CheckMark />}
      </S.Inner>

      <Toast />
    </S.Container>
  );
}
