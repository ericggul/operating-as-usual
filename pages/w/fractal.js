import dynamic from "next/dynamic";

const FractalComponent = dynamic(() => import("components/w/fractal"), { ssr: false });

export default function Tunnel() {
  return <FractalComponent />;
}
