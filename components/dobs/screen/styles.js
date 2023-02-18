import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  background: hsl(223.1, 100%, 32.7%);
  font-family: Tate;
`;

export const Item = styled.div`
  position: absolute;
  color: hsl(223, 100%, 32.7%);

  transform-origin: 50% 50%;
`;
