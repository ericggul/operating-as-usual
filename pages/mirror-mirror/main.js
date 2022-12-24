import dynamic from "next/dynamic";

const MirrorMirrorComponent = dynamic(() => import("components/mirror-mirror/main"), {
  ssr: false,
});

export default function MirrorMirror() {
  return <MirrorMirrorComponent />;
}
