export const params = {};

//glitch displace
export const glsl = `
  uniform float power;

  float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float voronoi(vec2 x){
    vec2 p = floor(x);
    vec2 f = fract(x);
    float res = 8.0;
    for (float j=-1.; j<=1.; j++) {
      for (float i=-1.; i<=1.; i++) {
        vec2 b = vec2(i, j);
        vec2 r = vec2(b) - f + rand(p + b);
        float d = dot(r, r);
        res = min(res, d);
      }
    }
    return sqrt(res);
  }

  vec2 displace(vec4 tex, vec2 texCoord, float dotDepth, float textureDepth, float strength){
    float b = voronoi(.003 * texCoord + 2.0);
    float g = voronoi(0.2 * texCoord);
    float r = voronoi(texCoord - 1.0);

    vec4 dt = tex * 1.0;
    vec4 dis = dt * dotDepth + 1.0 - tex * textureDepth;

    dis.x = dis.x - 1.0 + textureDepth * dotDepth;
    dis.y = dis.y - 1.0 + textureDepth * dotDepth;
    dis.x *= strength;
    dis.y *= strength;

    vec2 res_uv = texCoord;
    res_uv.x += dis.x;
    res_uv.y += dis.y;

    return res_uv;
  }

  float ease1(float t) {
    return t == 0.0 || t == 1.0 ? t : t < 0.5 ? +0.5 * pow(2.0, (20.0 * t) - 10.0) : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
  }

  float ease2(float t) {
    return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);
  }

  vec4 transition(vec2 uv){
    vec2 p = uv.xy / vec2(1.0).xy;
    vec4 fTex = getFromColor(p);
    vec4 tTex = getToColor(p);
    vec2 disp = displace(fTex, p, 0.33, 0.7, 1.0 - ease1(progress));
    vec2 disp2 = displace(tTex, p, 0.33, 0.5, ease2(progress));

    vec4 dColor1 = getToColor(disp);
    vec4 dColor2 = getFromColor(disp2);
    float val = ease1(progress);

    vec3 gray = vec3(dot(min(dColor2, dColor1).rgb, vec3(0.299, 0.587, 0.114)));
    dColor2 = vec4(gray, 1.0);
    dColor2 *= 2.0;

    fTex = mix(fTex, dColor2, smoothstep(0.0, 0.5, progress));
    tTex = mix(tTex, dColor1, smoothstep(0.5, 1.0, progress));

    return mix(fTex, tTex, val);
  }
`;
