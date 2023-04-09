import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

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

export const Container = styled.div``;

//write css accordingly

export const SinglePost = styled.div`
  width: 90%;
  position: relative;

  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const ProfileLocation = styled.div`
  font-size: 12px;
  color: #999;
`;

export const Images = styled.div`
  width: 100%;
  height: calc(min(100vw, 600px));
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Likes = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  svg {
    font-size: 20px;
    color: #999;
  }
`;

export const Contents = styled.div`
  margin-top: 5px;
  font-size: 14px;
  span {
    font-weight: 600;
    margin-right: 10px;
  }
`;

export const Date = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 10px;
`;
