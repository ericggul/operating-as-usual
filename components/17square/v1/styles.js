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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

export const Box = styled.div`
  width: 25vh;
  height: 25vh;
  font-size: 2.6vh;
  ${FlexCenterStyle};
  flex-direction: column;
  background: black;
  color: white;

  ${({ activated }) => (activated ? `background: black; color: white;` : "background: white; color: white;")}
  transition: 0.5s;
`;

export const Intermission = styled.div`
  font-size: 25vh;
  font-weight: 900;
  mix-blend-mode: difference;
  color: white;
`;
