# 智能代理

本教程介绍 LangChain 中的智能代理功能。

## 1. 创建工具

首先创建代理可以使用的工具。

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.tools import CalculatorTool
from langchain import create_agent

def main():
    # 加载环境变量
    load_dotenv()
    
    # 创建 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    # 创建工具
    tools = [CalculatorTool()]
    print(f"注册了 {len(tools)} 个工具")
    print(f"工具名称: {tools[0].name}")
    print(f"工具描述: {tools[0].description}")
```

## 2. 创建代理

使用工具和 LLM 创建代理。

```python
    # 创建代理
    agent = create_agent(llm, tools)
    print("\n代理创建成功")
```

## 3. 调用代理

调用代理来解决问题。

```python
    # 调用代理
    result = agent.invoke("计算 100 除以 4 再加上 25")
    print("\n问题: 计算 100 除以 4 再加上 25")
    print("结果:", result)

if __name__ == "__main__":
    main()
```
