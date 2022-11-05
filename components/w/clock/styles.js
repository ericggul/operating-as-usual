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
  ${FlexCenterStyle};
  text-align: center;
  transition: 0.5s;
`;

export const Unit = styled.div`
  font-size: 1.8vw;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: end;
`;

export const Clock = styled.div`
  overflow: hidden;
  position: relative;
  ${FlexCenterStyle};
  width: 30vw;
  height: 30vw;
  border-radius: 100%;
  box-shadow: inset 0 0 1rem white;
`;

export const Hour = styled.div`
  position: absolute;
  height: 6.66vw;
  width: 0.8vw;
  margin: auto;
  top: -22%;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  transform-origin: bottom center;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.5rem white;
  z-index: 1;
`;

export const Minute = styled.div`
  position: absolute;
  height: 12vw;
  width: 0.8vw;
  margin: auto;
  top: -39.3%;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  transform-origin: bottom center;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.3rem white;
  z-index: 1;
`;

export const Second = styled.div`
  position: absolute;
  height: 10vw;
  width: 0.1vw;
  margin: auto;
  top: -33%;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  transform-origin: bottom center;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.2rem white;
  z-index: 1;
`;

export const Center = styled.div`
  width: 2vw;
  height: 2vw;

  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 0.5rem white;
  z-index: 5;
`;
