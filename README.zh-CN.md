# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

Claude Code 日常技能合集 — URL 阅读、图表绘制、LLM 测试、3D 场景、对话 Demo 等。

## 标准规范

本项目遵循 [Agent Skills 规范](https://agentskills.io/specification)，确保技能格式标准化和互操作性：

- ✅ **标准 YAML Frontmatter** - 每个技能包含 `name`、`description` 和 `metadata.version`
- ✅ **语义化版本** - 遵循 [semver](https://semver.org/) 进行版本管理
- ✅ **兼容性字段** - 个人技能声明环境要求
- ✅ **结构化组织** - 通用技能与个人技能明确分离

## 安装

### 通过 `npx skills`（推荐）

```bash
# 安装全部技能
npx skills add shiqkuangsan/oh-my-daily-skills

# 列出可用技能（不安装）
npx skills add shiqkuangsan/oh-my-daily-skills --list

# 安装单个技能
npx skills add shiqkuangsan/oh-my-daily-skills --skill ink-reader
```

### 通过 Claude Code Plugin

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
```

### 手动安装

将单个技能目录复制到 `~/.claude/skills/` 即可使用。

## 技能列表

### 通用技能 (`tooyoung:`)

| 技能                | 命令                            | 描述                                       |
| ------------------- | ------------------------------- | ------------------------------------------ |
| blobity-cursor      | `/tooyoung:blobity-cursor`      | 为任意落地页添加 Blobity 光标特效          |
| chainlit-builder    | `/tooyoung:chainlit-builder`    | 搭建 Chainlit AI 对话 Demo 用于产品演示    |
| easy-openrouter     | `/tooyoung:easy-openrouter`     | 通过 OpenRouter 测试和比较 LLM 模型        |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | 创建 Excalidraw 手绘风格图表               |
| gh-star-list        | `/tooyoung:gh-star-list`        | 用 AI 自动将 GitHub Stars 分类整理到 Lists |
| ink-reader          | `/tooyoung:ink-reader`          | 智能读取 URL 内容，自动识别平台和抓取策略  |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | 基于 Google Gemini API 构建图像生成应用    |
| openclash-merger    | `/tooyoung:openclash-merger`    | 合并 OpenClash 订阅配置并生成分流规则      |
| persona-define      | `/tooyoung:persona-define`      | 为 Claude Code 定义个性化身份风格（人设）  |
| threejs-builder     | `/tooyoung:threejs-builder`     | 创建 Three.js 3D Web 应用                  |

### 个人技能（模板）

> ⚠️ **不可直接使用** — 这是 `personal/` 目录下的个人配置参考模板，包含占位符路径，不会通过 plugin 或 `npx skills` 分发。使用前需：
>
> 1. 复制到你的 `~/.claude/skills/` 目录
> 2. 将 `$BASE_PATH` 等占位符替换为实际路径

| 技能            | 描述                                   |
| --------------- | -------------------------------------- |
| expense-receipt | AI 订阅报销收据识别（个人版）          |
| mac-docker      | Docker 服务管理配置模板                |
| media-summarize | 视频/音频/播客/链接总结为中文 Markdown |
| mole            | Mac 深度清理优化命令顾问               |
| shitcode        | 编写"烂代码"用于教学或娱乐演示         |

## 本地配置

在项目根目录创建 `CLAUDE.local.md` 文件来添加个人指令：

```bash
touch CLAUDE.local.md
```

此文件特点：

- ✅ **私有** - 被 git 忽略（在 `.gitignore` 中）
- ✅ **项目专属** - 仅影响当前项目
- ✅ **优先级高** - 覆盖默认行为

## 项目结构

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
├── personal/                # 个人模板（不分发）
│   ├── expense-receipt/
│   ├── mac-docker/
│   ├── media-summarize/
│   ├── mole/
│   └── shitcode/
├── CLAUDE.md
└── README.md
```

## 命名规范

| 类型     | 目录                   | 示例                   |
| -------- | ---------------------- | ---------------------- |
| 通用技能 | `skills/skill-name/`   | `skills/ink-reader/`   |
| 个人技能 | `personal/skill-name/` | `personal/mac-docker/` |

## 版本规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

| 版本号        | 变更类型   | 示例                      |
| ------------- | ---------- | ------------------------- |
| x.0.0 (MAJOR) | 破坏性变更 | 重构 skill 结构、移除功能 |
| 0.x.0 (MINOR) | 新增功能   | 添加新命令、新章节        |
| 0.0.x (PATCH) | 修复/优化  | 文档修正、格式调整        |

## 开源协议

MIT
