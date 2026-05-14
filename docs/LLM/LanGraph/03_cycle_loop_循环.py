# 导入必要的模块
from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages


# 定义状态类型：包含消息列表和计数字段
class State(TypedDict):
    # 消息列表
    messages: Annotated[list, add_messages]
    # 计数器：用于跟踪循环次数
    count: int


# 起始节点：初始化循环
def start_node(state: State):
    # 初始化计数器，并更新消息
    return {
        "messages": [f"开始循环，当前计数: {state.get('count', 0)}"],
        # 设置初始计数（默认为0）
        "count": state.get("count", 0)
    }


# 递增节点：每次执行时将计数器加1
def increment_node(state: State):
    # 计算新的计数值
    new_count = state["count"] + 1
    return {
        "messages": [f"递增中... 新计数: {new_count}"],
        # 更新状态中的计数值
        "count": new_count
    }


# 条件判断节点：决定是否继续循环
def should_continue(state: State) -> Literal["continue", "end"]:
    # 如果计数小于5，继续循环（返回"continue"）
    if state["count"] < 5:
        return "continue"
    # 否则结束循环（返回"end"）
    return "end"


# 结束节点：循环结束后执行
def end_node(state: State):
    return {"messages": [f"循环结束！最终计数: {state['count']}"]}


# 创建状态图
graph = StateGraph(State)

# 添加各个节点
graph.add_node("start", start_node)
graph.add_node("increment", increment_node)
graph.add_node("end", end_node)

# 定义边的连接
# 从START连接到start节点
graph.add_edge(START, "start")
# 从start连接到increment
graph.add_edge("start", "increment")
# 使用条件边，并显式指定映射关系：
# 第一个参数：源节点名称
# 第二个参数：判断函数
# 第三个参数：映射字典，将判断函数的返回值映射到目标节点名称
graph.add_conditional_edges(
    "increment",
    should_continue,
    {
        "continue": "increment",  # 返回"continue"时，连接到increment自身（形成循环）
        "end": "end"           # 返回"end"时，连接到end节点
    }
)
# 从end连接到END
graph.add_edge("end", END)

# 编译图
app = graph.compile()

# 主程序入口
if __name__ == "__main__":
    # 调用图，传入初始状态：空消息列表，count=0
    result = app.invoke({"messages": [], "count": 0})
    print("完整执行过程:")
    # 打印所有消息，可以看到循环执行了5次
    for msg in result["messages"]:
        print(f"- {msg}")
