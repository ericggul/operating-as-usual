import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  position: absolute;
  ${WholeContainer};
  ${FlexCenterStyle};
  backdrop-filter: blur(0.5rem);
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
`;

export const Inner = styled.div`
  min-width: ${({ theme }) => Math.min(theme.windowWidth * 1.2, 500)}px;
  min-height: ${({ theme }) => Math.min(theme.windowWidth * 1.2, 500)}px;
  border-radius: 50%;

  background: linear-gradient(180deg, #42c0ff 0%, rgba(8, 30, 63, 1) 100%);
  color: white;
  ${FlexCenterStyle};
  flex-direction: column;
  position: relative;
`;

export const Verify = styled.div`
  ${FlexCenterStyle};
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 33%;
  font-family: BebasNeue;
`;

export const Eye = styled.div`
  width: 9.5rem;
  height: 1.2rem;
  border-radius: 0.2rem;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 2rem;
  ${FlexCenterStyle};

  color: black;
  text-transform: uppercase;
`;

export const Command = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
  max-width: 70%;
  margin-top: 18%;
  width: 6rem;
  text-align: center;
`;

export const RecordingButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 14%;
  width: 5rem;
  height: 5rem;
  font-size: 1.1rem;
  cursor: pointer;

  ${FlexCenterStyle};
  border-radius: 50%;
  background: linear-gradient(0deg, #ff427b 29.17%, #44044f 100%);
  color: white;

  ${({ progress }) => progress && "animation: rotate-button 2s infinite linear;"}

  @keyframes rotate-button {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
