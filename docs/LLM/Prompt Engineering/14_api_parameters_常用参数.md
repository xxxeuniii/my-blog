# 常用参数汇总

API调用时的关键参数说明。

---

## 参数一览

| 参数 | 说明 | 常用范围 |
|------|------|----------|
| model | 使用的模型 | gpt-4 / gpt-3.5-turbo / claude-3 |
| temperature | 随机性控制 | 0.0 - 2.0 |
| top_p | 核采样 | 0.0 - 1.0 |
| max_tokens | 最大输出token数 | 100 - 4000 |
| system | 系统提示词 | 自定义角色/行为 |
| frequency_penalty | 重复惩罚 | -2.0 - 2.0 |
| presence_penalty | 新话题惩罚 | -2.0 - 2.0 |

---

## frequency_penalty / presence_penalty

### frequency_penalty（频率惩罚）

减少重复已出现的词：
- 正值：减少重复
- 负值：鼓励重复
- 常用：0 - 1

```
场景：写文章时避免重复用词
设置：frequency_penalty = 0.5
```

### presence_penalty（存在惩罚）

鼓励引入新话题：
- 正值：鼓励讨论新话题
- 负值：鼓励深挖当前话题
- 常用：0 - 1

```
场景：需要全面覆盖多个话题
设置：presence_penalty = 0.5
```

---

## max_tokens

限制单次输出长度：

| 场景 | max_tokens |
|------|------------|
| 简短回答 | 100 - 200 |
| 一般回答 | 500 - 1000 |
| 长文生成 | 2000 - 4000 |

```
注意：
- 设置太小会截断回答
- 设置太大浪费token和费用
- 根据任务合理预估
```

---

## 实用组合

| 任务 | temperature | top_p | max_tokens |
|------|-------------|-------|------------|
| 代码生成 | 0.1 | 0.95 | 1000 |
| 数据提取 | 0.1 | 0.9 | 500 |
| 问答 | 0.3 | 0.95 | 800 |
| 文案创意 | 0.8 | 0.95 | 1000 |
| 角色扮演 | 0.9 | 1.0 | 2000 |

---

## API调用示例

```python
import openai

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一名资深Python工程师"},
        {"role": "user", "content": "解释什么是装饰器"}
    ],
    temperature=0.3,
    top_p=0.95,
    max_tokens=1000
)

print(response.choices[0].message.content)
```

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1024,
    system="你是一名产品经理",
    messages=[
        {"role": "user", "content": "如何写PRD？"}
    ],
    temperature=0.5,
)

print(response.content)
```
