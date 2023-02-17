import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const StyledFriendlyGuideToEnjoyThisArtwork = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  flex-direction: column;
  background: #002fa7;
  font-family: Tate;

  transition: all 0.5s;
`;

export const Text = styled.div`
  width: 80%;
  text-align: center;
  opacity: 1;

  color: white;
  font-size: 10vw;
  margin-bottom: 20vw;
  text-transform: uppercase;
  transition: all 0.5s;
`;

export const Answer = styled.div`
  width: 80%;
  font-size: 7vw;
  height: 10vw;
  text-align: center;
  opacity: 1;
  text-transform: lowercase;
  color: white;

  ${({ opacity }) => opacity && `opacity: ${opacity};`}
  transition: all .5s;
`;

export const Next = styled.div`
  margin-top: 5vw;
  font-size: 5vw;
  color: white;
  opacity: 0.5;
  transition: all 0.5s;
  border: 1px solid white;
  padding: 2vw 4vw;
  border-radius: 5vw;
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  color: transparent;
  filter: blur(20px) brightness(3);
`;
