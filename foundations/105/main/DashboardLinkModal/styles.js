import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
  pointer-events: auto;
  z-index: 5;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  font-family: Helvetica;
  animation: appear 0.5s;
  color: white;
`;

export const Inner = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  position: relative;

  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 350)}px;
  flex-direction: column;

  transition: all 0.2s linear;

  border-radius: 0.8rem;
  background: linear-gradient(180deg, #fc3ff2 0%, #ff6a00 100%);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

export const Text = styled.div`
  text-align: center;
  font-size: 1rem;
  margin: 1rem 2rem;
  margin-top: 2.5rem;
`;

export const Button = styled.div`
  ${FlexCenterStyle};

  font-size: 1.2rem;
  margin: 1rem 1rem;
  margin-bottom: 2rem;
  padding: 0.7rem 1.5rem;
  border-radius: 2rem;
  background: linear-gradient(180deg, rgb(0, 150, 255) 0%, #fc3ff2 100%);
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
`;
