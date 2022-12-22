import styled from "styled-components";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: relative;
  font-family: "Playfair Display", serif;
`;
