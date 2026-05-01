# Vue2 和 Vue3 的区别

Vue3 在 2020 年正式发布，带来了许多重大改进。本文将从多个维度详细对比 Vue2 和 Vue3 的差异。

## 1. 响应式系统

### Vue2 的响应式原理

Vue2 使用 `Object.defineProperty` 来实现响应式：

```js
const data = {}
Object.defineProperty(data, 'count', {
  get() {
    // 依赖收集
    return this._count
  },
  set(newValue) {
    // 触发更新
    this._count = newValue
    updateView()
  }
})
```

**局限性：**
- 无法检测对象属性的添加和删除
- 无法检测数组索引和长度的变化
- 需要使用 `Vue.set()` 或 `this.$set()` 来添加响应式属性

### Vue3 的响应式原理

Vue3 使用 `Proxy` 来实现响应式：

```js
const data = { count: 0 }
const proxy = new Proxy(data, {
  get(target, key, receiver) {
    // 依赖收集
    track(target, key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    // 触发更新
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  }
})
```

**优势：**
- 可以直接监听对象和数组的变化
- 可以检测属性的添加和删除
- 性能更好，不需要遍历所有属性

## 2. 组件 API

### Vue2 - Options API

Vue2 使用 Options API，将组件逻辑按功能分类：

```js
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  mounted() {
    console.log('组件已挂载')
  }
}
```

**问题：**
- 相关逻辑分散在不同的选项中
- 难以复用逻辑
- 代码组织不够灵活

### Vue3 - Composition API

Vue3 引入了 Composition API，提供更灵活的代码组织方式：

```js
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
```

**优势：**
- 相关逻辑可以组织在一起
- 更容易复用逻辑（通过组合式函数）
- 更好的 TypeScript 支持

### 组合式函数示例

```js
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, doubleCount, increment } = useCounter(10)
    return { count, doubleCount, increment }
  }
}
```

## 3. 生命周期钩子

### 完整对比表格

| Vue2 选项式 API | Vue3 组合式 API | 说明 |
|----------------|----------------|------|
| beforeCreate | setup() | 组件创建前（setup 替代） |
| created | setup() | 组件创建后（setup 替代） |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeDestroy | onBeforeUnmount | 卸载前 |
| destroyed | onUnmounted | 卸载后 |
| activated | onActivated | keep-alive 激活 |
| deactivated | onDeactivated | keep-alive 停用 |
| errorCaptured | onErrorCaptured | 错误捕获 |

### 执行顺序

```
Vue2:
┌─────────────────────────────────────────────────────────────┐
│ beforeCreate → created → beforeMount → mounted             │
│      ↓                                                      │
│ beforeUpdate → updated                                      │
│      ↓                                                      │
│ beforeDestroy → destroyed                                   │
└─────────────────────────────────────────────────────────────┘

Vue3:
┌─────────────────────────────────────────────────────────────┐
│ setup()                                                    │
│      ↓                                                      │
│ onBeforeMount → onMounted                                  │
│      ↓                                                      │
│ onBeforeUpdate → onUpdated                                  │
│      ↓                                                      │
│ onBeforeUnmount → onUnmounted                              │
└─────────────────────────────────────────────────────────────┘
```

## 4. TypeScript 支持

### Vue2 的 TypeScript 支持

Vue2 需要使用 `vue-class-component` 和 `vue-property-decorator` 来获得较好的 TypeScript 支持：

```ts
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  count: number = 0
  
  increment(): void {
    this.count++
  }
}
```

**局限性：**
- 需要额外的依赖
- 类型推断不够完善
- 装饰器语法不够直观

### Vue3 的 TypeScript 支持

Vue3 原生支持 TypeScript，无需额外配置：

```ts
import { ref, computed } from 'vue'

interface Props {
  initialCount?: number
}

export default {
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },
  setup(props: Props) {
    const count = ref(props.initialCount)
    const doubleCount = computed(() => count.value * 2)
    
    return { count, doubleCount }
  }
}
```

**优势：**
- 原生 TypeScript 支持
- 更好的类型推断
- Composition API 与 TypeScript 天然契合

## 5. 性能优化

### 静态提升

Vue3 的编译器会自动提升静态内容，避免重复创建：

```html
<!-- Vue2: 每次渲染都会重新创建 -->
<div class="static-class">静态内容</div>

<!-- Vue3: 编译后会提升到渲染函数外部 -->
const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", { class: "static-class" }, "静态内容")
```

### 树摇优化

Vue3 使用 ES Module，支持按需导入：

```js
// Vue2: 导入整个 Vue
import Vue from 'vue'

// Vue3: 按需导入
import { ref, computed, onMounted } from 'vue'
```

### Fragment

Vue3 支持多根组件，不再需要根容器：

```html
<!-- Vue2: 必须有根容器 -->
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>

<!-- Vue3: 可以有多个根节点 -->
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

### Teleport

Vue3 提供 Teleport 组件，允许将组件渲染到 DOM 的其他位置：

```html
<template>
  <teleport to="body">
    <div class="modal">
      <!-- 模态框内容 -->
    </div>
  </teleport>
</template>
```

## 6. 其他核心改进

### 事件处理增强

Vue3 支持事件修饰符 `.once` 和 `.capture`，以及更好的事件处理性能。

### Suspense

Vue3 引入 Suspense 组件，用于处理异步组件：

```html
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
```

### 响应式 API 增强

Vue3 提供了更多响应式 API：

- `ref()` - 创建响应式基本类型
- `reactive()` - 创建响应式对象
- `computed()` - 创建计算属性
- `watch()` - 监听响应式变化
- `watchEffect()` - 自动追踪依赖的副作用

## 7. 迁移指南

### 步骤 1：安装 Vue3

```bash
npm install vue@3
```

### 步骤 2：更新构建工具

- Vue CLI: `vue upgrade`
- Vite: 直接支持 Vue3

### 步骤 3：逐步迁移组件

1. 将 Options API 组件转换为 Composition API
2. 更新生命周期钩子
3. 替换 `this.$set`、`this.$delete` 等方法
4. 检查并更新指令用法

### 兼容模式

Vue3 提供 `@vue/compat` 包，允许在同一项目中混合使用 Vue2 和 Vue3 组件：

```js
import { createApp } from '@vue/compat'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

## 总结

| 维度 | Vue2 | Vue3 |
|------|------|------|
| 响应式 | Object.defineProperty | Proxy |
| 组件 API | Options API | Composition API |
| TypeScript | 需要额外配置 | 原生支持 |
| 性能 | 一般 | 优秀（静态提升、树摇） |
| 多根组件 | 不支持 | 支持（Fragment） |
| 异步组件 | 复杂 | 简单（Suspense） |

Vue3 通过更好的架构设计和性能优化，为现代前端开发提供了更强大的工具。建议新项目直接使用 Vue3，现有项目可以逐步迁移。
