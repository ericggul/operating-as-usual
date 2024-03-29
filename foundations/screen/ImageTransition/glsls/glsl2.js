export const params = {
  power: 10.0,
};

//colour distance
export const glsl = `
  uniform float power;

  vec4 transition(vec2 p) {
    vec4 fTex = getFromColor(p);
    vec4 tTex = getToColor(p);
    float m = step(distance(fTex, tTex), progress);


    return mix(
      mix(fTex, tTex, m),
      tTex,
      pow(progress, power)
    );
  }
`;
