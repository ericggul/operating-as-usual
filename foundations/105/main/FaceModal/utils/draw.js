import { TRIANGULATION } from "./triangulation";
import { GREEN, LABEL_TO_COLOR, NUM_IRIS_KEYPOINTS, NUM_KEYPOINTS, RED } from "./params";
import { mouseDetection } from "./mouseDetection";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

function drawPath(ctx, points, closePath, width, midpointX, midpointY) {
  function convertX(val) {
    return width / 2 + (val - midpointX);
  }

  function convertY(val) {
    return width / 2 + (val - midpointY);
  }

  const region = new Path2D();
  region.moveTo(convertX(points[0][0]), convertY(points[0][1]));
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(convertX(point[0]), convertY(point[1]));
  }

  if (closePath) {
    region.closePath();
  }

  ctx.stroke(region);
}

export function drawResults(ctx, faces, triangulateMesh, boundingBox, width, height) {
  ctx.clearRect(0, 0, width, height);

  let box = faces[0].box;
  let midpointX = (box.xMin + box.xMax) / 2;
  let midpointY = (box.yMin + box.yMax) / 2;

  function convertXLeft(val) {
    return width / 4 + (val - midpoint);
  }

  let sdv;

  faces.forEach((face) => {
    const keypoints = face.keypoints.map((keypoint) => [keypoint.x, keypoint.y]);

    // if (keypoints.length > NUM_KEYPOINTS) {
    //   ctx.strokeStyle = RED;
    //   ctx.lineWidth = 1;

    //   const leftCenter = keypoints[NUM_KEYPOINTS];
    //   const leftDiameterY = distance(keypoints[NUM_KEYPOINTS + 4], keypoints[NUM_KEYPOINTS + 2]);
    //   const leftDiameterX = distance(keypoints[NUM_KEYPOINTS + 3], keypoints[NUM_KEYPOINTS + 1]);

    //   ctx.beginPath();
    //   ctx.ellipse(convertXLeft(leftCenter[0]), leftCenter[1], leftDiameterX / 2, leftDiameterY / 2, 0, 0, 2 * Math.PI);
    //   ctx.stroke();

    //   if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
    //     const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];
    //     const rightDiameterY = distance(keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2], keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]);
    //     const rightDiameterX = distance(keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3], keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]);

    //     ctx.beginPath();
    //     ctx.ellipse(convertXLeft(rightCenter[0]), rightCenter[1], rightDiameterX / 2, rightDiameterY / 2, 0, 0, 2 * Math.PI);
    //     ctx.stroke();
    //   }
    // }

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh);

    for (const [label, contour] of Object.entries(contours)) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;

      const path = contour.map((index) => keypoints[index]);

      if (label === "lips") {
        const keypoints = face.keypoints.map((keypoint) => [keypoint.x, keypoint.y]);
        const path = contour.map((index) => keypoints[index]);
        sdv = mouseDetection(path);
      }

      if (path.every((value) => value != undefined)) {
        drawPath(ctx, path, false, width, midpointX, midpointY);
      }
    }
  });
  return sdv;
}
