import dynamic from "next/dynamic";

const PyramidComponent = dynamic(() => import("components/w/pyramid"), { ssr: false });

export default function Tunnel() {
  return <PyramidComponent />;
}
