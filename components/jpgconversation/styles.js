import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";
export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
