---
name: tooyoung:cc-features
description: "Use when the user asks what changed in Claude Code, requests release highlights for one or more versions, or wants updates since the running session. Triggers: Claude Code updates, cc features, Claude Code 新功能, Claude Code 更新."
metadata:
  version: "1.3.0"
  author: shiqkuangsan
  visibility: public
---

# Claude Code Release Highlights

Turn official Claude Code release notes into a concise Chinese feature digest. This skill supplies source selection, version resolution, filtering, and output constraints; the agent handles translation and synthesis.

## Source and Version Resolution

Use official GitHub Releases for `anthropics/claude-code`. Prefer `gh` when available:

```bash
gh release list --repo anthropics/claude-code --limit 50 --json tagName,publishedAt,isPrerelease
gh release view v{version} --repo anthropics/claude-code --json tagName,publishedAt,body
```

If `gh` is unavailable or unauthenticated, read <https://github.com/anthropics/claude-code/releases> with an available web/browser tool. Do not rely on memory for current releases.

Arguments:

| Input                            | Selection                                                                  |
| -------------------------------- | -------------------------------------------------------------------------- |
| empty                            | Releases newer than the running session; if none, show the current release |
| `2.1.73`                         | One release                                                                |
| `2.1.72,2.1.73`                  | Explicit releases                                                          |
| `2.1.70..2.1.74`                 | Inclusive range resolved from actual tags                                  |
| `latest` / `last 3`              | Latest N stable releases                                                   |
| `prerelease` / `including alpha` | Include prereleases                                                        |

For an empty request, detect the running version first:

```bash
RUNNING=$(lsof -p "$PPID" 2>/dev/null | awk '/txt.*versions\/[0-9]/{sub(/.*versions\//, ""); print; exit}')
[ -n "$RUNNING" ] || RUNNING=$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
```

The `lsof` result is preferred because Claude Code may update the on-disk binary while the current process keeps running an older version. If detection fails, use the latest 3 stable releases and state the fallback once.

## Extract and Rank

Keep feature-level changes:

- Added / New Features
- Improved / Enhancements / Performance
- Changed / Breaking Changes
- Deprecated / Removed
- Security changes with user impact

Skip bug fixes, tests, documentation, dependency bumps, and internal chores by default. Keep a normally skipped item only when it changes installation, authentication, permissions, sandboxing, compatibility, or migration requirements.

Always include breaking changes and deprecations. Rank user-visible CLI/IDE behavior, permissions, hooks, MCP, skills/plugins, automation, and installation above internal refactors.

## Output Contract

Write Chinese; preserve command names, flags, settings, APIs, and product names in English.

```markdown
## v{version}（{date}）

- **新功能**：...
- **增强**：...
- **变更**：...
- **废弃/移除**：...
```

Omit empty categories. If nothing remains after filtering, say the release contains no feature-level changes.

Finish with `## 本次更新亮点`:

- Pick only consequential items, at most 3 per release and 10 total.
- Explain user impact rather than repeating the release note.
- Prefix breaking or migration-sensitive items with `⚠️`.
- For 5+ releases, group highlights by theme.
- If all selected releases are noise-only, say so instead of manufacturing highlights.

Include a link to the official release source used.

## Failure Rules

- Resolve ranges from returned tags; never assume consecutive versions exist.
- Skip a missing version with a note and continue.
- Do not ask the user to install `gh` when a web/browser source is available.
- Never present cached knowledge as the latest release state.
