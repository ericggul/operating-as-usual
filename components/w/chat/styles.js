import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;
  background: #e8e8e8;
  font-family: Helvetica;
`;

export const Inner = styled.div`
  min-width: 100%;
  min-height: 100%;
  ${FlexCenterStyle};
  position: relative;
`;

export const SingleChatContainer = styled.div`
  position: absolute;

  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ theme }) => theme.windowHeight * 0.035}px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
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
  font-size: 14px;
  background: ${({ left, idx }) => (left ? `linear-gradient(hsl(0, 100%, ${100 - idx * 2}%), hsl(0, 100%, ${97 - idx * 2}%))` : "white")};

  padding: 8px 16px;

  border-radius: ${({ left }) => (left ? "15px 15px 15px 0" : "15px 15px 0 15px")};

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 13px 0;
  ${({ left }) => !left && "margin-left: auto;"}
  ${FlexCenterStyle};
  transition: all 0.3s ease-in-out;
`;

export const Loading = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.1rem;
  border-radius: 50%;
  background: ${({ left }) => (left ? "#f3f3f3" : "#ccc")};

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
