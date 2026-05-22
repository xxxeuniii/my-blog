# React 与 Vue 区别

## 基本概述

### React

- **发布时间：** 2013年
- **创始人：** Jordan Walke (Facebook)
- **设计理念：** 组件化 + 函数式编程
- **核心技术：** JSX、Virtual DOM、单向数据流
- **模板系统：** JSX（在浏览器中编译）

### Vue

- **发布时间：** 2014年
- **创始人：** Evan You (尤雨溪)
- **设计理念：** 渐进式框架 + 渐进式增强
- **核心技术：** Template、Virtual DOM、双向绑定
- **模板系统：** Template（在编译时编译）

---

## 核心差异

| 特性 | React | Vue |
|------|-------|-----|
| **模板系统** | JSX | Template |
| **数据绑定** | 单向数据流 | 双向绑定（响应式） |
| **模板语法** | 类似 HTML/JSX | HTML 模板 |
| **配置文件** | 需要 create-react-app/Webpack | 需要构建工具（可选） |
| **状态管理** | Redux、Context | Vuex、Pinia、Context |
| **路由** | React Router | Vue Router |
| **API 风格** | 函数式组件 + Hooks | Composition API + Options API |

---

## 代码对比

### React 示例

```javascript
import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('组件挂载')
    return () => {
      console.log('组件卸载')
    }
  }, [])

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

export default Counter
```

**JSX 模板：**
```javascript
<div className="container">
  <h1>Count: {count}</h1>
  <button onClick={handleClick}>
    Increment
  </button>
</div>
```

---

### Vue 示例

```javascript
<template>
  <div class="container">
    <h1>Count: {{ count }}</h1>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() => {
  console.log('组件挂载')
})

const increment = () => {
  count.value++
}
</script>
```

**Template 模板：**
```html
<div class="container">
  <h1>Count: {{ count }}</h1>
  <button @click="increment">
    Increment
  </button>
</div>
```

---

## 核心差异详解

### 1. 模板系统

#### React - JSX

```javascript
// JSX 需要编译，类似 JavaScript + HTML
return (
  <div className="container">
    <h1>Hello, {name}</h1>
    <button onClick={handleClick}>
      Click me
    </button>
  </div>
)

// 条件渲染
const show = true
return (
  <div>
    {show ? <span>Yes</span> : <span>No</span>}
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </div>
)
```

#### Vue - Template

```html
<!-- Template 无需编译，直接写 HTML -->
<div class="container">
  <h1>Hello, {{ name }}</h1>
  <button @click="handleClick">
    Click me
  </button>
</div>

<!-- 条件渲染 -->
<div>
  <span v-if="show">Yes</span>
  <span v-else>No</span>

  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</div>
```

**对比：**
- React：JSX 类似 JavaScript + HTML，需要编译，语法灵活但复杂
- Vue：Template 就是 HTML，无需编译，语法简洁直观

---

### 2. 数据绑定

#### React - 单向数据流

```javascript
function App() {
  const [count, setCount] = useState(0)

  // 必须手动更新
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>
        Increment
      </button>
    </div>
  )
}
```

#### Vue - 双向绑定（响应式）

```javascript
<script setup>
import { ref } from 'vue'

const count = ref(0)

// 自动响应，不需要手动更新
const handleClick = () => {
  count.value++
}
</script>
```

**对比：**
- React：单向数据流，需要显式调用 `setState` 或 `ref.value++`
- Vue：双向绑定，数据变化自动更新视图

---

### 3. 样式系统

#### React - CSS Modules / CSS-in-JS

```javascript
// CSS Modules
import styles from './App.module.css'

<div className={styles.container}>
  <h1>Hello</h1>
</div>

// CSS-in-JS
const useStyles = makeStyles({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  }
})

const { container } = useStyles()
```

```css
/* styles.css */
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
```

#### Vue - Scoped CSS / CSS Modules

```vue
<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>

<template>
  <div class="container">
    <h1>Hello</h1>
  </div>
</template>
```

**对比：**
- React：需要额外的 CSS-in-JS 库（Styled-components、emotion）
- Vue：内置 Scoped CSS，直接使用普通 CSS

---

### 4. 组件定义

#### React - 函数式组件 + Hooks

```javascript
import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 副作用
    document.title = `Count: ${count}`
  }, [count])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

#### Vue - Composition API / Options API

```javascript
// Composition API
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)

    onMounted(() => {
      document.title = `Count: ${count.value}`
    })

    return {
      count
    }
  }
}
```

```javascript
// Options API
export default {
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    document.title = `Count: ${this.count}`
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

**对比：**
- React：只有函数式组件，使用 Hooks 管理状态
- Vue：支持 Options API 和 Composition API 两种风格

---

### 5. 条件渲染

#### React

```javascript
const isLoggedIn = true

return (
  <div>
    {isLoggedIn ? (
      <p>Welcome back!</p>
    ) : (
      <p>Please login</p>
    )}

    {items.length > 0 && (
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    )}
  </div>
)
```

#### Vue

```vue
<template>
  <div>
    <p v-if="isLoggedIn">Welcome back!</p>
    <p v-else>Please login</p>

    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
```

**对比：**
- React：使用三元表达式或逻辑与运算符
- Vue：使用 `v-if`、`v-else`、`v-show` 指令

---

### 6. 列表渲染

#### React

```javascript
const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
]

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
)
```

#### Vue

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

**对比：**
- React：使用 `.map()` 和 `key`
- Vue：使用 `v-for` 和 `:key`

---

### 7. 事件处理

#### React

```javascript
function App() {
  const handleClick = (e) => {
    console.log('Clicked!', e)
  }

  const handleChange = (e) => {
    console.log('Changed!', e.target.value)
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <input type="text" onChange={handleChange} />
    </div>
  )
}
```

#### Vue

```javascript
<script setup>
const handleClick = (e) => {
  console.log('Clicked!', e)
}

const handleChange = (e) => {
  console.log('Changed!', e.target.value)
}
</script>

<template>
  <div>
    <button @click="handleClick">Click me</button>
    <input type="text" @change="handleChange" />
  </div>
</template>
```

**对比：**
- React：使用 `onClick`、`onChange` 等驼峰命名
- Vue：使用 `@click`、`@change` 等短横线命名

---

### 8. Props 传递

#### React

```javascript
// 子组件
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>
}

// 父组件
function App() {
  return <Greeting name="John" age={25} />
}
```

#### Vue

```vue
<!-- 子组件 -->
<template>
  <h1>Hello, {{ name }}! You are {{ age }} years old.</h1>
</template>

<script setup>
defineProps({
  name: String,
  age: Number
})
</script>

<!-- 父组件 -->
<template>
  <Greeting name="John" :age="25" />
</template>

<script setup>
import Greeting from './Greeting.vue'
</script>
```

**对比：**
- React：使用对象解构 `function Greeting({ name, age })`
- Vue：使用 `defineProps()` 函数或 `defineProps({})` 对象

---

### 9. Props 验证

#### React

```javascript
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
}
```

#### Vue

```javascript
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  }
})
```

**对比：**
- React：使用 `PropTypes`（已弃用，推荐 TypeScript）
- Vue：使用 `defineProps()` 内联验证，TypeScript 支持更好

---

### 10. 监听 Props 变化

#### React

```javascript
import { useEffect } from 'react'

function Component({ count }) {
  useEffect(() => {
    console.log('Count changed:', count)
  }, [count])

  return <div>Count: {count}</div>
}
```

#### Vue

```javascript
import { watch } from 'vue'

function Component(props) {
  watch(() => props.count, (newVal) => {
    console.log('Count changed:', newVal)
  })
}
```

**对比：**
- React：使用 `useEffect` 监听变化
- Vue：使用 `watch` 或 `watchEffect`

---

## 响应式系统

### React - 不可变数据

```javascript
import { useState } from 'react'

function App() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25
  })

  // ❌ 错误：直接修改
  // user.name = 'Jane'  // 不生效

  // ✅ 正确：创建新对象
  const handleUpdate = () => {
    setUser({
      ...user,
      name: 'Jane'
    })
  }

  return <div>{user.name}</div>
}
```

### Vue - 可变数据

```javascript
import { ref } from 'vue'

function App() {
  const user = ref({
    name: 'John',
    age: 25
  })

  // ✅ 直接修改，自动响应
  const handleUpdate = () => {
    user.value.name = 'Jane'
  }

  return <div>{{ user.name }}</div>
}
```

**对比：**
- React：不可变数据，每次更新创建新对象
- Vue：可变数据，直接修改自动响应

---

## 学习曲线

### React

```
入门：中等
├─ 学习 JSX 语法
├─ 理解虚拟 DOM
├─ 掌握 Hooks
├─ 理解单向数据流
└─ 学习 Redux 或 Context

进阶：中等
├─ 性能优化
├─ TypeScript 集成
├─ SSR (Next.js)
└─ 测试
```

### Vue

```
入门：简单
├─ 学习 Template 语法
├─ 理解响应式系统
├─ 掌握双向绑定
└─ 使用 Composition API

进阶：中等
├─ 性能优化
├─ TypeScript 集成
├─ SSR (Nuxt.js)
└─ 测试
```

**对比：**
- React：学习曲线稍陡，需要理解 Hooks 和虚拟 DOM
- Vue：学习曲线平缓，Template 语法直观易学

---

## 生态系统

### React 生态

| 类别 | 推荐方案 |
|------|----------|
| UI 组件库 | Ant Design、Material-UI、Chakra UI |
| 状态管理 | Redux Toolkit、Zustand、Context |
| 路由 | React Router |
| 样式 | Styled-components、emotion、Tailwind CSS |
| 服务端渲染 | Next.js |
| 表单 | React Hook Form、Formik |
| 测试 | Jest、React Testing Library |

### Vue 生态

| 类别 | 推荐方案 |
|------|----------|
| UI 组件库 | Element Plus、Ant Design Vue、Vuetify |
| 状态管理 | Pinia、Vuex |
| 路由 | Vue Router |
| 样式 | SCSS、Tailwind CSS、UnoCSS |
| 服务端渲染 | Nuxt.js |
| 表单 | VeeValidate、VForm3 |
| 测试 | Jest、Vitest |

---

## 性能对比

### React

**优点：**
- 虚拟 DOM 性能优秀
- 适合大型应用
- 社区庞大，优化方案多

**缺点：**
- 开发体验略复杂
- 初始学习成本较高

### Vue

**优点：**
- 响应式系统性能好
- 开发体验优秀
- Template 语法直观

**缺点：**
- 大型应用优化相对复杂
- 第三方库生态较小

---

## 选择建议

### 使用 React

- 大型企业应用
- 需要 SSR（Next.js）
- 团队有 React 经验
- 需要丰富的第三方库支持
- TypeScript 项目

### 使用 Vue

- 中小型项目
- 快速开发需求
- 学习成本敏感
- 团队更习惯 Template 语法
- 需要双向绑定

---

## 总结

```
React vs Vue：

React：
- 单向数据流
- JSX 模板
- 函数式组件 + Hooks
- 不可变数据
- 学习曲线中等
- 生态系统庞大

Vue：
- 双向绑定
- Template 模板
- Options API / Composition API
- 可变数据
- 学习曲线平缓
- 生态系统丰富
```

**核心区别：**
1. React 使用 JSX + 单向数据流，学习曲线稍陡
2. Vue 使用 Template + 双向绑定，学习曲线平缓
3. React 强调函数式编程和不可变数据
4. Vue 强调渐进式和响应式系统
5. 两者语法相似，生态丰富，选择看团队偏好
