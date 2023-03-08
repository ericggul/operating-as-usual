import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
`;

export const Text = styled.div`
  width: 80%;
  height: 80%;
  text-align: left;
  font-size: 1.2rem;
`;
