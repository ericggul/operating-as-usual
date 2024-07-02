import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";

const IntroComp = dynamic(() => import("foundations/common/Intro"), {
  ssr: false,
});

const Component = dynamic(() => import("components/17square/v3"), { ssr: false });

export default function Intermission() {
  //intro
  const [intro, setIntro] = useState(true);

  function handleIntroClick() {
    setIntro(false);
  }

  return (
    <>
      <Head>
        <title>{`17 Square Minus 4 Sqaure Equals 4'33''`}</title>
      </Head>
      {intro && <IntroComp handleIntroClick={handleIntroClick} />}
      {!intro && <Component />}
    </>
  );
}
