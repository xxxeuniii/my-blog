from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

def main():
    print("=" * 60)
    print("06_vector_stores_向量数据库.py")
    print("=" * 60)
    
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
    
    print("1. 加载和分割文档")
    print("-" * 40)
    loader = TextLoader("knowledge.txt", encoding="utf-8")
    documents = loader.load()
    
    text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=10)
    texts = text_splitter.split_documents(documents)
    print(f"分割成 {len(texts)} 个文本块")
    print()
    
    print("2. 创建向量数据库")
    print("-" * 40)
    embeddings = OpenAIEmbeddings()
    db = Chroma.from_documents(texts, embeddings)
    print("向量数据库创建成功")
    print()
    
    print("3. 执行相似度检索")
    print("-" * 40)
    query = "LangChain 的特点有哪些？"
    docs = db.similarity_search(query)
    print(f"找到 {len(docs)} 个相关文档")
    for i, doc in enumerate(docs):
        print(f"文档 {i+1}: {doc.page_content}")
    
    # 清理测试文件
    os.remove("knowledge.txt")


if __name__ == "__main__":
    main()