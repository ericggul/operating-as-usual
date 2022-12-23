import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  background: black;
`;

export const BoxContainer = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
`;

export const BoxSector = styled.div`
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  grid-template-rows: repeat(17, 1fr);
`;

export const Box = styled.div`
  width: 3.8vh;
  height: 3.8vh;
  margin: 0.2vh;
  background: black;
  box-shadow: 0 0 2vh #333;

  ${({ targetNumber, isActivated }) => targetNumber && isActivated && `background: white;`}

  transition: 0.5s;
`;

export const Calculation = styled.div`
  mix-blend-mode: difference;
  width: 20vh;
  color: white;
  text-shadow: 0 0 0.5vh white;
  font-size: 2vh;
  z-index: 10;
  font-family: Courier New;
  margin-left: 25vh;
  margin-bottom: 5vh;
`;
