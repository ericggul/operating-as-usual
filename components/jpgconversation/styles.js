import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";
export const Container = styled.div`
  ${WholeContainer};
  background: black;
  ${FlexCenterStyle};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UploaderWrapper = styled.div`
  width: 50vw;
  height: 20vh;
  border: 1px solid white;
  ${FlexCenterStyle};
`;

export const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
`;
