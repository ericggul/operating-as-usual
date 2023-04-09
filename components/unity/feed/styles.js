import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  justify-content: center;
  background: #f5f5f5;
`;
