import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
  z-index: 5;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: appear 0.5s;
`;
