import * as S from "./styles";
import { useState } from "react";
import ArchiveIntro from "foundations/105/archive/utils/intro";
import Information from "foundations/105/archive/utils/information";

export default function Utils({ order, isAdmin }) {
  const [openArchiveIntro, setOpenArchiveIntro] = useState(order ? true : false);
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <S.Container>
      {/* <S.InfoIconContainer>
        <S.InfoIcon isAdmin={isAdmin} onClick={() => setOpenInfo((info) => !info)} src="/assets/images/105/info.svg" />
      </S.InfoIconContainer> */}
      {openArchiveIntro && <ArchiveIntro order={order} closeArchiveIntro={() => setOpenArchiveIntro(false)} />}
      {openInfo && <Information order={order} isAdmin={isAdmin} closeModal={() => setOpenInfo(false)} />}
      {isAdmin && (
        <S.QRContainer>
          <img src="/assets/images/105/qr.png" />
        </S.QRContainer>
      )}
    </S.Container>
  );
}
