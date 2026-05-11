# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository Overview

This is a Codex plugin repository containing a collection of skills. Skills are markdown-based knowledge files that extend Codex's capabilities for specific tasks.

## Skill Structure

Each skill lives in `skills/<skill-name>/` with:

- `SKILL.md` - Main skill file with YAML frontmatter
- `references/` - Optional directory for advanced topics and supplementary documentation

### SKILL.md Frontmatter Format

遵循 [Agent Skills Specification](https://agentskills.io/specification)：

```yaml
---
name: tooyoung:skill-name
description: "Single line description of what the skill does."
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

- Description 必须是单行（不使用 YAML 多行语法 `>` 或 `|`），且**必须用双引号包裹**（YAML 中冒号+空格是特殊语法，不加引号会导致 `npx skills` 解析失败）
- Description 中如有双引号，改为单引号：`'example text'`
- version 字段放在 `metadata` 下，值用引号包裹
- Personal skills 使用 `compatibility` 字段说明环境要求
- SKILL.md 保持精简，高级内容移至 `references/` 目录

## Versioning

所有版本号遵循 [Semantic Versioning](https://semver.org/)，纯粹供人阅读（`npx skills` 使用 Git Tree SHA 检测变更）。

### Skill Version（`metadata.version`）

每个 SKILL.md 独立管理版本：

- **PATCH (0.0.x)**: 措辞调整、格式修正、小幅优化
- **MINOR (0.x.0)**: 新增章节、新增命令、功能扩展
- **MAJOR (x.0.0)**: 重构结构、移除功能、不兼容变更

### Plugin Version（`plugin.json`）

反映仓库整体变更，每次增删或修改 skill 后同步更新：

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
