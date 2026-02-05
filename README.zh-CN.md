# Oh My Daily Skills

[English](README.md) | [简体中文](README.zh-CN.md)

Claude Code 日常技能合集。

## 标准规范

本项目遵循 [Agent Skills 规范](https://agentskills.io/specification)，确保技能格式标准化和互操作性：

- ✅ **标准 YAML Frontmatter** - 每个技能包含 `name`、`description` 和 `metadata.version`
- ✅ **语义化版本** - 遵循 [semver](https://semver.org/) 进行版本管理
- ✅ **兼容性字段** - 个人技能声明环境要求
- ✅ **结构化组织** - 通用技能与个人技能明确分离

## 安装

克隆仓库并本地使用：

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
```

或者，你也可以将单个技能复制到 `~/.claude/skills/` 目录下个人使用。

## 本地配置

你可以通过本地配置文件自定义 Claude 的行为，这些文件不会被 git 追踪：

### `CLAUDE.local.md`

在项目根目录创建 `CLAUDE.local.md` 文件来添加你的个人指令：

```bash
touch CLAUDE.local.md
```

此文件特点：
- ✅ **私有** - 被 git 忽略（在 `.gitignore` 中）
- ✅ **项目专属** - 仅影响当前项目
- ✅ **优先级高** - 覆盖默认行为

**使用场景：**
- 自定义语气和风格偏好
- 个人编码规范
- 项目专属快捷方式
- 环境相关配置

**示例内容：**
```markdown
# 我的个人指令

## 语气
- 简洁直接
- 少用 emoji

## 代码风格
- 始终使用 TypeScript 严格模式
- React 优先使用函数组件
```

## 技能列表

### 通用技能 (`tooyoung:`)

| 技能 | 命令 | 描述 |
|------|------|------|
| chainlit-builder | `/tooyoung:chainlit-builder` | 快速搭建 Chainlit AI 对话 Demo |
| easy-openrouter | `/tooyoung:easy-openrouter` | 通过 OpenRouter 测试和比较 LLM 模型 |
| excalidraw-artist | `/tooyoung:excalidraw-artist` | 创建 Excalidraw 手绘风格图表 |
| expense-receipt | `/tooyoung:expense-receipt` | AI 订阅报销收据识别与统计 |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | Google Gemini 图像生成应用 |
| openclash-merger | `/tooyoung:openclash-merger` | OpenClash 订阅配置合并 |
| threejs-builder | `/tooyoung:threejs-builder` | Three.js Web 应用创建 |

### 个人技能 (`personal:`)

> ⚠️ **不可直接使用** — 这是个人配置的参考模板，包含占位符路径。使用前需：
> 1. 复制到你的 `~/.claude/skills/` 目录
> 2. 将 `$BASE_PATH` 等占位符替换为实际路径

| 技能 | 命令 | 描述 |
|------|------|------|
| _expense-receipt | `/personal:expense-receipt` | AI 订阅报销收据识别（个人版） |
| _mac-docker | `/personal:mac-docker` | Docker 服务管理配置模板 |

## 项目结构

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
│   ├── _expense-receipt/   # 个人技能（前缀 _）
│   └── _mac-docker/        # 个人技能（前缀 _）
└── README.md
```

## 命名规范

| 类型 | 目录名 | name 前缀 | 示例 |
|------|--------|-----------|------|
| 通用技能 | `skill-name` | `tooyoung:` | `tooyoung:chainlit-builder` |
| 个人技能 | `_skill-name` | `personal:` | `personal:mac-docker` |

## 版本规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

| 版本号 | 变更类型 | 示例 |
|--------|----------|------|
| x.0.0 (MAJOR) | 破坏性变更 | 重构 skill 结构、移除功能 |
| 0.x.0 (MINOR) | 新增功能 | 添加新命令、新章节 |
| 0.0.x (PATCH) | 修复/优化 | 文档修正、格式调整 |

## 开源协议

MIT
