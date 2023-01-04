import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/experiments/metamask"), {
  ssr: false,
});

export default function Payment() {
  return <Component />;
}
