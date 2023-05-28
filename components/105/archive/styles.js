import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  font-family: Roboto;
  background: black;
  color: white;
`;

export const CanvasContainer = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: appear 3s both;
  animation-delay: 1s;
`;

export const RightWrapper = styled.div`
  background: rgba(200, 200, 200, 0.1);
  box-shadow: 0 0 0.5vw 0.5vw rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.8vw);
  position: absolute;
  right: 0;
  height: 100%;
  color: white;
  width: 28vw;

  display: flex;
  font-family: Roboto;

  flex-direction: column;

  ${({ animate }) =>
    animate
      ? `animation: right-wrapper-animation 20s linear infinite;`
      : `
transform: translateX(0);
opacity: 1;
`}

  @keyframes right-wrapper-animation {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    30% {
      transform: translateX(0);
      opacity: 1;
    }
    35% {
      transform: translateX(100%);
      opacity: 0;
    }
    95% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const RightInner = styled.div`
  padding-top: 3vw;
  padding-left: 3vw;
  padding-right: calc(max(2vw, 10%));

  h1 {
    font-size: 2.5vw;
  }
`;

export const Expl = styled.div`
  font-size: 2vw;
  margin-top: 0.2vw;
  margin-bottom: 3.6vw;
  font-style: italic;
`;

export const ImageWrapper = styled.div`
  max-width: calc(min(100%, 30vh));
  margin-top: 3.5vw;

  img {
    width: 100%;
  }
`;

export const Footer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  margin-bottom: 2vw;

  p {
    font-size: 1.5vw;
  }

  h2 {
    font-size: 2.3vw;
  }
`;

export const TextWrapper = styled.div`
  font-size: 2vw;
  width: 100%;
  line-height: 1.1;

  span {
    font-size: 2.2vw;
    font-weight: bold;
  }
`;
