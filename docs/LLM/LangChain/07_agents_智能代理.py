from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.tools import CalculatorTool
from langchain import create_agent

def main():
    print("=" * 60)
    print("07_agents_智能代理.py")
    print("=" * 60)
    
    # 加载环境变量
    load_dotenv()
    
    # 创建真实的 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    print("1. 创建工具")
    print("-" * 40)
    tools = [CalculatorTool()]
    print(f"注册了 {len(tools)} 个工具")
    print(f"工具名称: {tools[0].name}")
    print(f"工具描述: {tools[0].description}")
    print()
    
    print("2. 创建代理")
    print("-" * 40)
    agent = create_agent(llm, tools)
    print("代理创建成功")
    
    print("\n3. 调用代理")
    print("-" * 40)
    result = agent.invoke("计算 100 除以 4 再加上 25")
    print("问题: 计算 100 除以 4 再加上 25")
    print("结果:", result)


if __name__ == "__main__":
    main()