import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

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
  margin: 0.1vh;
  background: white;
  box-shadow: 0 0 2vh white;

  ${({ target, activated }) => target && activated && `background: black;`}

  transition: 0.5s;
`;

export const Calculation = styled.div`
  mix-blend-mode: difference;
  width: 50vh;
  color: white;
  text-shadow: 0 0 0.5vh white;
  font-size: 5vh;
  z-index: 10;
  font-family: Courier New;
`;
