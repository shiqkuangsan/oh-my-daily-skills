---
name: personal:mole
description: "当用户提到 mole、mo 命令，或想清理 Mac 磁盘空间、卸载 App 残留文件、优化系统性能、分析磁盘占用、清理构建产物（node_modules/Xcode/build 等）、管理 Mole 配置时使用。也适用于用户说"释放存储"、"系统卡顿"、"找安装包"等 macOS 深度清理场景。"
---

# Mole - Mac 深度清理优化（命令顾问模式）

> **前提**：需要 macOS 并安装 Mole（`brew install mole`）

Mole 所有命令均为交互式 TUI，需要 TTY 环境，无法在 Claude Code 内执行。
本 skill 的职责是：**根据用户需求，输出正确的命令供用户复制到终端执行。**

## 行为规则

1. **不执行 `mo` / `mole` 命令**——直接以代码块输出命令，让用户复制到终端运行
2. **破坏性操作先给 dry-run**——`clean`、`optimize`、`uninstall`、`purge` 先输出 `--dry-run` 版本
3. **可主动辅助**——磁盘用量分析（`df`/`du`）、读写 Mole 配置文件、查看 Mole 日志，这些可以直接在 Claude Code 内执行

## 响应格式

当用户提出清理/优化/卸载/分析需求时，按以下格式回复：

````
**场景**：{简述用户意图}

在终端中运行：

​```bash
# 步骤 1：预览（推荐先跑这个）
{dry-run 命令}

# 步骤 2：确认后执行
{实际命令}
​```

说明：{补充说明，如清理范围、注意事项}
````

## 命令速查

| 命令                  | 功能                     |
| --------------------- | ------------------------ |
| `mo`                  | 主菜单（选择子命令）     |
| `mo clean`            | 清理缓存/日志/浏览器残留 |
| `mo uninstall`        | 卸载 App + 残留文件      |
| `mo optimize`         | 重建系统数据库/刷新服务  |
| `mo analyze`          | 可视化磁盘空间分析       |
| `mo analyze /Volumes` | 分析外接硬盘             |
| `mo status`           | 实时系统健康仪表盘       |
| `mo purge`            | 清理项目构建产物         |
| `mo installer`        | 查找清理安装包文件       |
| `mo touchid`          | 配置 Touch ID sudo       |
| `mo completion`       | 设置 shell 补全          |
| `mo update`           | 更新 Mole                |
| `mo remove`           | 卸载 Mole                |

## 常用选项

| 选项               | 适用命令                                     | 说明                  |
| ------------------ | -------------------------------------------- | --------------------- |
| `--dry-run` / `-n` | clean, optimize                              | 预览操作，不实际执行  |
| `--whitelist`      | clean, optimize                              | 管理受保护的路径/规则 |
| `--debug`          | clean, optimize, purge, uninstall, installer | 显示详细操作日志      |
| `--paths`          | purge                                        | 配置项目扫描目录      |
| `--force`          | update                                       | 强制重装最新版        |

## Claude Code 内可直接做的事

- **磁盘用量分析**：`df -h`、`du -sh` 查看占用大户，辅助决策
- **读写配置**：编辑 `~/.config/mole/purge_paths`（purge 扫描路径）
- **查看日志**：读取 `~/.config/mole/operations.log` 排查问题
- **管理安装**：`brew upgrade mole`、`mo update --force`（非 TUI）

## 场景 → 命令映射

| 用户说              | 输出命令                              |
| ------------------- | ------------------------------------- |
| 清理 Mac / 释放空间 | `mo clean --dry-run` → `mo clean`     |
| 卸载某个 App        | `mo uninstall`                        |
| 系统卡顿 / 优化     | `mo optimize --dry-run` → `mo optimize` |
| 磁盘占用分析        | `mo analyze`                          |
| 查看系统状态        | `mo status`                           |
| 清理 node_modules   | `mo purge`                            |
| 清理安装包          | `mo installer`                        |

## 全面维护流程

依次执行以下步骤（每步确认 dry-run 后再执行实际命令）：

```bash
mo clean      # 清理缓存/日志
mo purge      # 清理构建产物
mo installer  # 清理安装包
mo optimize   # 重建数据库/刷新服务
```
