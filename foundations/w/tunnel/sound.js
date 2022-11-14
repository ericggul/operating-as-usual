import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";

export default function Sound(props) {
    <mesh>

    <boxBufferGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="hotpink" />
<PositionalAudio
    url="/assets/sound/Tunnel.wav"
    distance={1}
    loop
    {...props} // All THREE.PositionalAudio props are valid
  />
    </mesh>
  
}
