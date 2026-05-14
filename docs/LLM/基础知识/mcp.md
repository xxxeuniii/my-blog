# MCP（Model Context Protocol）

## 什么是 MCP

MCP 是一种用于连接大语言模型与外部工具和服务的协议，它允许模型在生成响应时调用外部资源。

## MCP 的核心概念

### 工具调用
MCP 允许大语言模型调用外部工具来获取信息或执行操作。

### 上下文管理
MCP 负责管理对话上下文，确保模型能够正确理解和响应。

### 安全边界
MCP 提供安全机制，限制模型可以访问的资源和执行的操作。

## MCP 的应用场景

1. **数据查询**：连接数据库或 API 获取实时数据
2. **文件操作**：读取或写入文件系统
3. **代码执行**：执行代码并获取结果
4. **API 调用**：调用外部服务的 API

## MCP 的优势

- **增强能力**：扩展模型的知识和功能
- **实时数据**：访问最新的外部信息
- **安全可控**：提供访问控制和审计功能
- **标准化接口**：统一的工具调用协议

## MCP 与 Agent 的关系

MCP 是 Agent 架构中的关键组件，负责处理工具调用和上下文管理。

```
Agent 架构：
┌─────────────┐
│   LLM 模型   │
└──────┬──────┘
       │ 生成响应
       ▼
┌─────────────┐
│    MCP      │
│ (工具调用)   │
└──────┬──────┘
       │ 调用工具
       ▼
┌─────────────┐
│  外部工具    │
│ (API/DB/文件)│
└─────────────┘
```

## MCP 开发步骤

### 1. 环境搭建

#### 安装依赖
```bash
pip install mcplib  # MCP 核心库
pip install openai  # LLM 支持
pip install requests  # HTTP 请求支持
```

#### 创建项目结构
```
mcp-project/
├── tools/           # 工具目录
│   ├── __init__.py
│   ├── calculator.py
│   └── weather.py
├── config/          # 配置目录
│   └── mcp_config.yaml
└── main.py          # 入口文件
```

### 2. 创建工具类

每个工具需要实现标准接口：

```python
# tools/calculator.py
from mcplib import Tool

class CalculatorTool(Tool):
    name = "calculator"
    description = "用于计算数学表达式"
    parameters = [
        {"name": "expression", "type": "string", "required": True, "description": "数学表达式"}
    ]
    
    def execute(self, **kwargs):
        expression = kwargs.get("expression")
        try:
            result = eval(expression)
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}
```

### 3. 注册工具

```python
# tools/__init__.py
from .calculator import CalculatorTool
from .weather import WeatherTool

# 工具注册表
TOOLS = [
    CalculatorTool(),
    WeatherTool()
]

def get_tool(name):
    for tool in TOOLS:
        if tool.name == name:
            return tool
    return None
```

### 4. 配置 MCP

创建配置文件 `config/mcp_config.yaml`：

```yaml
# MCP 配置
mcp:
  host: localhost
  port: 8080
  timeout: 30
  
# 工具配置
tools:
  - name: calculator
    enabled: true
    description: 数学计算器
  
  - name: weather
    enabled: true
    description: 天气查询
    api_key: YOUR_WEATHER_API_KEY
  
# 安全配置
security:
  allowed_ips:
    - 127.0.0.1
    - 192.168.1.0/24
  rate_limit: 100
```

### 5. 实现 MCP Server

```python
# main.py
from mcplib import MCPServer, ToolRegistry
from tools import TOOLS

# 注册工具
registry = ToolRegistry()
for tool in TOOLS:
    registry.register(tool)

# 创建 MCP Server
server = MCPServer(
    host="localhost",
    port=8080,
    registry=registry
)

# 启动服务
if __name__ == "__main__":
    server.start()
```

### 6. 调用 MCP

#### 使用 HTTP API
```bash
curl -X POST http://localhost:8080/tool/calculator \
  -H "Content-Type: application/json" \
  -d '{"expression": "2 + 3 * 4"}'
```

#### 使用 SDK
```python
from mcplib import MCPclient

client = MCPclient(host="localhost", port=8080)

# 调用计算器工具
result = client.call_tool("calculator", expression="2 + 3 * 4")
print(result)  # {"success": true, "result": 14}
```

### 7. 集成到 LLM

```python
from openai import OpenAI
from mcplib import MCPclient

client = OpenAI()
mcp_client = MCPclient(host="localhost", port=8080)

def chat_with_mcp(prompt):
    # 获取工具列表
    tools = mcp_client.get_tools()
    
    # 构建工具调用提示
    tool_descriptions = "\n".join([
        f"- {tool['name']}: {tool['description']}" 
        for tool in tools
    ])
    
    # 调用 LLM
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "system",
            "content": f"可用工具：\n{tool_descriptions}\n如需调用工具，格式为：<tool_name>(参数)"
        }, {
            "role": "user",
            "content": prompt
        }]
    )
    
    return response.choices[0].message.content
```

### 8. 工具调用流程

```
用户提问 → LLM 分析 → 判断是否需要工具 → 调用 MCP → 执行工具 → 返回结果 → LLM 总结
```

#### 完整流程代码
```python
def process_query(query):
    # 1. LLM 判断是否需要调用工具
    tool_call = analyze_query(query)
    
    if tool_call:
        # 2. 调用 MCP 工具
        result = mcp_client.call_tool(
            tool_call["name"],
            **tool_call["parameters"]
        )
        
        # 3. 将结果返回给 LLM 进行总结
        summary = summarize_result(query, result)
        return summary
    else:
        # 直接回答
        return direct_answer(query)
```

## MCP 开发最佳实践

### 1. 工具设计原则
- **单一职责**：每个工具只做一件事
- **清晰描述**：提供详细的工具描述和参数说明
- **错误处理**：完善的异常处理和错误返回

### 2. 安全考虑
- **输入验证**：对所有输入进行验证和清理
- **权限控制**：限制工具的访问权限
- **审计日志**：记录所有工具调用

### 3. 性能优化
- **异步处理**：支持异步工具调用
- **缓存机制**：缓存常用结果
- **超时控制**：设置合理的超时时间

### 4. 测试策略
```python
import unittest

class TestCalculatorTool(unittest.TestCase):
    def test_addition(self):
        tool = CalculatorTool()
        result = tool.execute(expression="2 + 3")
        self.assertTrue(result["success"])
        self.assertEqual(result["result"], 5)
    
    def test_invalid_expression(self):
        tool = CalculatorTool()
        result = tool.execute(expression="invalid")
        self.assertFalse(result["success"])

if __name__ == "__main__":
    unittest.main()
```

## 总结

MCP 开发主要包括以下步骤：
1. 搭建开发环境
2. 创建工具类（实现 Tool 接口）
3. 注册工具到注册表
4. 配置 MCP Server
5. 启动服务并测试
6. 集成到 LLM 应用

通过标准化的接口和协议，MCP 使得 LLM 能够安全、可靠地调用外部工具，扩展了模型的能力边界。
