import * as S from "./styles";

import useResize from "utils/hooks/useResize";

import { useState, useEffect, useMemo, useRef } from "react";

export default function JPGConversation() {
  //page state
  const [pageIsMain, setPageIsMain] = useState(false);
  const [image, setImage] = useState("/assets/images/jpgconversation/1.jpg");

  const [morphState, setMorphState] = useState(0);

  useEffect(() => {
    //keypress

    if (pageIsMain) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [pageIsMain]);

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") {
      setMorphState((st) => st + 1);
    }
    if (e.key === "ArrowLeft") {
      setMorphState((st) => Math.max(st - 1, 0));
    }
  };

  function handleUploadComplete(image) {
    setImage(image);
    setPageIsMain(true);
  }

  //canvas refs

  const canvasContainer = useRef(null);
  const canvasItem = useRef(null);

  //canvas init
  useEffect(() => {
    if (canvasContainer && canvasContainer.current && pageIsMain) {
      canvasItem.current = new Canvas(canvasContainer.current, image);
      return () => canvasItem.current.destroy();
    }
  }, [canvasContainer, pageIsMain]);

  useEffect(() => {
    if (canvasItem && canvasItem.current) {
      if (morphState < 40) {
        canvasItem.current.draw(Math.floor(1000 / (morphState * 2 + 1)));
      } else if (morphState < 45) {
        canvasItem.current.drawRandom(morphState);
      } else if (morphState < 86) {
        canvasItem.current.drawRandom(morphState, Math.floor(1000 / ((85 - morphState) * 2 + 1)));
      } else if (morphState < 126) {
        canvasItem.current.drawDistortedRandom(morphState, Math.floor(1000 / ((morphState - 86) * 2 + 1)));
      } else if (morphState < 166) {
        canvasItem.current.drawWrappedRandom(morphState, Math.floor(1000 / ((165 - morphState) * 2 + 1)));
      } else if (morphState < 206) {
        canvasItem.current.drawWrappedRandom(morphState, Math.floor(1000 / ((morphState - 166) * 2 + 1)));
      } else if (morphState < 246) {
        canvasItem.current.drawWrappedRandom2(morphState, Math.floor(1000 / ((245 - morphState) * 2 + 1)));
      } else if (morphState < 286) {
        canvasItem.current.drawWrappedRandom2(morphState, Math.floor(1000 / ((morphState - 246) * 2 + 1)));
      }
    }
  }, [morphState, canvasItem]);

  return (
    <S.Container
      ref={canvasContainer}
      style={{
        backgroundColor: pageIsMain ? "white" : "black",
      }}
    >
      {!pageIsMain && <Uploader handleImageChange={handleUploadComplete} />}
    </S.Container>
  );
}

function Uploader({ handleImageChange }) {
  const [imageFile, setImageFile] = useState(!null);
  const [image, setImage] = useState(!null);

  const onImageChange = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 1048576 * 20) {
        alert("File size is too big");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        setImage(reader.result);
        handleImageChange(reader.result);
        let img = new Image();
        img.src = reader.result;
      });
    }
  };

  return (
    <S.UploaderWrapper>
      <input
        type="file"
        accept="image/*"
        id="image-input"
        onChange={onImageChange}
        style={{
          color: "white",
        }}
      />
    </S.UploaderWrapper>
  );
}

class Canvas {
  constructor(wrapper, src) {
    this.wrapper = wrapper;
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.imgSrc = src;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = document.documentElement.clientWidth;
    this.stageHeight = this.stageWidth > 768 ? document.documentElement.clientHeight : window.innerHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.imgObj = new Image();
    this.imgObj.src = this.imgSrc;
    this.imgObj.onload = () => {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      let scale = Math.min(this.stageWidth / this.imgObj.width, this.stageHeight / this.imgObj.height);
      this.ctx.drawImage(
        this.imgObj,
        0,
        0,
        this.imgObj.width,
        this.imgObj.height,
        this.stageWidth / 2 - (this.imgObj.width * scale) / 2,
        this.stageHeight / 2 - (this.imgObj.height * scale) / 2,
        this.imgObj.width * scale,
        this.imgObj.height * scale
      );
      this.imgData = this.ctx.getImageData(0, 0, this.stageWidth, this.stageHeight).data;
      console.log(this.imgData);
      this.draw(this.windowWidth);
    };
  }

  destroy() {
    this.wrapper.removeChild(this.canvas);
  }

  draw(pixelUnit = 1000) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "#000";
    this.ctx.globalAlpha = 0.7;
    this.pixelUnit = pixelUnit;

    if (this.imgData) {
      for (let i = 0; i < this.stageWidth; i += this.pixelUnit) {
        for (let j = 0; j < this.stageHeight; j += this.pixelUnit) {
          let pixel = this.getPixel(i, j);
          this.ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          this.ctx.beginPath();
          this.ctx.arc(i - this.pixelUnit * 0.4, j - this.pixelUnit * 0.4, this.pixelUnit * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawRandom(morphState, pixelUnit = null) {
    if (pixelUnit) {
      this.pixelUnit = pixelUnit;
    }
    if (this.imgData) {
      for (let i = 0; i < this.stageWidth; i += this.pixelUnit) {
        for (let j = 0; j < this.stageHeight; j += this.pixelUnit) {
          let pixel = this.getPixel(i, j);
          this.ctx.fillStyle = `rgb(${(255 - pixel[0] + (morphState - 40) * Math.random() * 2) % 255}, ${(pixel[1] + Math.random() * (morphState - 30) * 3) % 255}, ${pixel[2]})`;
          this.ctx.beginPath();
          this.ctx.arc(i - this.pixelUnit * 0.4, j - this.pixelUnit * 0.4, this.pixelUnit * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawDistortedRandom(morphState, pixelUnit) {
    if (pixelUnit) {
      this.pixelUnit = pixelUnit;
    }
    if (this.imgData) {
      for (let i = 0; i < this.stageWidth; i += this.pixelUnit) {
        for (let j = 0; j < this.stageHeight; j += this.pixelUnit) {
          let pixel = this.getPixel(i, j);

          if (pixel === [0, 0, 0, 0] || pixel === [255, 255, 255, 255] || pixel.includes(0)) {
            this.ctx.fillStyle = `rgb(${(i * 5.1) % 255}, ${(j * 10.7) % 255}, ${((i * 3 + j * 7) * 2) % 255})`;
          } else {
            this.ctx.fillStyle = `rgb(${(255 - pixel[0] + morphState * Math.random()) % 255}, ${(255 - pixel[1]) % 255}, ${255 - pixel[2]})`;
          }

          this.ctx.beginPath();
          this.ctx.arc(i - this.pixelUnit * 0.4, j - this.pixelUnit * 0.4, this.pixelUnit * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawWrappedRandom(morphState, pixelUnit) {
    if (pixelUnit) {
      this.pixelUnit = pixelUnit;
    }
    if (this.imgData) {
      for (let i = 0; i < this.stageWidth; i += this.pixelUnit) {
        for (let j = 0; j < this.stageHeight; j += this.pixelUnit) {
          let pixel = this.getPixel(i, j);
          let pixel2 = this.getPixel(this.stageWidth - i, j + this.pixelUnit);
          if (pixel === [0, 0, 0, 0] || pixel === [255, 255, 255, 255] || pixel.includes(0)) {
            this.ctx.fillStyle = `rgb(${(i * 3.1 + 100) % 255}, ${(j * 7.7 - i * 4 + 300) % 255}, ${((i * 3 + j * 7) * 2) % 255})`;
          } else {
            this.ctx.fillStyle = `rgb(${(pixel[0] + pixel2[0]) % 255}, ${(pixel[1] + pixel2[2]) % 255}, ${pixel[2] + pixel[1]})`;
          }
          this.ctx.beginPath();
          this.ctx.arc(i - this.pixelUnit * 0.4, j - this.pixelUnit * 0.4, this.pixelUnit * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawWrappedRandom2(morphState, pixelUnit) {
    if (pixelUnit) {
      this.pixelUnit = pixelUnit;
    }
    if (this.imgData) {
      for (let i = 0; i < this.stageWidth; i += this.pixelUnit) {
        for (let j = 0; j < this.stageHeight; j += this.pixelUnit) {
          let pixel = this.getPixel(i, j);
          let pixel2 = this.getPixel(this.stageWidth - i, j + this.pixelUnit);
          let pixel3 = this.getPixel(i, this.stageHeight - j);
          let pixel4 = this.getPixel(this.stageWidth - i, this.stageHeight - j);
          if (pixel === [0, 0, 0, 0] || pixel === [255, 255, 255, 255] || pixel.includes(0)) {
            this.ctx.fillStyle = `rgb(${(-i * 5.1) % 255}, ${(j * 4.7 + i * 2.7) % 255}, ${((i * 3 + j * 14) * 2) % 255})`;
          } else {
            this.ctx.fillStyle = `rgb(${(pixel[0] + pixel3[0] + pixel2[0] + pixel4[0]) % 255}, ${(pixel[1] + pixel2[2] + pixel3[1] + pixel4[0]) % 255}, ${
              (pixel[2] + pixel2[1] + pixel3[2] + pixel4[2]) % 255
            })`;
          }
          this.ctx.beginPath();
          this.ctx.arc(i - this.pixelUnit * 0.4, j - this.pixelUnit * 0.4, this.pixelUnit * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  getPixel(i, j) {
    let pixel = [];
    let index = (i + j * this.stageWidth) * 4;
    pixel.push(this.imgData[index]);
    pixel.push(this.imgData[index + 1]);
    pixel.push(this.imgData[index + 2]);
    pixel.push(this.imgData[index + 3]);
    return pixel;
  }
}
