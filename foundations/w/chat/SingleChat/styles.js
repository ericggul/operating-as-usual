import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const SingleChatContainer = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    borderRadius: `${props.theme.windowHeight * 0.03}px`,
  },
}))`
  position: absolute;

  background: radial-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.3) 100%);
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

export const Chat = styled.div.attrs((props) => ({
  style: {
    background: props.left ? `linear-gradient(hsl(200, 100%, ${97 - props.locationIdx ** 1.3 * 0.95}%), hsl(200, 100%, ${83 - props.locationIdx ** 1.3 * 0.95}%))` : "white",
    borderRadius: props.left ? "15px 15px 15px 0" : "15px 15px 0 15px",
    marginLeft: !props.left && "auto",
    transformOrigin: props.left ? "left bottom" : "right bottom",
  },
}))`
  box-sizing: border-box;
  width: fit-content;
  max-width: 90%;
  font-size: 15px;
  padding: 8px 16px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 13px 0;
  ${FlexCenterStyle};
  transition: all 0.3s ease-in-out;

  position: relative;
  overflow: hidden;

  animation: appear-chat 0.4s;
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

export const ChatLoading = styled.div.attrs((props) => ({
  style: {
    transform: `scaleX(${1 - props.loadingLevel / 100})`,
  },
}))`
  perspective: 30px;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, white, black);
  transition: all 0.1s ease-in-out;
  transform-origin: right;
  right: 0;

  font-family: Times New Roman;
  color: white;
  ${FlexCenterStyle};
  font-size: 1.2rem;
  overflow: hidden;
`;

export const HiddenText = styled.div`
  opacity: 0;
`;

export const Loading = styled.div.attrs((props) => ({
  style: {
    animationDelay: `${props.i * 0.1}s`,
  },
}))`
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.2rem 0.1rem;
  border-radius: 50%;
  background: #f3f3f3;

  animation: jump-dots 0.8s infinite ease-in-out;
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

export const BlinkInner = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ flash }) => (flash ? "white" : "black")};
`;
