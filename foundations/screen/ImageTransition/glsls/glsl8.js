export const params = {
  amplitude: 30.0,
  speed: 30.0,
};

//water drop

export const glsl = `
  uniform float amplitude;
  uniform float speed;

  vec4 transition(vec2 p) {
    vec2 dir = p - vec2(0.75, 0.45);
    float dist = length(dir);

    vec2 dir2 = p - vec2(0.15, 0.65);
    float dist2 = length(dir2);

    vec2 dir3 = p - vec2(0.2, 0.2);
    float dist3 = length(dir3);

    vec2 dir4 = p - vec2(0.8, 0.8);
    float dist4 = length(dir4);


    vec2 offset = dir * sin(dist2 * amplitude - progress * speed)
      + dir3 * sin(dist2 * 40.0 - progress * 15.0)
      + dir2 * sin(dist4 * amplitude - progress * 30.0);

    vec2 offset2 = dir * sin(dist4 * amplitude - 30.0 * speed) + dir3 * sin(dist * 50.0 - progress * 15.0);

    return mix(mix(getFromColor(p), getToColor(p - offset), progress), getToColor(p), progress);

  }
`;
