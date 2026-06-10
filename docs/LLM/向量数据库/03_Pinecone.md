# Pinecone

## 简介

Pinecone 是一个托管式云向量数据库服务，提供完全托管的向量搜索解决方案。无需管理基础设施，即可快速构建和部署大规模向量搜索应用。

### 核心特点

- **完全托管**：无需运维，开箱即用
- **高性能**：支持十亿级向量，毫秒级查询
- **高可用**：多区域部署，自动扩展
- **丰富功能**：元数据过滤、实时更新、混合搜索
- **易于集成**：简洁的 API，多语言 SDK

## 快速开始

### 安装 SDK

```bash
pip install pinecone
```

### 初始化

```python
from pinecone import Pinecone

pc = Pinecone(api_key="your-api-key")
```

### 创建索引

```python
from pinecone import ServerlessSpec

# 创建 Serverless 索引
pc.create_index(
    name="my-index",
    dimension=1536,  # 向量维度
    metric="cosine",  # 相似度度量
    spec=ServerlessSpec(
        cloud="aws",
        region="us-west-2"
    )
)
```

### 连接索引

```python
index = pc.Index("my-index")
```

## 核心概念

### 索引（Index）

索引是 Pinecone 中存储向量的最高级别单位。

```python
# 列出所有索引
pc.list_indexes()

# 删除索引
pc.delete_index("my-index")

# 查看索引信息
pc.describe_index("my-index")
```

### 命名空间（Namespace）

在一个索引中可以划分多个命名空间，实现数据隔离。

```python
# 使用命名空间
index.upsert(vectors=[...], namespace="ns1")
index.query(vector=[...], namespace="ns1", top_k=10)

# 删除命名空间中的所有数据
index.delete(namespace="ns1", delete_all=True)
```

## 基本操作

### 插入向量

```python
# 插入单条向量
index.upsert(
    vectors=[
        ("id1", [0.1, 0.2, 0.3], {"genre": "action"})
    ]
)

# 批量插入
vectors = [
    ("id1", [0.1, 0.2, 0.3], {"genre": "action"}),
    ("id2", [0.4, 0.5, 0.6], {"genre": "comedy"})
]
index.upsert(vectors=vectors)
```

### 查询向量

```python
# 基本查询
results = index.query(
    vector=[0.1, 0.2, 0.3],
    top_k=10,
    include_metadata=True
)

# 按 ID 查询
results = index.query(
    id="id1",
    top_k=10
)

# 元数据过滤
results = index.query(
    vector=[0.1, 0.2, 0.3],
    top_k=10,
    filter={"genre": "action"}
)
```

### 更新和删除

```python
# 更新向量
index.update(
    id="id1",
    values=[0.7, 0.8, 0.9],
    set_metadata={"genre": "drama"}
)

# 删除向量
index.delete(ids=["id1", "id2"])

# 按过滤条件删除
index.delete(filter={"genre": "action"})

# 删除所有
index.delete(delete_all=True)
```

## 元数据过滤

Pinecone 支持强大的元数据过滤：

```python
# 等于
{"genre": "action"}

# 不等于
{"genre": {"$ne": "action"}}

# 比较运算
{"year": {"$gt": 2020}}
{"year": {"$gte": 2020}}
{"year": {"$lt": 2020}}
{"year": {"$lte": 2020}}

# 包含
{"genre": {"$in": ["action", "comedy"]}}
{"genre": {"$nin": ["horror", "thriller"]}}

# 逻辑运算
{
    "$and": [
        {"genre": "action"},
        {"year": {"$gt": 2020}}
    ]
}

{
    "$or": [
        {"genre": "action"},
        {"genre": "comedy"}
    ]
}
```

## 稀疏向量（Sparse Vectors）

支持混合稀疏和稠密向量搜索：

```python
index.upsert(
    vectors=[
        (
            "vec1",
            [0.1, 0.2, 0.3],  # 稠密向量
            {"indices": [1, 5], "values": [0.5, 0.8]},  # 稀疏向量
            {"genre": "action"}
        )
    ]
)

# 查询时同时使用
results = index.query(
    vector=[0.1, 0.2, 0.3],
    sparse_vector={"indices": [1, 5], "values": [0.5, 0.8]},
    top_k=10
)
```

## 与 LangChain 集成

```python
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
import pinecone

# 初始化 Pinecone
pc = Pinecone(api_key="your-api-key")
index = pc.Index("my-index")

# 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone(
    index,
    embedding=embeddings,
    text_key="text"
)

# 添加文档
vectorstore.add_texts(["文档1", "文档2"])

# 搜索
docs = vectorstore.similarity_search("查询", k=5)
```

## 索引类型

### Serverless Index

- 按使用量付费
- 自动扩展
- 适合可变流量

### Pod Index

- 按资源付费
- 可预测性能
- 适合稳定流量

```python
from pinecone import PodSpec

pc.create_index(
    name="pod-index",
    dimension=1536,
    metric="cosine",
    spec=PodSpec(
        environment="us-west1-gcp",
        pod_type="p1.x1"
    )
)
```

## 优缺点

### 优点

- 完全托管，无需运维
- 性能优秀，支持大规模数据
- API 简单易用
- 高可用和自动扩展
- 功能丰富

### 缺点

- 成本较高
- 数据在第三方服务器
- 供应商锁定
- 自定义程度较低

## 适用场景

- 不想管理基础设施
- 大规模生产应用
- 需要高可用性
- 快速上线项目
- 团队缺少运维能力
