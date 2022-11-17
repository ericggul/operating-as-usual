import dynamic from "next/dynamic";

const TunnelComponent = dynamic(() => import("components/w/tunnel"), { ssr: false });

export default function Tunnel() {
  return <TunnelComponent />;
}
