# 循环

本教程介绍如何在 LangGraph 中实现循环。

## 1. 定义状态类型

首先定义包含计数器的状态类型。

```python
from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

# 定义状态类型
class State(TypedDict):
    messages: Annotated[list, add_messages]
    count: int  # 用于跟踪循环次数
```

## 2. 定义节点和路由函数

定义节点函数和条件路由函数。

```python
# 起始节点
def start_node(state: State):
    return {
        "messages": [f"开始循环，当前计数: {state.get('count', 0)}"],
        "count": state.get("count", 0)
    }

# 递增节点
def increment_node(state: State):
    new_count = state["count"] + 1
    return {
        "messages": [f"递增中... 新计数: {new_count}"],
        "count": new_count
    }

# 条件判断节点
def should_continue(state: State) -> Literal["continue", "end"]:
    if state["count"] < 5:
        return "continue"
    return "end"

# 结束节点
def end_node(state: State):
    return {"messages": [f"循环结束！最终计数: {state['count']}"]}
```

## 3. 创建状态图并连接节点

创建状态图，使用条件边和映射实现循环。

```python
# 创建状态图
graph = StateGraph(State)

# 添加节点
graph.add_node("start", start_node)
graph.add_node("increment", increment_node)
graph.add_node("end", end_node)

# 定义边
graph.add_edge(START, "start")
graph.add_edge("start", "increment")
# 使用条件边并显式指定映射
graph.add_conditional_edges(
    "increment",
    should_continue,
    {
        "continue": "increment",  # 循环回到自身
        "end": "end"
    }
)
graph.add_edge("end", END)
```

## 4. 编译并运行

编译图并运行。

```python
# 编译图
app = graph.compile()

if __name__ == "__main__":
    result = app.invoke({"messages": [], "count": 0})
    print("完整执行过程:")
    for msg in result["messages"]:
        print(f"- {msg}")
```
