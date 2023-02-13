import React, { Component, useEffect, useRef } from "react";
import GLslCanvas from "glslCanvas";
import useResize from "utils/hooks/useResize";

export default function GLTransition(props) {
  const [windowWidth, windowHeight] = useResize();

  const {
    transition: { glsl, defaultParams },
    progress,
    from,
    to,
  } = props;

  const canvasRef = useRef(null);
  const sandboxRef = useRef(null);

  useEffect(() => {
    if (sandboxRef && sandboxRef.current) {
      //   let frag_code = `
      //   precision highp float;
      //   varying vec2 uv;
      //   uniform float progress, ratio;
      //   uniform sampler2D from, to;
      //   vec4 getFromColor(vec2 uv){return texture2D(from, uv);}
      //   vec4 getToColor(vec2 uv){return texture2D(to, uv);}
      //   ${glsl}
      //   void main(){
      //     gl_FragColor=transition(uv);
      //   }
      // `;
      //   sandboxRef.current.load(frag_code);

      Object.entries(defaultParams).forEach((param, i) => {
        console.log(param);
        console.log(sandboxRef.current);
        sandboxRef.current.setUniform(param[0], param[1]);
      });
    }
  }, [sandboxRef, glsl, defaultParams]);

  useEffect(() => {
    if (sandboxRef && sandboxRef.current) {
      sandboxRef.current.setUniform("progress", progress);
      sandboxRef.current.setUniform("ratio", 1);
      sandboxRef.current.setUniform("from", from);
      sandboxRef.current.setUniform("to", to);
    }
  }, [sandboxRef, from, to, progress]);

  return (
    <canvas
      width={windowHeight}
      height={windowHeight}
      ref={sandboxRef}
      data-fragment={`
        precision highp float;
        varying vec2 uv;
        uniform float progress, ratio;
        uniform sampler2D from, to;
        vec4 getFromColor(vec2 uv){return texture2D(from, uv);}
        vec4 getToColor(vec2 uv){return texture2D(to, uv);}
        ${glsl}
        void main(){
          gl_FragColor=transition(uv);
        }
  
  `}
    />
  );
}
