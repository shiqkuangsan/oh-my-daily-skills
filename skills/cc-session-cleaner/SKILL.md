---
name: tooyoung:cc-session-cleaner
description: "Use when the user wants to inspect or delete Claude Code sessions for the current project, clean entries shown by cc resume, or remove sessions selected by index, sessionId, or exact custom title."
metadata:
  version: "1.3.1"
  author: shiqkuangsan
  visibility: public
---

# Claude Code Session Cleaner

Safely preview and delete project-scoped Claude Code session artifacts under `~/.claude/projects/<project-slug>/`.

## Resources

- `scripts/preview_sessions.py`: parses `.jsonl` files and renders the selection table.
- `scripts/delete_sessions.py`: validates session IDs, removes the selected `.jsonl` and same-name attachment directory, then checks for residue.

Use the scripts instead of reimplementing JSONL parsing or deletion.

## Workflow

1. Locate the current project's Claude directory.
2. Preview the latest 30 sessions by default; use `--limit all` only when requested.
3. Let the user select rows by preview index or `sessionId`.
4. Render the exact deletion set, including `.jsonl` and attachment directory paths.
5. Ask for a second, explicit confirmation.
6. Delete only the confirmed IDs and verify no selected path remains.

The only accepted confirmation phrases are `确认删除`, `确认清理`, `confirm delete`, or `yes delete`. A request containing “直接删” is still the initial request, not the second confirmation.

## Project Directory

Claude Code project slugs have changed over time. Probe these exact transforms of the current absolute cwd and accept only existing directories:

- replace `/` with `-`
- additionally replace `.` with `-`
- additionally replace spaces with `-`

If none exists, list candidate directories under `~/.claude/projects/` and ask the user to identify the project. Do not fuzzy-match and delete.

## Preview

```bash
python3 "${SKILL_DIR}/scripts/preview_sessions.py" \
  "$PROJECT_DIR" \
  --limit 30 \
  --current-session-id "${CLAUDE_SESSION_ID:-}"
```

Optional exact-title filter:

```bash
python3 "${SKILL_DIR}/scripts/preview_sessions.py" "$PROJECT_DIR" --limit all --mark "待删除"
```

Present the script output as a rendered Markdown table with these columns: `#`, `current`, `sessionId`, `title`, `mtime`, `size`, `first user prompt`, `recent user prompt`.

Only IDs from the most recent preview are eligible. Normalize mixed indices and IDs back to `sessionId` values before confirmation.

## Confirmation Table

Before deletion, show:

| sessionId | jsonl path | attachment dir | status |
| --------- | ---------- | -------------- | ------ |

If the current session is identifiable and selected, keep it in the table as `不可删除：当前会话`, but exclude it from the command. Never infer the current session from title, mtime, or prompts.

## Delete

After explicit second confirmation only:

```bash
python3 "${SKILL_DIR}/scripts/delete_sessions.py" \
  "$PROJECT_DIR" sid1 sid2 \
  --current-session-id "${CLAUDE_SESSION_ID:-}"
```

## Hard Boundaries

- Never delete without preview, exact path disclosure, and second confirmation.
- Never delete outside the selected project directory.
- Never delete IDs absent from the latest preview.
- Never use fuzzy title matching or automatic age-based cleanup.
- Never delete the identifiable current session.
- This skill does not touch Claude memory files or third-party indexes.
