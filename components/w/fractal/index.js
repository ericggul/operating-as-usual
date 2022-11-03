import * as S from "./styles";

import { useState, useEffect, useRef } from "react";

const REPEAT = 6;
const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Chat() {
  //canvas refs
  const canvasContainer = useRef(null);
  const canvasItem = useRef(null);

  //canvas init
  useEffect(() => {
    if (canvasContainer && canvasContainer.current) {
      canvasItem.current = new Canvas(canvasContainer.current);
      return () => canvasItem.current.destroy();
    }
  }, [canvasContainer]);

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
    this.wholeWidth = Math.min(this.stageHeight, this.stageWidth) * 0.8;
    this.xMargin = (this.stageWidth - this.standardWidth) / 2;
    this.yMargin = (this.stageHeight - this.standardWidth) / 2;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);
    this.init();
  }

  destroy() {
    this.wrapper.removeChild(this.canvas);
  }

  init() {
    this.time = 0;
    this.palette = [`hsl(141, 35%, 42%)`, `hsl(189, 35%, 52%)`, `hsl(58, 45%, 65%)`, `hsl(44, 8%, 73%)`];
    this.draw();
  }

  setupPalette() {}

  draw() {
    let unitWidth = this.stageWidth / 50;
    let unitHeight = this.stageHeight / 30;
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        this.ctx.fillStyle = getRandomFromArray(this.palette);
        this.ctx.fillRect(unitWidth * i, unitHeight * j, unitWidth, unitHeight);
      }
    }

    this.time++;
    //animationframe
    requestAnimationFrame(this.draw.bind(this));
  }
}
