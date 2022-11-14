import { MeshReflectorMaterial } from "@react-three/drei";

export default function Mirror(props) {
  return (
    <mesh {...props}>
      <planeGeometry args={props.size} />
      <MeshReflectorMaterial
        mixBlur={0}
        mixStrength={1} // Strength of the reflections
        mixContrast={1}
        resolution={2048} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}
