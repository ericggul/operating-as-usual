//@flow
import React, { Component, useRef } from "react";
import { Node } from "gl-react";

export default function GLTransition(props) {
  const {
    transition: { glsl, defaultParams },
    progress,
    from,
    to,
  } = props;

  return (
    <Node
      shader={{
        frag: `
          precision highp float;
          varying vec2 uv;
          uniform float progress, ratio;
          uniform sampler2D from, to;
          vec4 getFromColor(vec2 uv){return texture2D(from, uv);}
          vec4 getToColor(vec2 uv){return texture2D(to, uv);}
          ${glsl}
          void main(){gl_FragColor=transition(uv);}`,
      }}
      ignoreUnusedUniforms={["ratio"]}
      uniforms={{
        ...defaultParams,
        progress,
        from,
        to,
        ratio: 1,
      }}
    />
  );
}
