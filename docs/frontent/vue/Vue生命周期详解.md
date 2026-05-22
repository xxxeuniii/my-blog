---
title: Vue3 生命周期详解
description: Vue 响应式原理与生命周期详解
---

# Vue3 生命周期详解

## 生命周期流程图

```
创建阶段                     挂载阶段                    更新阶段                     销毁阶段
+--------------------+    +--------------------+    +--------------------+    +--------------------+
| setup()           | -> | beforeCreate      |    |                    |    |                    |
| (响应式初始化)     |    +--------------------+    |                    |    |                    |
+--------------------+    | create()          |    |                    |    |                    |
                         +--------------------+    |                    |    |                    |
                         | beforeMount       | -> | beforeUpdate       |    | beforeUnmount      |
                         | (挂载前)           |    | (更新前)           |    | (卸载前)           |
                         +--------------------+    +--------------------+    +--------------------+
                         | onMounted         |    | onUpdated         |    | onUnmounted       |
                         | (挂载后)           |    | (更新后)           |    | (卸载后)           |
                         +--------------------+    +--------------------+    +--------------------+
                         |                    |    |                    |    |                    |
                         |                    | -> | beforeUnmount      |    |                    |
                         |                    |    | (卸载前)           |    |                    |
                         +--------------------+    +--------------------+    +--------------------+
```

## setup 执行顺序（谁先谁后）

**结论：setup() 是最早的，所有生命周期都在 setup 之后**

```
执行顺序：
1. setup()           ← 最早！最前面的
2. beforeCreate      ← Vue2 兼容
3. create()
4. beforeMount
5. onMounted         ← 挂载完成
6. ...用户操作...
7. beforeUnmount
8. onUnmounted       ← 最后
```

### 为什么说 setup 最早？

- `setup()` 是组合式 API 的入口函数
- 在 Vue3 中，`setup()` 代替了 `beforeCreate` 和 `created`
- 它在组件实例创建后、模板编译前执行
- **所有**响应式数据、计算属性、方法都在 `setup()` 中定义

### 代码验证

```vue
<script setup>
import { ref, onMounted, onUnmounted, onBeforeUpdate } from 'vue'

console.log('1. setup() 开始')

// 定义响应式数据
const count = ref(0)

// 监听器
onMounted(() => {
  console.log('5. onMounted() - setup 之后')
})

onBeforeUpdate(() => {
  console.log('6. onBeforeUpdate() - 更新前')
})

onUnmounted(() => {
  console.log('8. onUnmounted() - 最后')
})

console.log('2. setup() 结束，开始挂载')
</script>
```

**输出：**
```
1. setup() 开始
2. setup() 结束，开始挂载
3. beforeCreate (Vue2)
4. create (Vue2)
5. beforeMount
5. onMounted() - setup 之后
6. onBeforeUpdate() - 更新前
...
8. onUnmounted() - 最后
```

### 关键点

| 阶段 | 说明 |
|------|------|
| **setup()** | 最先执行，定义所有响应式数据和方法 |
| **onMounted** | setup 完成后、DOM 挂载完成时执行 |
| **onUnmounted** | 最后执行，组件销毁时清理资源 |

## 组合式 API 生命周期钩子

### 创建阶段（只在 setup 中）

| 钩子 | 说明 | 执行时机 |
|------|------|----------|
| `setup()` | 组合式 API 入口 | 组件创建时最先执行 |
| `onBeforeMount()` | 挂载前 | `create()` 之后，DOM 渲染之前 |
| `onMounted()` | 挂载后 | DOM 渲染完成 |

### 更新阶段

| 钩子 | 说明 | 执行时机 |
|------|------|----------|
| `onBeforeUpdate()` | 更新前 | 响应式数据变化，DOM 更新之前 |
| `onUpdated()` | 更新后 | DOM 更新完成 |

### 销毁阶段

| 钩子 | 说明 | 执行时机 |
|------|------|----------|
| `onBeforeUnmount()` | 卸载前 | 组件销毁之前 |
| `onUnmounted()` | 卸载后 | 组件销毁之后 |

## 代码示例

### setup 和 onUnmounted 顺序

```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const message = ref('开始')

console.log('1. setup()')

onMounted(() => {
  console.log('5. onMounted() - 挂载完成')
})

onUnmounted(() => {
  console.log('8. onUnmounted() - 卸载完成')
})

// 其他生命周期钩子
import { onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'

onBeforeMount(() => {
  console.log('4. onBeforeMount() - 挂载前')
})

onBeforeUpdate(() => {
  console.log('6. onBeforeUpdate() - 更新前')
})

onBeforeUnmount(() => {
  console.log('7. onBeforeUnmount() - 卸载前')
})
</script>
```

**输出顺序：**
```
1. setup()
4. onBeforeMount()
5. onMounted()
6. onBeforeUpdate()
7. onBeforeUnmount()
8. onUnmounted()
```

## 生命周期对比

| Vue2 Options API | Vue3 组合式 API | 执行时机 |
|------------------|-----------------|----------|
| `beforeCreate` | `setup()` | 组件创建时 |
| `created` | `setup()` | 组件创建时 |
| `beforeMount` | `onBeforeMount()` | 挂载前 |
| `mounted` | `onMounted()` | 挂载后 |
| `beforeUpdate` | `onBeforeUpdate()` | 更新前 |
| `updated` | `onUpdated()` | 更新后 |
| `beforeDestroy` | `onBeforeUnmount()` | 卸载前 |
| `destroyed` | `onUnmounted()` | 卸载后 |

## 注意事项

### 1. setup 是最早的

- `setup()` 在所有生命周期钩子之前执行
- 不能访问 `this`，需要使用 `ref` / `reactive` 定义响应式数据

### 2. 为什么要 onUnmounted？

- 用于清理副作用（如定时器、事件监听器）
- 防止内存泄漏

### 3. 清理示例

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

const timer = ref(null)

onMounted(() => {
  timer.value = setInterval(() => {
    console.log('定时器执行')
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
```

## 总结

```
执行顺序（从早到晚）：
setup() → onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted

关键点：
1. setup() 是最早的，用于初始化响应式数据
2. onMounted() 挂载完成，可以访问 DOM
3. onUnmounted() 用于清理资源，防止内存泄漏
4. 一定要记得清理定时器、事件监听器等副作用
```
