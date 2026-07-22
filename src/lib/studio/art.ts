"use client";

/**
 * Procedural art painter — generates the studio's "custom footage" (cards,
 * cube faces, thumbnails, gallery covers) on <canvas>, so every asset is
 * generated in-house, in-brand and weighs zero bytes over the network.
 */

export interface ArtSpec {
  palette: [string, string, string];
  seed?: number;
  pattern?: "waves" | "orb" | "grid" | "beams" | "arc";
  label?: string;
  sublabel?: string;
  initial?: string;
  grain?: boolean;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function paintArt(canvas: HTMLCanvasElement, spec: ArtSpec) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = canvas.clientWidth || 320;
  const cssH = canvas.clientHeight || 200;
  const w = Math.max(2, Math.round(cssW * dpr));
  const h = Math.max(2, Math.round(cssH * dpr));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rand = mulberry32(spec.seed ?? 7);
  const [c1, c2, c3] = spec.palette;
  const pattern = spec.pattern ?? "waves";

  // base
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, w, h);

  // atmosphere gradients
  const g1 = ctx.createRadialGradient(
    w * (0.2 + rand() * 0.5),
    h * (0.85 + rand() * 0.3),
    0,
    w * 0.4,
    h * 0.9,
    Math.max(w, h) * 1.05,
  );
  g1.addColorStop(0, c1);
  g1.addColorStop(0.45, c2);
  g1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);

  const g2 = ctx.createRadialGradient(
    w * (0.75 + rand() * 0.2),
    h * 0.05,
    0,
    w * 0.8,
    h * 0.1,
    Math.max(w, h) * 0.7,
  );
  g2.addColorStop(0, c3);
  g2.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  ctx.lineWidth = Math.max(1, dpr * 0.8);

  if (pattern === "waves") {
    const lines = 14;
    for (let i = 0; i < lines; i++) {
      const yBase = (h / lines) * i + rand() * h * 0.06;
      const amp = h * (0.03 + rand() * 0.09);
      const freq = 1.4 + rand() * 2.2;
      const phase = rand() * Math.PI * 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6 * dpr) {
        const y =
          yBase + Math.sin((x / w) * Math.PI * freq + phase) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.025 + rand() * 0.06})`;
      ctx.stroke();
    }
  } else if (pattern === "orb") {
    const cx = w * (0.35 + rand() * 0.3);
    const cy = h * (0.4 + rand() * 0.25);
    const rMax = Math.min(w, h) * 0.42;
    for (let i = 8; i > 0; i--) {
      const r = (rMax / 8) * i;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + (8 - i) * 0.012})`;
      ctx.stroke();
    }
    const orb = ctx.createRadialGradient(cx, cy, 0, cx, cy, rMax * 0.6);
    orb.addColorStop(0, "rgba(255,255,255,0.5)");
    orb.addColorStop(0.2, c3);
    orb.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = orb;
    ctx.beginPath();
    ctx.arc(cx, cy, rMax * 0.6, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === "grid") {
    const step = Math.max(w, h) / 14;
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    const horizon = h * 0.42;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(w / 2 + (x - w / 2) * 0.24, horizon);
      ctx.stroke();
    }
    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      const y = h - (h - horizon) * (1 - Math.pow(1 - t, 2.2));
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + t * 0.07})`;
      ctx.stroke();
    }
  } else if (pattern === "beams") {
    for (let i = 0; i < 7; i++) {
      const x0 = rand() * w;
      const wBeam = w * (0.03 + rand() * 0.1);
      const grad = ctx.createLinearGradient(x0, 0, x0 + wBeam, 0);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, `rgba(255,255,255,${0.05 + rand() * 0.08})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.save();
      ctx.translate(x0, h / 2);
      ctx.rotate((rand() - 0.5) * 0.5);
      ctx.fillRect(-wBeam / 2, -h, wBeam, h * 2);
      ctx.restore();
    }
  } else if (pattern === "arc") {
    const cx = w * 0.5;
    const cy = h * 1.35;
    for (let i = 0; i < 10; i++) {
      const r = h * (0.55 + i * 0.09);
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.028 + i * 0.008})`;
      ctx.stroke();
    }
  }

  // grain
  if (spec.grain !== false) {
    const dots = Math.floor((w * h) / 900);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < dots; i++) {
      ctx.fillRect(rand() * w, rand() * h, dpr, dpr);
    }
  }

  // vignette
  const vg = ctx.createRadialGradient(
    w / 2,
    h / 2,
    Math.min(w, h) * 0.3,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.85,
  );
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  // typography
  const pad = Math.round(Math.min(w, h) * 0.07);
  if (spec.initial) {
    ctx.font = `600 ${Math.round(h * 0.42)}px "Zalando Sans SemiExpanded", "DM Sans", sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(spec.initial, w / 2, h / 2 + h * 0.02);
  }
  if (spec.label) {
    ctx.font = `500 ${Math.max(9 * dpr, Math.round(h * 0.045))}px "DM Sans", sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText(spec.label.toUpperCase(), pad, pad);
  }
  if (spec.sublabel) {
    ctx.font = `400 ${Math.max(8 * dpr, Math.round(h * 0.038))}px "DM Sans", sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    ctx.fillText(spec.sublabel.toUpperCase(), pad, h - pad);
  }
}

/** React helper — paints once the canvas is mounted and on resize. */
export function attachArt(canvas: HTMLCanvasElement | null, spec: ArtSpec) {
  if (!canvas) return () => {};
  let raf = 0;
  const paint = () => paintArt(canvas, spec);
  raf = requestAnimationFrame(paint);
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(paint);
  });
  ro.observe(canvas);
  // repaint once fonts are in so labels use the display face
  document.fonts?.ready.then(paint).catch(() => {});
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}
