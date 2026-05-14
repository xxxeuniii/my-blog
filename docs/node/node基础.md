# Node.js 基础

## 一、Node.js 简介

### 1.1 什么是 Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，允许在服务器端运行 JavaScript 代码。

**核心特点：**
- **非阻塞 I/O**：异步处理，高并发
- **事件驱动**：基于事件循环机制
- **单线程**：避免多线程同步问题
- **跨平台**：Windows、macOS、Linux

### 1.2 安装 Node.js

```bash
# 检查安装
node -v
npm -v

# 使用 nvm 管理版本（推荐）
nvm install 20
nvm use 20
```

### 1.3 第一个 Node.js 程序

```javascript
// hello.js
console.log('Hello, Node.js!');
```

运行：
```bash
node hello.js
```

## 二、模块系统

### 2.1 CommonJS 模块

```javascript
// 导出模块
// utils.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// 导入模块
const { add } = require('./utils');
console.log(add(2, 3)); // 5
```

### 2.2 ES 模块

```javascript
// 导出
export const name = 'Node.js';
export function greet() {
  return 'Hello';
}

// 导入
import { name, greet } from './module.js';
```

**package.json 配置：**
```json
{
  "type": "module"
}
```

### 2.3 内置模块

```javascript
const fs = require('fs');      // 文件系统
const path = require('path');  // 路径处理
const http = require('http');  // HTTP 服务
const url = require('url');    // URL 解析
const crypto = require('crypto'); // 加密
```

## 三、文件系统操作

### 3.1 同步读取文件

```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

### 3.2 异步读取文件

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### 3.3 写入文件

```javascript
// 同步写入
fs.writeFileSync('output.txt', 'Hello, World!');

// 异步写入
fs.writeFile('output.txt', 'Hello, Node!', (err) => {
  if (err) throw err;
  console.log('File written');
});
```

### 3.4 目录操作

```javascript
// 创建目录
fs.mkdirSync('newdir', { recursive: true });

// 读取目录
const files = fs.readdirSync('.');
console.log(files);

// 删除文件
fs.unlinkSync('file.txt');
```

## 四、HTTP 服务

### 4.1 创建基础 HTTP 服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js HTTP Server');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

### 4.2 处理不同路由

```javascript
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  switch (req.url) {
    case '/':
      res.end(JSON.stringify({ message: 'Home Page' }));
      break;
    case '/api/users':
      res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
  }
});
```

## 五、npm 包管理

### 5.1 初始化项目

```bash
npm init -y
```

### 5.2 安装依赖

```bash
# 安装生产依赖
npm install express

# 安装开发依赖
npm install -D nodemon

# 安装指定版本
npm install lodash@4.17.21

# 全局安装
npm install -g create-react-app
```

### 5.3 package.json 脚本

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

运行脚本：
```bash
npm run dev
```

## 六、异步编程

### 6.1 回调函数

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { data: 'Hello' });
  }, 1000);
}

fetchData((err, result) => {
  if (err) throw err;
  console.log(result);
});
```

### 6.2 Promise

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
    // reject(new Error('Failed'));
  }, 1000);
});

promise.then(result => {
  console.log(result);
}).catch(err => {
  console.error(err);
});
```

### 6.3 async/await

```javascript
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

getData();
```

## 七、事件机制

### 7.1 事件发射器

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// 监听事件
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// 触发事件
emitter.emit('greet', 'Alice');
```

### 7.2 常用事件方法

```javascript
// 单次监听
emitter.once('event', () => {
  console.log('Only once');
});

// 移除监听器
const listener = () => console.log('Listener');
emitter.on('event', listener);
emitter.removeListener('event', listener);

// 获取监听器数量
console.log(emitter.listenerCount('event'));
```

## 八、流（Stream）

### 8.1 可读流

```javascript
const fs = require('fs');

const readable = fs.createReadStream('large-file.txt');

readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

readable.on('end', () => {
  console.log('File read complete');
});
```

### 8.2 可写流

```javascript
const writable = fs.createWriteStream('output.txt');

writable.write('Hello ');
writable.write('World');
writable.end();

writable.on('finish', () => {
  console.log('Write complete');
});
```

### 8.3 管道流

```javascript
// 复制文件
const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable.pipe(writable);
```

## 九、进程与环境

### 9.1 进程信息

```javascript
// 命令行参数
console.log(process.argv);

// 环境变量
console.log(process.env.NODE_ENV);

// 当前工作目录
console.log(process.cwd());

// 进程 ID
console.log(process.pid);
```

### 9.2 退出进程

```javascript
// 正常退出
process.exit(0);

// 异常退出
process.exit(1);

// 监听退出事件
process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`);
});
```

## 十、调试技巧

### 10.1 使用 console

```javascript
console.log('Normal log');
console.error('Error message');
console.warn('Warning');
console.table([{ name: 'Alice' }, { name: 'Bob' }]);
console.time('timer');
// code...
console.timeEnd('timer');
```

### 10.2 使用 Node Inspector

```bash
node inspect app.js
```

### 10.3 使用 Chrome DevTools

```bash
node --inspect app.js
```

然后在 Chrome 中打开 `chrome://inspect`

## 十一、常见工具库

| 库名 | 用途 |
|------|------|
| lodash | 工具函数库 |
| axios | HTTP 客户端 |
| moment | 日期处理 |
| chalk | 命令行颜色 |
| commander | CLI 工具 |

## 总结

Node.js 基础涵盖：
1. 模块系统（CommonJS/ES Module）
2. 文件系统操作
3. HTTP 服务创建
4. npm 包管理
5. 异步编程（回调/Promise/async-await）
6. 事件机制和流处理

掌握这些基础是学习 Express、NestJS 等框架的前提。