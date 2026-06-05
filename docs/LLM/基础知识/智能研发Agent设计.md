# 智能研发 Agent 设计

> 基于 Agent 架构（LLM + Tool + Memory），结合 MCP（Model Context Protocol）生态，实现工具调用（代码扫描、工程构建、CI/CD 等）与上下文感知能力。

## 一、整体架构

核心思路是**让 LLM 像人类开发者一样，能感知上下文、调用工具、记住历史，自主完成研发任务**。

```
┌──────────────────────────────────────────────────────┐
│                    智能研发 Agent                       │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │
│  │   LLM    │  │  Memory  │  │   Planner/思维链    │  │
│  │ (大脑)   │  │ (记忆)   │  │   (推理规划)       │  │
│  └────┬─────┘  └────┬─────┘  └────────┬───────────┘  │
│       │              │                 │              │
│       └──────────────┼─────────────────┘              │
│                      │                                │
│              ┌───────▼────────┐                       │
│              │   MCP 协议层    │                       │
│              │ (工具调用标准)  │                       │
│              └───────┬────────┘                       │
│                      │                                │
│     ┌────────────────┼────────────────┐               │
│     ▼                ▼                 ▼              │
│ ┌─────────┐   ┌──────────┐   ┌──────────────┐        │
│ │代码扫描  │   │工程构建   │   │  CI/CD      │        │
│ │(ESLint) │   │(npm build)│   │(GitHub Actions)│      │
│ └─────────┘   └──────────┘   └──────────────┘        │
└──────────────────────────────────────────────────────┘
```

---

## 二、三大核心组件

### 2.1 LLM（大脑）— 理解与决策

LLM 接收用户意图，通过 **ReAct（Reasoning + Acting）** 模式循环工作：

```
用户: "帮我修复这个项目的 ESLint 报错"

→ LLM 思考（Reasoning）:
    "我需要先扫描代码，找到 ESLint 报错信息"

→ LLM 行动（Acting）:
    调用 eslint 工具扫描代码

→ LLM 观察（Observing）:
    收到 3 个报错：no-unused-vars, missing-semicolon...

→ LLM 再思考:
    "我需要逐个修复这些问题，然后验证"

→ LLM 再行动:
    修改文件 → 再次扫描 → 确认通过
```

**ReAct 循环的核心代码（LangGraph 实现）：**

```python
def agent_node(state: DevAgentState):
    """LLM 推理节点：分析当前状态，决定下一步行动"""
    messages = state["messages"]
    
    response = llm.bind_tools(dev_tools).invoke(messages)
    
    return {"messages": [response]}

def should_continue(state: DevAgentState):
    """判断是否需要继续调用工具"""
    last_message = state["messages"][-1]
    
    # 如果 LLM 返回了工具调用请求，继续
    if last_message.tool_calls:
        return "tools"
    # 否则结束
    return END
```

### 2.2 Memory（记忆）— 上下文感知的关键

记忆让 Agent 能跨会话保持上下文，是"智能"的核心。分为三个层次：

| 类型 | 作用 | 生命周期 | 示例 |
|------|------|----------|------|
| **短期记忆** | 当前对话上下文 | 单次会话 | 用户刚说的需求、上一步的结果 |
| **长期记忆** | 跨会话持久化 | 永久 | 项目技术栈、历史 Bug 修复记录、编码规范偏好 |
| **工作记忆** | 当前任务的中间结果 | 单次任务 | 工具返回的扫描结果、中间文件内容 |

**LangGraph 中的记忆实现：**

```python
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, MessagesState

# 定义 Agent 状态（包含记忆结构）
class DevAgentState(MessagesState):
    project_context: dict      # 项目上下文（文件结构、技术栈）
    task_history: list         # 已执行的任务记录
    tool_results: dict         # 工具调用结果缓存

# 使用 checkpoint 实现记忆持久化
memory = MemorySaver()
app = graph.compile(checkpointer=memory)

# 通过 thread_id 区分不同会话/项目
config = {"configurable": {"thread_id": "project-123"}}

# 第一次调用
app.invoke({"messages": ["这个项目用的是什么技术栈？"]}, config)
# Agent 扫描项目后记住：React + TypeScript + Vite

# 第二次调用（同一个 thread_id，Agent 有记忆）
app.invoke({"messages": ["帮我加一个新组件"]}, config)
# Agent 直接知道要用 React + TS，不需要重新扫描
```

**长期记忆的向量化存储：**

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

class LongTermMemory:
    """将历史经验向量化存储，支持语义检索"""
    
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.store = Chroma(
            embedding_function=self.embeddings,
            persist_directory="./agent_memory"
        )
    
    def remember(self, task: str, solution: str):
        """记录一次任务经验"""
        self.store.add_texts(
            texts=[f"任务: {task}\n解决方案: {solution}"],
            metadatas=[{"timestamp": datetime.now().isoformat()}]
        )
    
    def recall(self, problem: str, k: int = 3) -> list[str]:
        """语义搜索相似的历史经验"""
        docs = self.store.similarity_search(problem, k=k)
        return [doc.page_content for doc in docs]
```

### 2.3 Tool（工具）— 实际操作能力

每个研发工具需实现统一接口：

```python
from typing import TypedDict, Any
from abc import ABC, abstractmethod

class ToolSchema(TypedDict):
    """工具的参数定义（JSON Schema 格式，供 LLM 理解）"""
    name: str
    description: str
    parameters: dict

class DevTool(ABC):
    """研发工具基类"""
    
    @property
    @abstractmethod
    def schema(self) -> ToolSchema:
        """工具的描述信息，LLM 据此理解工具的用途"""
        pass
    
    @abstractmethod
    async def execute(self, **kwargs) -> dict:
        """执行工具并返回结果"""
        pass
```

---

## 三、MCP（Model Context Protocol）— 工具调用的标准化协议

MCP 是 Anthropic 提出的**开放协议**，定义了 LLM 与外部工具/服务交互的标准。

**类比理解：**
- **USB 协议** → 让各种外设都能接入电脑
- **MCP 协议** → 让各种工具都能接入 LLM

### 3.1 MCP 核心架构

```
┌──────────────────┐
│   MCP Client     │  ← LangChain / LangGraph Agent
│  (Agent 侧)      │     负责发起工具调用请求
└────────┬─────────┘
         │  JSON-RPC 2.0 通信
         │
┌────────▼─────────┐
│   MCP Server     │  ← 工具注册中心
│  (工具侧)        │     负责暴露工具能力
└────────┬─────────┘
         │
    ┌────┴────┬─────────┬──────────┐
    ▼         ▼         ▼          ▼
 ESLint    npm/vite  Git/GitHub  Docker/K8s
 Server    Server    Server      Server
```

**为什么用 MCP 而不是直接调用 API？**

| 对比维度 | 直接 API 调用 | MCP 协议 |
|----------|-------------|----------|
| 标准化 | 每个工具接口不同 | 统一 JSON-RPC 2.0 |
| 工具发现 | 硬编码工具列表 | Server 自动暴露工具列表 |
| 安全控制 | 需要自己实现 | 协议层内置权限控制 |
| 扩展性 | 加工具要改 Agent 代码 | 新增 MCP Server 即可 |
| 生态互通 | 孤岛 | 社区共享 MCP Server |

### 3.2 MCP Server 实现

以 ESLint 代码扫描工具为例：

```python
# eslint_mcp_server.py
from mcp.server import Server
from mcp.types import Tool, TextContent
import subprocess
import json

# 创建 MCP Server
server = Server("eslint-server")

@server.list_tools()
async def list_tools() -> list[Tool]:
    """向 LLM 暴露可用工具列表"""
    return [
        Tool(
            name="scan_code",
            description="扫描项目代码，检测 ESLint 错误和警告",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "要扫描的文件或目录路径"
                    },
                    "fix": {
                        "type": "boolean",
                        "description": "是否自动修复可修复的问题",
                        "default": False
                    }
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="get_rules",
            description="获取当前项目的 ESLint 规则配置",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """执行工具调用"""
    if name == "scan_code":
        path = arguments["path"]
        auto_fix = arguments.get("fix", False)

        cmd = ["npx", "eslint", path, "--format", "json"]
        if auto_fix:
            cmd.append("--fix")

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            return [TextContent(
                type="text",
                text="✅ ESLint 扫描通过，无报错"
            )]

        errors = json.loads(result.stdout)
        output_lines = []
        for file_error in errors:
            for msg in file_error["messages"]:
                severity = "❌ ERROR" if msg["severity"] == 2 else "⚠️ WARNING"
                output_lines.append(
                    f"{severity} | {file_error['filePath']}:{msg['line']}:{msg['column']} "
                    f"[{msg['ruleId']}] {msg['message']}"
                )
        return [TextContent(type="text", text="\n".join(output_lines))]

    elif name == "get_rules":
        result = subprocess.run(
            ["npx", "eslint", "--print-config", "."],
            capture_output=True, text=True
        )
        return [TextContent(type="text", text=result.stdout)]
```

### 3.3 CI/CD MCP Server 示例

```python
# cicd_mcp_server.py
from mcp.server import Server
from mcp.types import Tool, TextContent
import subprocess

server = Server("cicd-server")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="build_project",
            description="构建项目（npm run build），返回构建结果",
            inputSchema={
                "type": "object",
                "properties": {
                    "env": {
                        "type": "string",
                        "enum": ["staging", "production"],
                        "description": "构建环境"
                    }
                }
            }
        ),
        Tool(
            name="deploy",
            description="部署项目到指定环境",
            inputSchema={
                "type": "object",
                "properties": {
                    "target": {
                        "type": "string",
                        "enum": ["staging"],
                        "description": "部署目标环境（安全限制：只允许 staging）"
                    },
                    "version": {
                        "type": "string",
                        "description": "部署版本号"
                    }
                },
                "required": ["target"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "build_project":
        env = arguments.get("env", "staging")
        env_flag = "production" if env == "production" else "staging"

        result = subprocess.run(
            ["npm", "run", "build", "--", "--mode", env_flag],
            capture_output=True, text=True
        )

        if result.returncode == 0:
            return [TextContent(type="text", text=f"✅ 构建成功 ({env})")]
        return [TextContent(
            type="text",
            text=f"❌ 构建失败:\n{result.stderr}"
        )]

    if name == "deploy":
        target = arguments.get("target", "staging")

        # 安全限制：只允许部署 staging
        if target != "staging":
            return [TextContent(
                type="text",
                text="⛔ 安全限制：Agent 只能部署到 staging 环境"
            )]

        result = subprocess.run(
            ["npm", "run", "deploy:staging"],
            capture_output=True, text=True
        )

        if result.returncode == 0:
            return [TextContent(type="text", text=f"✅ 部署 staging 成功")]
        return [TextContent(type="text", text=f"❌ 部署失败:\n{result.stderr}")]
```

### 3.4 MCP Client（Agent 侧）集成

```python
from langchain_mcp import MCPToolkit
from langgraph.prebuilt import ToolNode

# 连接多个 MCP Server，自动发现工具
mcp_toolkit = MCPToolkit(
    servers=[
        {"url": "http://localhost:3001", "name": "eslint"},
        {"url": "http://localhost:3002", "name": "build"},
        {"url": "http://localhost:3003", "name": "cicd"},
        {"url": "http://localhost:3004", "name": "git"},
    ]
)

# 自动获取所有 MCP Server 的工具列表
tools = await mcp_toolkit.get_tools()
# tools = [scan_code, get_rules, build_project, deploy, ...]

# 直接用于 LangGraph Agent
tool_node = ToolNode(tools)
```

---

## 四、完整工作流程

以"修复 Bug 并部署"为例，展示 Agent 如何串联多个工具：

```
Step 1: 用户输入
  "这个项目登录接口报 500 错误，帮我修一下然后部署"

Step 2: LLM 推理（Planner 拆解任务）
  ① 先扫描代码，找到登录相关文件
  ② 分析错误原因
  ③ 修复代码
  ④ 运行测试验证
  ⑤ 构建并部署

Step 3: 工具调用链（通过 MCP）
  → grep_server.search("login")          → 找到 auth/login.ts
  → eslint_server.scan("auth/login.ts")  → 发现 TypeScript 类型错误
  → read_file("auth/login.ts")           → 读取文件内容

Step 4: LLM 分析并修复
  → "第 42 行参数类型不对，userId 应该是 string 但是传了 number"
  → write_file("auth/login.ts", fixed_code)   → 修复代码

Step 5: 验证
  → jest_server.run_test("auth/")        → 3 tests passed
  → typescript_server.check()            → 类型检查通过

Step 6: 构建部署
  → build_server.build()                 → npm run build 成功
  → cicd_server.deploy("staging")        → 部署到 staging 环境
  → "修复完成，已部署到 staging，请验证"

Step 7: Memory 记录
  → 保存到记忆：修复上下文、文件变更、测试结果
  → 下次同类问题可以直接参考历史
```

---

## 五、LangGraph Agent 编排实现

```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI

# 1. 定义状态
class DevAgentState(MessagesState):
    project_info: dict      # 项目元信息
    task_plan: list         # 任务计划
    completed_steps: list   # 已完成步骤

# 2. 初始化 LLM 和工具
llm = ChatOpenAI(model="gpt-4", temperature=0)

dev_tools = [
    ESLintTool(),
    BuildTool(),
    CICDTool(),
    GitTool(),
    FileTool(),
    TestTool(),
]

# 让 LLM 知道有哪些工具可用
llm_with_tools = llm.bind_tools(dev_tools)

# 3. 定义 Agent 推理节点
def agent_node(state: DevAgentState):
    """核心推理节点：分析状态，决定下一步"""
    messages = state["messages"]

    system_prompt = """你是一个专业的研发助手 Agent。
你可以使用以下能力：
- 扫描代码质量（ESLint、TypeScript）
- 读写项目文件
- 运行测试
- 构建和部署项目（仅限 staging）
- Git 操作

在修改代码前，务必先读取文件内容。
在部署前，务必先通过测试。"""

    response = llm_with_tools.invoke(
        [{"role": "system", "content": system_prompt}] + messages
    )

    return {"messages": [response]}

# 4. 构建图
workflow = StateGraph(DevAgentState)

workflow.add_node("agent", agent_node)
workflow.add_node("tools", ToolNode(dev_tools))

workflow.set_entry_point("agent")

# 条件路由：是否需要调用工具？
workflow.add_conditional_edges(
    "agent",
    lambda state: "tools" if state["messages"][-1].tool_calls else END,
    {"tools": "tools", END: END}
)

# 工具执行后，回到 agent 继续推理
workflow.add_edge("tools", "agent")

# 5. 编译（带记忆）
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# 6. 使用
config = {"configurable": {"thread_id": "session-001"}}

# 启动任务
result = app.invoke({
    "messages": ["检查 auth 模块的代码质量并修复问题"]
}, config)

# 后续对话（同 thread_id，有上下文记忆）
result = app.invoke({
    "messages": ["刚才修了哪些文件？顺便部署一下"]
}, config)
# Agent 知道刚才修了 auth/login.ts，直接构建部署
```

---

## 六、HITL（Human-in-the-Loop）人机协作

关键操作需要人工确认，保证安全性：

```python
from langgraph.checkpoint import interrupt

def agent_node(state: DevAgentState):
    messages = state["messages"]
    last_message = messages[-1]

    # 如果是部署操作，中断等待人工确认
    if hasattr(last_message, "tool_calls"):
        for tool_call in last_message.tool_calls:
            if tool_call["name"] == "deploy":
                # 中断！等待人工审批
                user_approval = interrupt(
                    f"Agent 想要执行部署操作：\n"
                    f"目标环境: {tool_call['args'].get('target')}\n"
                    f"是否允许？(yes/no)"
                )
                if user_approval.lower() != "yes":
                    return {"messages": [{
                        "role": "assistant",
                        "content": "部署已被用户取消"
                    }]}

    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}

# 调用时处理中断
config = {"configurable": {"thread_id": "session-001"}}

try:
    result = app.invoke({
        "messages": ["修复 ESLint 报错并部署到 staging"]
    }, config)
except Interrupt as e:
    print(f"等待审批: {e.message}")
    # 用户确认后恢复执行
    app.invoke(Command(resume="yes"), config)
```

---

## 七、关键设计要点

| 要点 | 说明 |
|------|------|
| **工具粒度** | 不能太粗（一个工具做所有事），也不能太细（100 个工具难管理），以"一个研发环节"为单位 |
| **错误处理** | 工具调用失败时，返回结构化错误信息让 LLM 知道发生了什么，Agent 可以自行重试或调整策略 |
| **安全边界** | 限制工具权限，CI/CD 工具只允许部署到 staging，不允许直接操作生产环境 |
| **上下文压缩** | 研发场景上下文很长（代码 + 日志 + 错误），需自动压缩历史，保留关键信息 |
| **HITL** | 关键操作（部署生产、修改核心代码）需要人工确认 |
| **幂等性** | 工具调用可能被重试，需要保证多次调用结果一致 |

---

## 八、对比传统 DevOps 流水线

| 维度 | 传统 CI/CD 流水线 | 智能研发 Agent |
|------|------------------|---------------|
| 触发方式 | 事件驱动（push、PR） | 对话驱动（自然语言） |
| 流程定义 | YAML 配置文件固定流程 | LLM 动态推理决策 |
| 异常处理 | 预设规则，失败即停 | LLM 自行分析、重试、调整 |
| 上下文 | 无上下文记忆 | 跨会话记住项目状态 |
| 交互方式 | 查看日志 | 自然语言对话 |
| 灵活性 | 只执行预设步骤 | 可根据情况灵活调整 |

---

## 九、总结

智能研发 Agent 的核心公式：

```
智能研发 Agent = LLM（大脑）+ MCP（工具协议）+ Memory（记忆）+ HITL（人机协作）
```

- **LLM** 负责理解意图、规划任务、生成代码
- **MCP** 提供标准化的工具调用接口，让 Agent 能真正操作工程环境
- **Memory** 让 Agent 记住项目上下文，越用越智能
- **HITL** 确保关键操作有人把控，安全可控