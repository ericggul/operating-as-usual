import dynamic from "next/dynamic";

const IdealismComponent = dynamic(() => import("components/idealism"), { ssr: false });

export default function Idealism() {
  return <IdealismComponent />;
}
