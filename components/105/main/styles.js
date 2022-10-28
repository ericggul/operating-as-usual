import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  font-family: Courier New;
`;

export const Background = styled.div`
  ${WholeContainer};
  background: black;
  color: white;
  z-index: -1;
  pointer-events: none;
`;

export const CanvasContainer = styled.div`
  ${WholeContainer};

  animation: appear 0.8s ease-in-out both;
  animation-delay: 1s;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Loading = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
`;
