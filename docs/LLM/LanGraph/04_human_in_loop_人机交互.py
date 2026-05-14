# 导入必要的模块
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import MemorySaver


# 定义状态类型
class State(TypedDict):
    messages: Annotated[list, add_messages]


# AI思考节点：模拟AI处理用户请求
def think_node(state: State):
    return {"messages": ["AI: 我正在思考如何回答您的问题..."]}


# 人工审核节点：在此处暂停执行，等待人工干预
def human_approval_node(state: State):
    return {"messages": ["系统: 请人工审核这个回答"]}


# 最终回复节点：人工审核通过后执行
def respond_node(state: State):
    return {"messages": ["AI: 好的，这是最终的回答！"]}


# 创建状态图
graph = StateGraph(State)

# 添加各个节点
graph.add_node("think", think_node)
graph.add_node("human_approval", human_approval_node)
graph.add_node("respond", respond_node)

# 定义边的连接
graph.add_edge(START, "think")
graph.add_edge("think", "human_approval")
graph.add_edge("human_approval", "respond")
graph.add_edge("respond", END)

# 创建内存检查点：用于在暂停时保存图的状态
memory = MemorySaver()

# 编译图，并配置中断点
# interrupt_before=["human_approval"]：表示在执行human_approval节点之前暂停
app = graph.compile(checkpointer=memory, interrupt_before=["human_approval"])

# 主程序入口
if __name__ == "__main__":
    # 配置：必须指定thread_id，这样checkpointer才能正确保存和恢复状态
    config = {"configurable": {"thread_id": "1"}}
    
    # 第一轮执行：从START开始，执行到human_approval之前暂停
    print("--- 第一轮执行 (暂停在人工审核前) ---")
    # 传入用户消息和配置
    result = app.invoke({"messages": ["用户: 你好，请帮我写一段代码"]}, config)
    for msg in result["messages"]:
        print(f"- {msg}")
    
    # 此时程序会暂停，等待人工审核或其他操作
    # 在实际应用中，这里可能会有UI交互让人工审核、修改或批准
    
    print("\n--- 人工审核通过，继续执行 ---")
    # 继续执行：传入None作为状态（表示使用checkpoint中保存的状态），保持相同的config
    result = app.invoke(None, config)
    for msg in result["messages"]:
        print(f"- {msg}")
