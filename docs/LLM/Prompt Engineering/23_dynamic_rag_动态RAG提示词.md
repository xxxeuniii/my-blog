# 动态 RAG 提示词

结合向量检索自动更换Few-shot例子。

---

## 背景问题

```
静态Few-shot的问题：
- 例子固定，不能适配所有情况
- 新场景下例子可能不合适
- 浪费Token（不需要的例子也放进去）
```

---

## 什么是动态RAG

```
Retrieval-Augmented Generation：检索增强生成

流程：
1. 用户问题 → 2. 向量检索 → 3. 找出最相似的例子 → 4. 动态插入Prompt → 5. 调用LLM

好处：
- 例子精准适配当前问题
- 只放最相关的1-3个例子
- 节省Token + 提升效果
```

---

## 系统架构

```
┌──────────────────┐
│  历史问答对库    │
│  (1000+例子)     │
└────────┬─────────┘
         │ 向量化
         ▼
┌──────────────────┐
│  向量数据库      │
│  (Chroma/Pinecone)│
└────────┬─────────┘
         │
┌────────▼─────────┐    ┌──────────────────┐
│  用户问题       │───▶│  相似度检索      │
└──────────────────┘    └────────┬─────────┘
                                 │
                         ┌───────▼───────┐
                         │  取Top3例子   │
                         └───────┬───────┘
                                 │
                         ┌───────▼───────┐
                         │  组装Prompt   │
                         │  +LLM推理     │
                         └───────────────┘
```

---

## 代码示例（Python）

```python
# 1. 准备例子库
examples = [
    {
        "question": "如何排序Python列表？",
        "answer": "使用sorted()或list.sort()",
        "code": "sorted([3,1,2]) → [1,2,3]"
    },
    {
        "question": "如何读取CSV？",
        "answer": "用pandas或csv模块",
        "code": "pd.read_csv('file.csv')"
    },
    # ... 更多例子
]

# 2. 向量化（用OpenAI Embeddings）
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

db = Chroma.from_documents(examples, OpenAIEmbeddings())

# 3. 动态检索+组装
user_question = "如何在Python中处理JSON数据？"

# 检索最相似的3个例子
relevant_examples = db.similarity_search(user_question, k=3)

# 组装Prompt
prompt = f"""你是Python编程助手，请参考以下例子回答问题：

{relevant_examples}

用户问题：{user_question}
请提供代码示例。
"""

# 4. 调用LLM
response = llm.generate(prompt)
```

---

## 适用场景

| 场景 | 效果 |
|------|------|
| 代码助手 | 相似代码问题直接给对应例子 |
| 客服问答 | 类似历史问题复用最佳回答 |
| 文档问答 | 从知识库动态检索相关内容 |
| 教育辅导 | 根据难度匹配对应难度的例子 |

---

## 优势对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| 静态Few-shot | 简单 | 固定、浪费Token |
| 动态RAG | 精准、省Token | 需要向量库、开发成本 |
| Zero-shot | 极简 | 效果差 |
```

---

## 进阶技巧

```
1. 例子质量筛选
   - 只保留高质量的历史问答
   - 定期淘汰低质量例子

2. 多样性控制
   - 避免只返回很相似的例子
   - 可以强制取不同类别的例子

3. 冷启动处理
   - 没有历史数据时，先手动准备种子例子
   - 系统跑起来后慢慢积累
```
