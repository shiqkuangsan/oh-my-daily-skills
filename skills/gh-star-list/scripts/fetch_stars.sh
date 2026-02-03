#!/usr/bin/env bash
# Fetch starred repos for the authenticated user.
# Output: one JSON object per line (jsonl).
# Usage:
#   bash fetch_stars.sh              # all stars (paginated)
#   bash fetch_stars.sh --limit N    # latest N stars only (no pagination)

set -euo pipefail

LIMIT=0  # 0 means all

while [[ $# -gt 0 ]]; do
  case "$1" in
    --limit) LIMIT="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

JQ_FILTER='.[] | {
  id: .node_id,
  full_name: .full_name,
  description: (.description // ""),
  topics: (.topics // []),
  language: (.language // ""),
  url: .html_url
}'

if [[ "$LIMIT" -gt 0 ]]; then
  # Selective mode: fetch only first page with exact count
  PER_PAGE=$((LIMIT > 100 ? 100 : LIMIT))
  gh api "/user/starred?per_page=${PER_PAGE}" --jq "$JQ_FILTER" | head -n "$LIMIT"
else
  # Full mode: paginate through all
  gh api "/user/starred?per_page=100" --paginate --jq "$JQ_FILTER"
fi
