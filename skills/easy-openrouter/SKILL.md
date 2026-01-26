---
name: tooyoung:easy-openrouter
version: 0.1.0
description: 通过 OpenRouter 快速测试和比较 LLM 模型。用于找最快/最便宜的模型、对比响应质量。触发词：openrouter、测试模型、比较模型、找最快模型、找最便宜模型
---

# Easy OpenRouter

快速测试 LLM 模型，找到最适合任务的模型。

## 前置条件

```bash
export OPENROUTER_API_KEY="sk-or-v1-xxxx"
```

## 快速测试模型

使用 `scripts/call_openrouter.sh`：

```bash
# 基础测试
bash scripts/call_openrouter.sh \
  --model "anthropic/claude-sonnet-4" \
  --prompt "用一句话解释量子计算" \
  --json

# 带参数
bash scripts/call_openrouter.sh \
  --model "openai/gpt-4o" \
  --prompt "写一首关于代码的俳句" \
  --max-tokens 100 \
  --temperature 0.7 \
  --json
```

**输出包含**：响应时间(ms)、成本($)、token 用量、完整响应

**参数**：
- `--model`: 模型 ID（必填）
- `--prompt`: 提示词（必填）
- `--system`: 系统提示（可选）
- `--max-tokens`: 最大 token
- `--temperature`: 温度 0.0-2.0
- `--json`: JSON 输出

## 模型命名格式

```
provider/model-name[:modifier]
```

**常用模型**：
- `anthropic/claude-sonnet-4`
- `openai/gpt-4o`
- `openai/gpt-4o-mini`
- `google/gemini-2.0-flash-001`
- `deepseek/deepseek-chat`

**修饰符**：
- `:nitro` - 使用最快的 provider
- `:online` - 启用联网搜索
- 可组合：`anthropic/claude-sonnet-4:nitro:online`

## 找最优模型

### 按场景找最佳模型（Rankings）

```
https://openrouter.ai/rankings?category=<category>#categories
```

| 场景 | URL |
|------|-----|
| 编程 | `https://openrouter.ai/rankings?category=programming#categories` |
| 翻译 | `https://openrouter.ai/rankings?category=translation#categories` |
| 科学 | `https://openrouter.ai/rankings?category=science#categories` |
| 金融 | `https://openrouter.ai/rankings?category=finance#categories` |
| 法律 | `https://openrouter.ai/rankings?category=legal#categories` |
| 学术 | `https://openrouter.ai/rankings?category=academia#categories` |
| 营销 | `https://openrouter.ai/rankings?category=marketing#categories` |
| SEO | `https://openrouter.ai/rankings?category=marketing/seo#categories` |

### 按性能/价格找 Provider

```
https://openrouter.ai/<model-slug>/providers?sort=<sort>
```

**排序选项**：
- `throughput` - 按吞吐量（tokens/sec）
- `latency` - 按延迟
- `price` - 按价格

**示例**：找 claude-sonnet-4 最快的 provider
```
https://openrouter.ai/anthropic/claude-sonnet-4/providers?sort=throughput
```

### 获取完整模型列表

```bash
curl -s https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  | jq '.data | sort_by(.pricing.prompt) | .[:10] | .[].id'
# 输出最便宜的 10 个模型
```

## 典型工作流

### 1. 快速对比两个模型

```bash
# 测试 Claude
bash scripts/call_openrouter.sh --model "anthropic/claude-sonnet-4" --prompt "解释微服务架构" --json > claude.json

# 测试 GPT-4o
bash scripts/call_openrouter.sh --model "openai/gpt-4o" --prompt "解释微服务架构" --json > gpt4o.json

# 对比结果
jq -s '[.[0], .[1]] | map({model, response_time_ms, cost})' claude.json gpt4o.json
```

### 2. 找编程任务最佳模型

1. 打开 `https://openrouter.ai/rankings?category=programming#categories`
2. 记下排名靠前的模型
3. 用脚本测试实际效果

### 3. 为 Chainlit Demo 选模型

考虑因素：
- **演示用**：优先速度 → 用 `:nitro` 修饰符
- **成本敏感**：用 `gpt-4o-mini` 或 `deepseek-chat`
- **质量优先**：用 `claude-sonnet-4` 或 `gpt-4o`

## 进阶

API 细节参考 Context7 查询 OpenRouter 文档。
