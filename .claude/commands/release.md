---
name: release
description: "Bump plugin version, commit all changes, and push to remote"
disable-model-invocation: true
argument-hint: "[patch|minor|major]"
---

# Release oh-my-daily-skills

Execute the release workflow for this plugin repository. Bump type: `$ARGUMENTS` (default: auto-detect).

## Steps

### 1. Pre-flight checks

- Run `git status` to see all uncommitted changes
- Run `git diff --stat` to summarize the diff
- If there are no changes, abort: "Nothing to release."

### 2. Analyze changes

Read the current `.claude-plugin/plugin.json` to get the current version.

Identify which files changed and categorize:

- **New skill added** (new directory under `skills/`): bump = MINOR
- **Existing skill modified**: bump = PATCH
- **Skill renamed or deleted**: bump = MAJOR
- **Non-skill changes only** (README, CLAUDE.md, configs): bump = PATCH

If the user provided an explicit bump type via `$ARGUMENTS` (`patch`, `minor`, or `major`), use that instead of auto-detection.

### 3. Bump plugin version

Update the `version` field in `.claude-plugin/plugin.json` according to the determined bump type.

### 4. Show summary and wait for confirmation

Present a table of all files to be committed, the version bump (old → new), and a draft commit message.

**Commit message convention** for this repo (check `git log --oneline -10` for style):

- New skill: `feat(<skill-name>): add <description>`
- Modify skill: `feat(<skill-name>): <what changed>` or `fix(<skill-name>): <what changed>`
- Multiple skills: `chore: <summary>`
- Version bump only: `chore: bump plugin version to x.y.z`

If the change includes a version bump alongside skill changes, combine into one commit.

Ask the user: "Confirm commit + push? (y/n)"

### 5. Commit and push

Only after user confirmation:

1. `git add` the relevant files (be specific, no `git add -A`)
2. `git commit` with the agreed message
3. `git push`

Report the commit hash and confirm push success.

## Rules

- **Never commit without user confirmation** — this is a hard rule from CLAUDE.md
- **Never add Co-Authored-By or AI signatures** to commit messages — prohibited by project rules
- **git commit and git push must be separate Bash calls** — no chaining with `&&`
- Run `pnpm run check` before committing if any `.md` files were modified
- If `pnpm run check` fails, run `pnpm run lint:fix && pnpm run format` and re-check
