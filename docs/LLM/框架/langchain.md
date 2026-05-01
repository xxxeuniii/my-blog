# LangChain

## 什么是 LangChain

LangChain 是一个用于构建 LLM 应用的框架，提供了一套工具和组件来简化复杂应用的开发。

## LangChain 的核心组件

### Chains

将多个组件组合在一起形成工作流。

```python
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

prompt = PromptTemplate(
    input_variables=["question"],
    template="回答问题: {question}"
)

chain = LLMChain(llm=llm, prompt=prompt)
result = chain.run("什么是 LangChain?")
```

### Agents

让模型根据上下文决定调用哪些工具。

```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

tools = [
    Tool(
        name="计算器",
        func=lambda x: eval(x),
        description="用于计算数学表达式"
    )
]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description")
result = agent.run("计算 2 + 3 * 4")
```

### Memory

管理对话历史和上下文。

```python
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
conversation = ConversationChain(llm=llm, memory=memory)
response = conversation.predict(input="你好")
```

### Document Loaders

加载和处理各种格式的文档。

```python
from langchain.document_loaders import TextLoader

loader = TextLoader("document.txt")
documents = loader.load()
```

### Embeddings

生成文本的向量表示。

```python
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vector = embeddings.embed_text("Hello, World!")
```

## LangChain 的应用场景

1. **聊天机器人**：构建智能对话系统
2. **文档问答**：基于文档内容回答问题
3. **代码分析**：分析和生成代码
4. **数据处理**：处理和分析数据

## LangChain 的优势

- **模块化设计**：组件可以灵活组合
- **丰富的工具集成**：支持多种 LLM 和工具
- **社区活跃**：有大量的文档和教程
- **多语言支持**：支持 Python 和 JavaScript
