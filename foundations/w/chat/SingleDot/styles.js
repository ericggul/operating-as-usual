import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const SingleDot = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    opacity: props.opacity,
    borderRadius: `${props.theme.windowHeight * 0.03}px`,
  },
}))`
  position: absolute;
  overflow: hidden;
  background: black;

  // ${FlexCenterStyle};
  // color: white;
  // font-size: 3rem;
`;
