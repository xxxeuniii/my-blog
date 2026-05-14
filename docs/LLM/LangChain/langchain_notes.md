# LangChain 入门学习笔记

> 基于 Python 版本 LangChain v1.0

---

## 目录

1. [什么是 LangChain](#1-什么是-langchain)
2. [核心组件概览](#2-核心组件概览)
3. [LLMs（语言模型）](#3-llms语言模型)
4. [Prompts（提示词模板）](#4-prompts提示词模板)
5. [LCEL（链式调用）](#5-lcel链式调用)
6. [RAG（检索增强生成）](#6-rag检索增强生成)
7. [完整示例](#7-完整示例)

---

## 1. 什么是 LangChain

### 1.1 定义

LangChain 是一个用于构建大语言模型（LLM）应用的**开源框架**。

### 1.2 核心价值

- **模块化设计**：提供各种可组合的组件
- **多模型支持**：支持 OpenAI、Anthropic、Google 等多种 LLM
- **简化开发**：降低构建复杂 LLM 应用的门槛

### 1.3 典型应用场景

- 问答系统（QA）
- 聊天机器人
- 代码生成
- 文档分析
- 智能代理

---

## 2. 核心组件概览

| 组件 | 作用 | 关键特性 |
|------|------|----------|
| **LLMs** | 语言模型接口 | 统一调用不同服务商的模型 |
| **Prompts** | 提示词模板 | 参数化、复用、格式化 |
| **Chains** | 链式调用 | 组合多个组件 |
| **Agents** | 智能代理 | 自动选择工具 |
| **Memory** | 记忆功能 | 保持对话状态 |
| **Document Loaders** | 文档加载器 | 读取各种格式文件 |
| **Vector Stores** | 向量数据库 | 存储和检索文本向量 |

---

## 3. LLMs（语言模型）

### 3.1 基础概念

LLM（Large Language Model）是 LangChain 的核心，负责生成文本响应。

### 3.2 基本用法

```python
from langchain_openai import ChatOpenAI

# 创建 LLM 实例
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 调用模型
response = llm.invoke("什么是 LangChain？")
print(response.content)
```

### 3.3 关键参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `model` | 模型名称 | `gpt-3.5-turbo` |
| `temperature` | 随机性（0-1） | 0=确定性，1=创造性 |
| `max_tokens` | 最大生成Token数 | 1000 |

### 3.4 本地模型支持

LangChain 也支持本地开源模型（如 Llama、Qwen 等）。

---

## 4. Prompts（提示词模板）

### 4.1 为什么需要提示词模板

- **复用性**：相同模板可用于不同输入
- **参数化**：动态填充变量
- **结构化**：保持提示词格式一致

### 4.2 PromptTemplate

适用于简单的文本提示词：

```python
from langchain_core.prompts import PromptTemplate

# 定义模板
template = """你是一位专业的 {role}。请用简洁易懂的语言解释 {topic}。"""
prompt = PromptTemplate.from_template(template)

# 格式化
formatted_prompt = prompt.format(role="软件工程师", topic="大语言模型")
print(formatted_prompt)
# 输出：你是一位专业的 软件工程师。请用简洁易懂的语言解释 大语言模型。
```

### 4.3 ChatPromptTemplate

适用于多轮对话场景：

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位友好的助手，用中文回答问题。"),
    ("user", "请解释 {concept}")
])

# 格式化
formatted = prompt.format_messages(concept="RAG")
print(formatted)
```

#### 消息角色说明

| 角色 | 说明 |
|------|------|
| `system` | 系统指令，定义助手行为 |
| `user` | 用户输入 |
| `assistant` | 助手的历史回复 |

---

## 5. LCEL（链式调用）

### 5.1 什么是 LCEL

LCEL（LangChain Expression Language）是 LangChain v1.0 推荐的链式调用方式。

使用**管道符 `|`** 将多个组件连接起来：

```python
chain = prompt | llm | output_parser
```

### 5.2 组件组合

```python
from langchain_core.output_parsers import StrOutputParser

# 完整的链
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位友好的助手"),
    ("user", "{question}")
])

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
output_parser = StrOutputParser()

chain = prompt | llm | output_parser

# 调用链
result = chain.invoke({"question": "什么是 LCEL？"})
print(result)
```

### 5.3 链的优势

1. **简洁**：一行代码组合多个组件
2. **灵活**：轻松添加/移除组件
3. **可复用**：链本身可以作为组件
4. **支持流式输出**：天然支持 streaming

---

## 6. RAG（检索增强生成）

### 6.1 什么是 RAG

**R**etrieval-**A**ugmented **G**eneration（检索增强生成）

核心思想：在生成回答前，先从知识库中检索相关信息。

### 6.2 RAG 的优势

- **时效性**：可以使用最新数据
- **准确性**：基于特定知识库回答
- **可追溯**：回答可溯源到原始文档

### 6.3 RAG 工作流程

```
用户提问 → 检索知识库 → 构建提示词 → LLM生成回答
```

### 6.4 实现步骤

#### 步骤 1：加载文档

```python
from langchain_community.document_loaders import TextLoader

loader = TextLoader("knowledge_base.txt", encoding="utf-8")
documents = loader.load()
```

#### 步骤 2：分割文本

```python
from langchain_text_splitters import CharacterTextSplitter

text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
texts = text_splitter.split_documents(documents)
```

#### 步骤 3：创建向量数据库

```python
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
db = Chroma.from_documents(texts, embeddings)
```

#### 步骤 4：创建检索链

```python
from langchain_classic.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever()
)
```

#### 步骤 5：提问

```python
result = qa_chain.invoke("LangChain 的核心组件有哪些？")
print(result)
```

---

## 7. 完整示例

### 7.1 基础问答链

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 1. 创建 LLM
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 2. 创建提示词模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位技术专家，请用简洁的语言回答问题。"),
    ("user", "{question}")
])

# 3. 创建输出解析器
output_parser = StrOutputParser()

# 4. 组合成链
chain = prompt | llm | output_parser

# 5. 调用链
result = chain.invoke({"question": "什么是大语言模型？"})
print(result)
```

### 7.2 带记忆的对话链

```python
from langchain.chains.conversation.base import ConversationChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

conversation.run("你好，我叫小明")
conversation.run("我刚才告诉你我叫什么名字？")  # 能记住之前的对话
```

---

## 总结

### 核心要点

1. **LLM 是核心**：所有应用都围绕语言模型展开
2. **Prompt 很重要**：好的提示词决定输出质量
3. **链式调用是关键**：组合组件构建复杂应用
4. **RAG 是常用模式**：解决知识时效性问题

### 学习路径

1. 掌握基础 LLM 调用
2. 学会使用 PromptTemplate
3. 理解 LCEL 链式调用
4. 实践 RAG 应用

---

**下一章预告**：深入学习 Agents（智能代理）和工具调用

---

> 📝 笔记说明：这份笔记基于 LangChain v1.0 版本，代码示例已通过测试。如果你有任何问题，欢迎讨论！