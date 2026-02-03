#!/usr/bin/env bash
# GitHub Lists management via GraphQL.
# Usage:
#   bash manage_lists.sh get                         - Get all lists with item counts
#   bash manage_lists.sh create <name> [description]  - Create a new list
#   bash manage_lists.sh delete <list_id>             - Delete a list
#   bash manage_lists.sh add <repo_node_id> <list_id> [list_id2 ...]  - Add repo to list(s)

set -euo pipefail

MAX_RETRIES="${MAX_RETRIES:-3}"
RETRY_DELAY="${RETRY_DELAY:-2}"

retry() {
  local attempt=1
  while true; do
    if "$@" 2>/dev/null; then
      return 0
    fi
    if [[ $attempt -ge $MAX_RETRIES ]]; then
      "$@"  # last attempt, let errors through
      return $?
    fi
    sleep "$RETRY_DELAY"
    attempt=$((attempt + 1))
  done
}

CMD="${1:-help}"
shift || true

case "$CMD" in
  get)
    gh api graphql -f query='
      query {
        viewer {
          lists(first: 32) {
            nodes { id name slug description items(first: 0) { totalCount } }
            totalCount
          }
        }
      }' --jq '.data.viewer.lists'
    ;;

  create)
    NAME="${1:?name required}"
    DESC="${2:-}"
    retry gh api graphql \
      -f query='mutation($input: CreateUserListInput!) { createUserList(input: $input) { list { id name } } }' \
      -f input[name]="$NAME" \
      -f input[description]="$DESC" \
      --jq '.data.createUserList.list'
    ;;

  delete)
    LIST_ID="${1:?list_id required}"
    retry gh api graphql \
      -f query='mutation($input: DeleteUserListInput!) { deleteUserList(input: $input) { user { login } } }' \
      -f input[listId]="$LIST_ID" \
      --jq '.data.deleteUserList.user.login'
    ;;

  add)
    REPO_ID="${1:?repo_node_id required}"
    shift
    LIST_IDS=("$@")
    if [[ ${#LIST_IDS[@]} -eq 0 ]]; then
      echo "At least one list_id required" >&2
      exit 1
    fi

    # Build JSON array of list IDs and send as --input
    JSON_IDS=$(printf '%s\n' "${LIST_IDS[@]}" | jq -R . | jq -s .)

    _do_add() {
      jq -n \
        --arg query 'mutation($itemId: ID!, $listIds: [ID!]!) { updateUserListsForItem(input: {itemId: $itemId, listIds: $listIds}) { user { login } } }' \
        --arg itemId "$REPO_ID" \
        --argjson listIds "$JSON_IDS" \
        '{query: $query, variables: {itemId: $itemId, listIds: $listIds}}' \
      | gh api graphql --input - --jq '.data.updateUserListsForItem.user.login'
    }
    retry _do_add
    ;;

  help|*)
    echo "Usage: manage_lists.sh {get|create|delete|add} [args...]"
    ;;
esac
