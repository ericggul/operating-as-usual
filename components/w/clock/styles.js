import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle};
  flex-direction: column;
  overflow: hidden;

  background: #111;
  font-family: Helvetica;
  transition: 0.5s;

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  ${({ extinction }) => extinction && `animation: shake 0.5s infinite;`}
  animation-delay: 4s;
`;

export const SingleTime = styled.div`
  ${FlexCenterStyle};
  width: 100%;
`;

export const Box = styled.div`
  font-size: 7vw;
  margin: 0 2.3vw;
  width: 7vw;
  height: 10vw;
  position: relative;

  text-shadow: 0 0 0.5vw white, 0 0 1vw white, 0 0 2vw white;
  ${({ highlighted }) => highlighted && `text-shadow: 0 0 .5vw hsl(350, 100%, 90%), 0 0 1vw hsl(350, 100%, 90%), 0 0 2vw hsl(350, 100%, 90%);`}
  ${({ extinctions }) => extinctions && `text-shadow: 0 0 .5vw hsl(0, 100%, 60%), 0 0 1vw hsl(0, 100%, 60%), 0 0 2vw hsl(0, 100%, 60%);`}
  ${FlexCenterStyle};
  text-align: center;
  transition: 0.5s;
`;

export const Dots = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Dot = styled.div`
  width: 0.5vw;
  height: 0.5vw;
  border-radius: 50%;
  border: 1px solid white;
  margin: 0.3vw 0;
`;

export const Unit = styled.div`
  font-size: 1.8vw;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: end;
`;

export const Hole = styled.div`
  position: absolute;
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
    animation: hole 1.5s ease-in-out forwards;
    animation-delay: 1.2s;
  }
`;
