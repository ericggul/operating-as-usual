import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, hsl(100, 100%, 90%) 0%, hsl(200, 100%, 90%) 100%);
  font-family: Helvetica;
`;

export const Inner = styled.div`
  width: 120%;
  height: 120%;
  ${FlexCenterStyle};
  flex-direction: column;
  position: relative;
  transform: rotate(3deg);
`;

export const Row = styled.div`
  min-width: 130%;
  ${FlexCenterStyle};
`;

export const SingleChatContainer = styled.div`
  width: ${({ theme }) => (theme.windowHeight * 0.75) / 2}px;
  height: ${({ theme }) => theme.windowHeight * 0.75}px;
  ${({ theme }) => `margin: ${theme.windowHeight * 0.04}px ${theme.windowHeight * 0.032}px`};
  border-radius: ${({ theme }) => theme.windowHeight * 0.035}px;
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`;

export const ChatInner = styled.div`
  width: 90%;
  min-height: 90%;
  position: relative;
`;

export const Chat = styled.div`
  box-sizing: border-box;
  width: fit-content;
  max-width: 90%;
  font-size: 14px;
  background: ${({ left }) => (left ? "white" : "hsl(200, 100%, 94%)")};

  padding: 8px 16px;

  border-radius: ${({ left }) => (left ? "15px 15px 15px 0" : "15px 15px 0 15px")};

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 13px 0;
  ${({ left }) => !left && "margin-left: auto;"}
`;
