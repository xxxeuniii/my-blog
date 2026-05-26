# 微前端

微前端是一种将大型应用拆分为多个小型、独立应用的架构模式，每个微应用可以独立开发、测试、部署。

## 一、什么是微前端

### 定义

微前端（Micro Frontend）是微服务思想在前端的延伸，将单体前端应用拆分为多个可以独立运行的小应用。

### 传统 vs 微前端

```
传统模式：
┌─────────────────────────────────────────┐
│              单体前端应用                  │
│  首页 │ 商品列表 │ 购物车 │ 用户中心    │
└─────────────────────────────────────────┘

微前端模式：
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  首页   │ │ 商品列表│ │ 购物车 │ │ 用户中心│
│  微应用 │ │ 微应用 │ │ 微应用 │ │ 微应用 │
└────────┘ └────────┘ └────────┘ └────────┘
        └────────────────────────────┘
                  主应用（容器）
```

### 优点

- 独立开发、独立部署
- 技术栈无关
- 按需加载
- 团队解耦

### 缺点

- 复杂度增加
- 样式隔离困难
- 共享状态复杂

## 二、qiankun

qiankun 是蚂蚁金服开源的微前端解决方案，基于 single-spa 封装。

### 快速开始

```bash
# 主应用安装 qiankun
npm install qiankun
```

### 主应用配置

```javascript
// main.js
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/react'
  },
  {
    name: 'vue-app',
    entry: '//localhost:3002',
    container: '#container',
    activeRule: '/vue'
  }
])

start()
```

```html
<!-- index.html -->
<div id="container"></div>
```

### 子应用配置

#### Vue 子应用

```javascript
// main.js
let instance = null

function render(props = {}) {
  instance = createApp(App)
  instance.use(store)
  instance.use(router)
  instance.mount('#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// qiankun 生命周期
export async function bootstrap() {
  console.log('vue app bootstrap')
}

export async function mount(props) {
  render(props)
}

export async function unmount() {
  instance.unmount()
  instance = null
}
```

```javascript
// vue.config.js
module.exports = {
  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
```

#### React 子应用

```javascript
// index.js
export async function bootstrap() {
  console.log('react app bootstrap')
}

export async function mount(props) {
  render(<App />, props.container)
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(props.container)
}
```

## 三、微前端通信

### 1. 父传子

```javascript
// 主应用传参
registerMicroApps([
  {
    name: 'app',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/app',
    props: {
      token: 'xxx',
      onLogout: () => handleLogout()
    }
  }
])

// 子应用接收
export async function mount(props) {
  console.log(props.token)
  props.onLogout()
}
```

### 2. 基于 Event

```javascript
// 通信中心
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

// 发消息
emitter.emit('event-name', data)

// 收消息
emitter.on('event-name', (data) => { })
```

### 3. 状态管理

```javascript
// 主应用状态
import { createApp } from 'vue'
import App from './App.vue'

let app = null

export function mount(el) {
  app = createApp(App)
  app.mount(el)
}

export function unmount() {
  app?.unmount()
  app = null
}
```

## 四、样式隔离

### 1. CSS Module

```css
/* button.module.css */
.button {
  color: red;
}
```

```javascript
import styles from './button.module.css'
<div class={styles.button}>按钮</div>
```

### 2. Shadow DOM

```javascript
// qiankun 自动处理
```

### 3. 动态样式加载

```javascript
// 避免样式污染
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '//localhost:3001/style.css'
document.head.appendChild(link)
```

## 五、最佳实践

### 1. 目录结构

```
├── apps/
│   ├── main-app/        # 主应用
│   ├── portal/         # 门户应用
│   ├── app-react/      # React 子应用
│   ├── app-vue/       # Vue 子应用
│   └── shared/         # 共享包
├── packages/
│   ├── ui/             # 共享组件
│   ├── utils/          # 共享工具
│   └── constants/      # 常量
└── pnpm-workspace.yaml
```

### 2. 部署策略

```yaml
# CI/CD 配置
stages:
  - build
  - deploy

deploy_main:
  script:
    - npm run build
    - docker build -t main-app:$VERSION
    - kubectl apply -f k8s/

deploy_sub:
  script:
    - npm run build
    - docker build -t sub-app:$VERSION
```

### 3. 公共依赖

```javascript
// webpack 配置
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  vue: { singleton: true, requiredVersion: '^3.0.0' }
}
```

## 六、适用场景

| 场景 | 推荐方案 |
|------|----------|
| 老项目迁移 | qiankun |
| 新项目架构 | Module Federation |
| 多团队协作 | 两者都可 |
| 跨技术栈 | qiankun |

## 七、总结

微前端是大型前端应用的解决方案，选择时需要考虑：
- 团队规模和技术栈
- 现有项目迁移成本
- 维护和部署复杂度
- 团队技术能力

qiankun 适合存量项目迁移，是目前最成熟的微前端解决方案。