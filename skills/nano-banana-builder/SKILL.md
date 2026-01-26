---
name: tooyoung:nano-banana-builder
version: 0.1.0
description: Build full-stack web applications powered by Google Gemini's Nano Banana & Nano Banana Pro image generation APIs. Use when creating Next.js image generation apps, text-to-image tools, or iterative image editors.
---

# Nano Banana Builder

Build production-ready web applications powered by Google's Nano Banana image generation APIs—creating everything from simple text-to-image generators to sophisticated iterative editors with multi-turn conversation.

---

## CRITICAL: Exact Model Names

**Use ONLY these exact model strings. Do not invent, guess, or add date suffixes.**

| Model String (use exactly) | Alias | Use Case |
|---------------------------|-------|----------|
| `gemini-2.5-flash-image` | Nano Banana | Fast iterations, drafts, high volume |
| `gemini-3-pro-image-preview` | Nano Banana Pro | Quality output, text rendering, 2K |

**Common mistakes to avoid:**
- ❌ `gemini-2.5-flash-preview-05-20` — wrong, date suffixes are for text models
- ❌ `gemini-2.5-pro-image` — wrong, 2.5 Pro doesn't do image generation
- ❌ `gemini-3-flash-image` — wrong, doesn't exist
- ❌ `gemini-pro-vision` — wrong, that's for image *input*, not generation

**The only valid image generation models are `gemini-2.5-flash-image` and `gemini-3-pro-image-preview`.**

---

## SDK Version Requirements

**Tested and compatible versions (as of January 2025):**

| Package | Minimum Version | Recommended |
|---------|-----------------|-------------|
| `ai` | 3.4.0+ | `^4.0.0` |
| `@ai-sdk/google` | 0.0.52+ | `^1.0.0` |
| `@ai-sdk/react` | 0.0.62+ | `^1.0.0` |
| `next` | 14.0.0+ | `^15.0.0` |
| `react` | 18.2.0+ | `^19.0.0` |

**Important notes:**
- This skill uses **Next.js App Router** (not Pages Router)
- Server Actions require `'use server'` directive
- All examples use **TypeScript** (recommended for type safety)

```bash
# Check your versions
npm list ai @ai-sdk/google @ai-sdk/react next

# Update to latest
npm update ai @ai-sdk/google @ai-sdk/react
```

**Breaking changes to watch:**
- `result.files[0]` structure may change between major versions
- `providerOptions.google` namespace for Gemini-specific configs
- `useChat` hook API from `@ai-sdk/react`

---

## Philosophy: Conversational Image Generation

Nano Banana isn't just another image API—it's **conversational by design**. The core insight is that image generation works best as a dialogue, not a one-shot prompt.

**Think of it as working with an AI art director**:
- **Iterative refinement** → Build up images through conversation, not perfection in one prompt
- **Context awareness** → The model "remembers" previous generations and edits
- **Natural language editing** → Describe changes conversationally, not with parameters

### Before Building, Ask

- **What's the primary use case?** Text-to-image generation? Image editing? Multi-image composition? Style transfer?
- **Which model fits the need?** Nano Banana (speed/iterations) or Nano Banana Pro (quality/complex prompts)?
- **What's the user journey?** Single generation? Iterative refinement? Gallery browsing?
- **What are production constraints?** Rate limits? Storage? Cost per image? User volume?

### Core Principles

1. **Conversation over configuration**: Leverage Nano Banana's iterative editing rather than complex parameter UIs
2. **Model selection matters**: Use `gemini-2.5-flash-image` for speed/iterations, `gemini-3-pro-image-preview` for quality/complexity
3. **State as conversation history**: Track generations as chat messages to enable multi-turn editing
4. **Rate limit awareness**: Image generation has strict quotas—implement queuing and caching
5. **Storage strategy**: Store generated images (Vercel Blob/S3), not just inline base64

### Model Selection Framework

Choose based on use case:

| Use Case | Model | Why |
|----------|-------|-----|
| Rapid iterations, drafts | `gemini-2.5-flash-image` | Fast (2-5s), lower cost per image |
| Final output, quality | `gemini-3-pro-image-preview` | Superior quality, thinking, text rendering |
| Text-heavy images | `gemini-3-pro-image-preview` | Best typography, 2K resolution |
| Multi-turn editing | Either | Both support conversational editing |
| High volume | `gemini-2.5-flash-image` | Lower cost, faster throughput |

---

## Quick Start

### Basic Server Action

```typescript
// app/actions/generate.ts
'use server'

import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function generateImage(prompt: string) {
  const result = await generateText({
    model: google('gemini-2.5-flash-image'),
    prompt,
    providerOptions: {
      google: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '16:9' }
      }
    }
  })

  return result.files[0] // { base64, uint8Array, mediaType }
}
```

### Client Component with useChat

```typescript
// app/components/ImageGenerator.tsx
'use client'

import { useChat } from '@ai-sdk/react'

export function ImageGenerator() {
  const { append, messages, isLoading } = useChat({
    api: '/api/generate'
  })

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.parts?.map((part, i) =>
            part.type === 'image' && (
              <img key={i} src={part.url} alt="Generated" />
            )
          )}
        </div>
      ))}

      <button
        disabled={isLoading}
        onClick={() => append({
          role: 'user',
          content: 'A futuristic cityscape at dusk'
        })}
      >
        Generate
      </button>
    </div>
  )
}
```

---

## Prompt Engineering for Image Generation

**Good prompts are the key to quality output.** Unlike text generation, image prompts benefit from specific patterns.

### Prompt Structure Formula

```
[Subject] + [Style/Medium] + [Details] + [Quality Boosters] + [Negative Guidance]
```

**Example:**
```
"A cyberpunk samurai warrior, digital art style, neon city background,
intricate armor details, highly detailed, professional quality, 4K resolution,
cinematic lighting, no blurry elements"
```

### Quality Boosters (append to improve output)

| Category | Boosters |
|----------|----------|
| **Resolution** | `4K`, `8K`, `high resolution`, `ultra detailed` |
| **Quality** | `professional quality`, `masterpiece`, `highly detailed` |
| **Lighting** | `cinematic lighting`, `studio lighting`, `golden hour`, `dramatic shadows` |
| **Style** | `photorealistic`, `digital art`, `oil painting`, `watercolor`, `anime style` |
| **Composition** | `centered`, `rule of thirds`, `wide angle`, `close-up`, `bird's eye view` |

### Prompt Enhancer Utility

```typescript
// lib/prompt-utils.ts
export function enhancePrompt(
  basePrompt: string,
  options?: {
    style?: 'photorealistic' | 'digital-art' | 'anime' | 'oil-painting'
    quality?: 'standard' | 'high' | 'ultra'
    lighting?: string
  }
) {
  const { style, quality = 'high', lighting } = options ?? {}

  const qualityMap = {
    standard: '',
    high: ', highly detailed, professional quality',
    ultra: ', highly detailed, professional quality, 4K resolution, masterpiece'
  }

  const styleMap = {
    'photorealistic': ', photorealistic, hyperrealistic',
    'digital-art': ', digital art, concept art',
    'anime': ', anime style, cel shaded',
    'oil-painting': ', oil painting, brush strokes visible'
  }

  let enhanced = basePrompt
  if (style) enhanced += styleMap[style]
  enhanced += qualityMap[quality]
  if (lighting) enhanced += `, ${lighting} lighting`

  return enhanced
}

// Usage
const prompt = enhancePrompt('A dragon flying over mountains', {
  style: 'digital-art',
  quality: 'ultra',
  lighting: 'dramatic sunset'
})
// Output: "A dragon flying over mountains, digital art, concept art, highly detailed, professional quality, 4K resolution, masterpiece, dramatic sunset lighting"
```

### Negative Prompts (what to avoid)

Tell the model what NOT to include:
```typescript
const prompt = `A beautiful sunset landscape, highly detailed.
Avoid: blurry, low quality, distorted, watermark, text overlay`
```

### Prompt Templates by Use Case

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

---

## Advanced Implementation

For complete implementations including:
- **Server Actions** with model selection, storage, and error handling
- **API Routes** with streaming responses
- **Client Components** with iterative editing and galleries
- **Advanced Patterns** like multi-image composition and batch generation

See **references/advanced-patterns.md**

---

## Safety Settings & Content Moderation

**Production apps MUST handle content safety.** Gemini has built-in safety filters, but you should also implement your own.

### Gemini Safety Settings

```typescript
// app/actions/generate.ts
'use server'

import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function generateImageSafe(prompt: string) {
  const result = await generateText({
    model: google('gemini-2.5-flash-image'),
    prompt,
    providerOptions: {
      google: {
        responseModalities: ['IMAGE'],
        // Safety settings - adjust based on your use case
        safetySettings: [
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }
    }
  })

  return result.files[0]
}
```

### Safety Threshold Options

| Threshold | Description |
|-----------|-------------|
| `BLOCK_NONE` | No blocking (not recommended for public apps) |
| `BLOCK_LOW_AND_ABOVE` | Most restrictive, blocks low probability harmful content |
| `BLOCK_MEDIUM_AND_ABOVE` | **Recommended default** |
| `BLOCK_ONLY_HIGH` | Less restrictive, only blocks high probability content |

### Pre-Generation Prompt Filtering

```typescript
// lib/content-filter.ts
const BLOCKED_TERMS = [
  'nude', 'naked', 'nsfw', 'explicit',
  'violence', 'gore', 'blood',
  'hate', 'slur', // Add your blocklist
]

const SUSPICIOUS_PATTERNS = [
  /child(ren)?.*nude/i,
  /gore.*detail/i,
  // Add regex patterns
]

export function isPromptSafe(prompt: string): { safe: boolean; reason?: string } {
  const lowerPrompt = prompt.toLowerCase()

  // Check blocked terms
  for (const term of BLOCKED_TERMS) {
    if (lowerPrompt.includes(term)) {
      return { safe: false, reason: `Blocked term detected: ${term}` }
    }
  }

  // Check suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(prompt)) {
      return { safe: false, reason: 'Suspicious content pattern detected' }
    }
  }

  return { safe: true }
}

// Usage in server action
export async function generateImage(prompt: string) {
  const { safe, reason } = isPromptSafe(prompt)
  if (!safe) {
    throw new Error(`Content policy violation: ${reason}`)
  }

  // Proceed with generation...
}
```

### Handling Safety Blocks from API

```typescript
// lib/errors.ts
export async function generateWithSafetyHandling(prompt: string) {
  try {
    const result = await generateText({...})
    return { success: true, image: result.files[0] }
  } catch (error: any) {
    // Check if blocked by safety filters
    if (error.message?.includes('SAFETY') ||
        error.message?.includes('blocked') ||
        error.code === 'SAFETY_BLOCKED') {
      return {
        success: false,
        error: 'Your request was blocked by content safety filters. Please modify your prompt.',
        code: 'SAFETY_BLOCKED'
      }
    }

    // Re-throw other errors
    throw error
  }
}
```

### User-Facing Safety Messages

```typescript
// components/SafetyMessage.tsx
export function SafetyMessage({ error }: { error: string }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
      <h3 className="font-bold text-yellow-800">Content Policy Notice</h3>
      <p className="text-yellow-700 mt-1">
        Your image request couldn't be processed. This may be because:
      </p>
      <ul className="list-disc list-inside text-yellow-700 mt-2">
        <li>The prompt contains restricted content</li>
        <li>The generated image was flagged by safety filters</li>
        <li>The request violates our usage guidelines</li>
      </ul>
      <p className="text-yellow-700 mt-2">
        Please modify your prompt and try again.
      </p>
    </div>
  )
}
```

### Best Practices for Production

1. **Always use safety settings** - Never deploy with `BLOCK_NONE` on public apps
2. **Implement pre-filtering** - Block obvious violations before hitting the API
3. **Log blocked requests** - Monitor for abuse patterns
4. **User education** - Clear guidelines on acceptable prompts
5. **Rate limit by user** - Prevent abuse through request throttling
6. **Human review option** - For edge cases, allow manual review

---

## Configuration & Operations

For detailed configuration and operational concerns:
- **Provider Options** (responseModalities, imageConfig, thinkingConfig)
- **Storage Strategy** (Vercel Blob, S3/R2 implementations)
- **Rate Limiting** (Upstash Redis patterns, quota management)
- **Cost Optimization** strategies

See **references/configuration.md**

---

## Anti-Patterns to Avoid

❌ **Inventing model names or adding date suffixes**:
Why wrong: Image generation models have specific names; date suffixes like `-preview-05-20` are for text models only
Better: Use exactly `gemini-2.5-flash-image` or `gemini-3-pro-image-preview` — no variations

❌ **Using Gemini 2.5 Pro for images**:
Why wrong: Gemini 2.5 Pro doesn't generate images directly
Better: Use `gemini-2.5-flash-image` or `gemini-3-pro-image-preview`

❌ **Storing only base64 in database**:
Why wrong: Blobs database, expensive storage, slow retrieval
Better: Store in object storage (Vercel Blob/S3), save URL only

❌ **No rate limit handling**:
Why wrong: Will hit 429 errors in production, poor UX
Better: Implement rate limiting with user-friendly error messages

❌ **Ignoring multi-turn context**:
Why wrong: Wastes Nano Banana's conversational editing strength
Better: Track chat history for iterative refinement

❌ **Hardcoding API keys client-side**:
Why wrong: Exposes credentials, security risk
Better: Use server actions / API routes with environment variables

❌ **Using wrong aspect ratio**:
Why wrong: 21:9 on 1:1 request wastes tokens, unexpected crop
Better: Match aspect ratio to intended use case

❌ **No loading states**:
Why wrong: Image generation takes 5-30s, users think it's broken
Better: Show progress indicators and estimated wait time

❌ **Generating on every keystroke**:
Why wrong: Wastes quota, slow response
Better: Debounce prompts, require explicit action

---

## Variation Guidance

**IMPORTANT**: Every app should feel uniquely designed for its specific purpose.

**Vary across dimensions**:
- **UI Style**: Minimal, brutalist, playful, professional, dark, light
- **Color Scheme**: Warm, cool, monochrome, vibrant, muted
- **Layout**: Single page, multi-step wizard, sidebar, grid, list
- **Interaction**: Click-to-generate, drag-and-drop, real-time typing, batch

**Avoid overused patterns**:
- ❌ Default Tailwind purple gradients
- ❌ Generic "AI startup" aesthetic
- ❌ Same component libraries for every project
- ❌ Inter/Roboto fonts without thought

**Context should drive design**:
- **Meme generator** → Bold, fun, casual
- **Product mockup tool** → Clean, professional, grid-based
- **Art exploration** → Gallery-first, visual-heavy
- **Brand asset creator** → Polished, template-guided

---

## Environment Setup

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here

# For Vercel Blob storage
BLOB_READ_WRITE_TOKEN=your_vercel_token

# For S3 (optional)
S3_BUCKET=your-bucket
S3_ENDPOINT=https://your-endpoint.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your_key
S3_SECRET_ACCESS_KEY=your_secret

# For Upstash rate limiting (optional)
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

```bash
# Install dependencies
npm install @ai-sdk/google ai @ai-sdk/react @vercel/blob

# Or if using separate packages
npm install google-genai
```

---

## Remember

**Nano Banana enables conversational image generation that feels like working with a creative partner, not a tool.**

The best apps:
- Leverage multi-turn editing for refinement
- Choose models intentionally (speed vs quality)
- Handle rate limits gracefully
- Store images efficiently
- Provide great loading states
- Feel uniquely designed for their purpose

You're building more than an image generator—you're creating a creative experience. Design it thoughtfully.
