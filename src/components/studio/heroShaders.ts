/**
 * Hero slider shaders — real video/image textures with a noise-distortion
 * transition, cover-fit math, film vignette and grain.
 */

export const HERO_VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const HERO_MEDIA_FRAG = `
precision highp float;

varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform vec2 uTexRes1;
uniform vec2 uTexRes2;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.05 + vec2(13.7, 7.3);
    a *= 0.5;
  }
  return v;
}

/* cover-fit: like CSS object-fit cover */
vec2 coverUv(vec2 uv, vec2 res, vec2 texRes) {
  float screenR = res.x / res.y;
  float texR = texRes.x / texRes.y;
  vec2 scale = screenR > texR
    ? vec2(1.0, texR / screenR)
    : vec2(screenR / texR, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;
  uv += uMouse * 0.008;

  float p = uProgress;
  float d = sin(p * 3.14159);
  float n = fbm(uv * 4.0 + uTime * 0.1);

  vec2 uvA = uv + vec2(d * 0.10 * (n - 0.5), d * 0.22 * n);
  vec2 uvB = uv - vec2(d * 0.10 * (n - 0.5), d * 0.22 * (1.0 - n));
  uvB = (uvB - 0.5) * (1.0 + (1.0 - p) * 0.10) + 0.5;
  uvA = (uvA - 0.5) * (1.0 - p * 0.05) + 0.5;

  vec3 colA = texture2D(uTex1, coverUv(uvA, uRes, uTexRes1)).rgb;
  vec3 colB = texture2D(uTex2, coverUv(uvB, uRes, uTexRes2)).rgb;

  float mixv = smoothstep(0.15, 0.85, p + (n - 0.5) * 0.24 * d);
  vec3 col = mix(colA, colB, mixv);

  // slight chromatic split during transition
  if (d > 0.01) {
    vec2 ca = vec2(d * 0.006, 0.0);
    col.r = mix(
      texture2D(uTex1, coverUv(uvA + ca, uRes, uTexRes1)).r,
      texture2D(uTex2, coverUv(uvB + ca, uRes, uTexRes2)).r,
      mixv
    );
  }

  // gentle darkening so the difference-blend typography reads
  col *= 0.82;

  // film vignette
  float vg = smoothstep(1.4, 0.42, distance(uv, vec2(0.5)));
  col *= 0.62 + 0.38 * vg;

  // fine grain
  col += (hash(uv * uRes + fract(uTime) * 61.7) - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`;
