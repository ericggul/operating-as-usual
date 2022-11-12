import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const SingleChatContainer = styled.div`
  position: absolute;

  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ height }) => height * 0.03}px;
  background: radial-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.3) 100%);
  // box-shadow: 3px 5px 10px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  transition: all 1s;
`;

export const ChatInner = styled.div`
  width: 89%;
  position: relative;
  margin-bottom: 1rem;
`;

export const Chat = styled.div`
  box-sizing: border-box;
  width: fit-content;
  max-width: 90%;
  font-size: 15px;
  background: ${({ left, locationIdx }) => (left ? `linear-gradient(hsl(200, 100%, ${97 - locationIdx * 3}%), hsl(200, 100%, ${94 - locationIdx * 3}%))` : "white")};

  padding: 8px 16px;

  border-radius: ${({ left }) => (left ? "15px 15px 15px 0" : "15px 15px 0 15px")};

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 13px 0;
  ${({ left }) => !left && "margin-left: auto;"}
  ${FlexCenterStyle};
  transition: all 0.3s ease-in-out;
  transform-origin: ${({ left }) => (left ? "left bottom" : "right bottom")};
  // transform: ${({ isLoading, left }) => !left && (isLoading ? "scale: 0" : "scale: 1")};
  // transform: ${({ loadingLevel }) => loadingLevel && `scale(${Math.min(loadingLevel * 0.02, 1.2)})`};
  position: relative;
  overflow: hidden;

  ${({ left }) => left && `animation: appear-chat 0.4s;`}
  @keyframes appear-chat {
    0% {
      transform: scale(0.5);
    }
    20% {
      transform: scale(1.1) rotate(3deg);
    }
    40% {
      transform: scale(0.9) rotate(-3deg);
    }
    60% {
      transform: scale(1.05) rotate(1deg);
    }
    80% {
      transform: scale(0.95) rotate(-1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
`;

export const ChatLoading = styled.div`
  position: absolute;
  width: ${({ loadingLevel }) => loadingLevel}%;
  height: 100%;
  background: black;
  transition: all 0.1s ease-in-out;
  left: 0;
`;

export const HiddenText = styled.div`
  opacity: 0;
`;

export const Loading = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.2rem 0.1rem;
  border-radius: 50%;
  background: #f3f3f3;

  animation: jump-dots 0.8s infinite ease-in-out;
  animation-delay: ${({ i }) => i * 0.1}s;
  @keyframes jump-dots {
    0% {
      transform: translateY(0rem);
    }
    25% {
      transform: translateY(-0.3rem);
    }
    50% {
      transform: translateY(0rem);
    }
  }
`;
