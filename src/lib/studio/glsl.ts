"use client";

/** Minimal fullscreen-quad WebGL runner shared by every shader surface. */
export class GlslSurface {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | null;
  program: WebGLProgram | null = null;
  uniforms: Record<string, WebGLUniformLocation | null> = {};
  private ro: ResizeObserver | null = null;
  private maxDpr: number;

  constructor(canvas: HTMLCanvasElement, vert: string, frag: string, maxDpr = 1.75) {
    this.canvas = canvas;
    this.maxDpr = maxDpr;
    this.gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!this.gl) return;
    const gl = this.gl;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("[studio shader]", gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[studio program]", gl.getProgramInfoLog(prog));
      return;
    }
    this.program = prog;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) this.uniforms[info.name] = gl.getUniformLocation(prog, info.name);
    }

    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
  }

  resize() {
    if (!this.gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    const w = Math.max(2, Math.round((this.canvas.clientWidth || 2) * dpr));
    const h = Math.max(2, Math.round((this.canvas.clientHeight || 2) * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }

  set1(name: string, v: number) {
    if (this.gl && this.uniforms[name]) this.gl.uniform1f(this.uniforms[name], v);
  }

  set2(name: string, x: number, y: number) {
    if (this.gl && this.uniforms[name]) this.gl.uniform2f(this.uniforms[name], x, y);
  }

  draw() {
    if (!this.gl || !this.program) return;
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  destroy() {
    // Note: we intentionally do NOT loseContext() here. A canvas keeps
    // returning the same (lost) context forever, which breaks React
    // StrictMode's double-mount in dev. Programs are tiny; re-creating
    // them on the same context is harmless.
    this.ro?.disconnect();
    if (this.gl && this.program) this.gl.deleteProgram(this.program);
    this.program = null;
    this.gl = null;
  }
}
