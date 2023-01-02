import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  font-family: Rubik Bubbles;
  background: transparent;
  color: white;

  transition: all 0.4s;

  transform: rotateX(${({ isHiding }) => (isHiding ? 90 : 0)}deg);
`;

export const CoverContainer = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  background: white;
  pointer-events: none;
  z-index: 5;
  ${({ fadeOut }) => (fadeOut ? "opacity: 1" : "opacity: 0")};
  transition: all 0.7s;
`;

export const Text = styled.div`
  font-size: 2rem;
  margin-bottom: 2.2rem;
`;

export const IconSector = styled.div`
  ${FlexCenterStyle};
  width: 100%;
`;

export const SingleIcon = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
`;
export const Icon = styled.div`
  ${FlexCenterStyle};
  cursor: pointer;

  font-size: 2rem;
  border: 1px solid ${({ highlight }) => (highlight ? "#fff" : "#aaa")};
  box-shadow: 0 0 0.5rem ${({ highlight }) => (highlight ? "#fff" : "transparent")};
  transform: scale(${({ highlight }) => (highlight ? 1.1 : 1)});
  border-radius: 0.7rem;
  width: 4rem;
  height: 4rem;
  ${FlexCenterStyle};
  margin: 1rem;

  transition: all 0.4s;
`;

export const Proceed = styled.div`
  margin-top: 2.5rem;
  font-size: 3.5rem;

  transition: all 0.3s;
  cursor: pointer;

  ${({ check }) => (check ? `opacity: 1` : `opacity: 0`)};

  ${({ proceedClicked }) => proceedClicked && "animation: slight-right 0.4s;"}

  @keyframes slight-right {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(0.5rem);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
