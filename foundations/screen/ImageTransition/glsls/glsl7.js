export const params = {
  size: 0.04,
  zoom: 50.0,
  colorSeperation: 0.3,
};

//flyeye
export const glsl = `
  uniform float size;
  uniform float zoom;
  uniform float colorSeperation;

  vec4 transition(vec2 p) {
    float inv = 1.0 - progress;
    vec2 disp = size * vec2(cos(zoom * p.x), sin(zoom * p.y));
    vec4 texTo = getToColor(p + disp * inv);
    vec4 texFrom = vec4(
      getFromColor(p + progress * disp * (1.0 - colorSeperation)).r,
      getFromColor(p + progress * disp * (1.0 - colorSeperation)).g,
      getFromColor(p + progress * disp * (1.0 - colorSeperation)).b,
      1.0
    );

    return mix(texFrom, texTo, progress);
  }
`;
