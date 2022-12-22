import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  font-size: 5vw;
  background: black;
  color: white;
  z-index: 999;

  animation: appear 1.5s;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  p {
    font-size: 3.5vw;
    max-width: 80%;
    text-align: center;
    margin-top: 5vw;
  }
`;
