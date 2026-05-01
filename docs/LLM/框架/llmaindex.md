# LlamaIndex

## 什么是 LlamaIndex

LlamaIndex（原名 GPT Index）是一个用于构建 LLM 应用的数据框架，专注于将私有数据与大语言模型结合。

## LlamaIndex 的核心组件

### Document

文档是 LlamaIndex 的基本数据单元，可以是文本、PDF、网页等。

### Index

索引是组织和存储文档的方式，支持多种索引类型：

1. **List Index**：简单的文档列表
2. **Vector Store Index**：基于向量数据库的索引
3. **Tree Index**：树形结构的索引
4. **Keyword Table Index**：基于关键词的索引

### Query Engine

查询引擎用于从索引中检索信息并生成回答。

```python
from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader

# 加载文档
documents = SimpleDirectoryReader('data/').load_data()

# 创建索引
index = GPTSimpleVectorIndex(documents)

# 查询
response = index.query("文档中提到了什么？")
print(response)
```

### Chat Engine

聊天引擎支持对话式交互。

```python
chat_engine = index.as_chat_engine()
response = chat_engine.chat("你好，给我介绍一下文档内容")
```

### Tools

LlamaIndex 提供了多种工具来处理不同类型的数据。

## LlamaIndex 的数据处理流程

```
数据处理流程：
1. 加载数据 → 2. 创建索引 → 3. 查询索引 → 4. 生成回答
```

## LlamaIndex 的应用场景

1. **文档问答**：基于私有文档回答问题
2. **知识库构建**：构建企业知识库
3. **数据整合**：整合多个数据源
4. **智能搜索**：提供智能搜索功能

## LlamaIndex 的优势

- **数据整合**：支持多种数据源
- **灵活索引**：多种索引策略可供选择
- **易于使用**：简洁的 API 设计
- **可扩展性**：支持自定义组件

## LlamaIndex 与其他框架的对比

| 特性 | LlamaIndex | LangChain |
| :--- | :--- | :--- |
| 数据处理 | 强 | 中等 |
| 工具调用 | 中等 | 强 |
| 多智能体 | 弱 | 强 |
| 易用性 | 高 | 中等 |

## 示例：构建知识库

```python
from llama_index import (
    GPTSimpleVectorIndex,
    SimpleDirectoryReader,
    LLMPredictor,
    ServiceContext
)
from langchain.llms import OpenAI

# 配置 LLM
llm_predictor = LLMPredictor(llm=OpenAI(temperature=0))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

# 加载并索引文档
documents = SimpleDirectoryReader('knowledge_base/').load_data()
index = GPTSimpleVectorIndex.from_documents(
    documents, 
    service_context=service_context
)

# 保存索引
index.save_to_disk('knowledge_index.json')

# 加载索引
index = GPTSimpleVectorIndex.load_from_disk('knowledge_index.json')

# 查询
response = index.query("什么是 LlamaIndex？")
print(response.response)
```
