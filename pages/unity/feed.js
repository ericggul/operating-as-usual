import dynamic from "next/dynamic";

const Comp = dynamic(() => import("components/unity/feed"), {
  ssr: false,
});

export default function Page() {
  return <Comp />;
}
