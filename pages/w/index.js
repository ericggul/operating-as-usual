import dynamic from "next/dynamic";

const IntroComponent = dynamic(() => import("components/w/intro"), { ssr: false });

export default function Intro() {
  return (
    <>
      <IntroComponent />
    </>
  );
}
