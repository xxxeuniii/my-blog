import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import LLMChain
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA

load_dotenv()

def demo_basic_llm_call():
    print("=" * 60)
    print("1. 基础 LLM 调用")
    print("=" * 60)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    response = llm.invoke("什么是 LangChain？")
    print("LLM 响应:")
    print(response.content)
    print()

def demo_prompt_template():
    print("=" * 60)
    print("2. 使用 PromptTemplate")
    print("=" * 60)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    template = """你是一位专业的 {role}。请用简洁易懂的语言解释 {topic}。"""
    prompt = PromptTemplate.from_template(template)
    
    formatted_prompt = prompt.format(role="软件工程师", topic="大语言模型")
    print("格式化后的 Prompt:")
    print(formatted_prompt)
    print()
    
    response = llm.invoke(formatted_prompt)
    print("LLM 响应:")
    print(response.content)
    print()

def demo_chat_prompt_template():
    print("=" * 60)
    print("3. 使用 ChatPromptTemplate")
    print("=" * 60)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "你是一位友好的助手，用中文回答问题。"),
        ("user", "请解释 {concept}")
    ])
    
    chain = prompt | llm | StrOutputParser()
    
    response = chain.invoke({"concept": "RAG (Retrieval-Augmented Generation)"})
    print("RAG 解释:")
    print(response)
    print()

def demo_llm_chain():
    print("=" * 60)
    print("4. 使用 LLMChain")
    print("=" * 60)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)
    
    template = """
    我想写一个关于 {topic} 的社交媒体帖子。请帮我写一个吸引人的标题和正文。
    
    标题：
    正文：
    """
    
    prompt = PromptTemplate(template=template, input_variables=["topic"])
    chain = LLMChain(llm=llm, prompt=prompt)
    
    result = chain.run(topic="人工智能的未来")
    print("生成的社交媒体帖子:")
    print(result)
    print()

def demo_rag():
    print("=" * 60)
    print("5. RAG (检索增强生成) 示例")
    print("=" * 60)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    embeddings = OpenAIEmbeddings()
    
    with open("knowledge_base.txt", "w", encoding="utf-8") as f:
        f.write("""LangChain 是一个用于构建 LLM 应用的框架。
它提供了一系列工具和组件，帮助开发者轻松创建强大的语言模型应用。

LangChain 的主要特点：
1. 模块化设计：可以轻松组合不同的组件
2. 支持多种 LLM：包括 OpenAI、Anthropic、Google 等
3. 提供链（Chain）功能：可以将多个步骤组合起来
4. 支持向量数据库：用于实现检索增强生成

LangChain 的核心组件包括：
- LLMs：语言模型接口
- Prompts：提示词模板
- Chains：链，用于组合多个组件
- Agents：代理，可以自动选择工具
- Memory：记忆功能，用于保持对话状态
- Document Loaders：文档加载器
- Vector Stores：向量数据库
""")
    
    loader = TextLoader("knowledge_base.txt", encoding="utf-8")
    documents = loader.load()
    
    text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
    texts = text_splitter.split_documents(documents)
    
    db = Chroma.from_documents(texts, embeddings)
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever()
    )
    
    query = "LangChain 的核心组件有哪些？"
    result = qa_chain.run(query)
    print(f"问题: {query}")
    print(f"回答: {result}")
    print()
    
    os.remove("knowledge_base.txt")

if __name__ == "__main__":
    print("LangChain Demo 开始运行...")
    print()
    
    demo_basic_llm_call()
    demo_prompt_template()
    demo_chat_prompt_template()
    demo_llm_chain()
    demo_rag()
    
    print("=" * 60)
    print("所有 Demo 运行完成！")
    print("=" * 60)