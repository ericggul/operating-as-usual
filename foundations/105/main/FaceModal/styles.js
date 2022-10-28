import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  font-family: Helvetica;
  animation: appear 0.5s;
  color: white;
`;

export const Inner = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  position: relative;

  width: ${({ theme }) => Math.min(theme.windowWidth * 0.9, 400)}px;
  height: ${({ theme }) => Math.min(theme.windowWidth * 0.9, 400)}px;
  flex-direction: column;
  background: black;

  transition: all 0.2s linear;
  box-shadow: 0 0 1rem white;
`;

export const Title = styled.div`
  z-index: 10;

  animation: appear 1s both;
  animation-delay: 0.5s;
  font-size: 1rem;
  margin-bottom: 75%;
  max-width: 80%;
  text-align: center;

  ${({ uiState }) => uiState === 2 && "animation-delay: 3.5s"};

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Text = styled.div`
  z-index: 10;

  animation: appear 1s both;
  animation-delay: 1.5s;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
`;

export const Surrounders = styled.div`
  position: absolute;
  width: calc(100% - ${({ idx }) => (idx + 1) * 0.25}rem);
  height: calc(100% - ${({ idx }) => (idx + 1) * 0.25}rem);
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;

  border: 1px solid white;

  animation: appear-disappear 1.5s infinite linear;
  opacity: 0;
  animation-delay: ${({ idx }) => -idx * 0.05}s;
  @keyframes appear-disappear {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    30% {
      opacity: 1;
    }
    45% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;
