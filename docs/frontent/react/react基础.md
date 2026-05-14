# React 基础

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并开源。

## 核心概念

### 组件化

React 的核心思想是将 UI 拆分为独立、可复用的组件。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### JSX

JSX 是 JavaScript 的语法扩展，可以在 JavaScript 中编写类似 HTML 的结构。

```jsx
const element = <h1>Hello, world!</h1>;
```

### 虚拟 DOM

React 使用虚拟 DOM 来提高性能。当状态变更时，先更新虚拟 DOM，再通过 Diff 算法最小化真实 DOM 操作。

## 组件生命周期

### 常用钩子

- `constructor()` - 组件初始化
- `render()` - 渲染组件
- `componentDidMount()` - 组件挂载后
- `componentDidUpdate()` - 组件更新后
- `componentWillUnmount()` - 组件卸载前

### Hooks 方式

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `点击 ${count} 次`;
  }, [count]);

  return (
    <div>
      <p>点击 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点我
      </button>
    </div>
  );
}
```

## State 与 Props

### State

State 是组件内部的状态管理，用于存储会变化的数据。

```jsx
const [message, setMessage] = useState('Hello');
```

### Props

Props 是父组件传递给子组件的数据，只读不可修改。

```jsx
function ChildComponent({ title, content }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
```

## 事件处理

```jsx
function handleClick() {
  console.log('按钮被点击');
}

<button onClick={handleClick}>点击</button>
```

## 条件渲染

```jsx
{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}

{showMessage && <Message text="Hello" />}
```

## 列表渲染

```jsx
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((num) => (
        <li key={num.id}>{num.value}</li>
      ))}
    </ul>
  );
}
```
