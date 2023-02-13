export const params = {};

//crosswrap
export const glsl = `
  vec4 transition(vec2 p){
    float x = progress;
    x = smoothstep(0.0, 1.0, (x * 2.0 + p.x - 1.0));
    return mix(getFromColor((p - 0.5) * (1.0 - x) + 0.5), getToColor((p - 0.5) * x + 0.5), x);
  }
`;
