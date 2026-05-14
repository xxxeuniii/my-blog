# Electron 基础

Electron 是一个使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用的框架。它基于 Chromium 和 Node.js，让你可以用 Web 技术创建原生桌面应用。

## 核心概念

### 主进程与渲染进程

Electron 应用分为两个主要进程：

**主进程 (Main Process)**：
- 运行 Node.js 环境
- 管理应用生命周期
- 创建和管理浏览器窗口
- 访问系统原生 API

**渲染进程 (Renderer Process)**：
- 运行在 Chromium 中
- 每个 BrowserWindow 有一个渲染进程
- 可以使用 Web API

```javascript
// main.js - 主进程
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

## 基本结构

一个典型的 Electron 项目结构：

```
my-electron-app/
├── package.json
├── main.js          # 主进程入口
├── preload.js       # 预加载脚本（可选）
└── index.html       # 渲染进程页面
```

## 主进程 API

### 创建窗口

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  width: 800,
  height: 600,
  title: 'My App',
  icon: 'icon.png',
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})
```

### 菜单

```javascript
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'File',
  submenu: [
    { label: 'Open', accelerator: 'CmdOrCtrl+O' },
    { type: 'separator' },
    { label: 'Exit', role: 'quit' }
  ]
}))

Menu.setApplicationMenu(menu)
```

## 进程间通信

### IPC (Inter-Process Communication)

主进程向渲染进程发送消息：

```javascript
// main.js
win.webContents.send('message', 'Hello from main')
```

渲染进程接收消息：

```javascript
// renderer.js
const { ipcRenderer } = require('electron')

ipcRenderer.on('message', (event, arg) => {
  console.log(arg) // Hello from main
})
```

渲染进程向主进程发送消息：

```javascript
// renderer.js
ipcRenderer.send('async-message', 'Ping')

ipcRenderer.on('async-reply', (event, arg) => {
  console.log(arg) // Pong
})
```

主进程处理消息：

```javascript
// main.js
ipcMain.on('async-message', (event, arg) => {
  console.log(arg) // Ping
  event.reply('async-reply', 'Pong')
})
```

## 打包与分发

### 使用 electron-builder

```json
{
  "scripts": {
    "dist": "electron-builder"
  }
}
```

### 打包配置

```json
{
  "build": {
    "appId": "com.example.myapp",
    "productName": "My App",
    "directories": {
      "output": "dist"
    },
    "mac": {
      "category": "public.app-category.utilities"
    },
    "win": {
      "target": "nsis"
    }
  }
}
```

## 安全最佳实践

1. **禁用 nodeIntegration**：在生产环境中保持 `nodeIntegration: false`
2. **启用 contextIsolation**：隔离渲染进程和主进程
3. **使用 preload 脚本**：安全地暴露 API 给渲染进程
4. **验证所有 IPC 消息**：验证来自渲染进程的输入

## 常用模块

- `app` - 应用生命周期管理
- `BrowserWindow` - 窗口管理
- `Menu` - 菜单管理
- `ipcMain` / `ipcRenderer` - 进程间通信
- `dialog` - 对话框
- `shell` - 系统 shell 集成
