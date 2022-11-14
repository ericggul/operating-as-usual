import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

import * as THREE from "three";
import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useMemo, useEffect, useState, useRef, useLayoutEffect } from "react";

extend({ TextGeometry });

export default function CreditText(props) {
  //font config
  const font = useLoader(FontLoader, "/assets/fonts/Futura/Futura_Medium.json");
  const config = useMemo(
    () => ({
      font: font,
      size: props.size,
      height: 1,
    }),
    [font]
  );

  //to align the text center, first get mesh size
  const mesh = useRef(null);

  const [size, setSize] = useState(new THREE.Vector3());
  const [showText, setShowText] = useState(false);
  useLayoutEffect(() => {
    setShowText(false);
    const temp = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(temp);
    setSize(temp);
  }, [props]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.x = -size.x / 2;
      mesh.current.position.y = props.yPos - size.y / 2;
      setShowText(true);
    }
  });

  return (
    <>
      {
        <mesh ref={mesh} position={[-100, props.yPos - 100, 30]}>
          <textGeometry attach="geometry" args={[props.text, config]} />
          <meshPhongMaterial attach="material" />
        </mesh>
      }
    </>
  );
}
