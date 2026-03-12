# Prompt Engineering for Image Generation

**Good prompts are the key to quality output.** Unlike text generation, image prompts benefit from specific patterns.

## Prompt Structure Formula

```
[Subject] + [Style/Medium] + [Details] + [Quality Boosters] + [Negative Guidance]
```

**Example:**

```
"A cyberpunk samurai warrior, digital art style, neon city background,
intricate armor details, highly detailed, professional quality, 4K resolution,
cinematic lighting, no blurry elements"
```

## Quality Boosters (append to improve output)

| Category        | Boosters                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
| **Resolution**  | `4K`, `8K`, `high resolution`, `ultra detailed`                              |
| **Quality**     | `professional quality`, `masterpiece`, `highly detailed`                     |
| **Lighting**    | `cinematic lighting`, `studio lighting`, `golden hour`, `dramatic shadows`   |
| **Style**       | `photorealistic`, `digital art`, `oil painting`, `watercolor`, `anime style` |
| **Composition** | `centered`, `rule of thirds`, `wide angle`, `close-up`, `bird's eye view`    |

## Prompt Enhancer Utility

```typescript
// lib/prompt-utils.ts
export function enhancePrompt(
  basePrompt: string,
  options?: {
    style?: "photorealistic" | "digital-art" | "anime" | "oil-painting";
    quality?: "standard" | "high" | "ultra";
    lighting?: string;
  },
) {
  const { style, quality = "high", lighting } = options ?? {};

  const qualityMap = {
    standard: "",
    high: ", highly detailed, professional quality",
    ultra:
      ", highly detailed, professional quality, 4K resolution, masterpiece",
  };

  const styleMap = {
    photorealistic: ", photorealistic, hyperrealistic",
    "digital-art": ", digital art, concept art",
    anime: ", anime style, cel shaded",
    "oil-painting": ", oil painting, brush strokes visible",
  };

  let enhanced = basePrompt;
  if (style) enhanced += styleMap[style];
  enhanced += qualityMap[quality];
  if (lighting) enhanced += `, ${lighting} lighting`;

  return enhanced;
}

// Usage
const prompt = enhancePrompt("A dragon flying over mountains", {
  style: "digital-art",
  quality: "ultra",
  lighting: "dramatic sunset",
});
// Output: "A dragon flying over mountains, digital art, concept art, highly detailed, professional quality, 4K resolution, masterpiece, dramatic sunset lighting"
```

## Negative Prompts (what to avoid)

Tell the model what NOT to include:

```typescript
const prompt = `A beautiful sunset landscape, highly detailed.
Avoid: blurry, low quality, distorted, watermark, text overlay`;
```

## Prompt Templates by Use Case

**Product Photography:**

```
"[Product] on white background, studio lighting, product photography,
commercial quality, clean composition, no shadows"
```

**Character Portrait:**

```
"Portrait of [character description], [art style], detailed face,
expressive eyes, [mood] expression, professional lighting"
```

**Logo/Icon:**

```
"Minimalist logo for [brand/concept], flat design, vector style,
clean lines, [color scheme], scalable, modern"
```

**Meme/Social:**

```
"[Scene description], meme format, bold text ready,
humorous, viral style, high contrast"
```
