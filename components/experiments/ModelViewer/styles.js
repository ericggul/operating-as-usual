import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  .model-viewer {
    width: 100%;
    height: 100%;
  }
`;
