import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;

  z-index: 8;

  font-family: Helvetica;

  cursor: none;
  color: white;
  font-size: 12vw;
  text-transform: uppercase;

  opacity: 0;
  ${({ opening }) => opening && "opacity: 1;"}
  transition: opacity 1s ease-in-out;

  p {
    text-align: center;
  }
`;

export const ClosingAnimation = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  z-index: 10;
`;

export const Closing = styled.div`
  ${WholeContainer};
  z-index: 10;
  background: black;

  animation: go-down 1s ease-in-out both;
  @keyframes go-down {
    0% {
      transform: translateY(-${({ theme }) => theme.windowHeight}px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const Hole = styled.div`
  position: relative;
  ${WholeContainer};
  overflow: hidden;
  display: inline-block;

  &:before {
    content: "";
    display: block;

    /* Scale */
    width: ${({ theme }) => theme.windowWidth + theme.windowHeight}px;
    height: ${({ theme }) => theme.windowWidth + theme.windowHeight}px;
    padding-bottom: 0;

    /* Position */
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);

    /* Border */
    border: solid ${({ theme }) => theme.windowWidth + theme.windowHeight}px black;
    border-radius: 50%;

    @keyframes hole {
      0% {
        width: ${({ theme }) => theme.windowWidth + theme.windowHeight}px;
        height: ${({ theme }) => theme.windowWidth + theme.windowHeight}px;
      }
      100% {
        width: 0;
        height: 0;
      }
    }
    animation: hole 1s ease-in-out forwards;
    animation-delay: 0.5s;
  }
`;
