import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

export default function Sound(props) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, props.url);

  console.log("12");
  useEffect(() => {
    if (sound && sound.current) {
      console.log("14");
      if (props.playLightAudio) {
        console.log("17");
        sound.current.setBuffer(buffer);
        sound.current.setLoop(true);
        sound.current.setRefDistance(20);
        sound.current.play();
        camera.add(listener);
        return () => camera.remove(listener);
      } else {
        if (sound && sound.current && sound.current.isPlaying) {
          console.log("25");
          sound.current.stop();
        }
      }
    }
  }, [sound, buffer, camera, listener, props.playLightAudio]);

  return <positionalAudio ref={sound} args={[listener]} />;
}
