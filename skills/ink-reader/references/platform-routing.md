# Platform Routing

Use capabilities available in the current agent environment; tool names differ across Claude Code, Codex, and other hosts.

## Generic Public Pages

Preferred order:

1. native URL/web reader or clean-content extractor such as Defuddle
2. `https://r.jina.ai/{original_url}` when permitted and useful
3. browser rendering and DOM extraction

Stop after the first validated body extraction.

## WeChat Articles

For `mp.weixin.qq.com`:

1. Try a native/browser reader that can render the page.
2. If the local Camoufox environment exists, prefer the maintained helper:

   ```bash
   ~/.ink-reader-env/bin/python3 ~/.agent-reach/tools/wechat-article-for-ai/main.py "{url}"
   ```

3. Try Jina as a fallback.
4. Use an interactive browser when verification or login requires user participation.

Do not embed a large inline browser script in the response. If the local helper is missing, use the browser capabilities already available or explain the missing dependency.

Optional local environment:

```bash
uv venv ~/.ink-reader-env
uv pip install --python ~/.ink-reader-env "camoufox[geoip]" markdownify beautifulsoup4 httpx
```

## X/Twitter

Extract the numeric status ID. For threads, first try:

```text
https://threadreaderapp.com/thread/{status_id}.html
```

Read the unroll page with a native reader or browser. If unavailable, try the original X URL through an authenticated browser. A clean-reader proxy over the original URL is a secondary fallback.

Do not fetch X pages or APIs with direct `curl`.

## Login-Gated Platforms

For Weibo, Xiaohongshu, paywalled pages, or other authenticated content:

- try a clean public reader once
- then use a browser session explicitly in scope
- if the page requires login/CAPTCHA and no authenticated browser is available, stop and state that requirement

Never report a login or verification page as article content.

## Short Links and Media Pages

Resolve redirects before classifying the platform. For video/media pages, extract available title, description, transcript/subtitles, and metadata; do not invent a transcript when none is accessible.
