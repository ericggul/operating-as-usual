import dynamic from "next/dynamic";

const Comp = dynamic(() => import("components/never-the-same"), { ssr: false });

export default function NeverTheSame() {
  return <Comp />;
}
