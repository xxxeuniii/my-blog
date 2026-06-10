# Milvus

## 简介

Milvus 是一个开源的云原生向量数据库，专为大规模向量搜索和 AI 应用设计。由 Zilliz 开发并维护，是 LF AI & Data 基金会的毕业项目。

### 核心特点

- **云原生**：设计用于云端部署
- **高性能**：支持十亿级向量，毫秒级查询
- **高可用**：分布式架构，支持水平扩展
- **丰富功能**：支持多种索引类型、元数据过滤
- **活跃社区**：开源项目，社区活跃

## 安装和部署

### 使用 Docker

```bash
# 启动 Milvus 单机版
docker run -d --name milvus-standalone \
  -p 19530:19530 \
  -p 9091:9091 \
  milvusdb/milvus:latest
```

### 使用 Docker Compose

```bash
# 下载 docker-compose.yml
wget https://github.com/milvus-io/milvus/releases/download/v2.3.0/milvus-standalone-docker-compose.yml
docker-compose up -d
```

### 安装 Python SDK

```bash
pip install pymilvus
```

## 快速开始

### 连接 Milvus

```python
from pymilvus import connections, utility

# 连接到 Milvus
connections.connect(
    alias="default",
    host="localhost",
    port="19530"
)
```

### 创建集合

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

# 定义字段
id_field = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
    auto_id=True
)

vector_field = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=1536
)

metadata_field = FieldSchema(
    name="metadata",
    dtype=DataType.VARCHAR,
    max_length=1000
)

# 创建集合
schema = CollectionSchema(
    fields=[id_field, vector_field, metadata_field],
    description="测试集合"
)

collection = Collection(
    name="my_collection",
    schema=schema
)
```

### 插入数据

```python
import random

# 生成测试数据
data = [
    [random.random() for _ in range(1536)] for _ in range(1000)
]

metadata = [f"文档{i}" for i in range(1000)]

# 插入数据
mr = collection.insert([data, metadata])
```

### 创建索引

```python
index_params = {
    "index_type": "HNSW",
    "metric_type": "COSINE",
    "params": {
        "M": 16,
        "efConstruction": 200
    }
}

collection.create_index(
    field_name="vector",
    index_params=index_params
)

# 加载集合到内存
collection.load()
```

### 搜索

```python
search_params = {
    "metric_type": "COSINE",
    "params": {"ef": 100
}

results = collection.search(
    data=[query_vector],
    anns_field="vector",
    param=search_params,
    limit=10,
    expr=None,
    output_fields=["metadata"]
)

for result in results[0]:
    print(result.id, result.score, result.entity.get("metadata"))
```

## 索引类型

Milvus 支持多种索引类型：

### FLAT
- 暴力搜索
- 精确但慢
- 适合小规模数据

### IVF_FLAT
- 倒排文件
- 速度和精度平衡

### HNSW
- 图索引
- 高性能
- 内存占用较高

### DISKANN
- 磁盘索引
- 支持超大规模数据

### SCANN
- Google 的索引
- 磁盘优化

## 索引参数

### HNSW 参数

```python
index_params = {
    "index_type": "HNSW",
    "metric_type": "COSINE",
    "params": {
        "M": 16,              # 每个节点的邻居数量
        "efConstruction": 200  # 构建索引时的 ef 值
    }
}

search_params = {
    "metric_type": "COSINE",
    "params": {
        "ef": 100  # 搜索时的 ef 值
    }
}
```

### IVF 参数

```python
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "COSINE",
    "params": {
        "nlist": 128  # 聚类中心数量
    }
}

search_params = {
    "metric_type": "COSINE",
    "params": {
        "nprobe": 16  # 搜索时查询的聚类数量
    }
}
```

## 元数据过滤

```python
# 创建集合时添加标量字段
price_field = FieldSchema(
    name="price",
    dtype=DataType.FLOAT
)

category_field = FieldSchema(
    name="category",
    dtype=DataType.VARCHAR,
    max_length=100
)

# 过滤查询
results = collection.search(
    data=[query_vector],
    anns_field="vector",
    param=search_params,
    limit=10,
    expr="category == 'book' and price > 100",
    output_fields=["metadata", "price", "category"]
)
```

## 与 LangChain 集成

```python
from langchain_community.vectorstores import Milvus
from langchain_openai import OpenAIEmbeddings

# 创建向量存储
embeddings = OpenAIEmbeddings()

vectorstore = Milvus(
    embedding_function=embeddings,
    connection_args={"host": "localhost", "port": "19530"},
    collection_name="my_collection"
)

# 添加文档
vectorstore.add_texts(["文档1", "文档2"])

# 搜索
docs = vectorstore.similarity_search("查询", k=5)
```

## 优缺点

### 优点

- 开源免费
- 高性能，支持超大规模
- 功能丰富
- 分布式架构
- 社区活跃
- 支持多种部署方式

### 缺点

- 部署和运维相对复杂
- 资源消耗较大
- 学习曲线较陡

## 适用场景

- 企业级大规模应用
- 需要完全控制数据
- 有运维能力的团队
- 需要自定义部署
- 超大规模数据（亿级以上）
