---
name: tooyoung:codex-features
description: "Show OpenAI Codex release highlights in Chinese. Fetch GitHub release notes, summarize feature-level changes, skip bug-fix/chore noise by default, and append a mandatory highlights section. Trigger words: Codex updates, Codex features, Codex 新功能, Codex 更新, OpenAI Codex releases"
metadata:
  version: "1.0.0"
  author: shiqkuangsan
  visibility: public
---

# Codex Features - OpenAI Codex 功能更新速览

Extract feature-level changes from OpenAI Codex release notes, translate to Chinese, and present the changes that matter to daily usage.

## Data Source

Primary source: GitHub Releases for `openai/codex`.

Prefer authenticated tools when available:

```bash
# List recent releases
gh release list --repo openai/codex --limit 50 --json tagName,name,publishedAt,isLatest

# Get release notes for a specific tag
gh release view rust-v{version} --repo openai/codex --json tagName,name,publishedAt,body
```

Fallback when `gh` is unavailable:

```bash
# List recent releases. Use GITHUB_TOKEN if present to avoid low unauthenticated rate limits.
if [ -n "$GITHUB_TOKEN" ]; then
  curl -fsSL -H "Accept: application/vnd.github+json" -H "User-Agent: codex-features" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    "https://api.github.com/repos/openai/codex/releases?per_page=50"
else
  curl -fsSL -H "Accept: application/vnd.github+json" -H "User-Agent: codex-features" \
    "https://api.github.com/repos/openai/codex/releases?per_page=50"
fi
```

If the API is rate-limited or inaccessible, use the GitHub releases page directly:

```text
https://github.com/openai/codex/releases
```

## Detect Installed Codex Version

Use the active Codex CLI path when available:

```bash
${CODEX_CLI_PATH:-codex} --version 2>/dev/null
```

Expected output may look like `codex-cli 0.133.0-alpha.1`.

Normalize versions before comparison:

- Strip command labels such as `codex-cli`
- Strip tag prefixes such as `rust-v` and `v`
- For prerelease local versions like `0.133.0-alpha.1`, treat the base `0.133.0` as the current release unless the user explicitly asks about prereleases

## Version Range Logic

Parse the user's arguments to determine what to fetch:

| Argument                                | Behavior                                                                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| empty                                   | Detect installed Codex version, list releases newer than it, and show those. If already latest, show the current version's release notes |
| `0.133.0`                               | Single release. Resolve either `0.133.0` or `rust-v0.133.0`                                                                              |
| `rust-v0.133.0`                         | Single release by exact tag                                                                                                              |
| `0.131.0 0.133.0` or `0.131.0,0.133.0`  | Multiple specific releases                                                                                                               |
| `0.130.0-0.133.0` or `0.130.0..0.133.0` | Inclusive range, resolved from the release list rather than assuming every version exists                                                |
| `latest` or `last 3`                    | Latest N releases                                                                                                                        |
| `all` or `full changelog`               | Include all sections and PR-level changelog items; otherwise keep the default feature-level filter                                       |

## Section Filtering

Codex release notes are usually grouped by sections such as:

- `New Features`
- `Bug Fixes`
- `Documentation`
- `Chores`
- `Changelog`

By default, KEEP feature-level sections:

- `New Features`, `Features`, `Added` -> 新功能
- `Improvements`, `Enhancements`, `Performance` -> 增强
- `Changed`, `Breaking Changes`, `Behavior Changes` -> 变更
- `Deprecated`, `Removed` -> 废弃/移除
- `Security` -> 安全

By default, DISCARD noise sections:

- `Bug Fixes` / `Fixes`
- `Documentation`
- `Tests`
- ordinary `Chores`
- long PR-by-PR `Changelog`

Exception: keep `Chores` items only when they materially affect users, such as installers, package layout, runtime packaging, CLI distribution, sandbox behavior, permissions, authentication, or migration requirements.

## Priority Rules

When choosing what to summarize and highlight, prioritize:

1. User-visible CLI/TUI/app behavior
2. Permission, sandbox, approval, and workspace-root behavior
3. Plugins, skills, MCP, extensions, and tool lifecycle changes
4. Remote control, app-server, exec-server, and background workflow changes
5. SDK/API changes that affect automation or agent development
6. Installation, packaging, platform support, and runtime changes
7. Internal refactors only when they change behavior or operational risk

Breaking changes, deprecations, removed behavior, and migration requirements must always be included and marked with `⚠️`.

## Output Format

For each release, output in Chinese:

```markdown
## {version}（{date}）

- **新功能**：xxx（translated to Chinese, keep technical terms in English）
- **增强**：xxx
- **变更**：xxx
- **安全**：xxx
- **废弃/移除**：xxx
```

Rules:

- Group items by type within each release
- Keep technical terms in English: command names, flags, APIs, file names, model names, config keys, package names
- Preserve important commands in backticks
- Do not translate PR numbers or contributor names unless needed for clarity
- If no feature-level items remain after filtering, show: `（本版本无功能级变更，均为 bug 修复、文档或内部维护）`

## Highlight Summary (必出)

After listing all requested releases, append this section. It is mandatory.

```markdown
## 本次更新亮点

> 从以上 {N} 个版本 / {M} 条功能级变更中，挑出最值得关注的 {K} 项：

- **{亮点标题}**（{version}）：{为什么值得关注 / 对用户的影响}
- **⚠️ {破坏性变化标题}**（{version}）：{影响和需要注意的迁移点}
```

Selection rules:

- Each release contributes at most 3 highlights
- Hard cap: 10 highlights total
- Quality over count; do not pad weak items
- If all releases have zero feature-level changes, replace the whole section with:

```markdown
## 本次更新亮点

> 本次范围内无功能级更新，全部为 bug 修复、文档或内部维护。
```

When listing 5 or more releases, cluster highlights by theme, such as "CLI/TUI", "权限与沙箱", "Plugins/Skills/MCP", "SDK/API", and "安装与运行时".

## Execution Steps

1. Parse the user's requested versions or range
2. If no arguments were provided, detect the installed Codex version and list releases newer than it; if detection fails, default to `last 3`
3. Fetch release metadata from GitHub Releases
4. Normalize tags for comparison and display
5. Resolve ranges from actual release list order, not by arithmetic version guessing
6. Fetch each selected release body
7. Parse markdown sections; keep feature-level items and discard default noise sections
8. Translate and present grouped Chinese output
9. Append the mandatory highlight summary

## Error Handling

- `gh` missing -> use GitHub API via `curl` or the releases page
- GitHub API rate-limited -> retry with `GITHUB_TOKEN`, `gh auth login`, or the releases page
- Version not found -> report `（未找到 {version} 的 release）` and continue with other requested versions
- Installed version cannot be detected -> default to `last 3` and say so once
- Already latest -> show current release notes with header `（当前已是最新版本，以下为 {version} 的更新内容）`
