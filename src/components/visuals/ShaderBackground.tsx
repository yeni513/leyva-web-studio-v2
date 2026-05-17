"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic warm shader background.
 * Inspired by 21st.dev animated-shader-hero — rewritten and tuned for
 * Leyva Web Studio (warm ember / bronze / gold mood, no neon).
 *
 * Mounted only on desktop by the parent. We still guard with a WebGL
 * capability check so we degrade silently on edge cases.
 */
export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    // Warm cinematic ember shader — adapted from the 21st.dev hero source,
    // tuned for Leyva. The trick to thin, distinguishable streaks is to keep
    // the streak's natural high-intensity peaks and warm-tint them in-place
    // (no luma → palette remap, which flattens hotspots into mush).
    const fragmentSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 pointer;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0, a=1.;
  mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0;i<5;i++){ t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p){
  float d=1., t=.0;
  for (float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void){
  vec2 uv = (FC - .5*R) / MN;
  vec2 st = uv * vec2(2.0, 1.0);

  // Slow drifting warm cloud field — cinematic bronze smoke
  float bg = clouds(vec2(st.x + T*0.16, -st.y * 0.92 + T*0.05));

  // Subtle pointer parallax
  vec2 ptr = (pointer/R - 0.5);
  uv -= ptr * 0.05;

  // Gentle breath
  uv *= 1.0 - 0.14 * (sin(T*0.18) * 0.5 + 0.5);

  vec3 col = vec3(0.0);

  // Warm tint constants — used to color the trails in-place, preserving
  // the streak's natural sharp intensity falloff.
  vec3 emberCore = vec3(1.00, 0.62, 0.22);   // mid amber
  vec3 emberHot  = vec3(1.00, 0.78, 0.40);   // bright gold (hotspot)

  for (float i = 1.0; i < 12.0; i++) {
    uv += 0.10 * cos(i * vec2(0.10 + 0.011*i, 0.80) + i*i + T*0.45 + 0.10*uv.x);
    vec2 p = uv;
    float d = length(p);

    // Radial glow halo — softer, gives depth around streaks
    col += 0.00115 / d * (cos(sin(i) * vec3(1.0, 0.85, 0.65)) + 1.0) * emberCore;

    // ── Thin horizontal light streak ──
    // The anisotropic max() makes distance grow much faster perpendicular
    // to the streak than along it. Smaller x-factor = thinner streak.
    // 0.012 (was 0.020) tightens the streak considerably.
    float b = noise(i + p + bg * 1.731);
    float streak = b / length(max(p, vec2(b*p.x*0.012, p.y)));
    col += 0.0026 * streak * emberHot;

    // Mix toward warm bronze cloud — keeps cinematic depth in dark zones
    col = mix(col, vec3(bg*0.36, bg*0.17, bg*0.05), d * 0.85);
  }

  // Light vignette — pushes focus to the headline without washing streaks
  float r = length(uv);
  float vignette = smoothstep(1.45, 0.30, r);
  col *= mix(0.68, 1.08, vignette);

  // Lift just the deepest blacks so we never get totally flat patches
  col = max(col, vec3(0.012, 0.008, 0.018));

  // Subtle warm bias to kill any residual coolness in mids
  col *= vec3(1.06, 1.00, 0.92);

  O = vec4(col, 1.0);
}`;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        console.warn("[shader]", gl!.getShaderInfoLog(sh));
        gl!.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, vertexSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[shader] link", gl.getProgramInfoLog(program));
      canvas.style.display = "none";
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const uPtr = gl.getUniformLocation(program, "pointer");

    let dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
    const pointer = { x: 0, y: 0 };
    let visible = true;

    const resize = () => {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * dpr;
      pointer.y = (rect.height - (e.clientY - rect.top)) * dpr;
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
    };

    const start = () => {
      const t0 = performance.now();
      const render = (now: number) => {
        if (!visible) return;
        resize();
        gl!.useProgram(program);
        gl!.uniform2f(uRes, canvas.width, canvas.height);
        gl!.uniform1f(uTime, (now - t0) * 0.001);
        gl!.uniform2f(uPtr, pointer.x, pointer.y);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        rafRef.current = requestAnimationFrame(render);
      };
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      try {
        gl.deleteBuffer(buffer);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteProgram(program);
      } catch {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
