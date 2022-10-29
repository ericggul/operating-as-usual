import dynamic from "next/dynamic";

const Gaussian = dynamic(() => import("components/idealism/gaussian"), { ssr: false });
const GaussianB = dynamic(() => import("components/idealism/gaussianB"), { ssr: false });
const GaussianC = dynamic(() => import("components/idealism/gaussianC"), { ssr: false });
const Structure = dynamic(() => import("components/idealism/structure"), { ssr: false });
const StructureB = dynamic(() => import("components/idealism/structureB"), { ssr: false });
const StructureChaotic = dynamic(() => import("components/idealism/structureChaotic"), { ssr: false });

export default function Idealism() {
  return <StructureChaotic />;
}
