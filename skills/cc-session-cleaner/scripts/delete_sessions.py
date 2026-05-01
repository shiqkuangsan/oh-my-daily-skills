#!/usr/bin/env python3
import argparse
import os
import shutil


def validate_session_id(sid):
    if '/' in sid or sid in ('', '.', '..'):
        raise SystemExit(f'unsafe sessionId: {sid!r}')


def main():
    parser = argparse.ArgumentParser(description='Delete Claude Code session files')
    parser.add_argument('project_dir')
    parser.add_argument('session_ids', nargs='+')
    args = parser.parse_args()

    os.chdir(args.project_dir)
    for sid in args.session_ids:
        validate_session_id(sid)
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
