---
name: cinematic-hero
description: Generate a premium, cinematic hero (static image OR looping video) using the user's Higgsfield account via the Higgsfield MCP server, then wire it into the site's Hero component with proper overlays, fallbacks, and mobile/perf handling. Use when the user asks for a "hero", "hero video", "hero background", "fondo del hero", "video hero", "animated hero", or anything that visually upgrades the top of a page. Requires the Higgsfield MCP server to be connected and authenticated.
---

# Cinematic Hero — Higgsfield Edition

You are generating the single most important visual on the site: the hero. It must look brutal — cinematic, intentional, premium. Never generic, never stock, never "AI-looking".

## Hard requirements

1. The Higgsfield MCP server (`higgsfield`) must be connected and authenticated. If `ToolSearch` for `higgsfield` returns nothing, stop and ask the user to run `claude mcp list` and authenticate.
2. All generated assets are saved under `public/heroes/<slug>/` (create the folder).
3. Video heroes must loop seamlessly, be muted, autoplay, playsinline, and ship with a poster image fallback.
4. The Hero component must remain readable on top of the new background (text contrast > 4.5:1, important content not occluded).
5. Never overwrite the existing `Hero.tsx` blindly — read it first, then layer the new background under the existing content.

## Workflow

### Step 1 — Brief the shot (ask the user, max 4 questions)

Use `AskUserQuestion` to gather only what is missing. Defaults in brackets.

- **Mode** — [video loop] | static image | both (image + video fallback for mobile)
- **Vibe** — cinematic-architectural | abstract-light | material-craft (tools/hands/textures) | product-hero | aerial-establishing | tech-grid-abstract
- **Industry context** (informs subject) — contractor, real estate, restaurant, barber, cleaning, appliance store, generic local biz, none
- **Color story** — match brand (warm ember/amber + ink black, per `tailwind.config.ts`) | custom | monochrome

If the user said "sorpréndeme" / "you pick" — skip questions, pick `video loop` + `cinematic-architectural` + brand colors.

### Step 2 — Pick the right Higgsfield model

Don't ask the user — decide based on the brief.

| Goal | Model |
|---|---|
| Static hero image, max realism + control | **Soul** or **Flux** |
| Static hero, stylized/illustrative | **Nano Banana Pro** or **GPT Image** |
| Cinematic video loop, 4–6s, photoreal | **Veo** or **Sora 2** |
| Strong camera motion (dolly, parallax) | **Kling** |
| Abstract motion / particles / fluid | **Seedance 2.0** |
| Character-driven (avoid for hero bg) | skip — heroes should rarely feature a person face-front |

For video loops: always prompt for **seamless loop**, **5–6 seconds**, **subtle motion only** (text sits on top — too much motion fights the copy).

### Step 3 — Write a PREMIUM prompt (this is where most heroes die)

Bad prompt (DO NOT do this):
> "A modern website hero with a contractor smiling at a laptop, professional, high quality, 4k, trending"

Good prompt — built from these layers:

1. **Subject** — concrete, specific, often abstract or environmental rather than a person. Examples: "an empty restaurant interior at golden hour, soft window light raking across a marble counter"; "macro shot of dust particles drifting through a beam of warm light in a workshop"; "topographic ridges of dark sand catching ember-orange edge light".
2. **Camera language** — focal length, motion, angle. e.g. "anamorphic 35mm, slow dolly-in, shallow depth of field, low angle".
3. **Lighting** — direction, quality, color temp. e.g. "single warm key light from camera-right, deep ambient shadow, volumetric haze".
4. **Color grade** — ember/amber highlights, ink-black shadows, deep teal mids. Match the site palette.
5. **Texture / film** — "subtle 35mm grain, gentle vignette, no lens flare, no text, no people".
6. **Mood** — one word: "considered", "quiet", "weighty", "luminous". No "epic", no "amazing".
7. **Aspect ratio** — `16:9` for desktop hero, `9:16` if mobile-first.
8. **Negative cues** — `no text, no logos, no watermarks, no people staring at camera, no stock-photo composition, no lens flares, no fish-eye`.

For **looping video** add: `seamless loop, minimal subject movement, slow drifting motion only, 6 seconds`.

For **industry-flavored heroes**, anchor the subject to that world without being literal:
- Contractor → workshop light, raw materials, hand tools in shallow focus
- Real estate → architectural lines, golden-hour windows, empty considered interior
- Restaurant → marble counter, steam, glassware, candle-warmth
- Barber → polished chrome, leather, single overhead pendant light
- Cleaning → glass refracting light, water droplets, soft white surfaces
- Appliance store → product silhouette, rim light, dark studio
- Generic → architectural light study, abstract material macro

### Step 4 — Generate

Call the Higgsfield MCP tool that matches the chosen mode:

- For static image → `mcp__higgsfield__generate_image` (or whatever the tool surface advertises — use `ToolSearch` with `query: "higgsfield generate"` to load the actual schemas before the first call).
- For video → `mcp__higgsfield__generate_video` (often takes either a text prompt or an image-to-video reference; for max quality, generate the image first with Soul/Flux, then animate it).
- Poll with `mcp__higgsfield__get_generation_status` until ready.

**Best practice for video heroes:** generate a still first, review it with the user, then animate the approved still. This avoids burning credits on a bad seed.

### Step 5 — Download and place

Save the asset(s) to:

```
public/heroes/<slug>/
  ├── hero.mp4         (h.264, ≤ 4 MB, 6s, 1920×1080 or 1280×720)
  ├── hero.webm        (optional, smaller)
  └── poster.jpg       (first frame, 1920×1080, ≤ 200 KB)
```

`<slug>` = short kebab-case name describing the shot (e.g. `workshop-light`, `marble-counter`). Reuse the slug in code references.

If Higgsfield returns a larger file, compress with `ffmpeg` (the user has it in this env — if not, instruct them to compress):
```
ffmpeg -i raw.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart hero.mp4
ffmpeg -i raw.mp4 -vframes 1 -q:v 3 poster.jpg
```

### Step 6 — Wire into Hero.tsx

The current hero (`src/components/sections/Hero.tsx`) already has a layered background: `StaticHeroBackground` + `ShaderBackground` + vignette + grid. **Do not delete those** — they are the fallback. Insert the new asset as a layer **on top of the static backdrop but below the shader/vignette stack**, so:

- WebGL still runs and tints/animates over the asset.
- If the video fails to load, the static backdrop is still there.
- The vignette and grid stay on top, preserving text legibility.

For a **video hero**, drop a new component at `src/components/visuals/HeroVideoBackground.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;            // "/heroes/workshop-light/hero.mp4"
  poster: string;         // "/heroes/workshop-light/poster.jpg"
  className?: string;
};

export function HeroVideoBackground({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Respect prefers-reduced-motion — keep poster only.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Save data on metered connections / very small viewports.
    const conn = (navigator as any).connection;
    if (conn?.saveData) return;
    v.play().catch(() => {});
  }, []);

  return (
    <div className={className}>
      <img
        src={poster}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
```

Then in `Hero.tsx`, insert one line inside the background layer (between `StaticHeroBackground` and the WebGL shader div):

```tsx
<HeroVideoBackground
  src="/heroes/<slug>/hero.mp4"
  poster="/heroes/<slug>/poster.jpg"
  className="absolute inset-0"
/>
```

For a **static image hero**, skip the component — just add an `<img>` (or `next/image` with `priority` and `fill`) inside the same background layer, again above the static backdrop and below the shader/vignette.

### Step 7 — Tune the overlays for legibility

After wiring, the headline copy must remain crisp. If the generated asset is too bright or busy where the text sits:

- Strengthen the existing radial vignette in `Hero.tsx` (the `bg-[radial-gradient(...)]` line) — push the inner stop from `transparent` to `rgba(7,6,8,0.25)`.
- Or add a soft horizontal scrim: `<div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink-950/60 to-transparent" />`.
- Re-render the page and visually confirm headline + sub-headline contrast.

### Step 8 — Quality gate (final boss check)

Before reporting done, verify each:

- [ ] Video loops with no visible cut (watch 2 full loops).
- [ ] `hero.mp4` ≤ 4 MB. Poster ≤ 200 KB. Run `ls -lh public/heroes/<slug>/`.
- [ ] Headline gradient text reads cleanly over the new background on desktop AND at 375px width.
- [ ] No layout shift on load (poster shows immediately, video fades in).
- [ ] `prefers-reduced-motion` honored (test by toggling in DevTools).
- [ ] The shot does NOT look like generic AI stock. If it does — regenerate with a more specific subject, tighter camera language, and more restrained motion.
- [ ] Run the dev server and visually confirm.

## Conventions specific to this project

- Brand palette lives in `tailwind.config.ts` — use `ember-*` and `ink-*` references in prompts (e.g. "ember-orange highlights, ink-black shadows").
- Spanish-language site — but image prompts go to Higgsfield in **English** (better model adherence).
- `Hero.tsx` is a Client Component already; the new background component should also be client-side (`"use client"`).
- Keep the existing `StaticHeroBackground` and `ShaderBackground` — they are the resilience layer. Never replace them.

## When NOT to use this skill

- The user just wants to tweak copy or buttons in the hero — use a direct edit.
- The user wants a hero for a section that is NOT the page hero (e.g. an "About" header) — adapt the prompt scale but skip the full background layering; a single static image with overlay is usually enough.
- The Higgsfield MCP is disconnected — stop and ask the user to reconnect; do not fall back to other image services without permission.
