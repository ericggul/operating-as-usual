import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/dobs/screen"), {
  ssr: false,
});

export default function Screen() {
  return <Component />;
}
