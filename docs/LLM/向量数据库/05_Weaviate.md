# Weaviate

## 简介

Weaviate 是一个开源的模块化向量数据库，支持语义搜索、问答和分类等功能。它采用模块化设计，可以灵活组合不同的模块。

### 核心特点

- **模块化**：灵活组合不同功能模块
- **开箱即用**：内置多种 Embedding 模型
- **混合搜索**：同时支持关键词和向量搜索
- **GraphQL API**：强大的查询语言
- **云原生**：支持 Docker 和 Kubernetes

## 安装和部署

### 使用 Docker

```bash
# 启动 Weaviate
docker run -d -p 8080:8080 \
  -e ENABLE_MODULES=text2vec-openai \
  -e OPENAI_APIKEY=your-api-key \
  semitechnologies/weaviate:latest
```

### 安装 Python SDK

```bash
pip install weaviate-client
```

## 快速开始

### 连接 Weaviate

```python
import weaviate

client = weaviate.Client("http://localhost:8080")
```

### 创建 Schema

```python
schema = {
    "classes": [
        {
            "class": "Document",
            "description": "文档",
            "vectorizer": "text2vec-openai",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizeClassName": False
                }
            },
            "properties": [
                {
                    "name": "content",
                    "dataType": ["text"],
                    "description": "文档内容"
                },
                {
                    "name": "category",
                    "dataType": ["string"],
                    "description": "分类"
                }
            ]
        }
    ]
}

client.schema.create(schema)
```

### 添加数据

```python
# 添加单个对象
client.data_object.create(
    data_object={
        "content": "这是文档内容",
        "category": "tech"
    },
    class_name="Document"
)

# 批量添加
with client.batch() as batch:
    batch.add_data_object(
        data_object={"content": "文档1", "category": "tech"},
        class_name="Document"
    )
    batch.add_data_object(
        data_object={"content": "文档2", "category": "business"},
        class_name="Document"
    )
```

### 搜索

```python
# 向量搜索
result = (
    client.query
    .get("Document", ["content", "category"])
    .with_near_text({"concepts": ["查询文本"]})
    .with_limit(5)
    .do()
)

print(result)
```

## 搜索类型

### 向量搜索

```python
# 文本搜索
result = (
    client.query
    .get("Document", ["content"])
    .with_near_text({"concepts": ["AI", "机器学习"]})
    .with_limit(5)
    .do()
)

# 向量搜索
query_vector = [0.1, 0.2, 0.3]
result = (
    client.query
    .get("Document", ["content"])
    .with_near_vector({"vector": query_vector})
    .with_limit(5)
    .do()
)
```

### 关键词搜索

```python
result = (
    client.query
    .get("Document", ["content"])
    .with_bm25(query="搜索关键词")
    .with_limit(5)
    .do()
)
```

### 混合搜索

```python
result = (
    client.query
    .get("Document", ["content"])
    .with_hybrid(query="搜索关键词", alpha=0.5)
    .with_limit(5)
    .do()
)
```

## 过滤

```python
# 简单过滤
result = (
    client.query
    .get("Document", ["content", "category"])
    .with_near_text({"concepts": ["查询"]})
    .with_where({
        "path": ["category"],
        "operator": "Equal",
        "valueText": "tech"
    })
    .do()
)

# 复合过滤
result = (
    client.query
    .get("Document", ["content", "category", "price"])
    .with_near_text({"concepts": ["查询"]})
    .with_where({
        "operator": "And",
        "operands": [
            {
                "path": ["category"],
                "operator": "Equal",
                "valueText": "tech"
            },
            {
                "path": ["price"],
                "operator": "GreaterThan",
                "valueNumber": 100
            }
        ]
    })
    .do()
)
```

## 模块

### Text2Vec 模块

```python
# OpenAI
schema = {
    "classes": [
        {
            "class": "Document",
            "vectorizer": "text2vec-openai",
            "moduleConfig": {
                "text2vec-openai": {
                    "model": "text-embedding-ada-002",
                    "vectorizeClassName": False
                }
            },
            "properties": [...]
        }
    ]
}

# Hugging Face
schema = {
    "classes": [
        {
            "class": "Document",
            "vectorizer": "text2vec-huggingface",
            "moduleConfig": {
                "text2vec-huggingface": {
                    "model": "sentence-transformers/all-MiniLM-L6-v2",
                    "vectorizeClassName": False
                }
            },
            "properties": [...]
        }
    ]
}
```

### QnA 模块

```python
result = (
    client.query
    .get("Document", ["content"])
    .with_ask({
        "question": "这是什么？",
        "properties": ["content"]
    })
    .with_limit(1)
    .do()
)
```

### Generative 模块

```python
result = (
    client.query
    .get("Document", ["content"])
    .with_near_text({"concepts": ["查询"]})
    .with_generate(single_prompt="基于以下内容回答：{content}")
    .with_limit(3)
    .do()
)
```

## 与 LangChain 集成

```python
from langchain_community.vectorstores import Weaviate
from langchain_openai import OpenAIEmbeddings
import weaviate

# 创建客户端
client = weaviate.Client("http://localhost:8080")

# 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Weaviate(
    client,
    "Document",
    "content",
    embedding=embeddings
)

# 添加文档
vectorstore.add_texts(["文档1", "文档2"])

# 搜索
docs = vectorstore.similarity_search("查询", k=5)
```

## 优缺点

### 优点

- 模块化设计灵活
- 内置多种模块
- 支持混合搜索
- GraphQL API 强大
- 功能丰富

### 缺点

- 学习曲线较陡
- 配置相对复杂
- 性能一般
- 资源消耗较大

## 适用场景

- 需要混合搜索
- 需要问答功能
- 需要生成式 AI 集成
- 喜欢 GraphQL
- 中等规模应用
