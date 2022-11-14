import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
`;

export const FadeOut = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  z-index: 10;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  background: black;
  animation: appear 2s ease-in-out;
`;
