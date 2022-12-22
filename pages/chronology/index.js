import dynamic from "next/dynamic";

const Chronology = dynamic(() => import("components/chronology"), { ssr: false });

export default function Page() {
  return <Chronology />;
}
