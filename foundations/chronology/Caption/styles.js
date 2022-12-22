import styled from "styled-components";

export const StyledCaption = styled.div`
  position: absolute;

  margin: 2rem 0;
  right: 0;
  left: 0;
  width: 100%;

  ${({ theme }) => theme.windowWidth > 768 && "bottom: 0;"}
  ${({ theme }) => theme.windowWidth <= 768 && "top: 0;"}
`;

export const Text = styled.div`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
