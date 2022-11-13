import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  background: rgb(10, 0, 40);
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;

  font-family: Helvetica;

  cursor: none;
  transition: all 0.3s ease-in-out;
`;

export const Square = styled.div`
  position: absolute;
  border-radius: 50%;
`;

export const OnTop = styled.div`
  ${WholeContainer};
  z-index: 5;
  background: radial-gradient(transparent 0%, transparent 30%, black 70%);
  background-size: ${({ cycleState }) => `${20 / (cycleState + 1)}px ${20 / (cycleState + 1)}px`};
`;
