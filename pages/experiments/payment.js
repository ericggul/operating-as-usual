import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/experiments/payment"), {
  ssr: false,
});

export default function Payment() {
  return <Component />;
}
