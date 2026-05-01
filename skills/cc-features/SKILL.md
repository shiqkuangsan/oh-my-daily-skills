---
name: tooyoung:cc-features
description: "Show Claude Code release highlights in Chinese. Fetch GitHub release notes, filter out bug fixes, summarize Added/Improved/Changed/Deprecated items, and append a mandatory highlights section. Trigger words: Claude Code updates, cc features, Claude Code 新功能, Claude Code 更新, what's new in Claude Code"
metadata:
  version: "1.2.1"
---

# CC Features — Claude Code 功能更新速览

Extract feature-level changes from Claude Code release notes, translate to Chinese, and present concisely.

## Data Source

GitHub Releases API via `gh` CLI:

```bash
# Get release notes and date for a specific version
gh release view v{version} --repo anthropics/claude-code --json body,publishedAt --jq '[.publishedAt, .body] | join("\n")'

# List recent releases (tag + date)
gh release list --repo anthropics/claude-code --limit 50 --json tagName,publishedAt
```

## Detect Running Session Version

Claude Code auto-updates the binary silently. `claude --version` spawns a new process that reads the **updated binary on disk**, so it always returns the latest installed version — NOT the version of the current running session.

To get the real running version, use `lsof` on `$PPID` (the parent Claude Code process):

```bash
# Primary: extract running session version from the process binary path
# Claude stores versions at ~/.local/share/claude/versions/{version}
# The running process holds a file handle to its original binary
RUNNING=$(lsof -p $PPID 2>/dev/null | awk '/txt.*versions\/[0-9]/{gsub(/.*versions\//, ""); print}' | head -1)

# Fallback: claude --version (accurate only when no auto-update has occurred)
[ -z "$RUNNING" ] && RUNNING=$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')

# Last resort: if both fail, treat as "last 3"
```

Why this works per-window: `$PPID` is process-specific. If the user has 3 sessions (v2.1.74, v2.1.75, v2.1.76), each session's Bash tool gets a different `$PPID`, and `lsof` reads the correct binary for that process.

## Version Range Logic

Parse the ARGUMENTS to determine which versions to fetch:

| Argument                            | Behavior                                                                                                                                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (empty)                             | Versions after currently running session version. Detect current via `lsof` method above, list all releases via `gh release list`, then select versions newer than current. If already on latest, show current version's release notes |
| `2.1.73`                            | Single version                                                                                                                                                                                                                         |
| `2.1.72 2.1.73` or `2.1.72,2.1.73`  | Multiple specific versions                                                                                                                                                                                                             |
| `2.1.70-2.1.74` or `2.1.70..2.1.74` | Version range (inclusive)                                                                                                                                                                                                              |
| `latest` or `last 3`                | Latest N versions                                                                                                                                                                                                                      |

## Filtering Rules

From each version's release notes, **KEEP** lines matching:

- `- Added ...` → New feature
- `- Improved ...` → Enhancement (including IDE-prefixed like `[VSCode] Improved ...`)
- `- Changed ...` → Behavior change
- `- Deprecated ...` → Deprecation notice

**DISCARD** everything else, including:

- `- Fixed ...` → Bug fix (skip)
- `- [VSCode] Fixed ...` → IDE bug fix (skip)

## Output Format

For each version, output in Chinese:

```
## v{version}（{date}）

- **新功能**：xxx（translated to Chinese, keep technical terms in English）
- **增强**：xxx
- **变更**：xxx
- **废弃**：xxx
```

- Group by type within each version
- Keep technical terms (command names, setting names, API names) in English
- Translate descriptions to natural Chinese
- If a version has zero feature-level items after filtering, show: `（本版本无功能级变更，均为 bug 修复）`

## Highlight Summary (必出)

**列完所有版本后**，在最末尾追加一段亮点总结。无论列出几个版本、几条变更，**此段必出**，不可省略。

```
## 🌟 本次更新亮点

> 从以上 {N} 个版本 / {M} 条变更中，挑出最值得关注的 {K} 项：

- **{亮点标题}**（v{version}）：{为什么值得关注 / 对用户的影响}
- ...
```

**挑选原则**（按优先级排序）：

1. **用户可见 > 内部优化**：终端/IDE/输出/交互层变化优先
2. **新能力 > 增强 > 变更 > 废弃**：`Added` > `Improved` > `Changed` > `Deprecated`
3. **广谱 > 小众**：所有用户都会碰到的 > 特定场景/特定 IDE 才用到的
4. **破坏性变更必入**：哪怕不够"亮"，凡是影响现有用法的 `Changed` / `Deprecated` 必须单列一项标为 ⚠️

**配额规则**（按"版本数"弹性配额，不按总条数一刀切）：

- 每个版本**最多 3 条**真亮点（AI 时代单次发版可能塞很多特性，留足余量；多数版本 1-2 条即可）
- **硬顶 10 条**（超过 10 人也看不动，避免信息过载）
- 质量 > 数量：凑不够 K 条时宁缺毋滥，不要为凑数稀释亮点

配额示例：

| 列出版本数 | 建议亮点条数 K | 场景       |
| ---------- | -------------- | ---------- |
| 1          | 1-3            | 单版查看   |
| 2-3        | 3-6            | 常规跨版   |
| 4-6        | 6-10           | 中期跨版   |
| 7+         | 10（硬顶）     | 长时间未看 |

**聚类规则**：列出版本 ≥ 5 时，亮点按主题聚类呈现（如"IDE 集成"、"Hooks"、"MCP"），避免平铺淹没重点。

**边界条件：**

- 列出的变更**不足 3 条** → 有几条写几条，标题保持"本次更新亮点"
- 列出的变更**全是 bug 修复**（0 条 feature-level）→ 整段替换为 `> 本次范围内无功能级更新，全部为 bug 修复。`

## Execution Steps

1. Parse ARGUMENTS to determine version range
2. If no args: detect running session version via `lsof -p $PPID` method (with fallback chain), then `gh release list --limit 50` to get release list, select all versions newer than current. If detection fails entirely, default to `last 3`. If already on latest, show current version's release notes
3. For version ranges: use the release list to resolve actual versions (don't assume consecutive numbering)
4. Fetch release notes for each version via `gh release view`
5. Filter and categorize each line
6. Translate and present in the output format above
7. **After all versions listed, append the Highlight Summary section** per rules above — this step is mandatory, never skip

## Error Handling

- `gh` not authenticated → prompt user to run `gh auth login`
- Version not found → skip with note `（未找到 v{version} 的 release）`
- No versions newer than current → show current version's release notes with header `（当前已是最新版本，以下为 v{version} 的更新内容）`
- `lsof` detection fails → fall back to `claude --version`, then to `last 3` as final resort
