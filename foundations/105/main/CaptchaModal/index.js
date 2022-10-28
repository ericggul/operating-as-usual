import * as S from "./styles";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function CaptchaModal({ closeModal }) {
  const recaptchaRef = useRef();

  console.log("captcha loadded");

  function onChange(value) {
    const timeout = setTimeout(() => {
      closeModal();
    }, 1000);
    return () => clearTimeout(timeout);
  }
  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <h1>wet</h1>
      <ReCAPTCHA ref={recaptchaRef} sitekey="6Lckj8AiAAAAADaIHyNAJY68yEriqKqdCgN1MpQy" onChange={onChange} />
    </S.Container>
  );
}
