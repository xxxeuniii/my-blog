# D2C - Design to Code 平台

## 项目简介

D2C 是一个基于 LangChain 多 Agent 架构的自动化代码生成平台，能够将 Figma 设计稿自动转换为可运行的前端代码。

**核心流程**：
```
Figma URL → 5个AI Agent协同工作 → 可运行的前端代码
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 14 + React 18 + TypeScript + Tailwind CSS |
| 后端 | FastAPI (Python) |
| AI 框架 | LangChain (Agent / Tool / Memory / Chain) |
| LLM | DeepSeek-V3 / Qwen2.5-7B (SiliconFlow) |
| Embedding | BGE-M3 (SiliconFlow) |
| 向量数据库 | ChromaDB |

---

## 5 Agent 协同流水线

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Agent 1 │───→│ Agent 2 │───→│ Agent 3 │───→│ Agent 4 │───→│ Agent 5 │
│ 数据清洗 │    │ 结构转换 │    │ 知识检索 │    │ 代码生成 │    │ 测试验证 │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Agent 1: 数据清洗

**职责**：清洗 Figma 原始 JSON，去掉前端渲染不需要的冗余字段

**实现方式**：纯 Python 代码，不使用 LLM

**处理内容**：
- 移除内部 ID、版本号、编辑时间等元数据
- 过滤 `visible: false` 的隐藏图层
- 将 Figma RGBA 颜色转换为 CSS hex/rgba
- 将 Figma 自动布局映射为 Flexbox
- 将阴影效果转换为 CSS box-shadow

### Agent 2: 结构化转换

**职责**：将清洗后的 Figma 数据转换为组件 DSL

**实现方式**：纯 Python 规则引擎，不使用 LLM

**转换规则**：
| Figma 节点 | DSL 输出 |
|-----------|---------|
| FRAME | Container/Page 组件 |
| TEXT | Text/Label 组件 |
| RECTANGLE | Box/Div 组件 |
| COMPONENT/INSTANCE | 对应业务组件 |

### Agent 3: 知识检索

**职责**：从 ChromaDB 知识库检索组件库文档

**实现方式**：直接用 Python 代码操作 ChromaDB，不依赖 LLM

**检索流程**：
1. 解析 DSL，收集所有组件类型
2. 对每个组件类型构造查询
3. 调用 ChromaDB 检索相关文档
4. 将文档附加到 DSL 的 `componentDocs` 字段

### Agent 4: 代码生成

**职责**：根据 DSL + 组件文档生成完整的页面代码

**实现方式**：使用 DeepSeek-V3 LLM 生成代码

**生成规则**：
- 严格按照 DSL 组件结构排列
- 优先使用组件库组件
- 使用 Tailwind CSS 暗色主题
- Vue: template + script + style 完整文件
- React: TSX + TypeScript 类型定义

### Agent 5: 测试验证

**职责**：验证代码质量并自动修复问题

**实现方式**：AST 静态分析 + LLM 深度审查

**检查项目**：
- 括号/标签匹配
- 导入检查
- 安全扫描（XSS 风险）
- 列表渲染 key 属性
- 组件库 API 正确性

---

## 项目结构

```
D2C/
├── apps/
│   ├── web/                    # 前端 (Next.js 14)
│   │   ├── app/(dashboard)/
│   │   │   ├── agent/          # Agent 流水线页面
│   │   │   ├── figma2code/     # Figma 导入页面
│   │   │   └── knowledge/      # 知识库管理页面
│   │   └── components/
│   │       ├── agent/          # Agent 步骤可视化
│   │       └── figma/          # Figma 导入 + 代码预览
│   │
│   ├── server/                 # 后端 (FastAPI)
│   │   ├── agents/             # 5个 Agent 实现
│   │   │   ├── cleaner.py      # Agent 1: 数据清洗
│   │   │   ├── converter.py    # Agent 2: 结构化转换
│   │   │   ├── retriever.py    # Agent 3: 知识检索
│   │   │   ├── generator.py    # Agent 4: 代码生成
│   │   │   ├── validator.py    # Agent 5: 测试验证
│   │   │   └── pipeline.py     # 流水线串联
│   │   ├── routers/            # API 路由
│   │   └── services/           # 基础设施
│   │       ├── chroma.py       # ChromaDB 客户端
│   │       └── llm.py          # LLM 客户端
│   │
│   └── agent/                  # RAG Worker (端口 8081)
│
└── docs/                       # 项目文档
```

---

## 支持的框架和组件库

**框架**：
- React
- Vue 2
- Next.js

**组件库**：
- Element Plus
- Ant Design
- shadcn/ui

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/pipeline/run` | 运行完整 5 Agent 流水线 |
| POST | `/api/agent/run` | 单独运行某个 Agent（调试） |
| POST | `/api/rag/upload` | 上传文档到知识库 |
| POST | `/api/rag/search` | 搜索知识库 |
| GET | `/health` | 服务健康检查 |

---

## 快速开始

1. 注册 [SiliconFlow](https://siliconflow.cn) 获取 API Key
2. 编辑 `apps/server/.env`，填入 Key
3. 双击 `start-all.bat` 启动全部服务
4. 浏览器打开 http://localhost:3000

---

## 核心特点

1. **确定性优先**：非生成任务使用纯算法处理，LLM 仅用于代码生成
2. **契约驱动通信**：所有 Agent 间通信通过结构化 DSL 进行
3. **可观测性**：每次流水线执行都可追踪，包含步骤级粒度
4. **框架无关核心**：流水线引擎与框架无关，框架特定逻辑隔离在代码生成层
5. **故障安全设计**：单个 Agent 失败被隔离，流水线继续执行

---

## 项目位置

本地路径：`E:\interview\D2C`