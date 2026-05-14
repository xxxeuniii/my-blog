# 导入必要的模块
from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages


# 定义状态类型：包含消息列表和选择字段
class State(TypedDict):
    # 消息列表，使用add_messages函数处理合并
    messages: Annotated[list, add_messages]
    # 选择字段：用于决定走哪个分支
    choice: str


# 起始节点：提示用户选择分支
def starter_node(state: State):
    return {"messages": ["开始: 请选择分支 (good/bad)"]}


# 路由节点：根据状态中的choice字段决定下一个节点
# 返回值必须是Literal类型，明确指定可能的下一个节点名称
def route_node(state: State) -> Literal["good_path", "bad_path"]:
    # 如果choice是"good"，走good_path分支
    if state.get("choice") == "good":
        return "good_path"
    # 否则走bad_path分支
    return "bad_path"


# 好路径节点：处理good分支的逻辑
def good_path_node(state: State):
    return {"messages": ["好路径: 很高兴您选择了好的路线！"]}


# 坏路径节点：处理bad分支的逻辑
def bad_path_node(state: State):
    return {"messages": ["坏路径: 没关系，下次我们可以做得更好！"]}


# 结束节点：两个分支汇合后执行的最终节点
def final_node(state: State):
    return {"messages": ["完成: 所有处理已结束"]}


# 创建状态图
graph = StateGraph(State)

# 添加各个节点
graph.add_node("starter", starter_node)
graph.add_node("good_path", good_path_node)
graph.add_node("bad_path", bad_path_node)
graph.add_node("final", final_node)

# 定义边的连接
# 从START连接到starter节点
graph.add_edge(START, "starter")
# 使用条件边：从starter节点根据route_node的返回值选择下一个节点
# add_conditional_edges会自动根据返回值匹配对应名称的节点
graph.add_conditional_edges("starter", route_node)
# 从good_path连接到final
graph.add_edge("good_path", "final")
# 从bad_path连接到final
graph.add_edge("bad_path", "final")
# 从final连接到END
graph.add_edge("final", END)

# 编译图
app = graph.compile()

# 主程序入口
if __name__ == "__main__":
    # 测试good分支
    print("--- 选择 'good' 路径 ---")
    result1 = app.invoke({"messages": [], "choice": "good"})
    for msg in result1["messages"]:
        print(f"- {msg}")

    # 测试bad分支
    print("\n--- 选择 'bad' 路径 ---")
    result2 = app.invoke({"messages": [], "choice": "bad"})
    for msg in result2["messages"]:
        print(f"- {msg}")
