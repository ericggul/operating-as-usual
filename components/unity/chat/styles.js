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
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  flex-direction: column;
  background-color: white;
  font-family: Helvetica;
`;

export const ChatSector = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  scroll-behavior: smooth;

  flex-direction: column;

  margin-bottom: 60px;
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


  animation: chat-appear 0.5s ease-in-out;

  @keyframes chat-appear {
    0% {
      opacity: 0;
      transform: translateY(10px) scaleY(0.3);
    }

    100% {
      opacity: 1;
      transform: translateY(0px) scaleY(1);
    }
  }
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

  word-break: break-all;
`;

export const ChatTime = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-top: 5px;
`;

export const InputWrapper = styled.div`
  height: 50px;
  background: #f5f5f5;
  ${FlexCenterStyle}

  width: calc(min(100vw, 600px));

  left: 0;
  right: 0;
  margin: auto;

  position: fixed;

  bottom: 0;
`;

export const ChatInput = styled.input`
  background: white;
  outline: 0;
  border: none;

  width: calc(100% - 110px);
  height: 26.5px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 15px;

  ::placeholder {
    color: black;
    background: white;
  }

  :focus {
    ::placeholder {
      color: transparent;
    }
  }
`;

export const SendButton = styled.div`
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  background: #f5f5f5;
  ${FlexCenterStyle}
  margin-left: 5px;
  cursor: pointer;
`;
