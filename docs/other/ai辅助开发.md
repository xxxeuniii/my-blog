# AI 辅助开发

本文介绍如何利用 AI 工具辅助开发，实现需求的完整流程。

## 一、AI 辅助开发概述

### 什么是 AI 辅助开发

AI 辅助开发是指利用人工智能工具（如 ChatGPT、Cursor、Copilot 等）帮助程序员完成代码编写、问题排查、知识学习等开发工作。

### AI 能做什么

| 能力 | 说明 | 示例 |
|------|------|------|
| **代码生成** | 根据描述生成代码 | "写一个 Vue 登录组件" |
| **代码解释** | 分析代码逻辑 | "这段代码什么意思" |
| **Bug 修复** | 分析错误并提供方案 | "这个报错怎么解决" |
| **代码优化** | 性能优化、重构建议 | "这段代码怎么优化" |
| **知识查询** | 技术问题解答 | "什么是依赖注入" |
| **文档生成** | 生成注释、API 文档 | "给这个函数写注释" |

## 二、常用 AI 开发工具

### 1. Cursor

AI 编程 IDE，基于 VS Code。

```bash
# 下载安装
https://cursor.sh

# 核心功能
- Tab 自动补全
- Ctrl+K 生成代码
- Ctrl+L 对话问答
- Ctrl+/ 解释代码
```

### 2. GitHub Copilot

代码补全工具，集成在 IDE 中。

```bash
# 安装
# VS Code 扩展市场搜索 "GitHub Copilot"

# 使用
# 在代码中输入注释，AI 自动补全
function // 计算斐波那契数列
function fibonacci(n) { ... }
```

### 3. ChatGPT

通用 AI 对话工具。

```bash
# 使用方式
1. 描述需求
2. AI 生成方案
3. 追问细节
4. 复制代码
```

### 4. 通义灵码

阿里推出的 AI 编程助手。

```bash
# 下载
https://tongyi.aliyun.com/lingma

# 功能
- 代码补全
- 代码生成
- 智能问答
```

## 三、利用 AI 实现需求的流程

### 完整流程图

```
┌─────────────────────────────────────────────────────────┐
│                    AI 辅助开发流程                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. 需求描述                                            │
│      │                                                  │
│      ▼                                                  │
│   2. AI 理解需求                                        │
│      │                                                  │
│      ▼                                                  │
│   3. AI 生成代码框架                                     │
│      │                                                  │
│      ▼                                                  │
│   4. 本地运行验证                                        │
│      │                                                  │
│      ├─ 成功 ──► 完成                                    │
│      │                                                  │
│      ▼ 失败                                              │
│   5. 发给 AI 调试                                        │
│      │                                                  │
│      ▼                                                  │
│   6. AI 提供方案                                        │
│      │                                                  │
│      ▼                                                  │
│   7. 修改代码                                           │
│      │                                                  │
│      └───────────────────────────────────► 4. 循环      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 步骤详解

#### 步骤 1：需求描述

```markdown
[错误示例]
"帮我写个功能"

[正确示例]
"帮我写一个 Vue3 的用户登录组件，包含：
1. 用户名和密码输入框
2. 表单验证（用户名必填，密码至少6位）
3. 登录按钮，点击调用 /api/login 接口
4. 登录失败显示错误提示"
```

**技巧：需求描述越详细，AI 理解越准确**

#### 步骤 2：AI 生成代码

```markdown
# AI 生成的代码示例（Vue3）

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="form.username"
        placeholder="用户名"
      />
      <span v-if="errors.username">{{ errors.username }}</span>
    </div>
    <div>
      <input
        v-model="form.password"
        type="password"
        placeholder="密码"
      />
      <span v-if="errors.password">{{ errors.password }}</span>
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? '登录中...' : '登录' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({})
const loading = ref(false)
const error = ref('')

const validate = () => {
  errors.username = form.username ? '' : '用户名必填'
  errors.password = form.password.length >= 6 ? '' : '密码至少6位'
  return !errors.username && !errors.password
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  error.value = ''

  try {
    await axios.post('/api/login', form)
    // 登录成功处理
  } catch (e) {
    error.value = e.response?.data?.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>
```

#### 步骤 3：运行验证

```bash
# 运行项目
npm run dev

# 测试功能
1. 输入空用户名 -> 应显示"用户名必填"
2. 输入短密码 -> 应显示"密码至少6位"
3. 输入正确信息 -> 应调用登录接口
```

#### 步骤 4：报错调试

如果遇到错误，把错误信息发给 AI：

```markdown
# 发给 AI
运行报错：Uncaught (in promise) Error: AxiosError: Request failed with status code 500

代码是刚才你帮我写的登录组件，请帮我排查问题。
```

```markdown
# AI 回复
500 错误是服务器内部错误，可能原因：

1. 接口地址不对 - 检查 /api/login 是否正确
2. 请求参数格式不对 - 检查 Content-Type
3. 服务器问题 - 检查后端日志

建议排查步骤：
1. 打开浏览器开发者工具 -> Network
2. 查看请求详情
3. 检查后端接口日志
```

## 四、AI 提问技巧

### 1. 清晰描述上下文

```markdown
- 怎么实现登录？
+ 我现在用 Vue3 + TypeScript，想实现登录功能，应该怎么做？
```

### 2. 分步提问

```markdown
- 帮我写个后台管理系统
+ 1. 先帮我设计一下 Vue3 后台管理系统的目录结构
+ 2. 接下来帮我写登录页面的代码
+ 3. 登录成功后怎么跳转到首页？
```

### 3. 提供限制条件

```markdown
# 告诉 AI 你的技术栈和限制
- 使用 Vue3 Composition API
- 使用 TypeScript
- 不要使用 Element Plus，用 Tailwind CSS
- 需要支持移动端响应式
```

### 4. 让 AI 解释代码

```markdown
# 看不懂某段代码时
这段代码什么意思？逐行解释

# 想了解原理
为什么这里要用 watchEffect？和应用场景是什么？
```

## 五、AI 辅助开发最佳实践

### 1. 需求文档先行

```markdown
# 先写好需求文档再问 AI

## 用户登录功能需求

### 功能描述
用户通过用户名密码登录系统

### 详细需求
1. 输入框：用户名、密码
2. 验证：用户名必填，密码至少6位
3. 按钮：登录按钮
4. 交互：登录中禁用按钮
5. 错误：显示错误提示
6. 成功：跳转首页

### 技术要求
- Vue3 + Composition API
- TypeScript
- 使用 axios 请求
- 使用 Pinia 管理登录状态
```

### 2. 代码审查

AI 生成的代码一定要自己审查：

```markdown
# 审查要点
1. 安全性 - 是否有 XSS、SQL 注入风险
2. 性能 - 是否有性能问题
3. 规范 - 是否符合团队代码规范
4. 完整 - 是否覆盖所有边界情况
```

### 3. 复杂逻辑自己把握

```markdown
# 适合 AI 做的
- 基础代码模板
- 重复性代码
- 简单功能实现
- 代码解释

# 不适合 AI 做的
- 核心业务逻辑
- 架构设计
- 安全相关代码
- 不熟悉的领域
```

### 4. 迭代优化

```markdown
# 不要期望一次成功

1. AI 生成初版 -> 运行测试
2. 发现问题 -> 发给 AI 修复
3. 再次测试 -> 重复直到满意
```

### 5. 在成熟项目中正确使用 AI

在已有项目中开发新需求时，正确使用 AI 的关键是：**让 AI 学习项目的现有代码模式**。

#### 核心思路

```
1. 先找到项目中类似的实现
2. 把现有代码发给 AI 参考
3. 让 AI 按照现有模式生成新代码
4. 本地运行验证
```

#### 具体做法

##### 1. 告诉 AI 代码规范和技术栈

```markdown
# 告诉 AI
我们项目的技术栈：
- Vue3 + Composition API
- TypeScript
- 使用 Pinia 管理状态
- 网络请求用 utils/request.js 里的方法
- 组件放在 src/components 目录
- 样式用 scoped
```

##### 2. 贴示例代码让 AI 模仿

```markdown
# 告诉 AI
参考以下代码的写法，帮我写一个 ProductList.vue

```vue
<!-- src/components/UserList.vue -->
<template>
  <div class="user-list">
    <div v-for="user in list" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/user'

const list = ref([])

onMounted(async () => {
  list.value = await getUserList()
})
</script>

<style scoped>
.user-list {
  padding: 16px;
}
</style>
```
```

##### 3. 贴公共方法让 AI 调用

```markdown
# 告诉 AI
我们项目有一个封装好的请求方法，在 utils/request.js 中：

```javascript
export function get(url, params) {
  return axios.get(url, { params })
}
```

现在帮我写一个获取商品列表的 API 调用，用这个方法。
```

#### 关键点总结

| 步骤 | 做法 |
|------|------|
| **找参考** | 先在项目里搜类似的实现 |
| **喂代码** | 把现有代码发给 AI 看 |
| **定规范** | 告诉 AI 项目的技术栈和约定 |
| **让 AI 模仿** | "按照这个模式写" |

**核心就是：让 AI 抄作业，而不是闭眼写。AI 不了解你的项目，所以需要把现有代码展示给它看。**

## 七、常见问题

### 1. AI 生成的代码有 Bug

```markdown
# 解决
1. 把完整错误信息发给 AI
2. 描述你的期望行为
3. 让 AI 分析原因并提供修复方案
```

### 2. AI 不理解你的需求

```markdown
# 解决
1. 补充更多细节
2. 提供示例
3. 用图表示意图
4. 分多次描述
```

### 3. AI 生成的代码不符合团队规范

```markdown
# 解决
1. 先告诉 AI 团队的代码规范
2. 让 AI 按照规范生成
3. 生成后手动调整
```

### 4. 不知道问什么

```markdown
# 常用问题模板
1. "这个报错怎么解决？"
2. "这个功能怎么实现？"
3. "这段代码什么意思？"
4. "有没有更好的实现方式？"
5. "如果要做到 XXX，需要注意什么？"
```

## 八、AI 工具对比

| 工具 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **Cursor** | 深度集成 IDE，功能强大 | 需要付费 | 专业开发 |
| **Copilot** | 补全快，集成好 | 需要付费 | 代码补全 |
| **ChatGPT** | 通用能力强 | 需要复制粘贴 | 问题解答 |
| **通义灵码** | 免费，国内访问快 | 功能相对简单 | 日常开发 |

## 九、项目失控与处理

### 问题场景

在项目中随着时间推移，可能会出现以下问题：

| 问题 | 表现 |
|------|------|
| 依赖膨胀 | package.json 里一堆没用的包 |
| 技术栈混乱 | Vue2/Vue3 混用、多种状态管理混用 |
| 代码风格不统一 | 有人用 TS，有人用 JS |
| 重复代码 | 相同逻辑 copy 多处 |

### 处理方法

#### 1. 定期代码走查

```
每周/每月安排固定时间 review 代码
- 删除无用代码
- 合并重复逻辑
- 统一代码风格
```

#### 2. 依赖审计

```bash
# 检查安全漏洞
npm audit

# 检查没用的依赖
npx depcheck

# 检查过期依赖
npm outdated
```

#### 3. 代码规范检测

```bash
# ESLint 检查
npx eslint src/

# Prettier 格式化
npx prettier --check src/

# TypeScript 类型检查
npx tsc --noEmit
```

#### 4. 代码质量检测

| 工具 | 功能 |
|------|------|
| ESLint | 代码规范检查 |
| Prettier | 代码格式化 |
| SonarQube | 代码质量分析 |
| CodeClimate | 代码评分 |
| depcheck | 无用依赖检测 |
| bundlephobia | 包体积分析 |

#### 5. CI/CD 集成

```yaml
# .github/workflows/quality.yml
name: Code Quality

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx eslint src/
      - run: npx tsc --noEmit
      - run: npx depcheck
```

#### 6. 规范化约束

- 制定团队技术规范
- 新增代码必须 review
- CI/CD 加 lint/typecheck 检查

#### 7. 定期重构

| 频率 | 内容 |
|------|------|
| 每周 | 小范围重构，删除无用代码 |
| 每月 | 合并重复逻辑 |
| 每季度 | 技术栈评估 |

### 核心思路

```
失控 -> 定期走查 -> 清理重复 -> 规范约束 -> 工具检测
```

**简单说：定期代码走查 + 删除重复代码 + 工具辅助检测**

## 十、总结

### 核心要点

1. **需求描述要详细** - 越详细 AI 理解越准确
2. **分步提问** - 不要一次性问太复杂的问题
3. **代码要审查** - AI 生成的代码不一定完全正确
4. **复杂逻辑自己把握** - 核心业务不要完全依赖 AI

### 工作流

```
需求 -> AI 生成代码 -> 运行测试 -> 报错发给 AI -> 修复 -> 循环
```

### 心态

- AI 是**助手**不是**替代**
- AI 能提高效率，但不能替代思考
- **人**才是最终决策者

掌握 AI 辅助开发，能够大幅提升开发效率，但核心的技术判断和架构能力还是需要不断学习和积累。