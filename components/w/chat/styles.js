import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Wrapper = styled.div`
  ${WholeContainer};
  background: black;
`;

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;
  background: radial-gradient(#aaa 0%, #000 100%);
  font-family: Helvetica;
  cursor: none;

  animation: appear 2s;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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
  opacity: ${({ opacity }) => opacity};
  transition: all 0.5s linear;
  ${WholeContainer};
`;

export const Text = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  color: white;
  font-size: 8rem;
  font-family: Times New Roman;
  opacity: ${({ opacity }) => opacity};
  transition: all 0.5s linear;
`;
