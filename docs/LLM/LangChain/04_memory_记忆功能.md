# 记忆功能

本教程介绍 LangChain 中的记忆功能，特别是 `ConversationBufferMemory` 的使用。

## 使用 ConversationBufferMemory

`ConversationBufferMemory` 可以保存对话历史，让 LLM 能够记住之前的对话内容。

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains.conversation.base import ConversationChain

def main():
    # 加载环境变量
    load_dotenv()
    
    # 创建 LLM
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    # 创建记忆对象
    memory = ConversationBufferMemory()
    
    # 创建对话链（带记忆）
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=False
    )
    
    # 第一轮对话
    print("用户: 你好，我叫小明")
    response = conversation.run("你好，我叫小明")
    print("助手:", response)
    
    # 第二轮对话（测试记忆）
    print("\n用户: 我刚才告诉你我叫什么名字？")
    response = conversation.run("我刚才告诉你我叫什么名字？")
    print("助手:", response)
    
    # 查看记忆内容
    print("\n记忆内容:")
    print(memory.load_memory_variables({}))

if __name__ == "__main__":
    main()
```
