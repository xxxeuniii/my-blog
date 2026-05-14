from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def main():
    print("=" * 60)
    print("03_chains_链式调用.py")
    print("=" * 60)
    
    # 加载环境变量
    load_dotenv()
    
    # 创建真实的 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    print("1. 使用 LCEL 链式调用")
    print("-" * 40)
    
    # 创建提示词模板
    prompt = ChatPromptTemplate.from_messages([
        ("system", "用简洁的语言回答问题"),
        ("user", "{question}")
    ])
    
    # 创建输出解析器
    output_parser = StrOutputParser()
    
    # 组合成链（使用管道符 |）
    chain = prompt | llm | output_parser
    
    # 调用链
    result = chain.invoke({"question": "什么是 LCEL？"})
    print("问题: 什么是 LCEL？")
    print("回答:", result)
    print()
    
    result2 = chain.invoke({"question": "什么是 AI 人工智能？"})
    print("问题: 什么是 AI 人工智能？")
    print("回答:", result2)


if __name__ == "__main__":
    main()