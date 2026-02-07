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

| Skill               | Command                         | Description                                                     |
| ------------------- | ------------------------------- | --------------------------------------------------------------- |
| blobity-cursor      | `/tooyoung:blobity-cursor`      | Add Blobity canvas cursor effect to any landing page            |
| chainlit-builder    | `/tooyoung:chainlit-builder`    | Build Chainlit AI chat demo quickly                             |
| easy-openrouter     | `/tooyoung:easy-openrouter`     | Test and compare LLM models via OpenRouter                      |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | Create Excalidraw hand-drawn style diagrams                     |
| gh-star-list        | `/tooyoung:gh-star-list`        | Categorize GitHub starred repos into Lists using AI             |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | Google Gemini image generation app                              |
| openclash-merger    | `/tooyoung:openclash-merger`    | Merge OpenClash subscription configs                            |
| persona-define      | `/tooyoung:persona-define`      | Define personalized identity style for Claude Code              |
| ink-reader          | `/tooyoung:ink-reader`          | Intelligently read any URL content with auto platform detection |
| shitcode            | `/shitcode`                     | Write intentionally bad code for teaching or entertainment      |
| threejs-builder     | `/tooyoung:threejs-builder`     | Create Three.js web applications                                |

### Personal Skills (Templates)

> ⚠️ **Not Ready to Use** — These are personal configuration templates in the `personal/` directory with placeholder paths. They are NOT distributed via plugin or `npx skills`. Before use:
>
> 1. Copy to your `~/.claude/skills/` directory
> 2. Replace placeholders like `$BASE_PATH` with actual paths

| Skill           | Description                                            |
| --------------- | ------------------------------------------------------ |
| expense-receipt | AI subscription expense receipt recognition (personal) |
| mac-docker      | Docker service management config template              |

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
│   ├── shitcode/
│   └── threejs-builder/
├── personal/                # Personal templates (not distributed)
│   ├── expense-receipt/
│   └── mac-docker/
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
