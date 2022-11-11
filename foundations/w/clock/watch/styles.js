import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const WatchContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  overflow: visible;
  transform: scale(${({ scaleLevel }) => Math.max(0.4, 1 - scaleLevel * 0.2)});
  transition: 0.1s;
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
  position: relative;
  margin: 1vw;
  transition: all 0.5s;
  ${FlexCenterStyle};
  ${Clock0};
  ${({ changing }) => changing === 0 && Clock0};
  ${({ changing }) => changing === 1 && Clock1};
  ${({ changing }) => changing === 2 && Clock2};
`;

const StickCommon = css`
  position: absolute;
  margin: auto;
  left: 0;
  bottom: 0;
  right: 0;
  transform-origin: bottom center;
  z-index: 1;
  transition: background 0.5s;
`;

export const Hour = styled.div.attrs((props) => ({
  style: {
    background: props.changing >= 2 ? "white" : "transparent",
    transform: `rotate(${props.rotation}deg)`,
  },
}))`
  ${StickCommon};
  height: 6.66vw;
  width: 0.8vw;
  top: -22%;

  box-shadow: inset 0 0 0.5rem white;
  transition: all 0.5s;
`;

export const Minute = styled.div.attrs((props) => ({
  style: {
    height: props.changing === 1 ? "9vw" : "12vw",
    top: props.changing === 1 ? "-30%" : "-40%",
    background: props.changing >= 2 ? "white" : "transparent",
    transform: `rotate(${props.rotation}deg)`,
  },
}))`
  ${StickCommon};
  width: 0.8vw;
  box-shadow: inset 0 0 0.3rem white;
  transition: all 0.5s;
`;

export const Second = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.rotation}deg)`,
  },
}))`
  ${StickCommon};
  height: 10vw;
  width: 0.1vw;
  top: -33%;
  background: transparent;
  box-shadow: inset 0 0 0.2rem white;
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

export const SemiClockContainer = styled.div`
  position: absolute;
  top: 17vw;
  bottom: 0;
  ${FlexCenterStyle};
  transition: all 0.5s;
`;

export const SemiClock = styled.div`
  position: relative;
  margin: 0.15vw;
  ${FlexCenterStyle};
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  box-shadow: inset 0 0 1rem white;
  transition: all 0.5s;
`;

export const Day = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.rotation}deg)`,
  },
}))`
  ${StickCommon};
  height: 3vw;
  width: 0.2vw;
  top: -33.3%;

  box-shadow: inset 0 0 0.5rem white;
  z-index: 1;
`;

export const SemiCenter = styled.div`
  width: 0.8vw;
  height: 0.8vw;
  border-radius: 50%;
  background: #111;
  z-index: 5;
  box-shadow: inset 0 0 0.2rem white;
`;

export const SemiText = styled.div`
  font-size: 1vw;
  color: white;
  font-weight: lighter;
  position: absolute;

  top: 69%;
  border: 0.3px solid white;
  padding: 0.2vw;
`;

export const MegaClock = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  ${FlexCenterStyle};
  width: ${({ width }) => width}vw;
  height: ${({ width }) => width}vw;
  top: ${({ width }) => (30 - width) / 2}vw;
  left: ${({ width }) => (30 - width) / 2}vw;
  border-radius: 50%;
  box-shadow: inset 0 0 1rem white;
`;

export const Year = styled.div`
  ${StickCommon};
  height: 11.67vw;
  width: 1vw;
  top: -33.3%;
  transform: rotate(${({ rotation }) => rotation}deg);
  box-shadow: inset 0 0 0.5rem white;
`;
