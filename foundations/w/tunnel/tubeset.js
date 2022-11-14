import { PositionalAudio } from "@react-three/drei";

export default function TubeSet({ curve, position }) {
  return (
    <group position={position}>
      <mesh>
        <tubeGeometry args={[curve, 2, 5, 25, true]} />
        <meshStandardMaterial color="white" roughness={0} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, -200]}>
        <sphereGeometry args={[9, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
        <PositionalAudio
          url="/assets/sound/Tunnel.wav"
          distance={30}
          loop
          // All THREE.PositionalAudio props are valid
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
      </mesh>
    </group>
  );
}
