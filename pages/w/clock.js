import dynamic from "next/dynamic";

const ClockComponent = dynamic(() => import("components/w/clock"), { ssr: false });

export default function Tunnel() {
  return <ClockComponent />;
}
