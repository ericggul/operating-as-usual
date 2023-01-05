import * as S from "./styles";

import { useState, useEffect } from "react";

export default function SafariAR() {
  return (
    <S.Container>
      <S.ModelViewerWrapper>
        <model-viewer
          alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
          src="/assets/models/NeilArmstrong.glb"
          ar
          environment-image="/assets/images/moon_1k.hdr"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
        />
      </S.ModelViewerWrapper>
    </S.Container>
  );
}
