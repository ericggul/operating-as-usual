import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const SingleDot = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    background: props.flash ? props.backgroundColor : "black",
  },
}))`
  position: absolute;
  overflow: hidden;

  // ${FlexCenterStyle};
  // color: white;
  // font-size: 3rem;
`;
