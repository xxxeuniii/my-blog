# 提示词模板

本教程介绍 LangChain 中的提示词模板功能，包括简单文本模板和对话模板。

## 1. PromptTemplate（简单文本模板）

`PromptTemplate` 用于创建简单的文本提示词模板，可以通过参数动态填充内容。

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate

def main():
    # 加载环境变量
    load_dotenv()
    
    # 创建 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    # 创建简单文本模板
    template = "你是一位{role}，请用简洁的语言解释{topic}。"
    prompt = PromptTemplate.from_template(template)
    
    # 格式化提示词
    formatted_prompt = prompt.format(role="软件工程师", topic="大语言模型")
    print("格式化后的提示词:")
    print(formatted_prompt)
    
    # 调用 LLM
    response = llm.invoke(formatted_prompt)
    print("\nLLM 响应:")
    print(response.content)
```

## 2. ChatPromptTemplate（对话模板）

`ChatPromptTemplate` 用于创建对话式的提示词模板，支持系统消息、用户消息、AI 消息等。

```python
    # 创建对话模板
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", "你是一位友好的助手，用中文回答问题，保持简洁。"),
        ("user", "请解释 {concept}")
    ])
    
    # 链式调用
    chain = chat_prompt | llm
    response = chain.invoke({"concept": "LangChain"})
    print("对话式提示词响应:")
    print(response.content)

if __name__ == "__main__":
    main()
```
