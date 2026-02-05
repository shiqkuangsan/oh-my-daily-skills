# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

A collection of daily-use skills for Claude Code.

## Specification

This project follows the [Agent Skills Specification](https://agentskills.io/specification), ensuring standardized skill format and interoperability:

- ✅ **Standard YAML Frontmatter** - Each skill includes `name`, `description`, and `metadata.version`
- ✅ **Semantic Versioning** - Version management following [semver](https://semver.org/)
- ✅ **Compatibility Field** - Personal skills declare environment requirements
- ✅ **Structured Organization** - Clear separation of general and personal skills

## Installation

Clone the repository and use it locally:

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
```

Alternatively, you can copy individual skills to your `~/.claude/skills/` directory for personal use.

## Local Configuration

You can customize Claude's behavior with local configuration files that won't be tracked by git:

### `CLAUDE.local.md`

Create a `CLAUDE.local.md` file in the project root to add your personal instructions:

```bash
touch CLAUDE.local.md
```

This file is:
- ✅ **Private** - Ignored by git (listed in `.gitignore`)
- ✅ **Project-specific** - Only affects this project
- ✅ **Higher priority** - Overrides default behaviors

**Example use cases:**
- Custom tone and style preferences
- Personal coding conventions
- Project-specific shortcuts
- Environment-specific configurations

**Example content:**
```markdown
# My Personal Instructions

## Tone
- Be concise and direct
- Use emojis sparingly

## Code Style
- Always use TypeScript strict mode
- Prefer functional components in React
```

## Skills

### General Skills (`tooyoung:`)

| Skill | Command | Description |
|-------|---------|-------------|
| chainlit-builder | `/tooyoung:chainlit-builder` | Build Chainlit AI chat demo quickly |
| easy-openrouter | `/tooyoung:easy-openrouter` | Test and compare LLM models via OpenRouter |
| excalidraw-artist | `/tooyoung:excalidraw-artist` | Create Excalidraw hand-drawn style diagrams |
| expense-receipt | `/tooyoung:expense-receipt` | AI subscription expense receipt recognition |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | Google Gemini image generation app |
| openclash-merger | `/tooyoung:openclash-merger` | Merge OpenClash subscription configs |
| threejs-builder | `/tooyoung:threejs-builder` | Create Three.js web applications |

### Personal Skills (`personal:`)

> ⚠️ **Not Ready to Use** — These are personal configuration templates with placeholder paths. Before use:
> 1. Copy to your `~/.claude/skills/` directory
> 2. Replace placeholders like `$BASE_PATH` with actual paths

| Skill | Command | Description |
|-------|---------|-------------|
| _expense-receipt | `/personal:expense-receipt` | AI subscription expense receipt recognition (personal) |
| _mac-docker | `/personal:mac-docker` | Docker service management config template |

## Structure

```
oh-my-daily-skills/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── chainlit-builder/
│   ├── easy-openrouter/
│   ├── excalidraw-artist/
│   ├── expense-receipt/
│   ├── nano-banana-builder/
│   ├── openclash-merger/
│   ├── threejs-builder/
│   ├── _expense-receipt/   # Personal skill (prefix with _)
│   └── _mac-docker/        # Personal skill (prefix with _)
└── README.md
```

## Naming Convention

| Type | Directory | Name Prefix | Example |
|------|-----------|-------------|---------|
| General skill | `skill-name` | `tooyoung:` | `tooyoung:chainlit-builder` |
| Personal skill | `_skill-name` | `personal:` | `personal:mac-docker` |

## Versioning

Following [Semantic Versioning](https://semver.org/):

| Version | Change Type | Example |
|---------|-------------|---------|
| x.0.0 (MAJOR) | Breaking changes | Refactor skill structure, remove features |
| 0.x.0 (MINOR) | New features | Add new commands, new sections |
| 0.0.x (PATCH) | Fixes/Improvements | Doc fixes, formatting adjustments |

## License

MIT
