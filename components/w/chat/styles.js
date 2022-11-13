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
  transition: all 0.3s ease-in-out;
`;

export const TunnelContainer = styled.div`
  opacity: 0.3;
  ${WholeContainer};
`;

export const Text = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  color: white;
  font-size: 8rem;
  font-family: Times New Roman;
`;
