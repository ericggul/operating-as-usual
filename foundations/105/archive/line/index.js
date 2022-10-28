import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useLayoutEffect, useRef, useMemo } from "react";
import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";

extend({ TextGeometry });

export default function Line({ i, j, highlight }) {
  const start = useMemo(() => ({ x: (((i * 3) % 7) - 3) * 24, y: (((i * 2) % 5) - 2) * 36, z: ((i % 3) - 1) * 72 }), [i]);
  const end = useMemo(() => ({ x: (((j * 3) % 7) - 3) * 24, y: (((j * 2) % 5) - 2) * 36, z: ((j % 3) - 1) * 72 }), [j]);

  const ref = useRef();
  useLayoutEffect(() => {
    if (ref && ref.current) {
      ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(point.x, point.y, point.z)));
    }
  }, [start, end, ref]);

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={highlight ? "#ff00ff" : "white"} lineWidth={4} />
    </line>
  );
}
