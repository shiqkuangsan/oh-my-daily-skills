# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

Daily-driver public skills for Claude Code — URL reading, diagram drawing, web design, 3D scenes, GitHub star organization, and more.

## Specification

This project follows the [Agent Skills Specification](https://agentskills.io/specification), ensuring standardized skill format and interoperability:

- ✅ **Standard YAML Frontmatter** - Each skill includes `name`, `description`, `metadata.version`, `metadata.author`, and `metadata.visibility`
- ✅ **Semantic Versioning** - Version management following [semver](https://semver.org/)
- ✅ **Public Skill Set** - Only public, reusable skills are included in this repository

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

Copy individual skill directories to your local skills directory.

## Updating

```bash
# Check for available updates
npx skills check

# Update all installed skills to latest
npx skills update
```

## Skills

### Public Skills (`tooyoung:`)

| Skill               | Command                         | Description                                                 |
| ------------------- | ------------------------------- | ----------------------------------------------------------- |
| blobity-cursor      | `/tooyoung:blobity-cursor`      | Add desktop Blobity cursor effects to landing pages         |
| cc-features         | `/tooyoung:cc-features`         | Show Claude Code release highlights in Chinese              |
| cc-session-cleaner  | `/tooyoung:cc-session-cleaner`  | Clean selected Claude Code sessions for current project     |
| codebase-stats      | `/tooyoung:codebase-stats`      | Count source lines by file type and detected module         |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | Create or style-preserve Excalidraw diagrams                |
| frontend-slides     | `/tooyoung:frontend-slides`     | Create viewport-fitted single-file HTML slide decks         |
| gh-star-list        | `/tooyoung:gh-star-list`        | Organize GitHub starred repos into Lists after confirmation |
| heshu-medical       | `/tooyoung:heshu-medical`       | Folk skin and surface-care notes with safety boundaries     |
| ink-reader          | `/tooyoung:ink-reader`          | Read accessible URLs into Markdown with fallback strategies |
| neoblo-landing-page | `/tooyoung:neoblo-landing-page` | Build Neobrutalism + Blobity landing pages from scratch     |
| persona-define      | `/tooyoung:persona-define`      | Define personalized identity style for Claude Code          |
| threejs-builder     | `/tooyoung:threejs-builder`     | Create simple Three.js and WebGL 3D web apps                |

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
│   ├── cc-features/
│   ├── cc-session-cleaner/
│   ├── codebase-stats/
│   ├── excalidraw-artist/
│   ├── frontend-slides/
│   ├── gh-star-list/
│   ├── heshu-medical/
│   ├── ink-reader/
│   ├── neoblo-landing-page/
│   ├── persona-define/
│   └── threejs-builder/
├── AGENTS.md
└── README.md
```

## Naming Convention

| Type         | Directory            | Example              |
| ------------ | -------------------- | -------------------- |
| Public skill | `skills/skill-name/` | `skills/ink-reader/` |

## Versioning

Following [Semantic Versioning](https://semver.org/):

| Version       | Change Type        | Example                                   |
| ------------- | ------------------ | ----------------------------------------- |
| x.0.0 (MAJOR) | Breaking changes   | Refactor skill structure, remove features |
| 0.x.0 (MINOR) | New features       | Add new commands, new sections            |
| 0.0.x (PATCH) | Fixes/Improvements | Doc fixes, formatting adjustments         |

## Thanks To

- [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) — The original frontend-slides skill with excellent design taste. Our `tooyoung:frontend-slides` is a redesigned version with token-efficient architecture and curated themes.

## License

MIT
