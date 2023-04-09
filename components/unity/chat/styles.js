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
  overflow-y: scroll;
  background: #f5f5f5;
`;

export const MobileContainer = styled.div`
  position: relative;
  width: calc(min(100vw, 600px));
  min-height: 100%;
  display: flex;
  align-items: center;
  overflow-y: scroll;
  flex-direction: column;
  background-color: white;
  font-family: Helvetica;
`;

export const SingleChat = styled.div`
  display: flex;
  max-width: 73%;
  margin: 2px 2%;

  align-items: flex-end;

  ${({ isLeft }) => isLeft && "flex-direction: row-reverse;"}
  ${({ isLeft }) => (isLeft ? "margin-left: auto;" : "margin-right: auto;")}
  ${({ isFirstChat }) => isFirstChat && "margin-top: 7px;"}
  ${({ isLastChat }) => isLastChat && "margin-bottom: 7px;"}
`;

export const ProfilePic = styled.div`
  min-width: 35px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ChatRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 7px 10px;
  background: ${({ isLeft }) => (isLeft ? "hsl(191, 22%, 96%)" : "hsl(101, 22%, 96%)")};
  border-radius: ${({ isLeft }) => (isLeft ? "10px 10px 0 10px" : "10px 10px 10px 0")};

  ${({ isLeft }) => (isLeft ? "margin-right: 8px;" : "margin-left: 8px;")}
`;

export const ChatName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const ChatLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatMessage = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

export const ChatTime = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-top: 5px;
`;
