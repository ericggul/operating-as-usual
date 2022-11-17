import dynamic from "next/dynamic";
import Loading from "foundations/loading";
const ClockComponent = dynamic(() => import("components/w/clock"), { ssr: false });

export default function Tunnel() {
  return (
    <>
      <ClockComponent />
    </>
  );
}
