# Redux 详解

## Redux 是什么

Redux 是一个用于 JavaScript 应用的**可预测的状态容器**，提供了**可预测的状态管理**解决方案。

### 核心概念

```
Redux = Reducer + Flux

Flux：
- 单向数据流
- Store（状态存储）
- Action（动作）
- Dispatcher（调度器）

Redux = Flux + Reducer（简化 Flux）
```

---

## 核心原则

### 1. 单向数据流

```
Action → Dispatch → Reducer → State → View → Action
   ↓          ↓         ↓       ↓       ↓        ↓
  定义      调用     处理     更新    渲染    用户操作
```

**流程：**
1. 用户触发 Action
2. 调用 `dispatch(action)`
3. Reducer 接收 Action 并更新 State
4. View 根据新 State 重新渲染
5. 循环往复

### 2. 单一数据源

整个应用的 State 存储在**一个 Store** 中。

```javascript
const initialState = {
  user: null,
  count: 0,
  items: []
}

const store = createStore(reducer, initialState)
```

### 3. State 是只读的

State 只能通过 `dispatch(action)` 修改，不能直接修改。

```javascript
// ❌ 错误：直接修改
state.count++

// ✅ 正确：通过 dispatch 修改
dispatch({ type: 'INCREMENT' })
```

---

## Redux 核心概念

### 1. Action

Action 是一个**描述发生了什么**的对象。

```javascript
// Action 格式
{
  type: 'ACTION_TYPE',
  payload: {
    // 数据载荷
  },
  meta: {
    // 元数据
  }
}

// 简单 Action
{ type: 'INCREMENT' }

// 带载荷 Action
{ type: 'SET_USER', payload: { name: 'John', age: 25 } }

// 复杂 Action
{
  type: 'UPDATE_ITEMS',
  payload: [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' }
  ]
}
```

### 2. Action Creator

Action Creator 是创建 Action 的**函数**。

```javascript
// 简单 Action Creator
function increment() {
  return { type: 'INCREMENT' }
}

// 带载荷 Action Creator
function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: { name }
  }
}

// 异步 Action Creator
function fetchUserData(userId) {
  return async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json()
    dispatch({ type: 'SET_USER', payload: data })
  }
}
```

### 3. Reducer

Reducer 是一个**纯函数**，接收旧 State 和 Action，返回新 State。

```javascript
// Reducer 格式
(prevState, action) => newState

// 简单 Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 复杂 Reducer
function userReducer(state = null, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

// 组合多个 Reducer
function rootReducer(state = {}, action) {
  return {
    user: userReducer(state.user, action),
    count: counterReducer(state.count, action)
  }
}
```

**Reducer 特点：**
- 纯函数（相同输入→相同输出）
- 不可变更新 State
- 使用 `switch` 或对象展开

### 4. Store

Store 是**状态的容器**，提供以下方法：

```javascript
// 创建 Store
const store = createStore(rootReducer, initialState)

// 获取 State
const state = store.getState()

// Dispatch Action
store.dispatch({ type: 'INCREMENT' })

// 订阅/取消订阅
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState())
})

unsubscribe()  // 取消订阅
```

---

## Redux Toolkit (RTK)

Redux Toolkit 是 Redux 的**官方推荐方案**，简化了 Redux 的使用。

### 为什么需要 RTK？

**Redux 原始方式的问题：**
- 需要手动创建 store
- 需要手动写 action types
- 需要手动写 action creators
- 需要手动写 reducers
- 需要处理异步逻辑

**RTK 解决了这些问题：**
- 内置 `configureStore`
- 内置 `createSlice` 自动生成 action creators
- 内置 `createAsyncThunk` 处理异步逻辑
- 内置 Immer 库处理不可变数据

---

## Redux Toolkit 示例

### 1. 安装依赖

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. 创建 Slice

```javascript
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count++  // Immer 允许直接修改
    },
    decrement: (state) => {
      state.count--
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### 3. 配置 Store

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

### 4. 挂载到 React

```javascript
// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```

### 5. 在组件中使用

```javascript
// App.js
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  )
}

export default App
```

---

## 异步操作

### 使用 createAsyncThunk

```javascript
// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 异步 Action Creator
const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users')
    return response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { fetchUsers } = userSlice.actions
export default userSlice.reducer
```

### 在组件中使用

```javascript
// App.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

function App() {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

---

## 组合多个 Slice

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer
  }
})
```

---

## Selector 优化

### 使用 `createSelector` 优化性能

```javascript
import { createSelector } from '@reduxjs/toolkit'

// 原始 Selector
const selectUsers = (state) => state.user.users
const selectLoading = (state) => state.user.loading

// 优化后的 Selector（自动记忆化）
const selectUserNames = createSelector(
  [selectUsers],
  (users) => users.map((user) => user.name)
)

// 使用
const userNames = useSelector(selectUserNames)
```

---

## Middleware

### 添加 Logger Middleware

```javascript
// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'

const middlewares = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: middlewares
})
```

### 添加 Redux Thunk

```javascript
// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const middlewares = [...getDefaultMiddleware(), thunk]

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: middlewares
})
```

---

## DevTools

### 启用 Redux DevTools

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@reduxjs/toolkit/dist/devtoolsExtension'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  enhancer: devToolsEnhancer()
})
```

---

## 类型支持（TypeScript）

### 定义 Types

```typescript
// types.ts
interface CounterState {
  count: number
}

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

interface State {
  counter: CounterState
  user: UserState
}

interface User {
  id: number
  name: string
  email: string
}
```

### 创建 Slice with TypeScript

```typescript
// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0
}

const counterSlice = createSlice<CounterState, {
  increment: () => void
  decrement: () => void
  incrementByAmount: (amount: number) => void
}>({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

---

## Redux vs Vuex

| 特性 | Redux | Vuex |
|------|-------|------|
| **状态来源** | 单一 Store | Store（支持多模块） |
| **状态修改** | Reducer（纯函数） | Mutations（同步） |
| **异步操作** | Middleware（Thunk/Saga） | Actions（异步） |
| **可变数据** | 不可变 | 可变 |
| **学习曲线** | 较陡 | 较平缓 |
| **DevTools** | 官方支持 | 社区插件 |
| **React Native** | 支持 | 不支持 |

---

## 总结

```
Redux 核心概念：

1. Action（动作）
   - 描述发生了什么
   - 格式：{ type, payload }

2. Reducer（处理函数）
   - 纯函数，接收 State 和 Action
   - 返回新 State

3. Store（状态容器）
   - 存储整个应用的 State
   - 提供 getState, dispatch, subscribe 方法

4. 单向数据流
   Action → Dispatch → Reducer → State → View
```

**Redux Toolkit 优势：**
- 简化 API，减少样板代码
- 内置 Immer 处理不可变数据
- 内置 createAsyncThunk 处理异步
- 官方推荐方案

**适用场景：**
- 大型应用
- 复杂状态管理
- 需要可预测的状态更新
- 多人协作的项目
