# 基础图

本教程介绍如何使用 LangGraph 创建一个基础的状态图。

## 1. 定义状态类型

首先，使用 `TypedDict` 定义图中流转的状态结构。

```python
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

# 定义状态类型
class State(TypedDict):
    # messages 字段使用 Annotated 标注，指定用 add_messages 函数来处理消息的合并
    messages: Annotated[list, add_messages]
```

## 2. 定义节点

定义图中的节点函数。

```python
# 定义节点 1
def node1(state: State):
    return {"messages": ["Node 1: 这是从节点 1 发出的消息"]}

# 定义节点 2
def node2(state: State):
    return {"messages": ["Node 2: 这是从节点 2 发出的消息"]}

# 定义节点 3
def node3(state: State):
    return {"messages": ["Node 3: 这是从节点 3 发出的消息"]}
```

## 3. 创建状态图

创建 `StateGraph` 实例并添加节点。

```python
# 创建状态图实例
graph = StateGraph(State)

# 添加节点
graph.add_node("node1", node1)
graph.add_node("node2", node2)
graph.add_node("node3", node3)
```

## 4. 定义边

定义节点之间的连接关系（边）。

```python
# 定义边
# START 是特殊的起始节点
graph.add_edge(START, "node1")
graph.add_edge("node1", "node2")
graph.add_edge("node2", "node3")
graph.add_edge("node3", END)
```

## 5. 编译并运行

编译图并运行。

```python
# 编译图
app = graph.compile()

if __name__ == "__main__":
    # 调用图
    result = app.invoke({"messages": []})
    # 打印完整的对话历史
    print("完整对话历史:")
    for msg in result["messages"]:
        print(f"- {msg}")
```
