# 人机交互

本教程介绍如何在 LangGraph 中实现人机交互（Human-in-the-loop）。

## 1. 定义状态类型

首先定义状态类型。

```python
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver

# 定义状态类型
class State(TypedDict):
    messages: Annotated[list, add_messages]
```

## 2. 定义节点

定义节点函数。

```python
# AI 思考节点
def think_node(state: State):
    return {"messages": ["AI: 我正在思考如何回答您的问题..."]}

# 人工审核节点
def human_approval_node(state: State):
    return {"messages": ["系统: 请人工审核这个回答"]}

# 最终回复节点
def respond_node(state: State):
    return {"messages": ["AI: 好的，这是最终的回答！"]}
```

## 3. 创建状态图并配置中断点

创建状态图并配置中断点，以及内存检查点。

```python
# 创建状态图
graph = StateGraph(State)

# 添加节点
graph.add_node("think", think_node)
graph.add_node("human_approval", human_approval_node)
graph.add_node("respond", respond_node)

# 定义边
graph.add_edge(START, "think")
graph.add_edge("think", "human_approval")
graph.add_edge("human_approval", "respond")
graph.add_edge("respond", END)

# 创建内存检查点
memory = MemorySaver()

# 编译图，并配置中断点
app = graph.compile(checkpointer=memory, interrupt_before=["human_approval"])
```

## 4. 运行并测试

运行图，测试暂停和继续执行。

```python
if __name__ == "__main__":
    # 配置：必须指定 thread_id
    config = {"configurable": {"thread_id": "1"}}
    
    # 第一轮执行：暂停在人工审核前
    print("--- 第一轮执行 (暂停在人工审核前) ---")
    result = app.invoke({"messages": ["用户: 你好，请帮我写一段代码"]}, config)
    for msg in result["messages"]:
        print(f"- {msg}")
    
    print("\n--- 人工审核通过，继续执行 ---")
    # 继续执行
    result = app.invoke(None, config)
    for msg in result["messages"]:
        print(f"- {msg}")
```
