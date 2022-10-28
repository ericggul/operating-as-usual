import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";
export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  pointer-events: none;
  z-index: 100;
  font-family: Helvetica;
`;
