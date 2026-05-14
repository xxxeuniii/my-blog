from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate

def main():
    print("=" * 60)
    print("02_prompts_提示词模板.py")
    print("=" * 60)
    
    # 加载环境变量
    load_dotenv()
    
    # 创建真实的 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    print("1. PromptTemplate（简单文本模板）")
    print("-" * 40)
    template = "你是一位{role}，请用简洁的语言解释{topic}。"
    prompt = PromptTemplate.from_template(template)
    
    formatted_prompt = prompt.format(role="软件工程师", topic="大语言模型")
    print("格式化后的提示词:")
    print(formatted_prompt)
    
    response = llm.invoke(formatted_prompt)
    print("\nLLM 响应:")
    print(response.content)
    print()
    
    print("2. ChatPromptTemplate（对话模板）")
    print("-" * 40)
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", "你是一位友好的助手，用中文回答问题，保持简洁。"),
        ("user", "请解释 {concept}")
    ])
    
    chain = chat_prompt | llm
    response = chain.invoke({"concept": "LangChain"})
    print("对话式提示词响应:")
    print(response.content)


if __name__ == "__main__":
    main()