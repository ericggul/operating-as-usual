import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  font-family: Raleway;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  justify-content: center;
`;

export const Header = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const Text = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export const PayButton = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: #f5f5f5;
`;
