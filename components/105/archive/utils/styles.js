import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  z-index: 1;
  pointer-events: none;
`;

export const InfoIconContainer = styled.div`
  pointer-events: all;
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
`;

export const QRContainer = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 10vw;
  height: 10vw;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const InfoIcon = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  filter: drop-shadow(0 0 0.5rem #fff);

  ${({ isAdmin }) =>
    isAdmin &&
    `
  width: 6vw;
  height: 6vw;
  `})}
`;
