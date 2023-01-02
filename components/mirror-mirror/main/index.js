import * as S from "./styles";

import IconSector from "foundations/mirror-mirror/main/IconSector";
import ListeningComponent from "foundations/mirror-mirror/main/Listening";

export default function Main({ icon }) {
  return (
    <S.Container>
      <IconSector icon={icon} />
      <ListeningComponent />
    </S.Container>
  );
}
