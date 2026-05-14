from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

def main():
    print("=" * 60)
    print("01_llms_语言模型.py")
    print("=" * 60)
    
    # 加载环境变量
    load_dotenv()
    
    # 创建真实的 LLM 实例
    llm = ChatOpenAI(
        model="gpt-3.5-turbo",
        temperature=0.7,
        max_tokens=1000
    )
    
    # 调用模型
    print("问题: 什么是大语言模型？")
    response = llm.invoke("什么是大语言模型？")
    print("回答:", response.content)
    print()
    
    print("问题: 什么是 LangChain？")
    response2 = llm.invoke("什么是 LangChain？")
    print("回答:", response2.content)


if __name__ == "__main__":
    main()