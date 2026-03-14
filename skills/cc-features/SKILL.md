---
name: tooyoung:cc-features
description: "Show Claude Code feature-level updates in Chinese. Fetch release notes, filter out bug fixes, present new features and improvements. Trigger: cc features, CC 新功能, CC 更新, what's new in CC"
metadata:
  version: "1.1.0"
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

| Argument                            | Behavior                                                                                                                                                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (empty)                             | Versions after currently running session version. Detect current via `lsof` method above, list all releases via `gh release list`, then select versions newer than current. If already on latest, show current version's release notes |
| `2.1.73`                            | Single version                                                                                                                                                                                                             |
| `2.1.72 2.1.73` or `2.1.72,2.1.73`  | Multiple specific versions                                                                                                                                                                                                 |
| `2.1.70-2.1.74` or `2.1.70..2.1.74` | Version range (inclusive)                                                                                                                                                                                                  |
| `latest` or `last 3`                | Latest N versions                                                                                                                                                                                                          |

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

## Execution Steps

1. Parse ARGUMENTS to determine version range
2. If no args: detect running session version via `lsof -p $PPID` method (with fallback chain), then `gh release list --limit 50` to get release list, select all versions newer than current. If detection fails entirely, default to `last 3`. If already on latest, show current version's release notes
3. For version ranges: use the release list to resolve actual versions (don't assume consecutive numbering)
4. Fetch release notes for each version via `gh release view`
5. Filter and categorize each line
6. Translate and present in the output format above

## Error Handling

- `gh` not authenticated → prompt user to run `gh auth login`
- Version not found → skip with note `（未找到 v{version} 的 release）`
- No versions newer than current → show current version's release notes with header `（当前已是最新版本，以下为 v{version} 的更新内容）`
- `lsof` detection fails → fall back to `claude --version`, then to `last 3` as final resort
