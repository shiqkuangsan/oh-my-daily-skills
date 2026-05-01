#!/usr/bin/env python3
import argparse
import datetime
import glob
import json
import os
import sys


BLOCKED_PROMPT_MARKERS = (
    '<system-reminder',
    '<local-command-caveat',
    '<command-name>',
    '<task-notification>',
    '<bash-input>',
    '<bash-stdout>',
    '<bash-stderr>',
    'Base directory for this skill:',
)


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
        content = ' '.join(
            x.get('text', '') if isinstance(x, dict) else str(x) for x in content
        )
    if not isinstance(content, str):
        content = str(content)
    text = content.strip()
    if not text or any(marker in text for marker in BLOCKED_PROMPT_MARKERS):
        return ''
    return text.replace('\n', ' ')[:80]


def parse_limit(value):
    if value.lower() in ('all', '全部'):
        return None
    return int(value)


def markdown_escape(value):
    return str(value).replace('|', '\\|').replace('\n', ' ')


def main():
    parser = argparse.ArgumentParser(description='Preview Claude Code sessions')
    parser.add_argument('project_dir')
    parser.add_argument('--limit', default='30')
    parser.add_argument('--mark', default='')
    parser.add_argument('--current-session-id', default='')
    args = parser.parse_args()

    current_session_id = args.current_session_id or os.environ.get('CLAUDE_SESSION_ID', '')
    limit = parse_limit(args.limit)

    os.chdir(args.project_dir)
    rows = []

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
            if args.mark and title != args.mark:
                continue
            stat = os.stat(path)
            current = 'CURRENT' if current_session_id and sid == current_session_id else ''
            rows.append((stat.st_mtime, sid, current, title, stat.st_size, first_user, recent_user))
        except Exception:
            continue

    rows.sort(reverse=True)
    total = len(rows)
    if limit is not None:
        rows = rows[:limit]

    print(f'项目目录: {args.project_dir}')
    if args.mark:
        print(f'命中 {len(rows)} 条会话（title == {args.mark!r}）')
    elif limit is None:
        print(f'命中 {len(rows)} 条会话（全部）')
    else:
        print(f'命中 {len(rows)} 条会话（最近 {limit} 条，共 {total} 条）')
    if current_session_id:
        print(f'当前会话: {current_session_id}')
    else:
        print('当前会话: 未提供；如需 CURRENT 标记，请传 --current-session-id 或设置 CLAUDE_SESSION_ID')

    print('| # | current | sessionId | title | mtime | size | first user prompt | recent user prompt |')
    print('|---:|---|---|---|---|---:|---|---|')
    for idx, (mtime, sid, current, title, size, first_user, recent_user) in enumerate(rows, 1):
        mt = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M')
        print(
            f'| {idx} | {markdown_escape(current)} | {markdown_escape(sid)} | '
            f'{markdown_escape(title)} | {mt} | {fmt_size(size)} | '
            f'{markdown_escape(first_user)} | {markdown_escape(recent_user)} |'
        )


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print(f'preview failed: {exc}', file=sys.stderr)
        raise
