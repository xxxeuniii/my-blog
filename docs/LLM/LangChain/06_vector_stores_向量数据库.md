# 向量数据库

本教程介绍 LangChain 中的向量数据库功能，使用 Chroma 作为示例。

## 1. 加载和分割文档

首先加载文档并使用 `CharacterTextSplitter` 将其分割成较小的文本块。

```python
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

def main():
    # 加载环境变量
    load_dotenv()
    
    # 创建测试文档
    with open("knowledge.txt", "w", encoding="utf-8") as f:
        f.write("""LangChain 是一个用于构建 LLM 应用的框架。
它提供了各种组件和工具来简化开发。

LangChain 的主要特点包括：
1. 模块化设计
2. 支持多种 LLM
3. 提供链式调用功能
4. 支持向量数据库
""")
    
    # 加载和分割文档
    loader = TextLoader("knowledge.txt", encoding="utf-8")
    documents = loader.load()
    
    text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=10)
    texts = text_splitter.split_documents(documents)
    print(f"分割成 {len(texts)} 个文本块")
```

## 2. 创建向量数据库

使用 Chroma 创建向量数据库，并将文本块添加进去。

```python
    # 创建向量数据库
    embeddings = OpenAIEmbeddings()
    db = Chroma.from_documents(texts, embeddings)
    print("\n向量数据库创建成功")
```

## 3. 执行相似度检索

使用向量数据库进行相似度检索。

```python
    # 执行相似度检索
    query = "LangChain 的特点有哪些？"
    docs = db.similarity_search(query)
    print(f"\n找到 {len(docs)} 个相关文档")
    for i, doc in enumerate(docs):
        print(f"文档 {i+1}: {doc.page_content}")
    
    # 清理测试文件
    os.remove("knowledge.txt")

if __name__ == "__main__":
    main()
```
