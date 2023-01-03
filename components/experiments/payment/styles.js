import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  font-family: Raleway;
`;

export const Header = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  max-width: 80%;
`;

export const Text = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  max-width: 80%;
  text-align: left;
`;

export const PayButton = styled.div`
  ${FlexCenterStyle};
  cursor: pointer;
  font-size: 2rem;
`;
