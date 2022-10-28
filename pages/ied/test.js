//dynamic import VisualTest

import dynamic from "next/dynamic";
const VisualTest = dynamic(() => import("components/ied/VisualTest2"), { ssr: false });

export default function IED() {
  return <VisualTest />;
}
