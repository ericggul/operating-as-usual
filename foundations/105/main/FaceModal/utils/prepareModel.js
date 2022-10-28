import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export async function prepareModel({ detector, setDetector }) {
  if (detector != null) {
    return;
  }

  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
  };
  let detect = await faceLandmarksDetection.createDetector(model, detectorConfig);

  setDetector(detect);
}
