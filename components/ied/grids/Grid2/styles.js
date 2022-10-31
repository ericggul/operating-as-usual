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

export const Square = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${Math.round(props.val) * 90 + 45}deg)`,
    width: `${props.val * 100 + 250}%`,
    height: `${props.val * 100 + 250}%`,
    marginTop: `${50 - props.val * 50 - 125}%`,
    marginLeft: `${50 - props.val * 50 - 125}%`,
  },
}))`
  text-align: center;

  box-shadow: 0 0 30px white;
  background: black;
  mix-blend-mode: difference;
  backdrop-filter: invert(100%);
`;
