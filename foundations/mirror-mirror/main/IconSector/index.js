import * as S from "./styles";

//react-icons
import { SiInstagram, SiTinder, SiTwitter, SiLinkedin, SiWhatsapp } from "react-icons/si";

export default function IconSector({ icon }) {
  return (
    <S.IconSector>
      {icon === "instagram" && <SiInstagram />}
      {icon === "tinder" && <SiTinder />}
      {icon === "twitter" && <SiTwitter />}
      {icon === "linkedin" && <SiLinkedin />}
      {icon === "whatsapp" && <SiWhatsapp />}
    </S.IconSector>
  );
}
