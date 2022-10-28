export async function prepareVideo({ videoRef, toast, closeModal, setVideoReady }) {
  if (videoRef.current === null) {
    return;
  }
  const video = videoRef.current;
  video.width = window.innerWidth;
  video.height = window.innerHeight;

  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  const videoConfig = {
    audio: false,
    video: {
      facingMode: "user",
    },
  };

  if (!"mediaDevices" in navigator || !"getUserMedia" in navigator.mediaDevices) {
    alert("This browser does not support video capture, or this device does not have a camera");
    toast.warning("This browser does not support video capture, or this device does not have a camera");
    toast.danger("Cannot verify your humanity.");
    closeModal();
    return;
  }

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
}
