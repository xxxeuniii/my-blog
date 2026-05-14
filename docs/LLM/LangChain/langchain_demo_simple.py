from typing import List, Dict, Any
from langchain_core.language_models import BaseLLM
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.outputs import LLMResult, Generation
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_core.embeddings import Embeddings
from langchain_classic.chains import RetrievalQA


class MockEmbeddings(Embeddings):
    """
    模拟嵌入模型类，用于演示，不需要下载真实模型
    
    继承自 LangChain 的 Embeddings 基类，实现了嵌入方法
    """
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """
        将文本列表转换为向量嵌入
        
        参数:
            texts: 文本列表
        
        返回:
            向量嵌入列表，每个向量有 384 维
        """
        import random
        return [[random.random() for _ in range(384)] for _ in texts]
    
    def embed_query(self, text: str) -> List[float]:
        """
        将单个查询文本转换为向量嵌入
        
        参数:
            text: 查询文本
        
        返回:
            384 维向量嵌入
        """
        import random
        return [random.random() for _ in range(384)]


class MockLLM(BaseLLM):
    """
    模拟大语言模型类，用于演示，不需要真实的 API 密钥
    
    继承自 LangChain 的 BaseLLM 基类，实现了基本的 invoke 方法
    """
    
    def _generate(self, prompts: List[str], stop: List[str] = None, run_manager=None, **kwargs) -> LLMResult:
        """
        核心生成方法，根据输入的提示词返回模拟的响应
        
        参数:
            prompts: 提示词列表
            stop: 停止词列表（可选）
            run_manager: 运行管理器（可选）
        
        返回:
            LLMResult 对象，包含生成的响应
        """
        generations = []
        for prompt in prompts:
            # 根据提示词内容返回不同的模拟响应
            if "LangChain" in prompt:
                text = "LangChain 是一个用于构建大语言模型应用的开源框架，它提供了各种组件和工具来简化 LLM 应用的开发。"
            elif "RAG" in prompt:
                text = "RAG（Retrieval-Augmented Generation）是一种检索增强生成技术，通过从知识库中检索相关信息来增强生成模型的输出。"
            elif "大语言模型" in prompt:
                text = "大语言模型（LLM）是一种基于深度学习的人工智能模型，可以理解和生成人类语言。"
            elif "人工智能的未来" in prompt:
                text = "标题：人工智能的未来：机遇与挑战\n\n正文：人工智能正在改变我们的生活方式。从自动驾驶到智能助手，AI技术正在各个领域发挥重要作用。未来，AI将更加普及，为人类创造更多价值。"
            elif "核心组件" in prompt:
                text = "LangChain 的核心组件包括：LLMs（语言模型接口）、Prompts（提示词模板）、Chains（链）、Agents（代理）、Memory（记忆功能）、Document Loaders（文档加载器）和 Vector Stores（向量数据库）。"
            else:
                text = f"这是模拟的 LLM 响应。你的问题是：{prompt}"
            
            generation = Generation(text=text)
            generations.append([generation])
        
        return LLMResult(generations=generations)

    @property
    def _llm_type(self) -> str:
        """返回模型类型标识"""
        return "mock"


def demo_basic_llm_call():
    """
    演示1：基础 LLM 调用
    
    最简单的用法：创建 LLM 实例，直接调用 invoke 方法获取响应
    """
    print("=" * 60)
    print("1. 基础 LLM 调用")
    print("=" * 60)
    
    # 创建模拟的 LLM 实例
    llm = MockLLM()
    
    # 调用 LLM，传入问题
    response = llm.invoke("什么是 LangChain？")
    
    # 打印响应结果
    print("LLM 响应:")
    print(response)
    print()


def demo_prompt_template():
    """
    演示2：使用 PromptTemplate（提示词模板）
    
    PromptTemplate 可以帮助我们创建可复用的提示词模板，支持参数化
    """
    print("=" * 60)
    print("2. 使用 PromptTemplate")
    print("=" * 60)
    
    llm = MockLLM()
    
    # 定义提示词模板，使用 {变量名} 的形式作为占位符
    template = """你是一位专业的 {role}。请用简洁易懂的语言解释 {topic}。"""
    prompt = PromptTemplate.from_template(template)
    
    # 使用 format 方法填充模板参数
    formatted_prompt = prompt.format(role="软件工程师", topic="大语言模型")
    print("格式化后的 Prompt:")
    print(formatted_prompt)
    print()
    
    # 将格式化后的提示词传给 LLM
    response = llm.invoke(formatted_prompt)
    print("LLM 响应:")
    print(response)
    print()


def demo_chat_prompt_template():
    """
    演示3：使用 ChatPromptTemplate（对话式提示词模板）
    
    ChatPromptTemplate 支持多轮对话格式，包含 system、user、assistant 等角色
    使用管道符 | 可以方便地组合组件（LCEL 方式）
    """
    print("=" * 60)
    print("3. 使用 ChatPromptTemplate")
    print("=" * 60)
    
    llm = MockLLM()
    
    # 创建对话式提示词模板
    # from_messages 方法接收一个消息列表，每条消息包含角色和内容
    prompt = ChatPromptTemplate.from_messages([
        ("system", "你是一位友好的助手，用中文回答问题。"),  # 系统指令
        ("user", "请解释 {concept}")  # 用户问题，包含参数
    ])
    
    # 使用管道符组合组件：prompt -> llm -> output_parser
    # 这是 LangChain v1.0 推荐的 LCEL（LangChain Expression Language）链式调用方式
    chain = prompt | llm | StrOutputParser()
    
    # 调用链，传入参数
    response = chain.invoke({"concept": "RAG (Retrieval-Augmented Generation)"})
    print("RAG 解释:")
    print(response)
    print()


def demo_lcel_chain():
    """
    演示4：使用 LCEL 链式调用
    
    LCEL (LangChain Expression Language) 是 LangChain v1.0 推荐的方式
    通过管道符 | 连接多个组件，形成处理链
    """
    print("=" * 60)
    print("4. 使用 LCEL 链式调用")
    print("=" * 60)
    
    llm = MockLLM()
    
    # 定义提示词模板
    template = """
    我想写一个关于 {topic} 的社交媒体帖子。请帮我写一个吸引人的标题和正文。
    
    标题：
    正文：
    """
    
    # 创建 PromptTemplate 对象
    prompt = PromptTemplate(template=template, input_variables=["topic"])
    
    # 使用 LCEL 方式组合组件（推荐方式）
    # prompt 格式化输入 -> llm 生成响应 -> StrOutputParser 解析输出
    chain = prompt | llm | StrOutputParser()
    
    # 调用链，传入参数
    result = chain.invoke({"topic": "人工智能的未来"})
    print("生成的社交媒体帖子:")
    print(result)
    print()


def demo_rag():
    """
    演示5：RAG（检索增强生成）示例
    
    RAG 是一种强大的技术，可以让 LLM 基于外部知识库来回答问题
    主要步骤：加载文档 -> 分割文本 -> 创建向量数据库 -> 检索 + 生成
    """
    print("=" * 60)
    print("5. RAG (检索增强生成) 示例")
    print("=" * 60)
    
    llm = MockLLM()
    
    # 创建嵌入模型，用于将文本转换为向量
    # 使用模拟的嵌入模型，避免下载真实模型
    embeddings = MockEmbeddings()
    
    # 创建临时知识库文件
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
    
    # 步骤1：加载文档
    loader = TextLoader("knowledge_base.txt", encoding="utf-8")
    documents = loader.load()
    
    # 步骤2：分割文档为小块
    text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
    texts = text_splitter.split_documents(documents)
    
    # 步骤3：创建向量数据库（使用 Chroma）
    db = Chroma.from_documents(texts, embeddings)
    
    # 步骤4：创建 RAG 链
    # RetrievalQA 会自动从数据库中检索相关文档，并结合 LLM 生成回答
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",  # 将检索到的文档全部放入 prompt 中
        retriever=db.as_retriever()  # 创建检索器
    )
    
    # 步骤5：提问并获取回答
    query = "LangChain 的核心组件有哪些？"
    result = qa_chain.run(query)
    print(f"问题: {query}")
    print(f"回答: {result}")
    print()
    
    # 清理临时文件
    import os
    os.remove("knowledge_base.txt")


if __name__ == "__main__":
    """
    主函数：按顺序运行所有演示
    """
    print("LangChain Demo 开始运行...")
    print()
    
    demo_basic_llm_call()      # 基础 LLM 调用
    demo_prompt_template()     # 提示词模板
    demo_chat_prompt_template()# 对话式提示词模板
    demo_lcel_chain()          # LCEL 链式调用
    demo_rag()                # RAG 检索增强生成
    
    print("=" * 60)
    print("所有 Demo 运行完成！")
    print("=" * 60)