import * as S from "./styles";
import { useRef, useEffect, useState } from "react";

export default function Component() {
  //canvas refs
  const canvasContainer = useRef(null);
  const canvasItem = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  //canvas init
  useEffect(() => {
    if (canvasContainer && canvasContainer.current) {
      canvasItem.current = new Canvas(canvasContainer.current);
      setCanvasReady(true);
      return () => canvasItem.current.destroy();
    }
  }, [canvasContainer]);

  const videoEl = useRef(null);

  //record canvas to video

  useEffect(() => {
    if (videoEl && videoEl.current && canvasReady) {
      const stream = canvasItem.current.canvas.captureStream(120);
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = (e) => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        const videoURL = window.URL.createObjectURL(blob);
        videoEl.current.src = videoURL;

        //download blob
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = videoURL;
        a.download = "673.mp4";
        a.click();
      };

      mediaRecorder.start();

      const timeout = setTimeout(() => {
        mediaRecorder.stop();
      }, 20 * 1000);
    }
  }, [videoEl, canvasReady]);

  return (
    <S.Container ref={canvasContainer}>
      <video ref={videoEl} />
    </S.Container>
  );
}

const MAIN_COLORS = [
  { r: 8, g: 23, b: 95 },
  { r: 49, g: 32, b: 112 },
  { r: 181, g: 223, b: 225 },
];
const SUB_COLORS = [
  { r: 182, g: 131, b: 60 },
  { r: 217, g: 187, b: 114 },
  { r: 168, g: 146, b: 219 },
  { r: 243, g: 187, b: 153 },
];

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomMainColor = () => {
  let standardColor;
  let random = Math.random();

  if (random < 0.4) {
    standardColor = MAIN_COLORS[0];
  } else if (random < 0.8) {
    standardColor = MAIN_COLORS[1];
  } else {
    standardColor = MAIN_COLORS[2];
  }

  return {
    r: standardColor.r + getRandom(-10, 10),
    g: standardColor.g + getRandom(-10, 10),
    b: standardColor.b + getRandom(-10, 10),
  };
};

class Canvas {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = document.documentElement.clientWidth;
    this.stageHeight = this.stageWidth > 768 ? document.documentElement.clientHeight : window.innerHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.staticSquareNumber = 10000;
    this.staticSquareSets = [];

    this.dynamicSquareNumber = 1000;
    this.dynamicSquareSets = [];

    this.init();
    this.ctx.scale(1, 1);
  }

  destroy() {
    this.wrapper.removeChild(this.canvas);
  }

  init() {
    for (let i = 0; i < this.staticSquareNumber; i++) {
      this.staticSquareSets.push(
        new Square(
          {
            x: getRandom(0.005, getRandom(0.015, 0.05)),
            y: getRandom(0.04, getRandom(0.08, 0.2)),
          },
          this.stageWidth,
          this.stageHeight,
          this.ctx,
          getRandom(0.1, getRandom(0.2, 0.4))
        )
      );
    }

    for (let i = 0; i < this.dynamicSquareNumber; i++) {
      this.dynamicSquareSets.push(
        new Square(
          {
            x: getRandom(0.003, getRandom(0.01, 0.02)),
            y: getRandom(0.025, getRandom(0.05, 0.1)),
          },
          this.stageWidth,
          this.stageHeight,
          this.ctx,
          getRandom(0.01, 0.03)
        )
      );
    }

    this.draw();
    this.animate();
  }

  draw() {
    this.staticSquareSets.map((square) => square.draw());
  }

  animate() {
    this.dynamicSquareSets.map((square) => square.animate());
  }
}

class Square {
  constructor(size, stageWidth, stageHeight, ctx, opacity) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.ctx = ctx;

    this.center = {
      x: getRandom(0, 1),
      y: getRandom(0, 1),
    };
    this.radial = getRandom(0.01, 0.03);
    this.angle = getRandom(0, 360);

    this.size = size;

    this.interval = { x: getRandom(-0.001, 0.001), y: getRandom(-0.001, 0.001) };
    this.rotate = getRandom(0, 360);

    this.color = getRandomMainColor();
    this.colorVector = {
      r: getRandom(-10, 10),
      g: getRandom(-10, 10),
      b: getRandom(-10, 10),
    };

    this.opacity = opacity;
  }

  draw() {
    this.pos = {
      x: this.center.x + this.radial * Math.cos(this.angle),
      y: this.center.y + this.radial * Math.sin(this.angle),
    };

    this.ctx.save();
    this.ctx.translate(this.pos.x * this.stageWidth, this.pos.y * this.stageHeight);
    this.ctx.rotate((this.rotate * Math.PI) / 180);
    this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    this.ctx.fillRect((-this.size.x * this.stageWidth) / 2, (-this.size.y * this.stageHeight) / 2, this.size.x * this.stageWidth, this.size.y * this.stageHeight);
    this.ctx.restore();
  }

  animate() {
    //requestanimationframe
    window.requestAnimationFrame(this.animate.bind(this));

    this.angle += getRandom(0, getRandom(0, 0.04));
    this.rotate += getRandom(1, getRandom(1, 20));

    this.draw();
  }
}
