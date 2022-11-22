import React, { useEffect, useRef } from "react";

import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";

export default function Balls({ particles, completedIdxs, order }) {
  return (
    <>
      {new Array(5).fill(0).map((_, k) => (
        <Instances limit={21} key={k}>
          {k === 0 && <tetrahedronBufferGeometry attach="geometry" args={[3, 0]} />}
          {k === 1 && <boxBufferGeometry attach="geometry" args={[3, 3, 3, 1, 1, 1]} />}
          {k === 2 && <octahedronBufferGeometry attach="geometry" args={[3, 0]} />}
          {k === 3 && <dodecahedronBufferGeometry attach="geometry" args={[2.7, 0]} />}
          {k === 4 && <icosahedronBufferGeometry attach="geometry" args={[2.5, 0]} />}

          <meshStandardMaterial roughness={0} color="#ff77ff" />
          {particles
            .filter((_, i) => i % 5 === k)
            .map((pos, i) => (
              <SingleBall
                key={i}
                pos={pos}
                completedIdxs={completedIdxs}
                completedFinishedIdxs={completedIdxs.map((i) => (i + 1) % 105)}
                order={order}
                idx={((((i * 5 + k) * 5) % 7) * 15 + (((i * 5 + k) * 3) % 5) * 21 + ((i * 5 + k) % 3) * 70) % 105}
              />
            ))}
        </Instances>
      ))}
    </>
  );
}

function SingleBall({ pos, completedIdxs, completedFinishedIdxs, order, idx }) {
  const ref = useRef(null);

  useThree(() => {
    if (ref.current) {
      ref.current.position.x = (pos.x - 3) * 24;
      ref.current.position.y = (pos.y - 2) * 36;
      ref.current.position.z = (pos.z - 1) * 72;
      if (order && idx === order % 105) {
        ref.current.scale.x = 7;
        ref.current.scale.y = 7;
        ref.current.scale.z = 7;
        ref.current.color = new THREE.Color("#0000ff");
      } else if (order && idx === (order + 1) % 105) {
        ref.current.scale.x = 10;
        ref.current.scale.y = 10;
        ref.current.scale.z = 10;
        ref.current.color = new THREE.Color("#ff0000");
      } else if (completedIdxs.includes(idx) || completedFinishedIdxs.includes(idx)) {
        ref.current.scale.x = 3;
        ref.current.scale.y = 3;
        ref.current.scale.z = 3;
      } else {
        ref.current.scale.x = 0.5;
        ref.current.scale.y = 0.5;
        ref.current.scale.z = 0.5;
      }
    }
  });

  useFrame(() => {
    if (ref.current && order && (idx === order || idx === order + 1)) {
      ref.current.rotation.x += 0.01;
    }
  });

  return <Instance ref={ref} />;
}
