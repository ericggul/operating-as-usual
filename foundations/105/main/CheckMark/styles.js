import styled from "styled-components";

export const CheckMark = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
`;

export const CheckmarkSVG = styled.svg`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 30;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #222;
  animation: fill 0.5s ease-in-out forwards, scale 0.4s ease-in-out 0.5s both;
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.5, 1.5, 1.3) rotate(5deg);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #222;
    }
  }
`;

export const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: stroke 0.3s 0.3s forwards;

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;
