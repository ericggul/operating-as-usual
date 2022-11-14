import { PositionalAudio } from "@react-three/drei";

import Sound from "./sound";

export default function TubeSet({ curve, position, containsAudio, playAudio }) {
  return (
    <group position={position}>
      <mesh>
        <tubeGeometry args={[curve, 2, 5, 25, true]} />
        <meshStandardMaterial color="white" roughness={0} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, -200]}>
        <sphereGeometry args={[9, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
        {containsAudio && <Sound url="/assets/sound/Light.mp3" playLightAudio={playAudio} />}
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0} metalness={1} />
      </mesh>
    </group>
  );
}
