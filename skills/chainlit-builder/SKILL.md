---
name: tooyoung:chainlit-builder
version: 0.1.0
description: 快速搭建 Chainlit AI 对话 Demo。用于产品演示、概念验证、领导汇报场景。触发词：chainlit、搭建 demo、chat demo、对话演示
---

# Chainlit Demo Builder

快速搭建 AI 对话 Demo，用于产品演示和概念验证。

## 使用场景

- 给领导演示 AI 产品概念
- 快速验证对话交互想法
- 搭建内部 POC Demo

## 快速启动（3 分钟出 Demo）

### Step 1: 初始化项目

```bash
mkdir demo && cd demo
uv init && uv add chainlit openai
```

### Step 2: 创建 app.py

```python
import chainlit as cl
from openai import AsyncOpenAI

client = AsyncOpenAI()

@cl.on_message
async def main(message: cl.Message):
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "你是一个helpful assistant。"},
            {"role": "user", "content": message.content}
        ],
        stream=True
    )

    msg = cl.Message(content="")
    async for chunk in response:
        if chunk.choices[0].delta.content:
            await msg.stream_token(chunk.choices[0].delta.content)
    await msg.send()
```

### Step 3: 运行

```bash
uv run chainlit run app.py -w
# 访问 http://localhost:8000
```

## Demo 场景模板

### 场景 A：多轮对话（带记忆）

```python
import chainlit as cl
from openai import AsyncOpenAI

client = AsyncOpenAI()

@cl.on_chat_start
async def start():
    cl.user_session.set("history", [
        {"role": "system", "content": "你是XX产品的智能助手。"}
    ])

@cl.on_message
async def main(message: cl.Message):
    history = cl.user_session.get("history")
    history.append({"role": "user", "content": message.content})

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=history,
        stream=True
    )

    msg = cl.Message(content="")
    full_response = ""
    async for chunk in response:
        if chunk.choices[0].delta.content:
            token = chunk.choices[0].delta.content
            full_response += token
            await msg.stream_token(token)
    await msg.send()

    history.append({"role": "assistant", "content": full_response})
```

### 场景 B：文件上传 + 分析

```python
import chainlit as cl
from openai import AsyncOpenAI

client = AsyncOpenAI()

@cl.on_chat_start
async def start():
    files = await cl.AskFileMessage(
        content="请上传要分析的文件",
        accept=["text/plain", "application/pdf"],
        max_size_mb=10
    ).send()

    if files:
        file = files[0]
        # 读取文件内容
        with open(file.path, "r") as f:
            content = f.read()
        cl.user_session.set("file_content", content)
        await cl.Message(f"已加载文件：{file.name}，可以开始提问").send()

@cl.on_message
async def main(message: cl.Message):
    file_content = cl.user_session.get("file_content", "")

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"基于以下文档回答问题：\n\n{file_content[:8000]}"},
            {"role": "user", "content": message.content}
        ],
        stream=True
    )

    msg = cl.Message(content="")
    async for chunk in response:
        if chunk.choices[0].delta.content:
            await msg.stream_token(chunk.choices[0].delta.content)
    await msg.send()
```

### 场景 C：工具调用展示（Step 可视化）

```python
import chainlit as cl
from openai import AsyncOpenAI
import json

client = AsyncOpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "search_knowledge",
            "description": "搜索知识库",
            "parameters": {
                "type": "object",
                "properties": {"query": {"type": "string"}},
                "required": ["query"]
            }
        }
    }
]

@cl.step(type="tool")
async def search_knowledge(query: str):
    """模拟知识库搜索"""
    return f"找到关于「{query}」的 3 条相关记录..."

@cl.on_message
async def main(message: cl.Message):
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": message.content}],
        tools=tools
    )

    msg = response.choices[0].message

    if msg.tool_calls:
        for tool_call in msg.tool_calls:
            args = json.loads(tool_call.function.arguments)
            result = await search_knowledge(args["query"])
            # 继续对话...

    await cl.Message(content=msg.content or "处理完成").send()
```

## 美化配置（让 Demo 更专业）

创建 `.chainlit/config.toml`：

```toml
[project]
name = "XX产品 AI 助手"

[UI]
name = "智能助手"
default_theme = "light"
# 可选：custom_css = "/public/style.css"

[features]
prompt_playground = false  # demo 时关闭
```

创建 `chainlit.md`（欢迎页）：

```markdown
# 欢迎使用 XX 智能助手

这是一个 AI 驱动的智能问答系统，支持：
- 多轮对话
- 文档分析
- 知识检索

请在下方输入您的问题。
```

## 常见问题

### 代理导致启动失败

```bash
NO_PROXY="*" uv run chainlit run app.py -w
```

### Python 版本问题

Chainlit 需要 Python < 3.14：

```toml
# pyproject.toml
requires-python = ">=3.10,<3.14"
```

## 进阶需求

如需更多 API 细节（认证、自定义组件、部署等），使用 Context7 查询 Chainlit 官方文档。
