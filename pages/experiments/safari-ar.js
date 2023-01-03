import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/experiments/SafariAR"), {
  ssr: false,
});

export default function SafariAR() {
  return <Component />;
}
