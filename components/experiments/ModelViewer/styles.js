import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
`;

export const ModelViewerWrapper = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  z-index: 0;

  model-viewer {
    width: 100%;
    height: 100%;
  }
`;
