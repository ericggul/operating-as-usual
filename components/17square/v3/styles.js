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

export const TriangleSector = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
`;

export const Row = styled.div`
  ${FlexCenterStyle};
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 2vh solid transparent;
  border-right: 2vh solid transparent;

  ${({ up, target, activated }) =>
    up ? `border-bottom: 3.464vh solid ${target ? (activated ? "white" : "black") : "#333"};` : `border-top: 3.464vh solid ${target ? (activated ? "white" : "black") : "#333"};`}
  margin: 0.6vh -0.6vh;
  transition: 0.5s;
`;

export const Calculation = styled.div`
  mix-blend-mode: difference;
  text-align: center;
  color: white;
  font-size: 3vh;
  z-index: 10;
  font-family: Courier New;
  margin-bottom: 18vh;
`;
