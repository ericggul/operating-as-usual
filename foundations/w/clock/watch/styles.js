import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const WatchContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
`;

const Clock0 = css`
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  box-shadow: inset 0 0 1rem white;
`;

const Clock1 = css`
  width: 20vw;
  height: 30vw;
  border-radius: 10%;
  box-shadow: inset 0 0 1rem white, 0 0 2rem white;
`;

const Clock2 = css`
  width: 30vw;
  height: 30vw;
  border-radius: 10%;
  box-shadow: none;
`;

export const Clock = styled.div`
  overflow: hidden;
  position: relative;
  transition: all 0.5s;
  ${FlexCenterStyle};
  ${Clock1};
  ${({ changing }) => changing === 0 && Clock0};
  ${({ changing }) => changing === 1 && Clock1};
  ${({ changing }) => changing === 2 && Clock2};
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
  background: ${({ changing }) => (changing >= 2 ? "white" : "transparent")};
  transform-origin: bottom center;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.5rem white;
  z-index: 1;

  //   transition: all 0.5s;
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
  background: ${({ changing }) => (changing >= 2 ? "white" : "transparent")};
  transform-origin: bottom center;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.3rem white;
  z-index: 1;

  //   transition: all 0.5s;
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

  transition: all 0.5s;
`;

export const Center = styled.div`
  width: 2vw;
  height: 2vw;

  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 0.5rem white;
  z-index: 5;
`;
