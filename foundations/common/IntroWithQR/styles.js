import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  background: white;
  font-family: Roboto;

  opacity: ${({ clicked }) => (clicked ? 0 : 1)};
  transition: opacity 1s ease-in-out;
  font-size: 2vw;

  h1,
  p {
    text-align: center;
    max-width: 80%;
  }

  p {
    margin-bottom: 0.6vw;
  }
`;

export const Button = styled.div`
  background: black;
  color: white;
  padding: 1.4vw 3vw;
  border-radius: 1.4vw;
  font-size: 3vw;
  cursor: pointer;
  margin-top: 4vw;
`;

export const ImgContainer = styled.div`
  width: 20vw;
  height: 20vw;
  margin: 2vw 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
