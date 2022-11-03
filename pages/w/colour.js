import dynamic from "next/dynamic";

const ColourComponent = dynamic(() => import("components/w/colour"), { ssr: false });

export default function Tunnel() {
  return <ColourComponent />;
}
