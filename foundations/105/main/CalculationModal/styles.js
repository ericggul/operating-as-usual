import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
  z-index: 5;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: appear 0.5s;
`;

export const Inner = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 300)}px;
  height: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 300)}px;
  background: transparent;
  color: black;
  ${FlexCenterStyle};
  flex-direction: column;
  position: relative;
`;

export const GridBackground = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0.1rem, transparent 0.1rem), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0.1rem, transparent 0.1rem);
  background-size: 1.3rem 1.3rem;
  background-repeat: repeat;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
`;

export const Questions = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: row;
  height: 1.4rem;
`;

export const Index = styled.div`
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Text = styled.div`
  width: 7rem;
`;
export const Input = styled.input`
  background: transparent;
  outline: 0;
  border: none;
  border-bottom: 1px solid black;
  font-weight: 600;
  font-size: 1rem;
  height: 0.8rem;
  font-family: Courier New;

  width: 2rem;
  margin-left: 0.4rem;

  transition: all 0.3s;

  &:focus {
    border-bottom: 1px solid black;
  }
`;

export const CheckMark = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const CheckmarkSVG = styled.svg`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #222;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #222;
    }
  }
`;

export const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #222;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;
