# Vue3 组件通信方法

## 组件通信方式概览

| 方法 | 适用场景 | 传递方向 | 组件类型 |
|------|----------|----------|----------|
| `props` | 父传子 | 父 -> 子 | 父子组件 |
| `emit` | 子传父 | 子 -> 父 | 父子组件 |
| `provide/inject` | 祖传孙 | 祖 -> 孙 | 任意层级 |
| `v-model` | 父子双向绑定 | 双向 | 父子组件 |
| `ref` | 跨层级调用 | 任意 | 任意层级 |
| `$attrs` | 父传子（非 props） | 父 -> 子 | 父子组件 |
| `bus` | 兄弟组件通信 | 任意 | 兄弟组件 |

## provide 和 inject 使用详解

### 1. 响应式规则

**关键点：看传递的变量是否是响应式的**

| 提供方式 | 子组件是否响应式 |
|---------|-----------------|
| `ref()` / `reactive()` / `computed()` | 响应式 |
| 普通变量 / 对象字面量 | 非响应式 |

```vue
<!-- 父组件 -->
<script setup>
import { provide, ref, reactive, computed } from 'vue'

// 响应式数据 - 子组件会自动更新
const count = ref(0)
provide('count', count)

const state = reactive({ name: '张三' })
provide('state', state)

const message = computed(() => count.value * 2)
provide('message', message)  // computed 返回值也会响应

// 非响应式数据 - 子组件不会更新
const staticData = { name: '张三', age: 25 }
provide('staticData', staticData)

const normalCount = 0
provide('normalCount', normalCount)  // 修改不会触发更新
</script>
```

### 2. 基本用法

`provide/inject` 用于**跨层级**组件通信，支持**祖传孙**。

#### 父组件提供数据

```vue
<template>
  <div>
    <h2>父组件</h2>
    <Child />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import Child from './Child.vue'

// 提供响应式数据
const message = ref('从父组件传来的消息')
const count = ref(0)

// 提供数据给所有后代组件
provide('message', message)
provide('count', count)

// 提供静态数据
provide('title', '这是标题')
</script>
```

#### 子组件注入数据

```vue
<template>
  <div>
    <h2>子组件</h2>
    <p>消息: {{ message }}</p>
    <p>标题: {{ title }}</p>
    <button @click="count++">count: {{ count }}</button>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

// 注入响应式数据
const message = inject('message')
const count = inject('count')

// 注入静态数据
const title = inject('title')
</script>
```

### 2. 响应式数据

```vue
<!-- 父组件 -->
<script setup>
import { provide, ref } from 'vue'

const user = ref({ name: '张三', age: 25 })

// 提供响应式数据
provide('user', user)

// 提供方法
provide('updateUser', (newUser) => {
  user.value = { ...user.value, ...newUser }
})
</script>
```

```vue
<!-- 孙组件 -->
<script setup>
import { inject } from 'vue'

const user = inject('user')
const updateUser = inject('updateUser')
</script>

<template>
  <div>
    <p>用户: {{ user.name }}</p>
    <button @click="updateUser({ name: '李四' })">修改用户名</button>
  </div>
</template>
```

### 3. 提供默认值

```vue
<script setup>
import { inject } from 'vue'

// 如果没有提供数据，使用默认值
const theme = inject('theme', 'light')
const defaultCount = inject('count', ref(0))
const optional = inject('optional', '默认值')
</script>
```

### 4. 祖孙组件通信示例

```vue
<!-- Parent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <Parent />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import Parent from './Parent.vue'

const user = ref({ name: '王五', age: 30 })

provide('user', user)
provide('updateUser', (data) => {
  user.value = { ...user.value, ...data }
})
</script>

<!-- Parent.vue -->
<template>
  <div>
    <h3>爷爷组件</h3>
    <Child />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import Child from './Child.vue'

const user = inject('user')
const updateUser = inject('updateUser')
</script>

<!-- Child.vue -->
<template>
  <div>
    <h4>孙子组件</h4>
    <p>用户: {{ user.name }}</p>
    <button @click="updateUser({ name: '赵六' })">
      修改用户名
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const user = inject('user')
const updateUser = inject('updateUser')
</script>
```

## provide vs 传 props 的区别

| 特性 | provide/inject | props/emit |
|------|----------------|------------|
| 传递层级 | 支持**任意层级** | 只支持**父子** |
| 代码位置 | 祖组件提供 | 父组件传，子组件收 |
| 类型检查 | 需要手动 | 自动类型检查 |
| 灵活性 | 低 | 高 |
| 适用场景 | 主题、全局配置、工具函数 | 业务数据传递 |

## 使用建议

### 应该用 provide/inject 的场景

1. **主题配置** - 全局主题、颜色、字体
2. **全局工具函数** - 格式化函数、权限判断
3. **路由状态** - 当前路由信息
4. **配置项** - 全局配置、开关选项

```vue
<script setup>
import { provide } from 'vue'

// 主题配置
provide('theme', {
  primaryColor: '#42b983',
  borderRadius: '8px'
})

// 工具函数
provide('formatDate', (date) => {
  return new Date(date).toLocaleDateString()
})

// 权限判断
provide('canEdit', true)
</script>
```

### 不应该用 provide/inject 的场景

1. **业务数据传递** - 使用 props/emit
2. **频繁变化的数据** - 性能问题
3. **组件间弱耦合** - 可读性差
4. **参数较多** - 配置复杂

## 生命周期

```vue
<script setup>
import { provide, onMounted, onUnmounted } from 'vue'

const timer = ref(null)

// 在组件挂载时启动
onMounted(() => {
  timer.value = setInterval(() => {
    console.log('定时器执行')
  }, 1000)
})

// 在组件卸载时清理
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// 提供给子组件
provide('timer', timer)
</script>
```

## 与其他通信方式对比

### provide/inject vs ref（跨层级调用）

```vue
<!-- 方式1：provide/inject -->
<script setup>
const theme = inject('theme')
</script>

<!-- 方式2：ref 跨层级调用 -->
<script setup>
import { ref } from 'vue'

const themeRef = ref(null)
provide('themeRef', themeRef)
</script>
```

**区别：**
- `provide` 直接提供数据，更简洁
- `ref` 需要手动 `.value`，更灵活

## 总结

```
组件通信选择指南：
┌─────────────────────┬─────────────────────┐
│ 父子通信             │ props / emit        │
├─────────────────────┼─────────────────────┤
│ 祖孙通信             │ provide / inject    │
├─────────────────────┼─────────────────────┤
│ 双向绑定             │ v-model             │
├─────────────────────┼─────────────────────┤
│ 任意层级调用         │ ref / provideRef    │
├─────────────────────┼─────────────────────┤
│ 非父子组件通信       │ bus / 事件总线       │
└─────────────────────┴─────────────────────┘
```

**关键点：**
1. `provide` 用于提供数据/方法，`inject` 用于获取
2. 支持**响应式**数据，子组件会自动更新
3. 适用于**跨层级**通信，祖组件提供，孙组件注入
4. 避免滥用，只在合适的场景使用
