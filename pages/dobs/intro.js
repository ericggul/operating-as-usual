import dynamic from "next/dynamic";
const Component = dynamic(() => import("components/dobs/mobile/intro"), {
  ssr: false,
});

export default function Mobile() {
  return <Component />;
}
