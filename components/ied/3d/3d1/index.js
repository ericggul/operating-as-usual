import * as S from "./styles";

import { useState, useEffect } from "react";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";

const REPEAT = 1;
const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function VisualTest({ data }) {
  const [bubbledData, setBubbledData] = useState(new Array(REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));

  useEffect(() => {
    setBubbledData(new Array(REPEAT * REPEAT).fill(0).reduce((prev, curr) => [...prev, ...data], []));
  }, [data]);

  return (
    <S.Container>
      <Canvas>
        <ambientLight intensity={1} />
        <group>
          <mesh>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color="black" />
          </mesh>
        </group>
      </Canvas>
    </S.Container>
  );
}
