import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  font-family: Roboto;

  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  backdrop-filter: blur(12px) grayscale(40%);
  -webkit-backdrop-filter: blur(12px) grayscale(40%);

  pointer-events: auto;

  font-weight: 100;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  h1,
  h2 {
    font-weight: 400;
  }

  h1 {
    margin-bottom: 0rem;
    font-size: 4rem;
    animation: appear 1s ease-in-out reverse both;
    animation-delay: 1s;
  }

  h2 {
    margin-bottom: 0.1rem;
  }
  p {
    font-weight: 100;
    max-width: 80%;
    text-align: center;
    font-size: 1.4rem;

    animation: appear 1s both;
    transition: opacity 0.5s ease-in-out;
    animation-delay: 2.2s;
  }

  ${({ textState }) => textState === 2 && "animation: appear 1s reverse both;"}
`;

export const Inner = styled.div`
  transition: 1s;
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  opacity: ${(props) => props.opacity};
`;

export const StateContainer = styled.div`
  margin-top: 2rem;
  ${FlexCenterStyle};
  flex-direction: row;

  animation: appear 1s both;
  animation-delay: 3s;
`;

export const HeaderLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0.7rem 0;
`;

export const State = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 1rem;
  padding: 0.4rem 0.4rem;
  border-radius: 0.7rem;

  background-color: ${(props) => props.color};
  box-shadow: 0 0 0.7rem 0.3rem ${(props) => props.color};
  transition: all 2.5s;
`;

export const ImgContainer = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.35, 300)}px;
  height: ${({ theme }) => Math.min(theme.windowWidth * 0.35, 300)}px;
  margin: 0.5rem 0;
`;

export const Label = styled.div`
  margin: 0.3rem 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 300;

  span {
    font-size: 0.9rem;
    font-weight: 100;
  }
`;

export const Button = styled.div`
  ${FlexCenterStyle};
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(215deg, #ff8888, #8888ff);
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
  opacity: ${(props) => props.opacity};
`;
