import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  font-family: Times New Roman;
  background: radial-gradient(#555, black);
  color: white;
`;

export const Header = styled.div`
  font-size: 3rem;
`;

export const Text = styled.div`
  max-width: 70%;
  font-size: 1.2rem;

  margin: 1.4rem 0;
  text-align: center;
`;

export const Proceed = styled.div`
  margin-top: 2.5rem;
  font-size: 1.4rem;
  border: 2px double white;
  padding: 0.5rem 1.5rem;

  transition: all 0.3s;
  cursor: pointer;
`;

export const Top = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  position: fixed;
  z-index: 5;
  backdrop-filter: blur(2px);
`;
