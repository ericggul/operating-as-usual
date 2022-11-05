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
