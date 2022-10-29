import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function Information({ order, closeModal, isAdmin }) {
  return (
    <S.Container>
      <S.Inner onClick={closeModal} isAdmin={isAdmin}>
        {isAdmin ? (
          <>
            <h1>105</h1>
            <h2>Jeanyoon Choi</h2>
            <S.ImgContainer>
              <img src="/assets/images/105/qr.png" />
            </S.ImgContainer>
            <S.Tip>105 is a web-based interactive artwork.</S.Tip>
            <S.Tip>
              Scan the QR Code or{" "}
              <a onClick={(e) => e.stopPropagation()}>
                <Link href="/105">Click on The Link</Link>
              </a>
            </S.Tip>
            <S.Tip>to Participate the artwork.</S.Tip>
          </>
        ) : (
          <>
            {order && <S.Tip> Blue Geometry is the point you started, and Red Geometry is the point you ended.</S.Tip>}
            <S.Tip>
              {" "}
              Each geometry indicates one of the <b>105 states.</b>
            </S.Tip>
            <S.Tip> Each line indicates the transition between two states.</S.Tip>
            <S.Tip>
              {" "}
              Within <b>105 transitions</b>, the line will reach to the point where it started.
            </S.Tip>
            <hr style={{ width: "100%", margin: "0.7rem 0" }} />
            <S.Tip> This archive page is influenced by Yayoi Kusama's Infinity Mirror Rooms.</S.Tip>
            <S.Tip> Zoom out and pan to enjoy more scenic view.</S.Tip>
          </>
        )}

        <S.CancelButton onClick={closeModal}>X</S.CancelButton>
      </S.Inner>
    </S.Container>
  );
}
