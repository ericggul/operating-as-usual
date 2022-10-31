import * as S from "./styles";

import { useState, useEffect, useRef } from "react";

const REPEAT = 4;
const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function VisualTest({ data }) {
  //canvas refs
  const canvasContainer = useRef(null);
  const canvasItem = useRef(null);

  //bubbled data
  const [bubbledData, setBubbledData] = useState(new Array(REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));

  useEffect(() => {
    setBubbledData(new Array(REPEAT * REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));
  }, [data]);

  //canvas init
  useEffect(() => {
    if (canvasContainer && canvasContainer.current) {
      canvasItem.current = new Canvas(canvasContainer.current);
      return () => canvasItem.current.destroy();
    }
  }, [canvasContainer]);

  useEffect(() => {
    if (canvasItem && canvasItem.current) {
      canvasItem.current.init(bubbledData);
    }
  }, [bubbledData, canvasItem]);

  return <S.Container ref={canvasContainer}></S.Container>;
}

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

    this.innerWidth = Math.min(this.stageWidth, this.stageHeight) * 0.85;
    this.xStart = (this.stageWidth - this.innerWidth) / 2;
    this.yStart = (this.stageHeight - this.innerWidth) / 2;
    this.ctx.scale(1, 1);
  }

  destroy() {
    this.wrapper.removeChild(this.canvas);
  }

  init(data) {
    this.sqrLength = Math.sqrt(data.length);
    this.singleWidth = this.innerWidth / this.sqrLength;

    this.draw(data);
  }

  draw(data) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "#000";

    data.forEach((datum, i) => this.drawSingleSquare(datum, i % this.sqrLength, Math.floor(i / this.sqrLength)));
  }

  drawSingleSquare(datum, x, y) {
    let w = 2;
    let h = datum * this.singleWidth * 0.35;
    this.ctx.save();
    let xCenter = this.xStart + this.singleWidth * x + this.singleWidth / 2;
    let yCenter = this.yStart + this.singleWidth * y + this.singleWidth / 2;

    this.ctx.translate(xCenter, yCenter);
    this.ctx.rotate((Math.round(datum) * Math.PI) / 3);

    this.ctx.fillRect(-w / 2, -h / 2, w, h);

    this.ctx.restore();
  }
}
