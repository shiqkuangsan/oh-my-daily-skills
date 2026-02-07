# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin repository containing a collection of skills. Skills are markdown-based knowledge files that extend Claude's capabilities for specific tasks.

## Skill Structure

Each skill lives in `skills/<skill-name>/` with:

- `SKILL.md` - Main skill file with YAML frontmatter
- `references/` - Optional directory for advanced topics and supplementary documentation

### SKILL.md Frontmatter Format

遵循 [Agent Skills Specification](https://agentskills.io/specification)：

```yaml
---
name: tooyoung:skill-name
description: Single line description of what the skill does.
compatibility: Optional environment requirements
metadata:
  version: "0.1.0"
---
```

| Field            | Required | Description                        |
| ---------------- | -------- | ---------------------------------- |
| name             | Yes      | 技能名称，格式 `prefix:skill-name` |
| description      | Yes      | 单行描述，最大 1024 字符           |
| compatibility    | No       | 环境要求（如 Docker、特定路径）    |
| metadata.version | Yes      | 语义化版本号                       |

### Naming Convention

| Type           | Directory              | Example                |
| -------------- | ---------------------- | ---------------------- |
| General skill  | `skills/skill-name/`   | `skills/ink-reader/`   |
| Personal skill | `personal/skill-name/` | `personal/mac-docker/` |

General skills 通过 plugin 和 `npx skills` 分发。Personal skills 在 `personal/` 目录下，不参与分发，仅作为配置模板参考。

## Key Guidelines

- Description 必须是单行（不使用 YAML 多行语法 `>` 或 `|`）
- version 字段放在 `metadata` 下，值用引号包裹
- Personal skills 使用 `compatibility` 字段说明环境要求
- SKILL.md 保持精简，高级内容移至 `references/` 目录

## Plugin Version

每次增删或修改 skill 后，必须同步更新 `.claude-plugin/plugin.json` 的 `version` 字段，遵循语义化版本：

- 新增 skill → MINOR bump（如 `1.0.1` → `1.1.0`）
- 修改现有 skill → PATCH bump（如 `1.1.0` → `1.1.1`）
- 破坏性变更（重命名/删除 skill）→ MAJOR bump

## Markdown Lint & Format

项目使用 `markdownlint-cli2` + `prettier` 保证 Markdown 规范：

```bash
pnpm run check        # lint + format 检查
pnpm run lint:fix     # 自动修复 lint 问题
pnpm run format       # 格式化所有 md 文件
```

编辑 `.md` 文件后，确保 `pnpm run check` 通过再提交。

## Versioning

遵循 [Semantic Versioning](https://semver.org/)：

- **MAJOR (x.0.0)**: 破坏性变更（重构结构、移除功能）
- **MINOR (0.x.0)**: 新增功能（添加命令、新章节）
- **PATCH (0.0.x)**: 修复优化（文档修正、格式调整）
