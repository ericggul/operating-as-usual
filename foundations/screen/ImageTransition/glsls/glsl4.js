export const params = {
  center: [0.4, 0.6],
  threshold: 4.0,
  fadeEdge: 0.1,
};

//cross hatch

export const glsl = `
  uniform vec2 center;
  uniform float threshold;
  uniform float fadeEdge;

  float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec4 transition(vec2 p){
    float dist = distance(center, p)/threshold;
    float r = progress - min(rand(vec2(p.y, 0.0)), rand(vec2(p.x, 0.0)));
    
    vec4 fTex = getFromColor(p);
    vec4 tTex = getToColor(p);

    return mix(fTex, tTex, mix(0.0, mix(step(dist, r), 1.0, smoothstep(1.0-fadeEdge, 1.0, progress)), smoothstep(0.0, fadeEdge, progress)));
  }
`;
