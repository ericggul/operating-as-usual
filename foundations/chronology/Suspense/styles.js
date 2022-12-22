import styled from "styled-components";

export const StyledSuspense = styled.div`
  background: black;
  color: white;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Playfair Display", serif;
`;
