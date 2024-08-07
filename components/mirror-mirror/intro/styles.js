import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  font-family: Rubik Bubbles;
  background: radial-gradient(#555, black);
  color: white;
`;

export const Text = styled.div`
  max-width: 80%;
  font-size: 1.2rem;

  margin: 1.4rem 0;
  text-align: center;
`;

export const Buttons = styled.div`
  ${FlexCenterStyle};
  margin-top: 2rem;
`;

export const Button = styled.div`
  ${FlexCenterStyle};
  width: 8rem;
  margin: 1.5rem 1rem;

  flex-direction: column;
  cursor: pointer;

  transition: all 0.4s;

  color: ${({ granted }) => (granted ? "#55ff55" : "#ff5555")};
`;

export const Icon = styled.div`
  font-size: 2rem;
  border: 1px solid ${({ granted }) => (granted ? "#55ff55" : "#ff5555")};
  border-radius: 0.7rem;
  width: 4rem;
  height: 4rem;
  ${FlexCenterStyle};
  margin: 0.5rem;

  transition: all 0.4s;
`;

export const ButtonText = styled.div``;

export const Top = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  position: fixed;
  z-index: 5;
  backdrop-filter: blur(2px);
`;
