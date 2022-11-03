import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Inner = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.85}px;
  height: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.85}px;

  display: grid;
  grid-template-columns: ${({ edges }) => `repeat(${edges}, 1fr)`};
  grid-template-rows: ${({ edges }) => `repeat(${edges}, 1fr)`};
`;

export const Item = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Circle = styled.div.attrs((props) => ({
  style: {
    width: `${props.val * 10 + 50}%`,
    height: `${props.val * 10 + 50}%`,
    marginLeft: `${50 - props.val * 5 - 25}%`,
    marginTop: `${50 - props.val * 5 - 25}%`,
  },
}))`
  text-align: center;
  border-radius: 50%;

  background: black;
`;