import * as S from "./styles";
import { useState, useEffect, useRef } from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function Component({ data, focusIdx }) {
  //scroll to cerain singlepost element on focusIdx

  const singlePostRef = useRef(null);

  useEffect(() => {
    if (focusIdx !== -1) {
      if (!singlePostRef.current) return;
      singlePostRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusIdx]);

  return (
    <S.MobileContainer>
      {data.map((datum, i) => (
        <SinglePost {...datum} key={i} refEl={focusIdx === i ? singlePostRef : null} />
      ))}
    </S.MobileContainer>
  );
}

function SinglePost({ imgSrc, date, location, contents, refEl }) {
  ///
  const [show, setShow] = useState(false);

  return (
    <S.SinglePost ref={refEl}>
      <S.Profile>
        <S.ProfilePic>
          <img src={"/assets/images/unity/profile_1.jpg"} />
        </S.ProfilePic>
        <S.ProfileRight>
          <S.ProfileName>Freya</S.ProfileName>
          <S.ProfileLocation>{location}</S.ProfileLocation>
        </S.ProfileRight>
      </S.Profile>
      <S.Images show={show}>
        <img src={imgSrc} onLoad={() => setShow(true)} />
      </S.Images>
      <S.Likes>
        <S.Icon>
          <AiOutlineHeart />
        </S.Icon>
        <S.Icon>
          <FaRegComment />
        </S.Icon>
      </S.Likes>
      <S.Contents>
        <span>Freya</span>
        {contents}
      </S.Contents>
      <S.Date>{date}</S.Date>
    </S.SinglePost>
  );
}
