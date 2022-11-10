import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;

  z-index: 8;

  font-family: Helvetica;

  cursor: none;
  color: white;
  font-size: 12vw;
  text-transform: uppercase;

  background: black;

  opacity: 0;
  ${({ opening }) => opening && "opacity: 1;"}
  transition: opacity 1s ease-in-out;

  p {
    text-align: center;
    z-index: 3;
  }
`;

export const ClosingAnimation = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  z-index: 0;
`;

export const Closing = styled.div`
  ${WholeContainer};
  z-index: 0;
  background: black;

  animation: go-down 1s ease-in-out both;
  @keyframes go-down {
    0% {
      transform: translateY(-${({ theme }) => theme.windowHeight}px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
