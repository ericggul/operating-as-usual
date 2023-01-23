import dynamic from "next/dynamic";
import Script from "next/script";

const Component = dynamic(() => import("components/experiments/ModelViewer"), {
  ssr: false,
});

export default function SafariAR() {
  return (
    <>
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <Component />
    </>
  );
}
