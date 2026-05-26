# Electron 通信方式

Electron 有三种主要的通信方式：IPC、invoke 和 preload。

## 一、IPC 通信

### 1. 主进程发送到渲染进程

```javascript
// main.js
const { BrowserWindow } = require('electron')

// 发送消息到渲染进程
win.webContents.send('message', { type: 'greeting', content: 'Hello from main' })

// 渲染进程监听
ipcRenderer.on('message', (event, data) => {
  console.log(data)  // { type: 'greeting', content: 'Hello from main' }
})
```

### 2. 渲染进程发送到主进程

```javascript
// 渲染进程
const { ipcRenderer } = require('electron')

ipcRenderer.send('message', 'Hello from renderer')

// 主进程监听
const { ipcMain } = require('electron')

ipcMain.on('message', (event, data) => {
  console.log(data)  // 'Hello from renderer'
})
```

## 二、invoke 双向通信

### 1. 渲染进程调用主进程

```javascript
// 渲染进程
const result = await window.electronAPI.getUserData()

// 主进程处理
ipcMain.handle('get-user-data', async (event) => {
  const user = await fetchUser()
  return user
})
```

### 2. 带参数的调用

```javascript
// 渲染进程
const user = await window.electronAPI.getUserById(123)

// 主进程
ipcMain.handle('get-user-by-id', async (event, id) => {
  return await db.users.find(id)
})
```

## 三、Preload 桥接

### 1. 创建 preload

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 调用主进程方法
  getData: (params) => ipcRenderer.invoke('get-data', params),

  // 发送消息
  sendMessage: (msg) => ipcRenderer.send('send-message', msg),

  // 监听主进程消息
  onMessage: (callback) => {
    ipcRenderer.on('message', (event, data) => callback(data))
  },

  // 移除监听
  removeMessageListener: () => {
    ipcRenderer.removeAllListeners('message')
  }
})
```

### 2. 渲染进程使用

```javascript
// 调用方法
const data = await window.electronAPI.getData({ id: 1 })

// 发送消息
window.electronAPI.sendMessage('hello')

// 监听消息
window.electronAPI.onMessage((data) => {
  console.log('收到消息:', data)
})
```

### 3. BrowserWindow 配置

```javascript
// main.js
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,  // 隔离上下文
    nodeIntegration: false    // 禁用 Node
  }
})
```

## 四、通信方式对比

| 方式 | 说明 | 适用场景 |
|------|------|----------|
| `send` | 单向发送，不等待回复 | 通知、广播 |
| `invoke` | 双向通信，等待结果 | 调用功能、获取数据 |
| `on` + `send` | 双向通信 | 需要实时交互 |

## 五、完整示例

### 主进程

```javascript
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // 处理渲染进程调用
  ipcMain.handle('get-app-info', async () => {
    return {
      name: app.getName(),
      version: app.getVersion()
    }
  })

  // 监听渲染进程消息
  ipcMain.on('user-action', (event, action) => {
    console.log('用户操作:', action)
    // 处理操作
  })

  mainWindow.loadFile('index.html')
})
```

### Preload

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  sendUserAction: (action) => ipcRenderer.send('user-action', action),
  onNotification: (callback) => ipcRenderer.on('notification', callback)
})
```

### 渲染进程

```javascript
// renderer.js
// 获取应用信息
const appInfo = await window.electronAPI.getAppInfo()
console.log(appInfo)

// 发送用户操作
window.electronAPI.sendUserAction({ type: 'click', target: 'button' })

// 监听通知
window.electronAPI.onNotification((data) => {
  console.log('收到通知:', data)
})
```

## 六、安全最佳实践

### 1. 使用 contextBridge

```javascript
// 不好 - 直接暴露 ipcRenderer
contextBridge.exposeInMainWorld('electronAPI', {
  // 不好 - 暴露整个 ipcRenderer
  api: require('electron').ipcRenderer
})

// 好 - 只暴露需要的接口
contextBridge.exposeInMainWorld('electronAPI', {
  getData: (params) => ipcRenderer.invoke('get-data', params)
})
```

### 2. 参数验证

```javascript
// 主进程验证参数
ipcMain.handle('get-data', async (event, params) => {
  if (!params || typeof params.id !== 'number') {
    throw new Error('无效参数')
  }
  // 处理请求
})
```

### 3. 白名单机制

```javascript
// preload.js - 白名单
const validChannels = ['get-data', 'save-data']

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, data) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data)
    }
  }
})
```

## 七、注意事项

### 1. contextIsolation

```javascript
// 启用上下文隔离时，必须使用 preload
new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})
```

### 2. 移除监听

```javascript
// 组件卸载时移除监听
onMounted(() => {
  window.electronAPI.onMessage(handleMessage)
})

onUnmounted(() => {
  window.electronAPI.removeMessageListener()
})
```

### 3. 异步处理

```javascript
// 所有 invoke 调用都是异步的
const result = await window.electronAPI.getData()
// 不要同步等待
```