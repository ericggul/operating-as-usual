import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";

import { useRouter } from "next/router";

//react-icons
import { SiInstagram, SiTinder, SiTwitter, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Intro({ voiceGranted }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  function handleClick(iconType) {
    setSelectedIcon(iconType);
  }

  const [proceedClicked, setProceedClicked] = useState(false);
  const [fadeOutAnimation, setFaceOutAnimation] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (proceedClicked) {
      const timeoutB = setTimeout(() => {
        setFaceOutAnimation(true);
      }, 500);
      const timeoutA = setTimeout(() => {
        router.push(`/mirror-mirror/main?icon=${selectedIcon}`);
      }, 1300);
      return () => {
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
      };
    }
  }, [proceedClicked]);

  return (
    <S.Container isHiding={!voiceGranted}>
      <S.CoverContainer fadeOut={fadeOutAnimation} />
      <S.Text>Choose your voice</S.Text>
      <S.IconSector>
        <S.Icon onClick={() => handleClick("instagram")} highlight={selectedIcon === "instagram"}>
          <SiInstagram />
        </S.Icon>
        <S.Icon onClick={() => handleClick("tinder")} highlight={selectedIcon === "tinder"}>
          <SiTinder />
        </S.Icon>
        <S.Icon onClick={() => handleClick("twitter")} highlight={selectedIcon === "twitter"}>
          <SiTwitter />
        </S.Icon>
        <S.Icon onClick={() => handleClick("linkedin")} highlight={selectedIcon === "linkedin"}>
          <SiLinkedin />
        </S.Icon>
        <S.Icon onClick={() => handleClick("whatsapp")} highlight={selectedIcon === "whatsapp"}>
          <SiWhatsapp />
        </S.Icon>
      </S.IconSector>
      <S.Proceed check={selectedIcon != null} onClick={() => setProceedClicked(true)} proceedClicked={proceedClicked}>
        <BsFillArrowRightCircleFill />
      </S.Proceed>
    </S.Container>
  );
}
