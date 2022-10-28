//three
import * as THREE from "three";

import { MeshReflectorMaterial } from "@react-three/drei";

export default function Mirrors({ MIRROR_SIZE, MIRROR_DISTANCE }) {
  function MirrorBottom() {
    return (
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -MIRROR_DISTANCE, 0]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixBlur={0}
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  function MirrorTop() {
    return (
      <mesh rotation={[Math.PI * 0.5, 0, 0]} position={[0, MIRROR_DISTANCE, 0]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixBlur={0}
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  function MirrorLeft() {
    return (
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[-MIRROR_DISTANCE, 0, 0]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixBlur={0}
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  function MirrorRight() {
    return (
      <mesh rotation={[0, -Math.PI * 0.5, 0]} position={[MIRROR_DISTANCE, 0, 0]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  function MirrorFront() {
    return (
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, MIRROR_DISTANCE]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  function MirrorBack() {
    return (
      <mesh rotation={[0, 0, 0]} position={[0, 0, -MIRROR_DISTANCE]}>
        <planeGeometry args={[MIRROR_SIZE, MIRROR_SIZE]} />
        <MeshReflectorMaterial
          mixStrength={1} // Strength of the reflections
          mixContrast={1}
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  return (
    <>
      <MirrorBottom />
      <MirrorLeft />
      <MirrorFront />
      <MirrorTop />
      <MirrorRight />
      <MirrorBack />
    </>
  );
}
