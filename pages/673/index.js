import Head from "next/head";
import dynamic from "next/dynamic";

const Component = dynamic(() => import("components/673"), { ssr: false });

export default function OneOFive() {
  return (
    <>
      <Component />
    </>
  );
}
