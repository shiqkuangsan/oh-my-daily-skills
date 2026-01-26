# Oh My Daily Skills

A collection of daily-use skills for Claude Code.

## Installation

```bash
/install oh-my-daily-skills@shiqkuangsan
```

Or clone and use locally:

```bash
git clone https://github.com/shiqkuangsan/oh-my-daily-skills.git
claude --plugin-dir /path/to/oh-my-daily-skills
```

## Skills

### General Skills (`tooyoung:`)

| Skill | Command | Description |
|-------|---------|-------------|
| chainlit-builder | `/tooyoung:chainlit-builder` | 快速搭建 Chainlit AI 对话 Demo |
| easy-openrouter | `/tooyoung:easy-openrouter` | 通过 OpenRouter 测试和比较 LLM 模型 |
| excalidraw-artist | `/tooyoung:excalidraw-artist` | 创建 Excalidraw 手绘风格图表 |
| expense-receipt | `/tooyoung:expense-receipt` | AI 订阅报销收据识别与统计 |
| nano-banana-builder | `/tooyoung:nano-banana-builder` | Google Gemini 图像生成应用 |
| openclash-merger | `/tooyoung:openclash-merger` | OpenClash 订阅配置合并 |
| threejs-builder | `/tooyoung:threejs-builder` | Three.js Web 应用创建 |

### Personal Skills (`personal:`)

> ⚠️ **不可直接使用** — 这是个人配置的参考模板，包含占位符路径。使用前需：
> 1. 复制到你的 `~/.claude/skills/` 目录
> 2. 将 `$BASE_PATH` 等占位符替换为实际路径

| Skill | Command | Description |
|-------|---------|-------------|
| _mac-docker | `/personal:mac-docker` | Docker 服务管理配置模板 |

## Structure

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
│   └── _mac-docker/        # Personal skill (prefix with _)
└── README.md
```

## Naming Convention

| 类型 | 目录名 | name 前缀 | 示例 |
|------|--------|-----------|------|
| 通用 skill | `skill-name` | `tooyoung:` | `tooyoung:chainlit-builder` |
| 个人 skill | `_skill-name` | `personal:` | `personal:mac-docker` |

## Versioning

遵循 [Semantic Versioning](https://semver.org/) 规范：

| 版本号 | 变更类型 | 示例 |
|--------|----------|------|
| x.0.0 (MAJOR) | 破坏性变更 | 重构 skill 结构、移除功能 |
| 0.x.0 (MINOR) | 新增功能 | 添加新命令、新章节 |
| 0.0.x (PATCH) | 修复/优化 | 文档修正、格式调整 |

## License

MIT
