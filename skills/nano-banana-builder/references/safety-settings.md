# Safety Settings & Content Moderation

**Production apps MUST handle content safety.** Gemini has built-in safety filters, but you should also implement your own.

## Gemini Safety Settings

```typescript
// app/actions/generate.ts
"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function generateImageSafe(prompt: string) {
  const result = await generateText({
    model: google("gemini-2.5-flash-image"),
    prompt,
    providerOptions: {
      google: {
        responseModalities: ["IMAGE"],
        // Safety settings - adjust based on your use case
        safetySettings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      },
    },
  });

  return result.files[0];
}
```

## Safety Threshold Options

| Threshold                | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `BLOCK_NONE`             | No blocking (not recommended for public apps)            |
| `BLOCK_LOW_AND_ABOVE`    | Most restrictive, blocks low probability harmful content |
| `BLOCK_MEDIUM_AND_ABOVE` | **Recommended default**                                  |
| `BLOCK_ONLY_HIGH`        | Less restrictive, only blocks high probability content   |

## Pre-Generation Prompt Filtering

```typescript
// lib/content-filter.ts
const BLOCKED_TERMS = [
  "nude",
  "naked",
  "nsfw",
  "explicit",
  "violence",
  "gore",
  "blood",
  "hate",
  "slur", // Add your blocklist
];

const SUSPICIOUS_PATTERNS = [
  /child(ren)?.*nude/i,
  /gore.*detail/i,
  // Add regex patterns
];

export function isPromptSafe(prompt: string): {
  safe: boolean;
  reason?: string;
} {
  const lowerPrompt = prompt.toLowerCase();

  // Check blocked terms
  for (const term of BLOCKED_TERMS) {
    if (lowerPrompt.includes(term)) {
      return { safe: false, reason: `Blocked term detected: ${term}` };
    }
  }

  // Check suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(prompt)) {
      return { safe: false, reason: "Suspicious content pattern detected" };
    }
  }

  return { safe: true };
}

// Usage in server action
export async function generateImage(prompt: string) {
  const { safe, reason } = isPromptSafe(prompt);
  if (!safe) {
    throw new Error(`Content policy violation: ${reason}`);
  }

  // Proceed with generation...
}
```

## Handling Safety Blocks from API

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

## User-Facing Safety Messages

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

## Best Practices for Production

1. **Always use safety settings** - Never deploy with `BLOCK_NONE` on public apps
2. **Implement pre-filtering** - Block obvious violations before hitting the API
3. **Log blocked requests** - Monitor for abuse patterns
4. **User education** - Clear guidelines on acceptable prompts
5. **Rate limit by user** - Prevent abuse through request throttling
6. **Human review option** - For edge cases, allow manual review
