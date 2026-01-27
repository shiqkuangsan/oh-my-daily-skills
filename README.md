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

```bash
/install oh-my-daily-skills@shiqkuangsan
```

Or clone and use locally:

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
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
