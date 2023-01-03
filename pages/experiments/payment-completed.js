import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/experiments/payment/completed"), {
  ssr: false,
});

export default function Completed() {
  return <Component />;
}
