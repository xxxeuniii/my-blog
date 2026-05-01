# Vue2 与 Vue3 核心区别深度解析

Vue3 作为 Vue.js 的重大版本升级，带来了诸多突破性的改进。本文将从多个维度详细对比 Vue2 和 Vue3 的核心差异。

---

## 一、响应式系统

### Vue2: Object.defineProperty

Vue2 使用 `Object.defineProperty` 实现响应式系统：

```js
// Vue2 响应式实现原理
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      dep.depend()
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 派发更新
      dep.notify()
    }
  })
}
```

**局限性：**
- **无法检测对象属性的添加和删除**：只能监听已存在的属性
- **数组索引和长度变更无法检测**：如 `arr[0] = value` 或 `arr.length = 0`
- **需要遍历对象的所有属性**：性能开销较大
- **嵌套对象需要递归处理**：初始化时递归深度监听

### Vue3: Proxy

Vue3 使用 ES6 的 `Proxy` 实现响应式系统：

```js
// Vue3 响应式实现原理
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    // 依赖收集
    track(target, key)
    const result = Reflect.get(target, key, receiver)
    // 递归代理嵌套对象
    if (isObject(result)) {
      return reactive(result)
    }
    return result
  },
  set(target, key, value, receiver) {
    const oldValue = Reflect.get(target, key, receiver)
    const result = Reflect.set(target, key, value, receiver)
    if (hasChanged(value, oldValue)) {
      // 派发更新
      trigger(target, key)
    }
    return result
  },
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key)
    const result = Reflect.deleteProperty(target, key)
    if (hadKey) {
      trigger(target, key)
    }
    return result
  }
})
```

**优势：**
- **直接监听对象而非属性**：可以检测属性的添加和删除
- **天然支持数组操作**：包括索引修改、长度修改、`push/pop` 等方法
- **性能更好**：不需要遍历对象属性，按需进行依赖收集
- **支持 Map、Set 等数据结构**：提供更全面的响应式能力

---

## 二、组件 API

### Vue2: Options API

Vue2 采用选项式 API，将组件逻辑按功能分类：

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
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
  watch: {
    count(newVal, oldVal) {
      console.log(`count changed from ${oldVal} to ${newVal}`)
    }
  }
}
</script>
```

**特点：**
- **优点**：初学者友好，结构清晰
- **缺点**：逻辑分散，大型组件难以维护，代码复用困难

### Vue3: Composition API

Vue3 引入组合式 API，按逻辑关注点组织代码：

```vue
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 状态
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 监听
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
})

// 生命周期
onMounted(() => {
  console.log('Component mounted')
})
</script>
```

**特点：**
- **更好的代码组织**：相关逻辑可以放在一起
- **更好的代码复用**：可以提取可复用的组合函数
- **更好的类型推断**：对 TypeScript 更友好
- **更小的生产包体积**：Tree-shaking 友好

### 组合式函数示例

```js
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement
  }
}
```

---

## 三、生命周期钩子

### 完整对比表

| Vue2 生命周期 | Vue3 Composition API | 执行时机 |
|--------------|---------------------|----------|
| `beforeCreate` | `setup()` | 组件实例创建前 |
| `created` | `setup()` | 组件实例创建后 |
| `beforeMount` | `onBeforeMount` | 组件挂载前 |
| `mounted` | `onMounted` | 组件挂载后 |
| `beforeUpdate` | `onBeforeUpdate` | 组件更新前 |
| `updated` | `onUpdated` | 组件更新后 |
| `beforeDestroy` | `onBeforeUnmount` | 组件卸载前 |
| `destroyed` | `onUnmounted` | 组件卸载后 |
| `activated` | `onActivated` | keep-alive 组件激活 |
| `deactivated` | `onDeactivated` | keep-alive 组件停用 |
| `errorCaptured` | `onErrorCaptured` | 捕获子组件错误 |

### 执行顺序

```
Vue2:
beforeCreate → created → beforeMount → mounted
              ↓
beforeUpdate → updated
              ↓
beforeDestroy → destroyed

Vue3:
setup() (替代 beforeCreate/created)
    ↓
onBeforeMount → onMounted
    ↓
onBeforeUpdate → onUpdated
    ↓
onBeforeUnmount → onUnmounted
```

---

## 四、TypeScript 支持

### Vue2 的 TypeScript 支持

Vue2 对 TypeScript 的支持相对有限：

```typescript
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name: 'Eunie'
    }
  },
  methods: {
    greet() {
      return `Hello, ${this.name}`
    }
  }
})
```

**局限性：**
- 需要使用 `Vue.extend` 或 `Component` 装饰器
- 类型推断不够完善
- 复杂类型定义繁琐

### Vue3 的 TypeScript 支持

Vue3 完全使用 TypeScript 重写，提供一流的类型支持：

```typescript
import { ref, computed } from 'vue'

interface User {
  name: string
  age: number
}

const user = ref<User>({
  name: 'Eunie',
  age: 25
})

const greeting = computed(() => `Hello, ${user.value.name}`)
```

**优势：**
- **完整的类型推断**：自动推断响应式数据类型
- **更好的 IDE 支持**：智能提示更准确
- **Composition API 天然支持**：函数式编程与类型系统完美结合
- **类型安全的 props 定义**：使用 `defineProps` 进行类型检查

---

## 五、性能优化

### 1. 静态提升 (Static Hoisting)

Vue3 的编译器会自动将静态节点提升到渲染函数外部：

```js
// Vue2 每次渲染都会创建新的 VNode
render() {
  return h('div', [
    h('span', 'Static Text'),
    h('span', this.dynamicText)
  ])
}

// Vue3 静态内容只创建一次
const staticVNode = h('span', 'Static Text')
render() {
  return h('div', [
    staticVNode,  // 复用
    h('span', this.dynamicText)
  ])
}
```

### 2. 树摇优化 (Tree Shaking)

Vue3 的模块化设计使得打包工具可以更好地进行树摇：

```js
// Vue2 - 必须引入整个 Vue 库
import Vue from 'vue'

// Vue3 - 按需引入，未使用的功能不会被打包
import { ref, computed, onMounted } from 'vue'
```

### 3. Fragment 支持

Vue3 支持多根节点组件，无需额外的根元素包裹：

```vue
<!-- Vue2 必须有根元素 -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>

<!-- Vue3 可以有多个根元素 -->
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

### 4. Teleport 传送门

Vue3 提供 `Teleport` 组件，允许将组件渲染到 DOM 的任意位置：

```vue
<template>
  <button @click="showModal = true">Open Modal</button>
  
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <!-- Modal content -->
    </div>
  </Teleport>
</template>
```

---

## 六、其他核心改进

### 1. 更好的事件处理

Vue3 支持事件修饰符的组合和自定义事件：

```vue
<!-- Vue2 -->
<input @keyup.enter="handleEnter">

<!-- Vue3 新增 -->
<input @keyup.ctrl.enter="handleCtrlEnter">

<!-- 自定义事件验证 -->
<script setup>
const emit = defineEmits({
  submit: (payload) => {
    if (payload.email) return true
    console.warn('Invalid submit event')
    return false
  }
})
</script>
```

### 2. Suspense 异步组件

Vue3 支持 Suspense 处理异步依赖：

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

### 3. 响应式 API 增强

Vue3 提供了更多响应式工具函数：

```js
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// ref - 基本类型响应式
const count = ref(0)

// reactive - 对象响应式
const state = reactive({
  name: 'Eunie',
  age: 25
})

// computed - 计算属性
const doubled = computed(() => count.value * 2)

// watch - 监听指定源
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} -> ${newVal}`)
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`count changed: ${count.value}`)
})
```

---

## 七、迁移指南

### 从 Vue2 迁移到 Vue3 的步骤

1. **安装 Vue3 和 @vue/compiler-sfc**
2. **更新构建工具配置**
3. **逐步迁移组件**
   - 先迁移简单的无状态组件
   - 再迁移复杂的有状态组件
4. **更新生命周期钩子**
5. **处理响应式数据**
   - `data()` → `ref` / `reactive`
   - `this.$set` → 直接赋值（Proxy 自动检测）
6. **更新指令和组件**

### 兼容模式

Vue3 提供 `@vue/compat` 包，支持混合使用 Vue2 和 Vue3 代码：

```js
import Vue from '@vue/compat'

// 可以同时使用 Options API 和 Composition API
const app = Vue.createApp({
  data() {
    return { message: 'Hello' }
  },
  setup() {
    const count = ref(0)
    return { count }
  }
})
```

---

## 八、总结

| 维度 | Vue2 | Vue3 |
|------|------|------|
| **响应式** | Object.defineProperty | Proxy |
| **API 风格** | Options API | Composition API |
| **TypeScript** | 有限支持 | 一流支持 |
| **性能** | 基础优化 | 深度优化（静态提升、树摇） |
| **包体积** | 较大 | 更小（按需引入） |
| **多根组件** | 不支持 | 支持 Fragment |
| **异步处理** | 手动处理 | Suspense |

**建议：**
- **新项目**：直接使用 Vue3 + Composition API
- **现有项目**：可以逐步迁移，使用兼容模式过渡
- **学习路径**：先掌握 Vue3 的核心概念，再了解与 Vue2 的差异

Vue3 的设计更加现代化，提供了更好的开发体验和性能表现，是构建现代 Web 应用的首选框架。
