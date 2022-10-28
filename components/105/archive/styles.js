import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  font-family: Courier New;
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
