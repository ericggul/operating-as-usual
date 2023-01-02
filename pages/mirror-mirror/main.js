import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const MirrorMirrorComponent = dynamic(() => import("components/mirror-mirror/main"), {
  ssr: false,
});

export default function MirrorMirror() {
  //get page query
  const router = useRouter();
  const { icon } = router.query;

  return <MirrorMirrorComponent icon={icon} />;
}
