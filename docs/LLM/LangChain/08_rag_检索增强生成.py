from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

def main():
    print("=" * 60)
    print("08_rag_检索增强生成.py")
    print("=" * 60)
    
    # 加载环境变量
    load_dotenv()
    
    # 创建真实的 LLM 和嵌入模型
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
    
    print("1. 加载文档")
    print("-" * 40)
    loader = TextLoader("knowledge_base.txt", encoding="utf-8")
    documents = loader.load()
    print(f"加载了 {len(documents)} 个文档")
    print()
    
    print("2. 分割文本")
    print("-" * 40)
    text_splitter = CharacterTextSplitter(chunk_size=150, chunk_overlap=20)
    texts = text_splitter.split_documents(documents)
    print(f"分割成 {len(texts)} 个文本块")
    print()
    
    print("3. 创建向量数据库")
    print("-" * 40)
    db = Chroma.from_documents(texts, embeddings)
    print("向量数据库创建成功")
    print()
    
    print("4. 创建 RAG 链")
    print("-" * 40)
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever()
    )
    print("RAG 链创建成功")
    print()
    
    print("5. 提问")
    print("-" * 40)
    query = "LangChain 的核心组件有哪些？"
    result = qa_chain.run(query)
    print(f"问题: {query}")
    print(f"回答: {result}")
    
    # 清理测试文件
    os.remove("knowledge_base.txt")


if __name__ == "__main__":
    main()