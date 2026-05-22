# Vue 组件动态引入

## 路由级代码分割

### 基础用法

```javascript
// router/index.js
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

### 懒加载组件

```javascript
// 1. 单个组件懒加载
const Home = () => import('./views/Home.vue')

// 2. 批量加载多个组件
const views = {
  Home: () => import('./views/Home.vue'),
  About: () => import('./views/About.vue'),
  Contact: () => import('./views/Contact.vue')
}

// 3. 命名导出
const Home = () => import(
  /* webpackChunkName: "home" */
  './views/Home.vue'
)
```

### 异步组件

```javascript
import { defineAsyncComponent } from 'vue'

// 基础用法
const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)

// 带加载状态
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})

// 异步组件错误处理
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/)) {
      retry()
    } else {
      fail()
    }
  }
})
```

## 动态组件

### 基础用法

```vue
<template>
  <div>
    <!-- 动态组件切换 -->
    <component :is="currentComponent"></component>

    <!-- 通过函数返回组件 -->
    <component :is="getComponent('Home')"></component>

    <!-- 传递 props -->
    <component
      :is="currentComponent"
      :title="title"
      :data="data"
    ></component>

    <!-- 传递插槽 -->
    <component :is="currentComponent">
      <template #header>自定义头部</template>
      <template #footer>自定义底部</template>
    </component>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const currentComponent = ref(Home)
const title = ref('标题')

function getComponent(name) {
  return {
    Home,
    About,
    Contact
  }[name]
}
</script>
```

### 动态组件切换

```vue
<template>
  <div>
    <button @click="currentTab = 'home'">首页</button>
    <button @click="currentTab = 'about'">关于</button>
    <button @click="currentTab = 'contact'">联系</button>

    <component :is="tabs[currentTab]"></component>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const currentTab = ref('home')

const tabs = {
  home: Home,
  about: About,
  contact: Contact
}
</script>
```

### 使用 defineAsyncComponent

```vue
<template>
  <div>
    <button @click="currentTab = 'home'">首页</button>
    <button @click="currentTab = 'about'">关于</button>
    <button @click="currentTab = 'contact'">联系</button>

    <component :is="asyncTabs[currentTab]"></component>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { ref } from 'vue'

const asyncTabs = {
  home: defineAsyncComponent(() => import('./Home.vue')),
  about: defineAsyncComponent(() => import('./About.vue')),
  contact: defineAsyncComponent(() => import('./Contact.vue'))
}

const currentTab = ref('home')
</script>
```

## 组件按需加载

### 使用 require.context

```javascript
// 自动导入所有组件
function loadComponents() {
  const requireComponents = require.context(
    './views',
    false,
    /\.vue$/
  )

  const components = {}

  requireComponents.keys().forEach(fileName => {
    const componentConfig = requireComponents(fileName)
    const componentName = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')

    // 导出默认组件
    components[componentName] = componentConfig.default || componentConfig
  })

  return components
}

const allComponents = loadComponents()
```

### Vue CLI 自动导入

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
```

### Vite 自动导入

```javascript
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## 组件缓存

### keep-alive

```vue
<template>
  <div>
    <button @click="currentTab = 'home'">首页</button>
    <button @click="currentTab = 'about'">关于</button>

    <!-- 缓存组件状态 -->
    <keep-alive include="Home,About">
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'

const currentTab = ref('home')
const currentComponent = computed(() => {
  if (currentTab.value === 'home') return Home
  if (currentTab.value === 'about') return About
})
</script>
```

### 条件缓存

```vue
<template>
  <div>
    <button @click="showHome = !showHome">切换首页</button>

    <!-- 条件渲染 -->
    <Home v-if="showHome" />
    <About v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import About from './About.vue'

const showHome = ref(true)
</script>
```

## 动态组件加载进阶

### 组件映射表

```javascript
// componentMap.js
export const componentMap = {
  home: () => import('./views/Home.vue'),
  about: () => import('./views/About.vue'),
  contact: () => import('./views/Contact.vue'),
  profile: () => import('./views/Profile.vue'),
  settings: () => import('./views/Settings.vue')
}
```

```vue
<template>
  <div>
    <div class="tabs">
      <button
        v-for="(component, name) in componentMap"
        :key="name"
        :class="{ active: currentName === name }"
        @click="currentName = name"
      >
        {{ name }}
      </button>
    </div>

    <component :is="loadComponent(currentName)" :name="currentName" />
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { componentMap } from './componentMap'

const currentName = ref('home')

const loadComponent = (name) => {
  return componentMap[name]
}
</script>
```

### 动态导入命名块

```javascript
// 动态导入并命名代码块
const Home = () => import(
  /* webpackChunkName: "home" */
  /* webpackMode: "lazy" */
  './views/Home.vue'
)
```

```javascript
// 完整配置
const routes = [
  {
    path: '/home',
    component: () => import(
      /* webpackChunkName: "home-page" */
      './views/Home.vue'
    )
  },
  {
    path: '/about',
    component: () => import(
      /* webpackChunkName: "about-page" */
      './views/About.vue'
    )
  }
]
```

## 性能优化建议

### 1. 代码分割

```javascript
// 路由级代码分割
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/admin',
    component: () => import('./views/admin/Admin.vue')
  }
]
```

### 2. 异步组件加载

```javascript
import { defineAsyncComponent } from 'vue'

const AdminPanel = defineAsyncComponent({
  loader: () => import('./AdminPanel.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

### 3. keep-alive 缓存

```vue
<keep-alive include="Home,About">
  <router-view />
</keep-alive>
```

### 4. 动态导入时指定名称

```javascript
const Home = () => import(
  /* webpackChunkName: "home" */
  './views/Home.vue'
)
```

## 总结

```
动态引入方式：
1. 路由级代码分割 - () => import('./view.vue')
2. 异步组件 - defineAsyncComponent(() => import(...))
3. 动态组件 - <component :is="..." />
4. 自动按需加载 - require.context / vite 自动导入

核心优势：
- 减少首屏加载时间
- 按需加载，提高性能
- 更好的代码组织
```
