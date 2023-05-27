import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};

  animation: appear 1s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  pointer-events: none;
`;

export const Bar = styled.div`
  position: absolute;
  top: 5rem;
  width: 80%;
  height: 1.8rem;
  background: #222;
  border-radius: 0.6rem;
`;

export const InnerBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background: #ddd;
  transition: all 0.5s ease-in-out;
  border-radius: 0.6rem;
`;

export const NumberLeft = styled.div`
  position: absolute;
  left: 0.6rem;
  top: 0;
  height: 100%;
  font-size: 1rem;
  color: white;
  mix-blend-mode: difference;
  ${FlexCenterStyle};
`;

export const Number = styled.div`
  position: absolute;
  right: 0.7rem;
  top: 0;
  height: 100%;
  font-size: 1rem;
  color: white;
  mix-blend-mode: difference;
  ${FlexCenterStyle};
`;
