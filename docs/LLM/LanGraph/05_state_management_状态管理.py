# 导入必要的模块
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END


# 定义状态类型：展示多个字段，每个节点只更新自己负责的部分
class State(TypedDict):
    # 用户原始输入
    user_input: str
    # 处理后的输入
    processed: str
    # 验证结果
    validated: bool
    # 最终输出
    final_output: str


# 处理节点：将用户输入转换为大写
def process_node(state: State):
    # 从状态中获取user_input，转换为大写
    processed = state["user_input"].upper()
    # 只返回要更新的字段：processed
    # LangGraph会自动将返回值合并到状态中
    return {"processed": processed}


# 验证节点：检查处理后的字符串长度是否大于5
def validate_node(state: State):
    # 从状态中获取processed，检查长度
    validated = len(state["processed"]) > 5
    # 更新validated字段
    return {"validated": validated}


# 生成输出节点：根据验证结果生成最终输出
def generate_output_node(state: State):
    # 根据validated字段决定输出内容
    if state["validated"]:
        output = f"成功！处理结果: {state['processed']}"
    else:
        output = "失败：输入太短了"
    # 更新final_output字段
    return {"final_output": output}


# 创建状态图
graph = StateGraph(State)

# 添加各个节点
graph.add_node("process", process_node)
graph.add_node("validate", validate_node)
graph.add_node("generate_output", generate_output_node)

# 定义边的连接：形成一个处理流水线
graph.add_edge(START, "process")
graph.add_edge("process", "validate")
graph.add_edge("validate", "generate_output")
graph.add_edge("generate_output", END)

# 编译图
app = graph.compile()

# 主程序入口
if __name__ == "__main__":
    # 测试用例1：输入较长的字符串
    print("--- 测试输入: 'hello world' ---")
    # 传入完整的初始状态
    result1 = app.invoke({
        "user_input": "hello world",
        "processed": "",
        "validated": False,
        "final_output": ""
    })
    # 查看最终输出
    print(f"最终输出: {result1['final_output']}")
    # 查看完整状态，可以看到每个字段都被相应的节点更新了
    print(f"完整状态: {result1}")

    # 测试用例2：输入较短的字符串
    print("\n--- 测试输入: 'hi' ---")
    result2 = app.invoke({
        "user_input": "hi",
        "processed": "",
        "validated": False,
        "final_output": ""
    })
    print(f"最终输出: {result2['final_output']}")
