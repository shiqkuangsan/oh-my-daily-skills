---
name: tooyoung:ink-reader
description: "Use when the user asks to extract, read, or save the content of a public or accessible URL, especially WeChat articles, X/Twitter threads, Chinese content platforms, and pages needing browser fallbacks."
metadata:
  version: "1.2.0"
  author: shiqkuangsan
  visibility: public
---

# Ink Reader

Route URL-reading requests through the best capability currently available, validate that actual content was retrieved, and return clean Markdown. This skill supplies platform-specific fallbacks; native URL tools should do the ordinary extraction.

## Resource Routing

Read `references/platform-routing.md` when the URL is WeChat, X/Twitter, login-gated, or the first extraction attempt fails. Generic public pages usually do not require the reference.

## Core Workflow

1. Identify the domain and whether authentication or JavaScript rendering is likely.
2. Try the environment's native URL reader or clean-content extractor.
3. Validate that the result is article/post content rather than navigation, login, CAPTCHA, or an error page.
4. Follow the platform fallback reference only when needed.
5. Return faithful Markdown with source URL and available metadata.

Do not claim a strategy succeeded based only on HTTP 200 or page length.

## Validation

Accept content only when it contains meaningful body text and does not primarily contain verification/login markers such as `环境异常`, `完成验证`, `access denied`, `please verify`, `sign in to read`, or `subscribe to continue`.

Do not fabricate title, author, publication time, thread order, or missing post text. If metadata is absent, omit it.

## Output

```markdown
# {title}

**Source**: {platform}
**Author**: {omit when unavailable}
**Published**: {omit when unavailable}
**URL**: {original URL}

{clean body}
```

Remove navigation, ads, cookie banners, and repeated chrome. Preserve the source's meaning and structure. Summarize only when the user asks for a summary.

On failure, report the attempted strategies and the concrete blocker. Do not tell the user to install a tool when another available browser/connector can continue.

## Save Mode

Save only when explicitly requested. Use `./ink-reader-clips/{YYYY-MM-DD}_{sanitized-title}.md` unless the user supplies a destination. Include YAML fields for title, source, URL, and save time, followed by the extracted body.

## Boundaries

- Publicly accessible does not mean unrestricted redistribution; avoid unnecessary full-copy output when a summary satisfies the request.
- Use authenticated browser state only when the user has placed that browser/session in scope.
- Never bypass account access controls or solve CAPTCHAs deceptively.
- For X/Twitter, do not use direct `curl` against X pages or APIs; follow the dedicated route in the reference.
