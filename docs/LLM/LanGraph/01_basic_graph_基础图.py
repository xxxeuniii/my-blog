# 导入必要的模块
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages


# 定义状态类型：使用TypedDict定义图中流转的状态结构
class State(TypedDict):
    # messages字段使用Annotated标注，指定用add_messages函数来处理消息的合并
    messages: Annotated[list, add_messages]


# 定义节点1：接收当前状态，返回更新后的状态
def node1(state: State):
    # 返回一个字典，包含要添加到状态中的消息
    return {"messages": ["Node 1: 这是从节点1发出的消息"]}


# 定义节点2
def node2(state: State):
    return {"messages": ["Node 2: 这是从节点2发出的消息"]}


# 定义节点3
def node3(state: State):
    return {"messages": ["Node 3: 这是从节点3发出的消息"]}


# 创建状态图实例，传入State类型作为状态定义
graph = StateGraph(State)

# 向图中添加节点：第一个参数是节点名称，第二个参数是节点处理函数
graph.add_node("node1", node1)
graph.add_node("node2", node2)
graph.add_node("node3", node3)

# 定义边：连接节点，确定执行顺序
# START是特殊的起始节点，从START连接到node1
graph.add_edge(START, "node1")
# 从node1连接到node2
graph.add_edge("node1", "node2")
# 从node2连接到node3
graph.add_edge("node2", "node3")
# 从node3连接到END特殊节点，表示图执行结束
graph.add_edge("node3", END)

# 编译图：将图结构转换为可执行的应用
app = graph.compile()

# 主程序入口
if __name__ == "__main__":
    # 调用图，传入初始状态（空消息列表）
    result = app.invoke({"messages": []})
    # 打印完整的对话历史
    print("完整对话历史:")
    for msg in result["messages"]:
        print(f"- {msg}")
