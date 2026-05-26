# Figma 转 UI 前端代码 VSCode 插件研发

## 项目概述

将 Figma 设计文件转换为可用的前端代码（React/Vue/HTML），利用大模型和 AST 技术实现智能化转换。

---

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                    VSCode 插件层                             │
│  - 拦截设计文件拖拽                                          │
│  - 调用转换逻辑                                              │
│  - 生成代码文件                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    核心转换逻辑                               │
│  1. 解析 Figma JSON → AST                                    │
│  2. 大模型语义理解与增强                                      │
│  3. AST → 代码模板                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    代码生成层                                │
│  - React/Vue 组件生成                                        │
│  - 样式注入                                                  │
│  - 文件输出                                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 核心技术栈

### 1. Figma API

```javascript
// 使用 Figma Plugin API 或 Figma REST API
import { FigmaAPI } from 'figma-api'

const figma = new FigmaAPI({ personalAccessToken: '...' })

// 获取节点
async function getNode(nodeId) {
  return await figma.nodes.getNode(nodeId)
}

// 获取节点内容
async function getRawNode(nodeId) {
  const node = await getNode(nodeId)
  return {
    name: node.name,
    type: node.type,
    absoluteBoundingBox: node.absoluteBoundingBox,
    styles: node.styles,
    children: node.children
  }
}
```

---

### 2. AST（抽象语法树）

#### Figma 节点结构 → AST

```javascript
// Figma 节点结构
{
  type: 'FRAME',
  name: 'Login Button',
  absoluteBoundingBox: { x: 0, y: 0, width: 200, height: 50 },
  fills: [{ type: 'SOLID', color: { r: 0.5, g: 0.7, b: 0.9 } }],
  children: [
    {
      type: 'RECTANGLE',
      name: 'Text',
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  ]
}

// 转换为 AST
const ast = {
  type: 'component',
  tagName: 'Button',
  attributes: {
    width: 200,
    height: 50,
    style: {
      backgroundColor: '#80A6EA',
      borderRadius: 8
    }
  },
  children: [
    {
      type: 'text',
      content: 'Login Button'
    }
  ]
}
```

#### AST 生成代码

```javascript
// AST → React 代码
function generateReactCode(ast) {
  const { tagName, attributes, children } = ast

  const props = Object.entries(attributes)
    .map(([key, value]) => `${camelCase(key)}={${formatValue(value)}}`)
    .join(' ')

  const childrenCode = children.map(child => generateReactCode(child)).join('\n  ')

  return `<${tagName} ${props}>\n  ${childrenCode}\n</${tagName}>`
}

// AST → Vue 代码
function generateVueCode(ast) {
  const { tagName, attributes, children } = ast

  const props = Object.entries(attributes)
    .map(([key, value]) => `${camelCase(key)}="${formatValue(value)}"`)
    .join(' ')

  const childrenCode = children.map(child => generateVueCode(child)).join('\n    ')

  return `<${tagName} ${props}>\n    ${childrenCode}\n  </${tagName}>`
}
```

---

### 3. 大模型集成

#### 使用 OpenAI API

```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Figma 节点 → React 代码
async function convertWithLLM(figmaNode) {
  const prompt = `
将以下 Figma 节点转换为 React 组件代码：

${JSON.stringify(figmaNode, null, 2)}

要求：
1. 使用 Tailwind CSS
2. 保持设计一致
3. 返回 JSX 格式代码
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: '你是一个 UI 代码生成专家，擅长将设计稿转换为前端代码。'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2000
  })

  return response.choices[0].message.content
}
```

#### 上下文增强

```javascript
// 提供设计规范上下文
async function generateWithContext(node, designSystem) {
  const systemPrompt = `
你是一个专业的 UI 开发工程师。

设计规范：
${JSON.stringify(designSystem)}

转换要求：
1. 使用设计系统中的颜色和间距
2. 保持一致的圆角和阴影
3. 确保响应式设计
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `转换为代码：\n${JSON.stringify(node)}` }
    ],
    temperature: 0.2
  })

  return response.choices[0].message.content
}
```

#### 减少 Token 消耗

```javascript
// 节点压缩
function compressNode(node) {
  return {
    type: node.type,
    name: node.name,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    fills: node.fills?.map(f => ({
      type: f.type,
      color: [Math.round(f.color.r * 255), Math.round(f.color.g * 255), Math.round(f.color.b * 255)]
    }))
  }
}

// 分块处理
async function processLargeCanvas(nodes) {
  const chunks = []
  const chunkSize = 20

  for (let i = 0; i < nodes.length; i += chunkSize) {
    chunks.push(nodes.slice(i, i + chunkSize))
  }

  const results = []
  for (const chunk of chunks) {
    const code = await convertWithLLM(chunk)
    results.push(code)
  }

  return results.join('\n')
}
```

---

### 4. VSCode 插件开发

#### 1. 创建插件项目

```bash
npm init -y
npm install vsce
npm install @types/node
npm install openai
npm install @figma/plugin-typings
```

#### 2. 配置 package.json

```json
{
  "name": "figma-to-code",
  "version": "1.0.0",
  "publisher": "yourname",
  "main": "extension.js",
  "contributes": {
    "commands": [
      {
        "command": "figmaToCode.convert",
        "title": "Figma 转 React 代码"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "when": "resourceExtname == .fig",
          "command": "figmaToCode.convert",
          "group": "navigation@1"
        }
      ]
    }
  }
}
```

#### 3. 拦截文件拖拽

```javascript
import * as vscode from 'vscode'
import { FileProvider } from './FileProvider'

export function activate(context) {
  // 注册文件提供者
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider('figma-to-code', new FileProvider())
  )

  // 注册命令
  context.subscriptions.push(
    vscode.commands.registerCommand('figmaToCode.convert', async () => {
      await convertFigmaToCode()
    })
  )
}

// 拖拽文件处理
async function handleDrop(uri) {
  const content = await vscode.workspace.fs.readFile(uri)
  const figmaJSON = content.toString()

  // 转换为代码
  const reactCode = await convertFigmaToReact(figmaJSON)

  // 显示预览
  const previewUri = vscode.Uri.parse(`figma-to-code://preview/${uri.fsName}`)
  await vscode.workspace.openTextDocument(previewUri)
}
```

#### 4. 转换主逻辑

```javascript
import { convertWithLLM } from './converters'
import { generateReactCode } from './generators'

export async function convertFigmaToReact(figmaJSON) {
  // 1. 解析 Ffigma JSON
  const ast = parseFigmaToAST(figmaJSON)

  // 2. 大模型增强
  const enhancedAst = await enhanceWithLLM(ast)

  // 3. 生成代码
  const reactCode = generateReactCode(enhancedAst)

  return reactCode
}
```

#### 5. 生成文件

```javascript
import * as vscode from 'vscode'

export async function generateFile(ast, format = 'react') {
  let code = ''

  if (format === 'react') {
    code = generateReactCode(ast)
  } else if (format === 'vue') {
    code = generateVueCode(ast)
  }

  // 创建临时文件
  const fileName = `${ast.tagName}.tsx`
  const uri = vscode.Uri.parse(`untitled:${fileName}`)

  // 写入文件
  const document = await vscode.workspace.openTextDocument(uri)
  const edit = new vscode.WorkspaceEdit()
  edit.insert(uri, new vscode.Position(0, 0), code)
  await vscode.workspace.applyEdit(edit)
  await vscode.workspace.openTextDocument(uri)
}
```

---

## 工作流程

### 1. 解析阶段

```
Figma JSON
    ↓
解析为 AST
    ↓
节点分组与分类
    ↓
属性提取
```

```javascript
function parseFigmaToAST(figmaJSON) {
  const root = JSON.parse(figmaJSON)

  return {
    type: 'component',
    children: parseNode(root)
  }
}

function parseNode(node) {
  // Frame → Component
  // Rectangle → Div / Div
  // Text → Text
  // Image → Image

  switch (node.type) {
    case 'FRAME':
      return {
        type: 'component',
        tagName: componentize(node.name),
        attributes: extractAttributes(node),
        children: node.children?.map(parseNode)
      }

    case 'RECTANGLE':
      return {
        type: 'element',
        tagName: 'div',
        attributes: extractAttributes(node)
      }

    case 'TEXT':
      return {
        type: 'text',
        content: node.characters
      }

    default:
      return null
  }
}
```

### 2. 大模型处理阶段

```
AST 节点
    ↓
提取关键信息（位置、样式、文本）
    ↓
构建 Prompt
    ↓
调用 LLM
    ↓
解析 LLM 响应
```

```javascript
async function enhanceWithLLM(ast) {
  const nodes = flattenAST(ast)

  for (const node of nodes) {
    // 跳过简单节点
    if (node.type === 'text' || node.type === 'simple-element') {
      continue
    }

    // 构建上下文
    const context = {
      nodeName: node.tagName,
      style: node.attributes.style,
      parentStyle: getParentStyle(node),
      designTokens: getDesignTokens(node)
    }

    // 调用 LLM 优化
    const optimized = await optimizeNodeWithLLM(node, context)

    // 合并优化结果
    node.attributes = { ...node.attributes, ...optimized }
  }

  return ast
}

async function optimizeNodeWithLLM(node, context) {
  const prompt = `
根据设计规范，优化以下组件：

组件名称：${context.nodeName}
当前样式：${JSON.stringify(context.style)}
父组件样式：${JSON.stringify(context.parentStyle)}
设计规范：${JSON.stringify(context.designTokens)}

要求：
1. 使用设计规范中的颜色和间距
2. 优化性能（避免重复计算）
3. 添加必要的注释
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: '你是一个 UI 代码优化专家。' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2
  })

  return JSON.parse(response.choices[0].message.content)
}
```

### 3. 代码生成阶段

```
AST
    ↓
代码模板匹配
    ↓
填充模板
    ↓
代码格式化
```

```javascript
function generateReactCode(ast) {
  const template = `
import React from 'react'
import './styles.css'

${componentDeclaration(ast)}

function ${ast.tagName}() {
  return (
    ${jsxElement(ast)}
  )
}

export default ${ast.tagName}
  `

  return template
}

function componentDeclaration(ast) {
  // 根据 AST 结构生成组件声明
  if (ast.isFunctional) {
    return `const ${ast.tagName} = () => {`
  }
  return `function ${ast.tagName}() {`
}

function jsxElement(ast) {
  const { tagName, attributes, children } = ast

  const props = Object.entries(attributes)
    .map(([key, value]) => {
      if (key.startsWith('style') || key === 'className') {
        return `${camelCase(key)}={${formatValue(value)}}`
      }
      return `${camelCase(key)}={${formatValue(value)}}`
    })
    .join(' ')

  const childrenCode = children.map(child => jsxCode(child)).join('\n    ')

  return `<${tagName} ${props}>\n    ${childrenCode}\n  </${tagName}>`
}

function jsxCode(node) {
  switch (node.type) {
    case 'text':
      return node.content
    case 'element':
      return jsxElement(node)
    case 'component':
      return `${node.tagName} {...${node.attributes}}`
    default:
      return ''
  }
}
```

---

## 优化策略

### 1. 提示工程优化

```javascript
const SYSTEM_PROMPT = `
你是一个 Figma 到前端代码的转换专家。

转换规则：
1. 颜色转换：Figma 颜色 → CSS 颜色
   - #FFFFFF, #000000, #80A6EA (Tailwind 类)

2. 间距转换：
   - 8px 网格 → Tailwind spacing

3. 字体转换：
   - 14px → text-sm
   - 16px → text-base

4. 圆角转换：
   - 4px → rounded
   - 8px → rounded-lg

5. 阴影转换：
   - 0 2px 4px rgba(0,0,0,0.1) → shadow-sm

严格遵循设计规范，不要添加额外样式。
`

const USER_PROMPT = `
将以下 Figma 节点转换为 React + Tailwind CSS 代码：

节点：${JSON.stringify(node, null, 2)}

要求：
- 返回纯 JSX 代码
- 使用 Tailwind CSS 类名
- 不包含样式文件
`
```

### 2. AST 优化

```javascript
// 节点去重
function removeDuplicateNodes(ast) {
  const seen = new Set()

  function process(node) {
    if (!node) return null

    const key = `${node.type}-${node.tagName}-${JSON.stringify(node.attributes).slice(0, 100)}`

    if (seen.has(key)) {
      return null
    }
    seen.add(key)

    return {
      ...node,
      children: node.children?.map(process)
    }
  }

  return process(ast)
}

// 节点合并
function mergeSimilarNodes(ast) {
  // 合并相似样式
  // 合并相邻文本
  // 合并可复用组件
}
```

### 3. 缓存策略

```javascript
// LLM 响应缓存
const llmCache = new Map()

async function convertWithCache(figmaNode) {
  const cacheKey = JSON.stringify(figmaNode).slice(0, 500)

  if (llmCache.has(cacheKey)) {
    return llmCache.get(cacheKey)
  }

  const code = await convertWithLLM(figmaNode)
  llmCache.set(cacheKey, code)

  return code
}
```

---

## 完整示例

### Figma 设计

```
Frame: Login Page
├── Rectangle: Header (bg: #80A6EA)
├── Text: "Sign In" (24px, white)
├── Rectangle: Input Field (border: 1px solid #ddd)
├── Text: "Email" (14px, gray)
├── Rectangle: Button (bg: #42b983)
└── Text: "Submit" (16px, white)
```

### 转换结果

```javascript
import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## 关键挑战与解决方案

### 1. 复杂布局处理

**挑战：** Figma 的 Frame 结构与 React 组件树不同。

**解决方案：**
```javascript
// 树形结构转换
function frameToComponentTree(frame) {
  return {
    type: 'component',
    tagName: frame.name,
    children: frame.children.map(child => {
      if (child.type === 'FRAME') {
        return frameToComponentTree(child)
      } else if (child.type === 'RECTANGLE') {
        return {
          type: 'element',
          tagName: 'div',
          attributes: extractStyles(child)
        }
      } else if (child.type === 'TEXT') {
        return {
          type: 'text',
          content: child.characters
        }
      }
    })
  }
}
```

### 2. 响应式设计

**挑战：** Figma 设计可能是固定尺寸。

**解决方案：**
```javascript
function addResponsiveAttributes(ast) {
  // 1. 提取原始尺寸
  const originalWidth = ast.attributes.width
  const originalHeight = ast.attributes.height

  // 2. 计算比例
  const aspectRatio = originalWidth / originalHeight

  // 3. 添加响应式类
  ast.attributes.className = [
    'w-full',
    aspectRatio > 1 ? 'aspect-[4/3]' : 'aspect-[3/4]',
    'max-w-xl'
  ].join(' ')

  // 4. 生成媒体查询
  ast.attributes.responsiveStyles = {
    '@media (max-width: 640px)': {
      width: '100%'
    },
    '@media (min-width: 768px)': {
      width: `${originalWidth / 16}rem`
    }
  }
}
```

### 3. 样式复用

**挑战：** 相同设计元素重复出现。

**解决方案：**
```javascript
function extractReusableComponents(ast) {
  const components = []

  function extract(node) {
    if (node.type === 'component' && isReusable(node)) {
      components.push({
        name: camelCase(node.tagName),
        code: generateComponentCode(node)
      })
    }

    node.children?.forEach(extract)
  }

  extract(ast)

  return components
}

function isReusable(node) {
  // 判断是否可复用（有命名、样式固定、结构简单）
  return (
    node.tagName &&
    !node.tagName.includes('Page') &&
    node.children.length <= 3
  )
}
```

---

## 性能优化

### 1. 并行处理

```javascript
import { PromisePool } from '@supercharge/promise-pool'

async function processNodesInParallel(nodes) {
  const pool = PromisePool.withConcurrency(5, nodes)

  const results = await pool
    .process(async (node) => {
      return await convertNodeWithLLM(node)
    })

  return results
}
```

### 2. 流式生成

```javascript
async function streamConversion(ast) {
  for (const node of ast.children) {
    const code = await generateNodeCode(node)

    // 实时输出
    yield code

    // 暂停一小会儿，避免被 API 限流
    await sleep(100)
  }
}

async function* streamNodeCode(node) {
  yield `<!-- Generating ${node.tagName} -->\n`

  const code = await generateNodeCode(node)
  yield code
}
```

---

## 总结

```
Figma 转 UI 代码技术栈：

1. Figma API
   - 解析设计文件
   - 获取节点信息

2. AST
   - 设计结构 → 代码结构
   - 节点树转换

3. 大模型
   - 语义理解
   - 代码优化
   - 错误修正

4. VSCode 插件
   - 用户体验
   - 代码生成
   - 文件输出

工作流程：
设计稿 → Figma JSON → AST → 大模型增强 → 代码生成 → 输出文件

关键技术：
- AST 解析与转换
- Prompt 工程优化
- 代码模板生成
- 响应式处理
- 性能优化
```

---

## 参考资源

- [Figma API Documentation](https://www.figma.com/developers/api)
- [AST Explained](https://astexplorer.net/)
- [VSCode Extension API](https://code.visualstudio.com/api)
- [Tailwind CSS](https://tailwindcss.com/)
