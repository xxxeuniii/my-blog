# React 与 React Native 区别

## 基本概念

### React

- **平台：** Web 网页
- **用途：** 构建用户界面
- **技术栈：** React + ReactDOM + 其他 Web 技术栈
- **核心：** 虚拟 DOM（浏览器 DOM）

### React Native

- **平台：** 移动端（iOS、Android）
- **用途：** 构建移动应用
- **技术栈：** React Native + React Native Platform
- **核心：** 原生组件（iOS/Android 原生组件）

---

## 对比表

| 特性 | React | React Native |
|------|-------|--------------|
| **运行平台** | 浏览器 | 移动端 |
| **UI 组件** | HTML DOM | 原生组件 |
| **布局系统** | Flexbox | Flexbox + 布局样式 |
| **样式表** | CSS | CSS-in-JS / 原生样式 |
| **导航** | React Router | React Navigation |
| **网络请求** | Fetch / Axios | Fetch / Axios |
| **状态管理** | Redux / Context | Redux / Context |
| **开发环境** | Web | 移动设备/模拟器 |
| **热更新** | Webpack HMR | Metro Bundle |

---

## 代码对比

### React Web 示例

```javascript
import React, { useState } from 'react'
import { Button } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Hello, World!</h1>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  )
}
```

**CSS 样式：**
```css
button {
  padding: 8px 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

---

### React Native 示例

```javascript
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function App() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Click me</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#42b983',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default App
```

---

## 核心差异

### 1. UI 组件

| React Web | React Native |
|-----------|--------------|
| `<button>` | `<TouchableOpacity>` |
| `<div>` | `<View>` |
| `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<a>` | `<Link>` (React Navigation) |

---

### 2. 布局差异

#### React Flexbox

```javascript
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  gap: 16
}}>
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

#### React Native Flexbox

```javascript
<View style={{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16  // 仅 RN 0.63+
}}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

**注意：**
- React Native 支持原生 Flexbox，但 API 略有不同
- `gap` 属性在 RN 0.63+ 才支持
- 不需要 `display: flex`
- 高度自适应：`flex: 1`

---

### 3. 样式系统

#### React：CSS 文件

```css
/* App.css */
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
```

#### React Native：StyleSheet

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#42b983',
    borderRadius: 4,
  },
})
```

**样式差异：**
- React 使用 CSS 文件，可读取器、热更新
- React Native 使用 StyleSheet，性能更好
- RN 不支持 CSS 的所有特性（如 media queries）

---

### 4. 导航

#### React：React Router

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

#### React Native：React Navigation

```javascript
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

---

### 5. 网络请求

#### React：Fetch / Axios

```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))

axios.get('/api/data')
  .then(response => console.log(response.data))
```

#### React Native：Fetch / Axios

```javascript
// 代码基本相同
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
```

**注意：**
- 两者 API 几乎相同
- RN 可以直接使用 Web 的网络库

---

### 6. 开发环境

#### React：Web 开发

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

- 浏览器开发
- Vite / Webpack
- HMR 热更新
- Chrome DevTools

#### React Native：移动开发

```bash
npx @react-native-community/cli init MyApp
cd MyApp
npm install
npx react-native run-ios  # iOS
npx react-native run-android  # Android
```

- 模拟器 / 真机
- Metro Bundle
- Fast Refresh
- React DevTools

---

## 相似之处

### 1. 语法相同

```javascript
// 两者都支持相同的 React 语法
import React, { useState, useEffect } from 'react'

function Component() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  return <div>{data}</div>
}
```

### 2. 状态管理相同

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    }
  }
})
```

### 3. Hooks 相同

```javascript
import { useState, useEffect, useContext } from 'react'

// 两者都使用相同的 Hooks
const [count, setCount] = useState(0)
useEffect(() => {}, [])
```

### 4. TypeScript 支持

```typescript
import React, { useState } from 'react'

interface Props {
  title: string
  count: number
}

function App(props: Props) {
  const [value, setValue] = useState<string>('')

  return <div>{props.title}</div>
}
```

---

## 优势对比

### React Web 优势

- 1. **跨平台** - 一套代码，浏览器、小程序、PWA
- 2. **生态丰富** - 大量 UI 库（Ant Design、Material-UI）
- 3. **SEO 友好** - 搜索引擎可以索引内容
- 4. **热更新快** - Vite/Webpack HMR
- 5. **调试工具** - Chrome DevTools

### React Native 优势

- 1. **原生性能** - 使用原生组件，性能更好
- 2. **手机原生体验** - 支持手机原生特性（推送、定位等）
- 3. **热重载** - Fast Refresh
- 4. **一套代码多端** - iOS 和 Android 共享代码
- 5. **性能优化** - 不需要虚拟 DOM，直接渲染原生组件

---

## 选择建议

### 使用 React Web

- 网页应用
- 需要搜索引擎优化（SEO）
- 需要丰富的 UI 库
- 需要快速开发和迭代

### 使用 React Native

- 移动应用开发
- 需要原生性能
- 需要手机原生功能
- iOS 和 Android 共用代码

---

## 完整对比示例

### React Web 版博客应用

```javascript
// App.js
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
```

### React Native 版博客应用

```javascript
// App.js
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, StyleSheet } from 'react-native'

const Stack = createNativeStackNavigator()

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog Home</Text>
      <Text style={styles.subtitle}>Welcome to React Native!</Text>
    </View>
  )
}

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>Learn React Native</Text>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
})

export default App
```

---

## 总结

```
React vs React Native：

React：
- Web 网页开发
- HTML DOM
- CSS 样式
- React Router 导航
- 生态丰富
- SEO 友好

React Native：
- 移动端开发
- 原生组件
- StyleSheet 样式
- React Navigation 导航
- 原生性能
- 手机原生功能
```

**核心区别：**
1. React 使用 HTML DOM + CSS
2. React Native 使用原生组件 + StyleSheet
3. 语法基本相同，只是 UI 组件和样式不同
4. 都使用相同的 React 核心和状态管理
