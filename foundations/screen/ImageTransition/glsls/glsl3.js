export const params = {
  strength: 0.2,
};

//morph
export const glsl = `
  uniform float strength;

  vec4 transition(vec2 p) {
    vec4 fTex = getFromColor(p);
    vec4 tTex = getToColor(p);
    

    vec2 oa = (((fTex.rg + fTex.b) * 0.5) * 5.0 - 1.0);
    vec2 ob = (((tTex.rg + tTex.b) * 0.5) * 5.0 - 1.0);
    vec2 oc = mix(oa, ob, 0.5) * strength;

    return mix(getFromColor(p + oc * progress), getToColor(p - oc * (1.0 - progress)), progress);
  }
`;
