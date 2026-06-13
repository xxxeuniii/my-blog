# SEO MCP Server - SEO 内容生成工具

## 项目简介

[SEO MCP Server](https://github.com/xxxeuniii/SEO_MCP) 是一个面向 SEO 内容生产场景的 MCP（Model Context Protocol）服务。它将竞争对手研究、页面内容生成和 Schema.org 结构化数据封装为标准 MCP 工具，让 Claude、Trae 等支持 MCP 的 AI 客户端可以直接调用。

项目目前发布为 npm 包 `@euniii/seo-mcp-server`，通过 stdio 与 MCP 客户端通信。

**核心流程**：

```text
输入 SEO 关键词
    ↓
搜索前 10 名竞争对手页面
    ↓
分析标题、摘要和内容方向
    ↓
生成标题、Meta 描述、Markdown 正文和 FAQPage Schema
```

---

## 技术栈

| 类型 | 技术 |
|------|------|
| 开发语言 | TypeScript |
| 协议 | Model Context Protocol（MCP） |
| MCP SDK | `@modelcontextprotocol/sdk` |
| 通信方式 | stdio |
| 搜索服务 | Serper.dev API |
| HTTP 请求 | Axios |
| 配置管理 | dotenv |
| 包管理与发布 | npm |

---

## 核心工具

### `searchCompetitors`：竞争对手研究

根据关键词调用 Serper.dev 搜索 API，获取 Google 自然搜索结果中的前 10 个竞争对手页面。

**输入参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `keyword` | string | 是 | 需要研究的 SEO 关键词 |

**输出字段**：

| 字段 | 说明 |
|------|------|
| `rank` | 搜索结果排名 |
| `title` | 页面标题 |
| `snippet` | 搜索结果摘要 |
| `url` | 页面链接 |

这个工具适合在正式写作前使用，帮助 AI 客户端了解当前搜索结果覆盖了哪些主题、使用了哪些标题，以及还有哪些内容可以补充。

### `generateSeoPage`：生成 SEO 页面

根据关键词生成一套结构化的 SEO 页面数据。

**输出内容**：

| 字段 | 说明 |
|------|------|
| `title` | 页面标题 |
| `description` | Meta 描述 |
| `markdownContent` | Markdown 格式正文 |
| `schemaData` | Schema.org `FAQPage` 类型的 JSON-LD 数据 |

当前版本使用预设规则和内容模板生成页面骨架，不直接调用大语言模型。真正的内容深度可以由 MCP 客户端结合 `searchCompetitors` 的结果继续补充和改写。

---

## 工作原理

SEO MCP Server 使用 MCP SDK 注册工具列表和工具调用处理器，并通过 stdio 与客户端交换消息。

```text
MCP Client
   │
   ├── ListTools 请求
   │      └── 返回 searchCompetitors、generateSeoPage
   │
   └── CallTool 请求
          ├── searchCompetitors → Serper.dev API → 竞品搜索结果
          └── generateSeoPage → 内容模板 + FAQ Schema → SEO 页面数据
```

服务启动后，客户端先通过 `ListTools` 获取可用工具；当用户提出 SEO 内容需求时，客户端再通过 `CallTool` 调用对应能力。

---

## 安装

通过 npm 安装：

```bash
npm install @euniii/seo-mcp-server
```

也可以克隆源码进行本地开发：

```bash
git clone https://github.com/xxxeuniii/SEO_MCP.git
cd SEO_MCP
npm install
npm run build
npm start
```

常用开发命令：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 使用 `tsx watch` 启动开发模式 |
| `npm run build` | 将 TypeScript 编译到 `dist` |
| `npm start` | 启动编译后的 MCP Server |

---

## 配置 Serper.dev

`generateSeoPage` 不依赖外部 API，使用 `searchCompetitors` 时需要配置 Serper.dev API Key。

1. 在 [Serper.dev](https://serper.dev/) 注册并获取 API Key
2. 将 `.env.example` 复制为 `.env`
3. 填入环境变量：

```dotenv
SERPER_API_KEY=your_serper_api_key_here
```

---

## MCP 客户端配置

在支持 MCP 的客户端中，可以通过 `npx` 启动已发布的 npm 包：

```json
{
  "mcpServers": {
    "seo-mcp": {
      "command": "npx",
      "args": ["-y", "@euniii/seo-mcp-server"],
      "env": {
        "SERPER_API_KEY": "your_serper_api_key_here"
      }
    }
  }
}
```

不同客户端的配置文件位置可能不同，但核心配置都是启动命令、参数和可选的环境变量。

---

## 使用示例

在 AI 客户端中输入：

```text
帮我写一个关于 React Hooks 的 SEO 页面。
先调用 searchCompetitors 分析排名靠前的页面，
再调用 generateSeoPage 生成页面骨架，
最后基于竞品研究结果补充内容并优化结构。
```

推荐的完整工作流：

1. 使用 `searchCompetitors` 获取目标关键词的搜索结果
2. 总结竞品共同覆盖的主题与内容缺口
3. 使用 `generateSeoPage` 生成页面基础结构
4. 让 AI 客户端根据竞品研究扩写和重构正文
5. 检查标题、Meta 描述、关键词密度和 JSON-LD 数据

---

## 项目特点

1. **标准 MCP 接入**：SEO 能力可以被不同的 MCP 客户端复用
2. **搜索与生成解耦**：竞品研究和页面生成可以独立调用，也可以串联使用
3. **结构化输出**：统一返回标题、描述、Markdown 正文和 Schema.org 数据
4. **部署简单**：使用 Node.js 和 stdio，无需单独部署 HTTP 服务
5. **便于扩展**：后续可以继续加入关键词聚类、内容评分、站内链接建议等工具

---

## 当前限制与演进方向

当前版本适合作为 SEO 内容工作流的基础工具，但仍有进一步扩展空间：

- `generateSeoPage` 目前使用固定英文模板，内容需要客户端进一步加工
- FAQ Schema 使用通用问答模板，可根据真实页面内容动态生成
- 竞品研究目前主要使用搜索结果摘要，尚未抓取和分析完整页面
- 可以增加关键词难度、搜索意图、内容评分和内部链接建议
- 可以补充输入校验、自动化测试和更细致的错误处理

---

## 项目链接

- GitHub：[xxxeuniii/SEO_MCP](https://github.com/xxxeuniii/SEO_MCP)
- npm：[@euniii/seo-mcp-server](https://www.npmjs.com/package/@euniii/seo-mcp-server)
- License：MIT
