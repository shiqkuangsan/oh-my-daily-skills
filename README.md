# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

Daily-driver skills for Claude Code — URL reading, diagram drawing, LLM benchmarking, 3D scenes, chat demos, and more.

## Specification

This project follows the [Agent Skills Specification](https://agentskills.io/specification), ensuring standardized skill format and interoperability:

- ✅ **Standard YAML Frontmatter** - Each skill includes `name`, `description`, and `metadata.version`
- ✅ **Semantic Versioning** - Version management following [semver](https://semver.org/)
- ✅ **Compatibility Field** - Personal skills declare environment requirements
- ✅ **Structured Organization** - Clear separation of general and personal skills

## Installation

### Via `npx skills` (Recommended)

```bash
# Install all skills
npx skills add shiqkuangsan/oh-my-daily-skills

# List available skills without installing
npx skills add shiqkuangsan/oh-my-daily-skills --list

# Install a specific skill
npx skills add shiqkuangsan/oh-my-daily-skills --skill ink-reader
```

### Via Claude Code Plugin

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
```

### Manual

Copy individual skill directories to `~/.claude/skills/` for personal use.

## Skills

### General Skills (`tooyoung:`)

| Skill               | Command                         | Description                                               |
| ------------------- | ------------------------------- | --------------------------------------------------------- |
| blobity-cursor      | `/tooyoung:blobity-cursor`      | Add Blobity canvas cursor effect to any landing page      |
| chainlit-builder    | `/tooyoung:chainlit-builder`    | Scaffold Chainlit AI chat demos for product presentations |
| easy-openrouter     | `/tooyoung:easy-openrouter`     | Test and compare LLM models via OpenRouter                |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | Create Excalidraw hand-drawn style diagrams               |
| gh-star-list        | `/tooyoung:gh-star-list`        | Categorize GitHub starred repos into Lists using AI       |
| ink-reader          | `/tooyoung:ink-reader`          | Read any URL with auto platform detection and fallback    |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | Build image generation apps with Google Gemini APIs       |
| openclash-merger    | `/tooyoung:openclash-merger`    | Merge OpenClash subscription configs with rule groups     |
| persona-define      | `/tooyoung:persona-define`      | Define personalized identity style for Claude Code        |
| threejs-builder     | `/tooyoung:threejs-builder`     | Create Three.js 3D web applications                       |

### Personal Skills (Templates)

> ⚠️ **Not Ready to Use** — These are personal configuration templates in the `personal/` directory with placeholder paths. They are NOT distributed via plugin or `npx skills`. Before use:
>
> 1. Copy to your `~/.claude/skills/` directory
> 2. Replace placeholders like `$BASE_PATH` with actual paths

| Skill           | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expense-receipt | AI subscription expense receipt recognition (personal)     |
| mac-docker      | Docker service management config template                  |
| media-summarize | Summarize video/audio/podcast/URL to Chinese Markdown      |
| mole            | Mac deep cleaning & optimization command advisor           |
| shitcode        | Write intentionally bad code for teaching or entertainment |

## Local Configuration

Create a `CLAUDE.local.md` file in the project root to add personal instructions:

```bash
touch CLAUDE.local.md
```

This file is:

- ✅ **Private** - Ignored by git (listed in `.gitignore`)
- ✅ **Project-specific** - Only affects this project
- ✅ **Higher priority** - Overrides default behaviors

A common use case is defining a custom persona with the `persona-define` skill, which generates identity and style configurations into this file.

## Structure

```
oh-my-daily-skills/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── blobity-cursor/
│   ├── chainlit-builder/
│   ├── easy-openrouter/
│   ├── excalidraw-artist/
│   ├── gh-star-list/
│   ├── ink-reader/
│   ├── nano-banana-builder/
│   ├── openclash-merger/
│   ├── persona-define/
│   └── threejs-builder/
├── personal/                # Personal templates (not distributed)
│   ├── expense-receipt/
│   ├── mac-docker/
│   ├── media-summarize/
│   ├── mole/
│   └── shitcode/
├── CLAUDE.md
└── README.md
```

## Naming Convention

| Type           | Directory              | Example                |
| -------------- | ---------------------- | ---------------------- |
| General skill  | `skills/skill-name/`   | `skills/ink-reader/`   |
| Personal skill | `personal/skill-name/` | `personal/mac-docker/` |

## Versioning

Following [Semantic Versioning](https://semver.org/):

| Version       | Change Type        | Example                                   |
| ------------- | ------------------ | ----------------------------------------- |
| x.0.0 (MAJOR) | Breaking changes   | Refactor skill structure, remove features |
| 0.x.0 (MINOR) | New features       | Add new commands, new sections            |
| 0.0.x (PATCH) | Fixes/Improvements | Doc fixes, formatting adjustments         |

## License

MIT
