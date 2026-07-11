#!/usr/bin/env python3
import argparse
import os
import re
import shutil


def validate_session_id(sid):
    if not re.fullmatch(r'[A-Za-z0-9_-]+', sid):
        raise SystemExit(f'unsafe sessionId: {sid!r}')


def validate_project_dir(project_dir):
    base = os.path.realpath(os.path.expanduser('~/.claude/projects'))
    target = os.path.realpath(project_dir)
    if not os.path.isdir(target):
        raise SystemExit(f'project directory not found: {project_dir}')
    if os.path.commonpath((base, target)) != base or target == base:
        raise SystemExit(f'unsafe project directory: {project_dir}')
    return target


def main():
    parser = argparse.ArgumentParser(description='Delete Claude Code session files')
    parser.add_argument('project_dir')
    parser.add_argument('session_ids', nargs='+')
    parser.add_argument('--current-session-id', default=os.environ.get('CLAUDE_SESSION_ID', ''))
    args = parser.parse_args()

    project_dir = validate_project_dir(args.project_dir)
    os.chdir(project_dir)
    for sid in args.session_ids:
        validate_session_id(sid)
        if args.current_session_id and sid == args.current_session_id:
            raise SystemExit(f'refusing to delete current session: {sid}')
        jsonl = f'{sid}.jsonl'
        directory = sid
        if os.path.isfile(jsonl):
            os.remove(jsonl)
        if os.path.isdir(directory):
            shutil.rmtree(directory)
        remains = [p for p in (jsonl, directory) if os.path.exists(p)]
        if remains:
            raise SystemExit(f'残留未清理: {sid}: {remains}')
    print(f'已清理 {len(args.session_ids)} 条会话')


if __name__ == '__main__':
    main()
