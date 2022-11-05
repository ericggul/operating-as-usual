import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;

  font-family: Helvetica;

  cursor: none;
  color: white;
  font-size: 3rem;
  text-transform: uppercase;

  opacity: 0;
  ${({ opening }) => opening && "opacity: 1;"}
  transition: opacity 1s ease-in-out;
`;
