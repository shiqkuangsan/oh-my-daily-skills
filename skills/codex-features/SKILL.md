---
name: tooyoung:codex-features
description: "Use when the user asks what changed in OpenAI Codex, requests release highlights for versions or ranges, or wants updates since the installed Codex version. Triggers: Codex updates, Codex features, Codex 新功能, Codex 更新."
metadata:
  version: "1.1.0"
  author: shiqkuangsan
  visibility: public
---

# OpenAI Codex Release Highlights

Turn official Codex release notes into a concise Chinese feature digest. This skill defines retrieval, version selection, filtering, and presentation; it does not duplicate general summarization guidance.

## Source and Version Resolution

Use official GitHub Releases for `openai/codex`. Prefer `gh` when available:

```bash
gh release list --repo openai/codex --limit 50 --json tagName,name,publishedAt,isPrerelease
gh release view rust-v{version} --repo openai/codex --json tagName,name,publishedAt,body
```

If `gh` is unavailable or rate-limited, read <https://github.com/openai/codex/releases> with an available web/browser tool. Current release data must be fetched, not recalled.

Normalize display versions by stripping `rust-v` or `v`. Accept either form from the user.

| Input                            | Selection                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| empty                            | Stable releases newer than installed Codex; if none, show the current stable release |
| `0.144.0` / `rust-v0.144.0`      | One release                                                                          |
| `0.142.0,0.144.0`                | Explicit releases                                                                    |
| `0.140.0..0.144.0`               | Inclusive range resolved from actual tags                                            |
| `latest` / `last 3`              | Latest N stable releases                                                             |
| `prerelease` / `including alpha` | Include alpha/prerelease tags                                                        |

Detect the installed version with:

```bash
"${CODEX_CLI_PATH:-codex}" --version 2>/dev/null
```

Extract the SemVer from output such as `codex-cli 0.145.0-alpha.1`. A local prerelease maps to its base stable line for default comparison; include prerelease notes only when explicitly requested. If detection fails, use the latest 3 stable releases and say so once.

## Extract and Rank

Keep:

- New Features / Features / Added
- Improvements / Enhancements / Performance
- Changed / Breaking Changes / Behavior Changes
- Deprecated / Removed
- Security changes with user impact

Skip Bug Fixes, Documentation, Tests, ordinary Chores, and full PR-by-PR Changelog sections by default. Keep an otherwise skipped item when it materially changes installers, package layout, authentication, permissions, sandboxing, runtime compatibility, or migrations.

Prioritize CLI/TUI/app behavior, permissions and sandboxing, plugins/skills/MCP, remote workflows, SDK/API automation, and installation. Breaking changes and removals are mandatory.

## Output Contract

Write Chinese and keep technical identifiers in English.

```markdown
## {version}（{date}）

- **新功能**：...
- **增强**：...
- **变更**：...
- **安全**：...
- **废弃/移除**：...
```

Omit empty categories. If filtering removes everything, state that the release contains only fixes, docs, or maintenance.

Finish with `## 本次更新亮点`:

- At most 3 highlights per release and 10 total.
- Explain impact on actual Codex usage.
- Prefix breaking or migration-sensitive items with `⚠️`.
- Group by theme for 5+ releases.
- Do not pad the list when few items matter.

Include the official release link used.

## Failure Rules

- Resolve ranges from actual release ordering, not version arithmetic.
- Skip missing versions with a note and continue.
- Prefer browser/web fallback over asking the user to install `gh`.
- Never mix prereleases into `latest N` unless requested.
