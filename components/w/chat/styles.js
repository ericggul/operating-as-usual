import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;
  background: radial-gradient(#aaa 0%, #000 100%);
  font-family: Helvetica;
`;

export const Inner = styled.div`
  min-width: 100%;
  min-height: 100%;
  ${FlexCenterStyle};
  position: relative;
  transform: scale(${({ scaleInner }) => scaleInner});
  transition: all 1s ease-in-out;
`;
