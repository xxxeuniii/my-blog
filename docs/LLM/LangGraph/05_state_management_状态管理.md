# 状态管理

本教程介绍 LangGraph 中的状态管理，展示多个字段的使用方法。

## 1. 定义状态类型

首先定义包含多个字段的状态类型。

```python
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END

# 定义状态类型
class State(TypedDict):
    user_input: str      # 用户原始输入
    processed: str       # 处理后的输入
    validated: bool      # 验证结果
    final_output: str    # 最终输出
```

## 2. 定义节点

定义节点函数，每个节点只更新自己负责的字段。

```python
# 处理节点：将用户输入转换为大写
def process_node(state: State):
    processed = state["user_input"].upper()
    # 只返回要更新的字段
    return {"processed": processed}

# 验证节点：检查处理后的字符串长度是否大于 5
def validate_node(state: State):
    validated = len(state["processed"]) > 5
    return {"validated": validated}

# 生成输出节点：根据验证结果生成最终输出
def generate_output_node(state: State):
    if state["validated"]:
        output = f"成功！处理结果: {state['processed']}"
    else:
        output = "失败：输入太短了"
    return {"final_output": output}
```

## 3. 创建状态图并连接节点

创建状态图并连接节点形成处理流水线。

```python
# 创建状态图
graph = StateGraph(State)

# 添加节点
graph.add_node("process", process_node)
graph.add_node("validate", validate_node)
graph.add_node("generate_output", generate_output_node)

# 定义边
graph.add_edge(START, "process")
graph.add_edge("process", "validate")
graph.add_edge("validate", "generate_output")
graph.add_edge("generate_output", END)
```

## 4. 编译并运行

编译图并测试不同输入。

```python
# 编译图
app = graph.compile()

if __name__ == "__main__":
    # 测试输入：较长的字符串
    print("--- 测试输入: 'hello world' ---")
    result1 = app.invoke({
        "user_input": "hello world",
        "processed": "",
        "validated": False,
        "final_output": ""
    })
    print(f"最终输出: {result1['final_output']}")
    print(f"完整状态: {result1}")
    
    # 测试输入：较短的字符串
    print("\n--- 测试输入: 'hi' ---")
    result2 = app.invoke({
        "user_input": "hi",
        "processed": "",
        "validated": False,
        "final_output": ""
    })
    print(f"最终输出: {result2['final_output']}")
```
