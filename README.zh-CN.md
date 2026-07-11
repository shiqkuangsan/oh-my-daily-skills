# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

日常公开技能合集 — Release 亮点速览、URL 阅读、图表绘制、网页设计、GitHub Stars 整理等。

## 标准规范

本项目遵循 [Agent Skills 规范](https://agentskills.io/specification)，确保技能格式标准化和互操作性：

- ✅ **标准 YAML Frontmatter** - 每个技能包含 `name`、`description`、`metadata.version`、`metadata.author` 和 `metadata.visibility`
- ✅ **语义化版本** - 遵循 [semver](https://semver.org/) 进行版本管理
- ✅ **公开技能集** - 本仓库只保留可公开、可复用的技能

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

将单个技能目录复制到本机 skills 目录即可使用。

## 更新

```bash
# 检查可用更新
npx skills check

# 更新所有已安装技能到最新版本
npx skills update
```

## 技能列表

### 公开技能 (`tooyoung:`)

| 技能                | 命令                            | 描述                                      |
| ------------------- | ------------------------------- | ----------------------------------------- |
| blobity-cursor      | `/tooyoung:blobity-cursor`      | 为桌面落地页添加 Blobity 光标特效         |
| cc-features         | `/tooyoung:cc-features`         | 查看 Claude Code 发布亮点速览（中文）     |
| cc-session-cleaner  | `/tooyoung:cc-session-cleaner`  | 清理当前项目中选中的 Claude Code 会话     |
| codex-features      | `/tooyoung:codex-features`      | 查看 OpenAI Codex 发布亮点速览（中文）    |
| excalidraw-artist   | `/tooyoung:excalidraw-artist`   | 创建或保留原风格编辑 Excalidraw 手绘图表  |
| gh-star-list        | `/tooyoung:gh-star-list`        | 经确认将 GitHub Stars 分类整理到 Lists    |
| ink-reader          | `/tooyoung:ink-reader`          | 将可访问 URL 读取为 Markdown，含兜底策略  |
| neoblo-landing-page | `/tooyoung:neoblo-landing-page` | 构建 Neobrutalism + Blobity 风格落地页    |
| persona-define      | `/tooyoung:persona-define`      | 为 Claude Code 定义个性化身份风格（人设） |

## 本地配置

在项目根目录创建 `CLAUDE.local.md` 文件来添加个人指令：

```bash
touch CLAUDE.local.md
```

此文件特点：

- ✅ **私有** - 被 git 忽略（在 `.gitignore` 中）
- ✅ **项目专属** - 仅影响当前项目
- ✅ **优先级高** - 覆盖默认行为

常见用法是通过 `persona-define` 技能定义个性化人设，生成的身份和风格配置会写入此文件。

## 项目结构

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

## 命名规范

| 类型     | 目录                 | 示例                 |
| -------- | -------------------- | -------------------- |
| 公开技能 | `skills/skill-name/` | `skills/ink-reader/` |

## 版本规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

| 版本号        | 变更类型   | 示例                      |
| ------------- | ---------- | ------------------------- |
| x.0.0 (MAJOR) | 破坏性变更 | 重构 skill 结构、移除功能 |
| 0.x.0 (MINOR) | 新增功能   | 添加新命令、新章节        |
| 0.0.x (PATCH) | 修复/优化  | 文档修正、格式调整        |

## 开源协议

MIT
