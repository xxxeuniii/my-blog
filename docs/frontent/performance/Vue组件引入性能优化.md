# Vue 组件引入性能优化

## 组件引入方式

### 1. 静态引入（import）

```javascript
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Button from './components/Button.vue'
```

**适用场景：**
- 每个页面都用到的组件
- 必需的核心组件
- 频繁使用的组件
- 需要类型提示的组件

**特点：**
- 首屏加载
- 打包到主 bundle
- 性能最好

---

### 2. 路由级导入（() => import()）

```javascript
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]
```

**适用场景：**
- 页面级组件
- 不同路由显示不同页面
- 大型应用的导航页面

**特点：**
- 非首屏加载
- 按页面分割
- 用户点击路由时加载

---

### 3. 异步组件（defineAsyncComponent）

```javascript
import { defineAsyncComponent } from 'vue'

const ChartComponent = defineAsyncComponent(() =>
  import('./components/ChartComponent.vue')
)
```

**适用场景：**
- 大型/复杂的组件
- 非必需但可能使用的组件
- 需要展示加载状态的组件

**特点：**
- 按需加载
- 有加载延迟
- 可展示 loading/error

---

### 4. 动态组件（`&lt;component&gt;`）

```vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import Home from './Home.vue'
import About from './About.vue'

const currentComponent = computed(() => {
  if (currentTab.value === 'home') return Home
  return About
})
</script>
```

**适用场景：**
- 标签页切换
- 选项卡导航
- 权限控制切换

**特点：**
- 运行时切换
- 需要预加载
- 可配合 keep-alive 缓存

---

## 首屏组件选择原则

### ✅ 用静态引入（import）

```javascript
// 头部、底部等每个页面都用的组件
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// 按钮等频繁使用的组件
import Button from './components/Button.vue'
import Input from './components/Input.vue'

// 必需的核心组件
import Layout from './components/Layout.vue'
import Loading from './components/Loading.vue'
```

**原因：**
- 每个页面都要用
- 性能最好
- 开发体验好

---

### ❌ 不用静态引入

```javascript
// ❌ 不应该用 import
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')  // import 不对
  }
]

// ❌ 不应该用 import
import ChartComponent from './ChartComponent.vue'
const Dashboard = () => import('./Dashboard.vue')  // import 和路由混用
```

**原因：**
- 组件不需要在所有页面使用
- 不属于首屏必需

---

## 完整示例

### 目录结构

```
src/
├── components/          # 组件目录
│   ├── Header.vue      # 首屏组件（每个页面都用）✅ import
│   ├── Footer.vue      # 首屏组件（每个页面都用）✅ import
│   ├── Button.vue      # 首屏组件（每个页面都用）✅ import
│   ├── ChartComponent.vue  # 大型组件（按需加载）✅ defineAsyncComponent
│   └── MapComponent.vue    # 大型组件（按需加载）✅ defineAsyncComponent
├── views/               # 页面目录
│   ├── Home.vue        # 页面组件 ✅ () => import()
│   ├── About.vue       # 页面组件 ✅ () => import()
│   └── Dashboard.vue   # 页面组件 ✅ () => import()
└── router/
    └── index.js
```

### 组件引入配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')  // 首屏页面
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')  // 非首屏页面
  },
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')  // 非首屏页面
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```javascript
// App.vue
<script setup>
// 首屏组件 - 每个页面都用
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Button from './components/Button.vue'
import Loading from './components/Loading.vue'
</script>
```

```javascript
// Dashboard.vue（包含大型组件）
<script setup>
import { defineAsyncComponent } from 'vue'

// 大型组件 - 按需加载
const ChartComponent = defineAsyncComponent(() =>
  import('./components/ChartComponent.vue')
)

const MapComponent = defineAsyncComponent(() =>
  import('./components/MapComponent.vue')
)

// 页面组件 - 路由级导入
const Dashboard = () => import('./views/Dashboard.vue')
</script>
```

---

## 性能优化总结

```
首屏加载优化：
1. ✅ 首屏必需组件用 import
2. ✅ 页面组件用 () => import()
3. ✅ 大型组件用 defineAsyncComponent
4. ✅ 配合 keep-alive 缓存

组件分类：
┌──────────────────────────────────────┐
│ 每页都用                              │
│ → import                             │
├──────────────────────────────────────┤
│ 页面组件                              │
│ → () => import()                     │
├──────────────────────────────────────┤
│ 大型组件                              │
│ → defineAsyncComponent               │
└──────────────────────────────────────┘
```

## 实践检查清单

- [ ] 头部、底部等每个页面都用的组件用 import
- [ ] 按钮等频繁使用的组件用 import
- [ ] 页面组件用 () => import()
- [ ] 大型组件用 defineAsyncComponent
- [ ] 配合 keep-alive 缓存切换组件
- [ ] 使用路由级代码分割减少首屏体积
