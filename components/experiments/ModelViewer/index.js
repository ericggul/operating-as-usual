import * as S from "./styles";

export default function SafariAR() {
  return (
    <S.Container>
      {/* <a rel="ar" href="/asssets/models/sneaker_airforce.usdz">
        iMessage Heart Tap-back
      </a> */}
      <model-viewer
        alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
        src="/assets/models/NeilArmstrong.glb"
        ar
        environment-image="/assets/images/moon_1k.hdr"
        poster="/assets/images/NeilArmstrong.webp"
        shadow-intensity="1"
        camera-controls
        touch-action="pan-y"
      ></model-viewer>
    </S.Container>
  );
}
