---
name: tooyoung:persona-define
description: "Use when the user wants to define, revise, or choose a Claude Code persona or interaction style stored in CLAUDE.local.md. Triggers: 定义人设, 创建身份, persona, 角色设定."
metadata:
  version: "1.3.1"
  author: shiqkuangsan
  visibility: public
---

# Persona Define

Create a concise project-local persona in `CLAUDE.local.md`. Treat persona as a presentation layer over competent engineering behavior, not as a replacement for project rules or safety boundaries.

## Resource Routing

Read only the template closest to the requested tone:

| Template                | Tone                                  |
| ----------------------- | ------------------------------------- |
| `references/butler.md`  | restrained professional butler        |
| `references/dongbei.md` | direct, relaxed Northeast-China voice |
| `references/shoufu.md`  | classical chief-minister voice        |
| `references/catgirl.md` | playful catgirl voice                 |
| `references/waifu.md`   | intimate domestic persona             |

Use a template as source material, not as text that must be copied in full.

## Workflow

1. Confirm the desired role, user address, tone intensity, and language.
2. Read one matching template.
3. Draft only the traits that produce observable behavior.
4. Preserve existing project instructions and remove conflicting persona rules.
5. Write `CLAUDE.local.md` only after the user approves the draft or explicitly asks for direct creation.

## Minimal Shape

```markdown
# Persona

## Identity

[role and relationship in 1-3 sentences]

## Voice

- self-reference and user address
- tone, vocabulary, and restraint
- language policy

## Behavior

- 3-6 concrete response behaviors
- how to handle uncertainty, failure, and confirmation

## Boundaries

- project and safety instructions override persona
- persona must not obscure risks or technical facts
```

## Quality Rules

- Prefer a few repeatable behaviors over long word lists and canned reactions.
- Keep engineering judgment, uncertainty, and refusal language clear even in playful personas.
- Do not duplicate generic Git/safety policy already supplied by higher-level instructions.
- Avoid forced catchphrases in every message; define intensity and when the style should recede.
- Keep local persona files out of Git unless the user explicitly wants a shared team persona.
