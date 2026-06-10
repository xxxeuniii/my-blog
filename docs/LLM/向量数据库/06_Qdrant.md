# Qdrant

## 简介

Qdrant 是一个用 Rust 编写的高性能向量数据库，专注于速度和效率。它提供了丰富的 API，支持向量搜索和过滤。

### 核心特点

- **高性能**：Rust 编写，性能优秀
- **内存效率**：内存占用低
- **丰富功能**：支持过滤、分组、推荐
- **易于部署**：Docker 一键部署
- **API 友好**：REST 和 gRPC API

## 安装和部署

### 使用 Docker

```bash
docker run -d -p 6333:6333 qdrant/qdrant
```

### 安装 Python SDK

```bash
pip install qdrant-client
```

## 快速开始

### 连接 Qdrant

```python
from qdrant_client import QdrantClient

client = QdrantClient("localhost", port=6333)
```

### 创建集合

```python
from qdrant_client.models import Distance, VectorParams

client.create_collection(
    collection_name="my_collection",
    vectors_config=VectorParams(
        size=1536,
        distance=Distance.COSINE
    )
)
```

### 添加数据

```python
from qdrant_client.models import PointStruct

# 添加点
client.upsert(
    collection_name="my_collection",
    points=[
        PointStruct(
            id=1,
            vector=[0.1, 0.2, 0.3],
            payload={"category": "tech", "text": "文档1"}
        ),
        PointStruct(
            id=2,
            vector=[0.4, 0.5, 0.6],
            payload={"category": "business", "text": "文档2"}
        )
    ]
)
```

### 搜索

```python
hits = client.search(
    collection_name="my_collection",
    query_vector=[0.1, 0.2, 0.3],
    limit=5
)

for hit in hits:
    print(hit.id, hit.score, hit.payload)
```

## 搜索功能

### 基本搜索

```python
hits = client.search(
    collection_name="my_collection",
    query_vector=[0.1, 0.2, 0.3],
    limit=10,
    with_payload=True
)
```

### 过滤搜索

```python
from qdrant_client.models import Filter, FieldCondition, MatchValue

# 简单过滤
hits = client.search(
    collection_name="my_collection",
    query_vector=[0.1, 0.2, 0.3],
    query_filter=Filter(
        must=[
            FieldCondition(
                key="category",
                match=MatchValue(value="tech")
            )
        ]
    ),
    limit=10
)

# 复合过滤
from qdrant_client.models import Range

hits = client.search(
    collection_name="my_collection",
    query_vector=[0.1, 0.2, 0.3],
    query_filter=Filter(
        must=[
            FieldCondition(
                key="category",
                match=MatchValue(value="tech")
            ),
            FieldCondition(
                key="price",
                range=Range(gt=100)
            )
        ]
    ),
    limit=10
)
```

## 推荐系统

```python
# 基于正负样本推荐
hits = client.recommend(
    collection_name="my_collection",
    positive=[1, 2],
    negative=[3, 4],
    limit=10
)
```

## 分组搜索

```python
from qdrant_client.models import GroupParams

hits = client.search_groups(
    collection_name="my_collection",
    query_vector=[0.1, 0.2, 0.3],
    group_by="category",
    limit=4,
    group_size=2
)
```

## 批量操作

```python
# 批量插入
points = [
    PointStruct(
        id=i,
        vector=[0.1, 0.2, 0.3],
        payload={"text": f"文档{i}"}
    )
    for i in range(100)
]

client.upsert(
    collection_name="my_collection",
    points=points
)

# 批量删除
client.delete(
    collection_name="my_collection",
    points_selector=[1, 2, 3]
)

# 按过滤删除
client.delete(
    collection_name="my_collection",
    points_selector=Filter(
        must=[
            FieldCondition(
                key="category",
                match=MatchValue(value="old")
            )
        ]
    )
)
```

## 索引配置

```python
from qdrant_client.models import OptimizersConfigDiff, HnswConfigDiff

# 创建时配置
client.create_collection(
    collection_name="my_collection",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
    hnsw_config=HnswConfigDiff(
        m=16,
        ef_construct=100
    ),
    optimizers_config=OptimizersConfigDiff(
        indexing_threshold=20000
    )
)

# 更新配置
client.update_collection(
    collection_name="my_collection",
    hnsw_config=HnswConfigDiff(m=32)
)
```

## 与 LangChain 集成

```python
from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings
from qdrant_client import QdrantClient

# 创建客户端
client = QdrantClient("localhost", port=6333)

# 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Qdrant(
    client=client,
    collection_name="my_collection",
    embeddings=embeddings
)

# 添加文档
vectorstore.add_texts(["文档1", "文档2"])

# 搜索
docs = vectorstore.similarity_search("查询", k=5)
```

## 优缺点

### 优点

- 性能优秀，速度快
- 内存效率高
- Rust 编写，稳定可靠
- API 设计良好
- 功能丰富

### 缺点

- 社区相对较小
- 生态不如其他成熟
- 文档相对较少

## 适用场景

- 追求极致性能
- 资源受限环境
- 需要推荐功能
- 中大规模应用
