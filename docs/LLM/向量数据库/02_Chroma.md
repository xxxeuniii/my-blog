# Chroma

## 简介

Chroma 是一个开源的轻量级向量数据库，专为 AI 应用开发设计。它简单易用，非常适合快速原型开发和小规模应用。

### 核心特点

- **轻量级**：易于安装和部署
- **Python 优先**：优秀的 Python 支持
- **内置 Embedding**：集成多种 Embedding 模型
- **持久化**：支持数据持久化存储
- **LangChain 集成**：与 LangChain 完美集成

## 安装

```bash
pip install chromadb
```

## 快速开始

### 基本使用

```python
import chromadb
from chromadb.utils import embedding_functions

# 初始化客户端
client = chromadb.Client()

# 创建集合
collection = client.create_collection(name="my_collection")

# 添加文档
collection.add(
    documents=["这是文档1", "这是文档2"],
    metadatas=[{"source": "source1"}, {"source": "source2"}],
    ids=["id1", "id2"]
)

# 查询
results = collection.query(
    query_texts=["这是查询"],
    n_results=2
)

print(results)
```

### 使用持久化

```python
import chromadb

# 创建持久化客户端
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="my_collection")
```

## 核心概念

### 集合（Collection）

集合是 Chroma 中存储向量的基本单位，类似于数据库中的表。

```python
# 创建集合
collection = client.create_collection(
    name="my_collection",
    metadata={"description": "我的集合"}
)

# 获取或创建集合
collection = client.get_or_create_collection(name="my_collection")

# 删除集合
client.delete_collection(name="my_collection")
```

### Embedding 函数

Chroma 支持多种 Embedding 函数：

```python
from chromadb.utils import embedding_functions

# OpenAI Embedding
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your_api_key",
    model_name="text-embedding-ada-002"
)

# Sentence Transformer
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# 使用自定义 Embedding
collection = client.create_collection(
    name="my_collection",
    embedding_function=openai_ef
)
```

## 操作指南

### 添加数据

```python
collection.add(
    documents=["文档内容"],
    metadatas=[{"key": "value"}],
    ids=["unique_id"]
)

# 或者直接添加向量
collection.add(
    embeddings=[[0.1, 0.2, 0.3]],
    documents=["文档内容"],
    metadatas=[{"key": "value"}],
    ids=["unique_id"]
)
```

### 查询数据

```python
# 按文本查询
results = collection.query(
    query_texts=["查询文本"],
    n_results=5
)

# 按向量查询
results = collection.query(
    query_embeddings=[[0.1, 0.2, 0.3]],
    n_results=5
)

# 带元数据过滤
results = collection.query(
    query_texts=["查询文本"],
    n_results=5,
    where={"source": "source1"}
)

# 复合过滤
results = collection.query(
    query_texts=["查询文本"],
    where={
        "$and": [
            {"source": "source1"},
            {"category": "tech"}
        ]
    }
)
```

### 更新和删除

```python
# 更新数据
collection.update(
    ids=["id1"],
    documents=["更新后的文档"]
)

# 删除数据
collection.delete(ids=["id1"])

# 按条件删除
collection.delete(
    where={"source": "source1"}
)
```

## 元数据过滤

Chroma 支持丰富的元数据过滤操作：

```python
# 等于
{"field": "value"}

# 不等于
{"field": {"$ne": "value"}}

# 大于/小于
{"field": {"$gt": 5}}
{"field": {"$gte": 5}}
{"field": {"$lt": 5}}
{"field": {"$lte": 5}}

# 包含
{"field": {"$in": ["value1", "value2"]}}

# 逻辑运算
{
    "$and": [
        {"field1": "value1"},
        {"field2": "value2"}
    ]
}

{
    "$or": [
        {"field1": "value1"},
        {"field2": "value2"}
    ]
}
```

## 与 LangChain 集成

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# 创建 Chroma 向量存储
embeddings = OpenAIEmbeddings()
db = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)

# 添加文档
db.add_texts(["文档1", "文档2"])

# 相似度搜索
docs = db.similarity_search("查询", k=2)

# 带分数的搜索
docs = db.similarity_search_with_score("查询", k=2)
```

## 优缺点

### 优点

- 安装简单，上手快
- 优秀的 Python API
- 与 LangChain 集成良好
- 适合快速原型开发
- 支持持久化

### 缺点

- 不适合大规模数据（百万级以上）
- 性能一般
- 功能相对简单
- 缺少分布式支持

## 适用场景

- 快速原型开发
- 小规模应用（< 100万向量）
- 学习和教学
- 个人项目
