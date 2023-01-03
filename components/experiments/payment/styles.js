import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
`;

export const PayButton = styled.div`
  ${FlexCenterStyle};
  cursor: pointer;
  font-size: 2rem;
`;
