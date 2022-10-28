import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  font-family: Roboto;

  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;

  font-weight: 300;
`;

export const Inner = styled.div`
  pointer-events: auto;
  transition: 1s;
  display: flex;

  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 600)}px;

  ${({ isAdmin }) => isAdmin && "align-items: center;"}

  background: rgba(200, 205, 205, 0.4);
  backdrop-filter: blur(15px) grayscale(0.3);
  flex-direction: column;
  position: relative;
  padding: 1.4rem 1rem;
  border-radius: 1rem;
`;

export const CancelButton = styled.div`
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  font-size: 1rem;
  cursor: pointer;
  z-index: 100;
  width: 1.5rem;
  height: 1.5rem;
  ${FlexCenterStyle};
  border-radius: 50%;
  background: rgba(255, 170, 170, 0.8);
  box-shadow: 0 0 0.5rem rgba(255, 170, 170, 0.8);
  font-family: Arial;
`;

export const Tip = styled.div`
  margin: 0.15rem 0;
`;

export const ImgContainer = styled.div`
  width: 70%;
  margin: 2rem 0;
  ${FlexCenterStyle};
`;
