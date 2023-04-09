import dynamic from "next/dynamic";

const Comp = dynamic(() => import("components/unity/chat"), {
  ssr: false,
});

export default function Page() {
  return <Comp />;
}
