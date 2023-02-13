import React, { Suspense, useRef, useState, useCallback, useEffect } from "react";

//Three
import * as THREE from "three";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export default function GLTransition({ transition, progress, from, to }) {
  const ShaderMaterial = shaderMaterial(
    //uniforms
    transition.defaultParams,
    //vertext shader
    `
    precision mediump float;
    varying vec2 vUv;

    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    `
    precision highp float;
    varying vec2 uv;
    uniform float progress, ratio;
    uniform sampler2D from, to;
    vec4 getFromColor(vec2 uv){return texture2D(from, uv);}
    vec4 getToColor(vec2 uv){return texture2D(to, uv);}
    ${transition.glsl}
    void main(){
      gl_FragColor=transition(uv);
    }
    `
  );

  extend({ ShaderMaterial });

  return (
    <Canvas>
      <mesh>
        <planeGeometry attach="geometry" args={[2, 2]} />
        <shaderMaterial ratio={1} progress={progress} from={from} to={to} />
      </mesh>
    </Canvas>
  );
}
