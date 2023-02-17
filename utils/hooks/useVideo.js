//hooks
import { useState, useMemo, useRef, useEffect } from "react";
import useResize from "utils/hooks/useResize";

export default function useVideo(video, aspectRatio = 16 / 9, customSize = false) {
  const [videoReady, setVideoReady] = useState(false);
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    if (video && !videoReady && windowWidth && windowHeight) {
      prepareVideo();
    }
  }, [videoReady, video, aspectRatio, windowWidth, windowHeight, customSize]);

  useEffect(() => {
    return clearVideo;
  }, []);

  async function prepareVideo() {
    try {
      if (video === null) return;

      if (customSize) {
        video.width = customSize.width;
        video.height = customSize.height;
      } else {
        video.width = windowWidth;
        video.height = windowHeight;
      }

      video.setAttribute("autoplay", "");
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      const videoConfig = {
        audio: false,
        video: {
          facingMode: "user",
          aspectRatio: { ideal: aspectRatio },
        },
      };

      if (!"mediaDevices" in navigator || !"getUserMedia" in navigator.mediaDevices) {
        console.log("warning");
        return;
      }

      //appply constraints
      const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
      video.srcObject = stream;

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });

      video.play();
      video.addEventListener(
        "canplay",
        () => {
          video.play();
        },
        false
      );
      setVideoReady(true);
    } catch (e) {
      console.log(e);
    }
  }

  function clearVideo() {
    if (video === null) return;

    video.pause();
    video.srcObject = null;
    setVideoReady(false);
  }

  return videoReady;
}
