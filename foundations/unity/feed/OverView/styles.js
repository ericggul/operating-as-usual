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

//write css accordingly

export const ProfileSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

export const ProfileUpper = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfilePic = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
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
  flex-direction: row;
  justify-content: space-between;
`;

export const Sector = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  min-width: 60px;

  align-items: center;
  margin-bottom: 10px;
`;

export const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;

export const Text = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

export const ProfileLower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 600;
  span {
    font-size: 14px;
    font-weight: 400;
    margin-left: 5px;
  }
`;

export const Bio = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`;

export const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

export const SingleItem = styled.div`
  width: 100%;
  height: 100%;

  ${({ show }) => `opacity: ${show ? 1 : 0}`};

  transition: opacity 0.5s;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
