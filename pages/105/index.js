import Head from "next/head";
import dynamic from "next/dynamic";

const IntroComponent = dynamic(() => import("components/105/intro"), { ssr: false });

export default function OneOFive() {
  return (
    <>
      <Head>
        <title>105 by Jeanyoon Choi</title>
      </Head>
      <IntroComponent />
    </>
  );
}
