import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;
  background: #ddd;
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
  width: ${({ theme }) => (theme.windowHeight * 0.7) / 2}px;
  height: ${({ theme }) => theme.windowHeight * 0.7}px;
  ${({ theme }) => `margin: ${theme.windowHeight * 0.04}px ${theme.windowHeight * 0.032}px`};
  border-radius: ${({ theme }) => theme.windowHeight * 0.035}px;
  background: #fff;
  position: relative;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
  ${FlexCenterStyle};
`;

export const ChatInner = styled.div`
    width: 90%:
    height: 90%;
    position: relative;
`;

export const Chat = styled.div`
  max-width: 70%;
`;
