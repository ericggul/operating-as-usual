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

  h1,
  p {
    text-align: center;
    max-width: 40%;
  }

  p {
    margin-bottom: 0.3rem;
  }
`;

export const Button = styled.div`
  background: black;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 0.7rem;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 2rem;
`;

export const ImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 1rem 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
