import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/experiments/ModelViewer"), {
  ssr: false,
});

export default function SafariAR() {
  return <Component />;
}
