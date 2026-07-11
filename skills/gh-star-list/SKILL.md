---
name: tooyoung:gh-star-list
description: "Use when the user wants to organize GitHub starred repositories into GitHub Lists, classify all or selected stars, or assign recent stars while preserving existing list memberships."
metadata:
  version: "1.1.0"
  author: shiqkuangsan
  visibility: public
---

# GitHub Star List

Use the bundled scripts to inspect starred repositories and manage GitHub Lists. The agent supplies classification judgment; scripts supply pagination and mutations.

## Resources

- `scripts/fetch_stars.sh`: fetches stars as JSONL, with optional `--limit N`.
- `scripts/manage_lists.sh`: `get`, `create`, `delete`, and `add` operations.
- `references/category-policy.md`: classification priorities, list sizing, and default taxonomy.

## Preconditions

Require `gh`, `jq`, and authenticated GitHub access with the `user` scope. Check before analysis:

```bash
gh auth status
jq --version
```

If the required scope is missing, explain the exact missing capability before suggesting `gh auth refresh -s user -h github.com`.

## Scope Selection

- “all / 全部”: process all stars.
- explicit repositories: process only those repositories.
- “latest N / 最近 N 个”: process the latest N.
- vague “整理一下”: default to the latest 10, not the entire account.

## Workflow

1. Fetch selected stars and existing lists.
2. Read `references/category-policy.md` and classify by repository purpose.
3. Present proposed assignments and new-list creation in a table.
4. Wait for explicit approval before any list mutation.
5. Create approved lists, then update repository memberships.
6. Refetch lists and report the resulting counts.

```bash
bash "${SKILL_DIR}/scripts/fetch_stars.sh" --limit 10 > /tmp/stars.jsonl
bash "${SKILL_DIR}/scripts/manage_lists.sh" get > /tmp/lists.json
```

For one repository, fetch metadata directly with `gh api repos/{owner}/{repo}`.

## Mutation Contract

`manage_lists.sh add` ultimately uses `updateUserListsForItem`, whose `listIds` value replaces the repository's complete list membership. Before applying:

- collect existing list IDs for the repository
- merge them with approved new IDs
- send the complete deduplicated set in one update

Never pass only the newly selected list IDs unless the user explicitly asked to remove all previous memberships.

## Classification Boundaries

- Description and actual purpose outrank language, topics, and repository name.
- Prefer an existing matching list.
- Avoid creating a list for one weakly related repository.
- Stay within GitHub's 32-list limit.
- For full-account work, report progress periodically and verify final counts.

No external mutation occurs before the user approves the proposed table.
