# 条件分支

本教程介绍如何在 LangGraph 中使用条件分支。

## 1. 定义状态类型

首先定义包含必要字段的状态类型。

```python
from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

# 定义状态类型
class State(TypedDict):
    messages: Annotated[list, add_messages]
    choice: str  # 用于决定走哪个分支
```

## 2. 定义节点和路由函数

定义节点函数和条件路由函数。

```python
# 起始节点
def starter_node(state: State):
    return {"messages": ["开始: 请选择分支 (good/bad)"]}

# 路由节点：根据状态中的 choice 字段决定下一个节点
def route_node(state: State) -> Literal["good_path", "bad_path"]:
    if state.get("choice") == "good":
        return "good_path"
    return "bad_path"

# 好路径节点
def good_path_node(state: State):
    return {"messages": ["好路径: 很高兴您选择了好的路线！"]}

# 坏路径节点
def bad_path_node(state: State):
    return {"messages": ["坏路径: 没关系，下次我们可以做得更好！"]}

# 结束节点
def final_node(state: State):
    return {"messages": ["完成: 所有处理已结束"]}
```

## 3. 创建状态图并连接节点

创建状态图并使用条件边连接节点。

```python
# 创建状态图
graph = StateGraph(State)

# 添加节点
graph.add_node("starter", starter_node)
graph.add_node("good_path", good_path_node)
graph.add_node("bad_path", bad_path_node)
graph.add_node("final", final_node)

# 定义边
graph.add_edge(START, "starter")
# 使用条件边
graph.add_conditional_edges("starter", route_node)
graph.add_edge("good_path", "final")
graph.add_edge("bad_path", "final")
graph.add_edge("final", END)
```

## 4. 编译并运行

编译图并测试不同分支。

```python
# 编译图
app = graph.compile()

if __name__ == "__main__":
    # 测试 good 分支
    print("--- 选择 'good' 路径 ---")
    result1 = app.invoke({"messages": [], "choice": "good"})
    for msg in result1["messages"]:
        print(f"- {msg}")
    
    # 测试 bad 分支
    print("\n--- 选择 'bad' 路径 ---")
    result2 = app.invoke({"messages": [], "choice": "bad"})
    for msg in result2["messages"]:
        print(f"- {msg}")
```
