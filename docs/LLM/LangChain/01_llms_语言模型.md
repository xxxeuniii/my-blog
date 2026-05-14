# 语言模型

## 什么是语言模型

语言模型是一种机器学习模型，用于预测和生成自然语言文本。

## LangChain 中的语言模型使用

### 基础代码示例

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# 加载环境变量
load_dotenv()

# 创建 LLM 实例
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.7,
    max_tokens=1000
)

# 调用模型
response = llm.invoke("什么是大语言模型？")
print(response.content)
```

### 常用参数说明

| 参数 | 说明 | 示例值 |
|------|------|--------|
| `model` | 模型名称 | `"gpt-3.5-turbo"`, `"gpt-4"` |
| `temperature` | 采样温度（0-1），越高越随机 | `0.7` |
| `max_tokens` | 最大生成 token 数 | `1000` |
| `top_p` | 核采样参数 | `0.9` |
| `frequency_penalty` | 频率惩罚 | `0` |

### 温度参数的影响

- **低温度 (0-0.3)**: 输出更确定、一致
- **中温度 (0.4-0.7)**: 平衡确定性和创造性
- **高温度 (0.8-1.0)**: 输出更有创造性、随机

## 常用模型

### OpenAI 模型

```python
from langchain_openai import ChatOpenAI

# GPT-3.5
llm_35 = ChatOpenAI(model="gpt-3.5-turbo")

# GPT-4
llm_4 = ChatOpenAI(model="gpt-4")

# GPT-4 Turbo
llm_4t = ChatOpenAI(model="gpt-4-turbo")
```

### 其他常见模型

- **Anthropic Claude**: `ChatAnthropic`
- **Google Gemini**: `ChatGoogleGenerativeAI`
- **本地模型**: 如 Ollama、LM Studio 等

## 实际应用示例

### 简单问答

```python
question = "什么是机器学习？"
response = llm.invoke(question)
print(response.content)
```

### 批量处理

```python
questions = [
    "什么是深度学习？",
    "什么是神经网络？",
    "什么是自然语言处理？"
]

for q in questions:
    response = llm.invoke(q)
    print(f"Q: {q}")
    print(f"A: {response.content}\n")
```
