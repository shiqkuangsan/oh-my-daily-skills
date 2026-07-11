# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

Daily-driver public skills for release highlights, URL reading, diagram drawing, web design, GitHub star organization, and more.

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
| codex-features      | `/tooyoung:codex-features`      | Show OpenAI Codex release highlights in Chinese             |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | Create or style-preserve Excalidraw diagrams                |
| gh-star-list        | `/tooyoung:gh-star-list`        | Organize GitHub starred repos into Lists after confirmation |
| ink-reader          | `/tooyoung:ink-reader`          | Read accessible URLs into Markdown with fallback strategies |
| neoblo-landing-page | `/tooyoung:neoblo-landing-page` | Build Neobrutalism + Blobity landing pages from scratch     |
| persona-define      | `/tooyoung:persona-define`      | Define personalized identity style for Claude Code          |

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
│   ├── codex-features/
│   ├── excalidraw-artist/
│   ├── gh-star-list/
│   ├── ink-reader/
│   ├── neoblo-landing-page/
│   └── persona-define/
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

## License

MIT
