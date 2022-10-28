import { Effect } from "components/105/main";

//three
import ModelAndLights from "foundations/105/main/ModelAndLights";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

export default function Model({ order }) {
  return (
    <Canvas dpr={[1, 2]} gl={{ alpha: false, antialias: false }} camera={{ fov: 80, position: [4, 3.2, 4], near: 1, far: 5000 }}>
      <ModelAndLights order={order} transitionState={false} />
      <Effect />
    </Canvas>
  );
}
