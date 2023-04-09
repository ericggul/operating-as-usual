import * as S from "./styles";
import { useState, useEffect } from "react";

export default function Component({ data, handleClick }) {
  return (
    <S.MobileContainer>
      <S.ProfileSection>
        <S.Profile>
          <S.ProfilePic>
            <img src={"/assets/images/unity/profile_1.jpg"} />
          </S.ProfilePic>
          <S.ProfileRight>
            <S.Sector>
              <S.Count>{data.length}</S.Count>
              <S.Text>Posts</S.Text>
            </S.Sector>
            <S.Sector>
              <S.Count>1,000</S.Count>
              <S.Text>Followers</S.Text>
            </S.Sector>
            <S.Sector>
              <S.Count>1,000</S.Count>
              <S.Text>Following</S.Text>
            </S.Sector>
          </S.ProfileRight>
        </S.Profile>

        <S.ProfileLower>
          <S.ProfileName>
            Freya
            <span>she/her</span>
          </S.ProfileName>
          <S.Bio>Loerm ipsum</S.Bio>
        </S.ProfileLower>
      </S.ProfileSection>

      <S.Posts>
        {data.map((item, index) => (
          <SingleItem index={index} key={index} item={item} handleClick={handleClick} />
        ))}
      </S.Posts>
    </S.MobileContainer>
  );
}

function SingleItem({ item, index, handleClick }) {
  const [show, setShow] = useState(false);

  return (
    <S.SingleItem show={show} onClick={() => handleClick(index)}>
      <img src={item.imgSrc} onLoad={() => setShow(true)} />
    </S.SingleItem>
  );
}
