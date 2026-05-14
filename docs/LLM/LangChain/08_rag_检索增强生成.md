# 检索增强生成

本教程介绍 LangChain 中的检索增强生成 (RAG) 功能。

## 1. 加载文档

首先加载知识库文档。

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

def main():
    # 加载环境变量
    load_dotenv()
    
    # 创建 LLM 和嵌入模型
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    embeddings = OpenAIEmbeddings()
    
    # 创建知识库
    with open("knowledge_base.txt", "w", encoding="utf-8") as f:
        f.write("""LangChain 是一个用于构建 LLM 应用的框架。

LangChain 的核心组件包括：
- LLMs：语言模型接口
- Prompts：提示词模板
- Chains：链式调用
- Agents：智能代理
- Memory：记忆功能
- Document Loaders：文档加载器
- Vector Stores：向量数据库

LangChain 的主要特点：
1. 模块化设计：可以轻松组合不同的组件
2. 支持多种 LLM：包括 OpenAI、Anthropic、Google 等
3. 提供链（Chain）功能：可以将多个步骤组合起来
4. 支持向量数据库：用于实现检索增强生成
""")
    
    # 加载文档
    loader = TextLoader("knowledge_base.txt", encoding="utf-8")
    documents = loader.load()
    print(f"加载了 {len(documents)} 个文档")
```

## 2. 分割文本

使用 `CharacterTextSplitter` 将文档分割成较小的文本块。

```python
    # 分割文本
    text_splitter = CharacterTextSplitter(chunk_size=150, chunk_overlap=20)
    texts = text_splitter.split_documents(documents)
    print(f"\n分割成 {len(texts)} 个文本块")
```

## 3. 创建向量数据库

使用 Chroma 创建向量数据库。

```python
    # 创建向量数据库
    db = Chroma.from_documents(texts, embeddings)
    print("\n向量数据库创建成功")
```

## 4. 创建 RAG 链

创建 `RetrievalQA` 链，将检索和生成结合起来。

```python
    # 创建 RAG 链
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever()
    )
    print("\nRAG 链创建成功")
```

## 5. 提问

使用 RAG 链提问。

```python
    # 提问
    query = "LangChain 的核心组件有哪些？"
    result = qa_chain.run(query)
    print(f"\n问题: {query}")
    print(f"回答: {result}")
    
    # 清理测试文件
    os.remove("knowledge_base.txt")

if __name__ == "__main__":
    main()
```
