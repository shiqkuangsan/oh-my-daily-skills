# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin repository containing a collection of skills. Skills are markdown-based knowledge files that extend Claude's capabilities for specific tasks.

## Skill Structure

Each skill lives in `skills/<skill-name>/` with:
- `SKILL.md` - Main skill file with YAML frontmatter (name, description, version)
- `references/` - Optional directory for advanced topics and supplementary documentation

### SKILL.md Frontmatter Format

```yaml
---
name: tooyoung:skill-name    # or personal:skill-name for personal skills
description: Single line description of what the skill does.
version: 0.1.0
---
```

### Naming Convention

| Type | Directory | Name Prefix | Example |
|------|-----------|-------------|---------|
| General skill | `skill-name` | `tooyoung:` | `tooyoung:chainlit-builder` |
| Personal skill | `_skill-name` | `personal:` | `personal:mac-docker` |

Personal skills (prefixed with `_`) contain environment-specific paths and configurations.

## Key Guidelines

- Description must be a single line (no YAML multiline syntax like `>` or `|`)
- Always include `version` field in frontmatter
- Keep SKILL.md focused; move advanced content to `references/` subdirectory
- Personal skills must include a note indicating they require path modifications for reuse

## Versioning

遵循 [Semantic Versioning](https://semver.org/)：

- **MAJOR (x.0.0)**: 破坏性变更（重构结构、移除功能）
- **MINOR (0.x.0)**: 新增功能（添加命令、新章节）
- **PATCH (0.0.x)**: 修复优化（文档修正、格式调整）
