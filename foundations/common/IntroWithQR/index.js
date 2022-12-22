import * as S from "./styles";
import { useState } from "react";
export default function Intro({ description, qrURL, handleIntroClick }) {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(true);
    handleIntroClick();
    return () => clearTimeout(timeout);
  }
  return (
    <S.Container clicked={clicked}>
      <h1>{description}</h1>
      <S.ImgContainer>
        <img src={qrURL} alt="qr-code" />
      </S.ImgContainer>
      <p>Make sure you have your mobile device prepared.</p>
      <p>Scan this QR Code with your mobile device.</p>
      <S.Button onClick={handleClick}>Enter</S.Button>
    </S.Container>
  );
}
