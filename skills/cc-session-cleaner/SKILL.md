---
name: tooyoung:cc-session-cleaner
description: "清理当前项目的 Claude Code 会话：列出 ~/.claude/projects 下最近会话，按序号或 sessionId 选择，经二次确认后删除对应 .jsonl 与同名附件目录。Trigger words: 清理 cc 会话, 删除历史会话, cc resume 会话, clean cc sessions, cc session cleaner"
metadata:
  version: "1.2.1"
---

# CC Session Cleaner — CC 会话清理

清理 Claude Code `~/.claude/projects/<project-slug>/` 下不再需要的会话文件。默认不是按标题自动删除，而是先列出当前项目最近会话，让用户挑选后再删除。

## 背景知识

每个 CC 会话在 `~/.claude/projects/<project-slug>/` 下通常对应两类路径：

```text
<session-id>.jsonl   ← 会话消息流（可能含 custom-title 行）
<session-id>/        ← 同名子目录：附件、shell snapshot 等
```

`cc resume` 列表里的标题来自 `.jsonl` 中的 `custom-title` 行：

```json
{ "type": "custom-title", "customTitle": "xxx", "sessionId": "<session-id>" }
```

## 触发场景

用户说出以下任一意图即触发：

- "清理 cc 会话" / "清理会话" / "删除一些历史会话"
- "看看最近有哪些会话可以删" / "列出没必要的会话"
- "cc resume 里有些会话想删掉"
- "cc session cleaner" / "clean cc sessions" / "clean marked sessions"
- "清理标题是 xxx 的会话" / "看看有哪些标了待删除"

## 默认工作流

默认走**交互挑选模式**：

1. **定位项目目录**：按「项目目录推导」探测当前 cwd 对应的 `~/.claude/projects/<project-slug>/`。
2. **列出会话**：默认展示最近 30 条 `.jsonl`，按 mtime 倒序排列；用户明确要求"全部"/`all` 时展示全部会话。
3. **等待用户挑选**：用户用序号或 sessionId 指定要删除的会话，例如 `删除 1 3 8` 或 `删除 abc def`。
4. **复述删除清单**：列出将删除的 `.jsonl` 与同名子目录；如果用户选中当前会话，保留在提示中但标记为不可删除并剔除。
5. **二次确认后删除**：只在收到强确认后删除可删除项。
6. **核验残留**：删除后确认 `.jsonl` 与同名目录均不存在。

## 输出字段

预览表必须包含：

| 字段                 | 说明                                         |
| -------------------- | -------------------------------------------- |
| `#`                  | 本次预览序号，用于用户选择                   |
| `sessionId`          | `.jsonl` 文件名去掉后缀                      |
| `title`              | 最近一条 `custom-title`，没有则为空          |
| `mtime`              | `.jsonl` 修改时间                            |
| `size`               | `.jsonl` 大小，按 B/KB/MB/GB 自动切换        |
| `first user prompt`  | 首条非 caveat 的 user prompt，截断 80 字     |
| `recent user prompt` | 最近一条非 caveat 的 user prompt，截断 80 字 |

## 用法示例

| 用户口谕                      | 行为                                       |
| ----------------------------- | ------------------------------------------ |
| "清理一下 cc 会话"            | 列出当前项目最近 30 条会话，等待选择       |
| "列出最近 50 条会话"          | 列出当前项目最近 50 条会话                 |
| "列出全部会话" / "list all"   | 列出当前项目全部会话                       |
| "删除 1 3 8"                  | 复述序号 1、3、8 对应会话，等待 `确认删除` |
| "删除 sid=abc sid=xyz"        | 复述指定 sessionId，等待 `确认删除`        |
| "看看 title 是 待删除 的会话" | 严格筛选 `customTitle == "待删除"` 后展示  |

## 二次确认协议（删除红线）

**任何形态的删除一律走两步，即便用户首条口谕已显含"删除"语义：**

```text
Step 1. AI 列表/解析选择 → 复述将删除的路径 → 询问：「是否执行删除？请回复『确认删除』或『取消』。」
Step 2. AI 等待 → 仅当用户回复强确认词才执行删除。
```

**视为有效的强确认：**

- 中文：`确认删除` / `确认清理`
- 英文：`confirm delete` / `yes delete`

**不视为确认：**

- 模糊回应：`好` / `嗯` / `ok` / `行` / `知道了` / `继续` / `执行` / `删`
- 沉默 / 切换话题 / 重新提其他要求
- 反问：`这些是什么时候的？` / `能恢复吗？`

用户说"直接删"、"不用预览"、"不用确认"也不能绕过预览和二次确认。CC 会话删除后不可由本 skill 恢复。

## 项目目录推导（多候选探测 + 兜底）

CC 把每个项目的会话存在 `~/.claude/projects/<slug>/`，但 slug 规则随 CC 版本演进，磁盘上可能多代命名并存：

| 路径片                      | 旧规则 | 新规则 |
| --------------------------- | ------ | ------ |
| `/`                         | `-`    | `-`    |
| `.`（隐藏目录如 `.config`） | 保留   | `-`    |
| 空格                        | 保留   | `-`    |

**没有可靠的 `$CLAUDE_PROJECT_DIR` 环境变量可直接使用**，必须自行推导。

```bash
derive_projdir() {
  local cwd="${1:-$PWD}"
  local base="$HOME/.claude/projects"
  local c1="$base/$(printf '%s' "$cwd" | sed 's|/|-|g')"
  local c2="$base/$(printf '%s' "$cwd" | sed -e 's|/|-|g' -e 's|\.|-|g')"
  local c3="$base/$(printf '%s' "$cwd" | sed -e 's|/|-|g' -e 's|\.|-|g' -e 's| |-|g')"
  for cand in "$c1" "$c2" "$c3"; do
    [ -d "$cand" ] && { echo "$cand"; return 0; }
  done
  return 1
}
```

候选全空时，列出 `~/.claude/projects/` 目录请用户确认，**不要擅自模糊匹配**。

## 推荐预览脚本

```bash
PROJDIR="${1:-$(derive_projdir)}" || { echo "无法定位项目目录，请显式指定" >&2; exit 1; }
LIMIT="${2:-30}"
MARK="${3:-}"

python3 - "$PROJDIR" "$LIMIT" "$MARK" <<'PY'
import datetime, glob, json, os, sys

projdir, limit_s, mark = sys.argv[1], sys.argv[2], sys.argv[3]
limit = None if limit_s.lower() in ('all', '全部') else int(limit_s)
os.chdir(projdir)
rows = []


def fmt_size(size):
    units = ['B', 'KB', 'MB', 'GB']
    value = float(size)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            if unit == 'B':
                return f'{int(value)}B'
            return f'{value:.1f}{unit}'.replace('.0', '')
        value /= 1024


def extract_user_text(content):
    if isinstance(content, list):
        content = ' '.join(x.get('text', '') if isinstance(x, dict) else str(x) for x in content)
    if not isinstance(content, str):
        content = str(content)
    text = content.strip()
    blocked = (
        '<system-reminder',
        '<local-command-caveat',
        '<command-name>',
        '<task-notification>',
        '<bash-input>',
        '<bash-stdout>',
        '<bash-stderr>',
        'Base directory for this skill:',
    )
    if not text or any(marker in text for marker in blocked):
        return ''
    return text.replace('\n', ' ')[:80]


for path in glob.glob('*.jsonl'):
    sid = path[:-6]
    title = ''
    first_user = ''
    recent_user = ''
    try:
        with open(path, encoding='utf-8') as fh:
            for line in fh:
                try:
                    obj = json.loads(line)
                except Exception:
                    continue
                if obj.get('type') == 'custom-title':
                    title = obj.get('customTitle') or title
                if obj.get('type') == 'user':
                    prompt = extract_user_text(obj.get('message', {}).get('content', ''))
                    if prompt:
                        if not first_user:
                            first_user = prompt
                        recent_user = prompt
        if mark and title != mark:
            continue
        stat = os.stat(path)
        rows.append((stat.st_mtime, sid, title, stat.st_size, first_user, recent_user))
    except Exception:
        continue

rows.sort(reverse=True)
total = len(rows)
if limit is not None:
    rows = rows[:limit]
print(f'项目目录: {projdir}')
if mark:
    print(f'命中 {len(rows)} 条会话（title == {mark!r}）')
elif limit is None:
    print(f'命中 {len(rows)} 条会话（全部）')
else:
    print(f'命中 {len(rows)} 条会话（最近 {limit} 条，共 {total} 条）')
print('| # | sessionId | title | mtime | size | first user prompt | recent user prompt |')
print('|---:|---|---|---|---:|---|---|')
for idx, (mtime, sid, title, size, first_user, recent_user) in enumerate(rows, 1):
    mt = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M')
    print(f'| {idx} | {sid} | {title} | {mt} | {fmt_size(size)} | {first_user} | {recent_user} |')
PY
```

## 选择解析规则

- 用户可以用本次预览的序号选择：`删除 1 3 8`。
- 用户可以用 sessionId 选择：`删除 abc123 def456`。
- 只允许删除本次预览表里出现过的 sessionId；未出现在预览表里的 id 必须重新预览或要求用户确认来源。
- 如果用户混用序号和 sessionId，AI 需要归一化成 sessionId 并复述。
- 预览表可以列出当前会话；如果用户选择当前会话，必须明确提示"当前会话不能删除"，并把它从实际删除清单中剔除。
- 如果能从 `$CLAUDE_SESSION_ID` 获取当前会话 id，用它识别当前会话；如果无法获取，不要声称已自动识别当前会话。

## 当前会话保护

- 当前会话也可以出现在预览表里，方便用户理解 `cc resume` 中看到的完整候选集。
- 删除前如能从 `$CLAUDE_SESSION_ID` 识别当前会话，且用户选中了它，必须在复述清单中单独列为"不可删除"。
- 不可删除项不得传入删除脚本；如果用户只选择了当前会话，不执行删除，并说明需要选择其他会话。
- 如果无法获取 `$CLAUDE_SESSION_ID`，不要声称已识别当前会话，也不要基于标题、mtime 或 prompt 猜测当前会话。

## 删除模板（仅在强确认后执行）

```bash
PROJDIR="$HOME/.claude/projects/<slug>"
cd "$PROJDIR" || exit 1
python3 - sid1 sid2 sid3 <<'PY'
import os, shutil, sys

for sid in sys.argv[1:]:
    if '/' in sid or sid in ('', '.', '..'):
        raise SystemExit(f'unsafe sessionId: {sid!r}')
    jsonl = f'{sid}.jsonl'
    directory = sid
    if os.path.isfile(jsonl):
        os.remove(jsonl)
    if os.path.isdir(directory):
        shutil.rmtree(directory)
    remains = [p for p in (jsonl, directory) if os.path.exists(p)]
    if remains:
        raise SystemExit(f'残留未清理: {sid}: {remains}')
print(f'已清理 {len(sys.argv) - 1} 条会话')
PY
```

## 安全护栏（红线）

- ❌ **未经二次确认不可删除**：必须先预览或复述删除清单，再等强确认。
- ❌ **不得默认跨项目删除**：除非用户明确指定其他项目目录，否则只动当前项目目录。
- ❌ **不得自动按时间批量删除**：本 skill 只列出候选并让用户挑选。
- ❌ **不得 fuzzy 匹配标题**：标题筛选必须 `customTitle == MARK` 严格相等。
- ❌ **不得删除预览表外的会话**：用户输入序号或 sessionId 后，必须映射到已展示候选。
- ❌ **不得删除当前会话**：当前会话可展示但不可删除；选中时必须提示并剔除。
- ❌ **不得扩大确认范围**：多个项目目录必须分别预览、分别确认。

## 边界情况

- **零会话**：告知当前项目没有可展示的 `.jsonl` 会话。
- **用户只说"清理"**：只展示最近会话，不删除。
- **用户选择不存在的序号**：指出无效序号并要求重新选择。
- **当前会话被选中**：如能识别当前 sessionId，提示当前会话不能删除，并从实际删除清单剔除。
- **目录不存在**：明确告知项目目录不存在，请用户提供正确路径。

## 与相关 skill 的边界

- 本 skill 只清理 Claude Code 会话 `.jsonl` 与同名附件目录。
- 本 skill 不动 memory 系统（`memory/MEMORY.md` 等）。
- 如果系统里装了 claude-mem 等基于 `.jsonl` 建索引的插件，删除前提醒：相关 observations / corpus 引用可能指向已删除原文，但记忆数据本身仍在。
