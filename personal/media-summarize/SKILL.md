---
name: personal:media-summarize
description: "当用户需要将视频、音频、播客、网页、PDF 或 X/Twitter 链接总结为中文 Markdown 笔记时使用。典型触发场景：用户发来 YouTube / Spotify / Apple Podcasts / 直链音视频 URL，说"帮我总结这个"、"总结成 MD"、"这个视频讲了什么"、"把这个播客整理一下"、"总结视频"、"总结播客"、"总结音频"、"YouTube 总结"。"
metadata:
  version: "2.0.0"
---

# 媒体内容总结为 Markdown

将任意媒体内容通过 `summarize` CLI 调用 Claude Code 后端进行总结，输出干净的中文 Markdown 文件。

## 支持的平台

**视频**：YouTube（youtube.com / youtu.be，含 Shorts、Live、Embed）、直链视频文件（mp4/mov/m4v/mkv/webm/mpeg/avi/wmv/flv）

**音频**：直链音频文件（mp3/m4a/wav/flac/aac/ogg/opus/aiff/wma）

**播客**：Spotify、Apple Podcasts、SoundCloud、RSS Feeds（Podcasting 2.0）等 20+ 平台（详见 [summarize 官方文档](https://github.com/steipete/summarize)）

**社交媒体**：X/Twitter（x.com / twitter.com，status URL 和 broadcast URL，通过 Nitter 镜像绕过登录）

**通用**：HTML 网页、PDF、图片（JPEG/PNG/WebP/GIF）、文本文件（TXT/MD/JSON/YAML/XML）

## 前置条件

```bash
which summarize && summarize --version
```

未安装时：`npm install -g @steipete/summarize`

## 完整执行命令

```bash
CLAUDECODE="" summarize "MEDIA_URL" \
  --cli claude \
  --plain \
  --length xl \
  --lang zh \
  --metrics off \
  2>/dev/null \
| python3 -c "
import json, sys
objs = json.loads(sys.stdin.read())
for o in objs:
    if o.get('type') == 'result' and 'result' in o:
        print(o['result'])
        break
" > summary.md
```

将 `MEDIA_URL` 替换为实际链接，`summary.md` 替换为目标文件名。

## 关键坑点

### 坑 1：嵌套 Claude Code 会话报错

在 Claude Code 内部运行 `summarize --cli claude` 会报错：

```
Error: Claude Code cannot be launched inside another Claude Code session.
```

**解法**：命令前加 `CLAUDECODE=""`，临时清除环境变量绕过检查。

### 坑 2：stdout 是 JSON session 日志，不是摘要文本

`--cli claude` 模式将整个 Claude Code session 的 JSON 日志输出到 stdout，摘要内容藏在 `type=result` 对象的 `result` 字段中。

**解法**：用 `python3` 管道解析 JSON，提取 `result` 字段。

### 坑 3：stderr 混入进度信息

`2>/dev/null` 将 stderr（进度条、日志）丢弃，保证只有干净文本进入管道。

**调试技巧**：命令失败时去掉 `2>/dev/null`，可查看原始错误信息。

## 参数说明

| 参数            | 说明                                              |
| --------------- | ------------------------------------------------- |
| `--cli claude`  | 使用 Claude Code CLI 作为后端（无需配置 API Key） |
| `--plain`       | 输出纯文本，不带 ANSI 颜色转义                    |
| `--length xl`   | 较长摘要（可选 short/medium/long/xl/xxl）         |
| `--lang zh`     | 输出中文                                          |
| `--metrics off` | 关闭 token 用量统计输出                           |

## 内容获取策略（按平台自动选择）

**YouTube**：① Web 端字幕（免费最快）→ ② Apify 爬虫（需 `APIFY_API_TOKEN`）→ ③ yt-dlp + Whisper 转录（兜底）

**播客**：① RSS/Podcasting 2.0 内嵌 transcript → ② 平台 API（Spotify/Apple Podcasts）→ ③ 音频下载 + Whisper 转录

**X/Twitter**：通过 Nitter 镜像（nitter.net 等）绕过登录限制

**直链音视频**：下载 → ffmpeg 处理 → Whisper 转录

**网页/PDF**：Readability 解析，可选 `FIRECRAWL_API_KEY` 增强抓取

## 示例

```bash
# YouTube 视频
CLAUDECODE="" summarize "https://www.youtube.com/watch?v=fT6kGrHtf9k" \
  --cli claude --plain --length xl --lang zh --metrics off 2>/dev/null \
| python3 -c "
import json, sys
objs = json.loads(sys.stdin.read())
for o in objs:
    if o.get('type') == 'result' and 'result' in o:
        print(o['result'])
        break
" > summary.md

# Spotify 播客单集
CLAUDECODE="" summarize "https://open.spotify.com/episode/EPISODE_ID" \
  --cli claude --plain --length xl --lang zh --metrics off 2>/dev/null \
| python3 -c "
import json, sys
objs = json.loads(sys.stdin.read())
for o in objs:
    if o.get('type') == 'result' and 'result' in o:
        print(o['result'])
        break
" > podcast.md

# X/Twitter 帖子
CLAUDECODE="" summarize "https://x.com/username/status/123456789" \
  --cli claude --plain --length xl --lang zh --metrics off 2>/dev/null \
| python3 -c "
import json, sys
objs = json.loads(sys.stdin.read())
for o in objs:
    if o.get('type') == 'result' and 'result' in o:
        print(o['result'])
        break
" > tweet.md
```
