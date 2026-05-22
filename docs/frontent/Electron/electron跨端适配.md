# Electron H5 跨端适配

Electron 本质上是运行在桌面端的浏览器，内置 Chromium 引擎，H5 页面基本能直接运行。跨端适配主要考虑两个方面：系统 API 差异和响应式页面适配。

## 一、系统 API 差异

> 什么是系统 API 差异？
> 不同操作系统（Windows、macOS、Linux）提供给应用程序的接口不一样，需要分别适配。
>
> | 场景 | Windows | macOS | Linux |
> |------|---------|-------|-------|
> | 快捷键 | Ctrl + C | Command + C | Ctrl + C |
> | 文件路径 | `C:\Users\` | `/Users/` | `/home/` |
> | 换行符 | `\r\n` | `\n` | `\n` |

### 1. 平台判断

```javascript
// main.js - 判断操作系统
const { app } = require('electron')

if (process.platform === 'win32') {
  // Windows 系统
} else if (process.platform === 'darwin') {
  // macOS 系统
} else if (process.platform === 'linux') {
  // Linux 系统
}
```

### 2. 路径分隔符

```javascript
const path = require('path')

// 跨平台路径拼接
const filePath = path.join(__dirname, 'resources', 'file.txt')

// 获取用户主目录
const homeDir = app.getPath('home')
// 获取临时目录
const tempDir = app.getPath('temp')
```

### 3. 快捷键适配

```javascript
// 使用 CommandOrControl 自动适配
// macOS: Command键
// Windows/Linux: Ctrl键

// 主进程中注册全局快捷键
const { globalShortcut } = require('electron')

app.on('ready', () => {
  // 复制 - CommandOrControl+C
  globalShortcut.register('CommandOrControl+C', () => {
    // 处理复制
  })

  // 粘贴 - CommandOrControl+V
  globalShortcut.register('CommandOrControl+V', () => {
    // 处理粘贴
  })

  // 设置 - CommandOrControl+,
  globalShortcut.register('CommandOrControl+,', () => {
    // 打开设置
  })
})
```

### 4. 系统通知

```javascript
const { Notification } = require('electron')

// 显示系统通知
if (Notification.isSupported()) {
  new Notification({
    title: '提示',
    body: '消息内容'
  }).show()
}
```

### 5. 剪贴板

```javascript
const { clipboard } = require('electron')

// 复制文本
clipboard.writeText('内容')

// 读取文本
const text = clipboard.readText()

// 复制图片
clipboard.writeImage(nativeImage)

// 读取图片
const image = clipboard.readImage()
```

### 6. 文件对话框

```javascript
const { dialog } = require('electron')

// 打开文件对话框
const result = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ]
})

// 保存文件对话框
const result = await dialog.showSaveDialog({
  defaultPath: 'filename.txt',
  filters: [
    { name: 'Text Files', extensions: ['txt'] }
  ]
})
```

## 二、响应式页面适配

### 1. 响应式布局

```css
/* 使用 rem/em 相对单位 */
html {
  font-size: 16px;
}

/* 媒体查询适配不同窗口尺寸 */
@media (max-width: 1024px) {
  html { font-size: 15px; }
}

@media (max-width: 768px) {
  html { font-size: 14px; }
}

@media (max-width: 480px) {
  html { font-size: 13px; }
}
```

### 2. 窗口尺寸适配

```javascript
// main.js - 监听窗口大小变化
const { BrowserWindow } = require('electron')

win.on('resize', () => {
  const { width, height } = win.getBounds()
  console.log(`窗口尺寸: ${width}x${height}`)
  // 可以发送消息给渲染进程调整布局
  win.webContents.send('window-resized', { width, height })
})
```

```javascript
// renderer.js - 接收窗口变化
window.electronAPI?.onWindowResized((event, { width, height }) => {
  if (width < 768) {
    // 切换到移动端布局
  } else {
    // 切换到桌面端布局
  }
})
```

### 3. 触摸事件适配

```javascript
// 触摸设备检测
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

// 禁用右键菜单（桌面端保留，移动端不需要）
if (isTouchDevice) {
  document.addEventListener('contextmenu', (e) => e.preventDefault())
}

// 触摸事件处理
document.addEventListener('touchstart', (e) => {
  // 处理触摸开始
}, { passive: true })

document.addEventListener('touchmove', (e) => {
  // 处理触摸移动
}, { passive: true })

document.addEventListener('touchend', (e) => {
  // 处理触摸结束
})
```

### 4. 获取屏幕信息

```javascript
const { screen } = require('electron')

// 获取主显示器信息
const primaryDisplay = screen.getPrimaryDisplay()
const { width, height } = primaryDisplay.workAreaSize
const scaleFactor = primaryDisplay.scaleFactor

// 获取所有显示器
const displays = screen.getAllDisplays()
displays.forEach(display => {
  console.log(`显示器: ${display.bounds.width}x${display.bounds.height}`)
})

// 设置合适的窗口大小
win.setMinimumSize(800, 600)
win.setMaximumSize(width, height)
```

### 5. 检测是否在 Electron 环境

```javascript
// renderer.js
const isElectron = window.electronAPI !== undefined

if (isElectron) {
  // Electron 特有逻辑
} else {
  // 普通浏览器逻辑
}
```

### 6. 预加载脚本暴露 API

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 窗口操作
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  // 监听窗口变化
  onWindowResized: (callback) => {
    ipcRenderer.on('window-resized', (event, data) => callback(data))
  },

  // 剪贴板
  copy: (text) => ipcRenderer.send('clipboard-write', text),
  paste: () => ipcRenderer.invoke('clipboard-read'),

  // 系统信息
  getPlatform: () => process.platform,
  getVersion: () => process.versions.electron,
})
```

## 三、性能优化

### 1. 减少 DOM 操作

```javascript
// 使用文档片段批量操作
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div')
  div.textContent = `Item ${i}`
  fragment.appendChild(div)
}
document.getElementById('container').appendChild(fragment)
```

### 2. CSS 动画替代 JS 动画

```css
/* 使用 CSS transform */
.element {
  transition: transform 0.3s ease;
}

.element:hover {
  transform: translateX(10px);
}
```

### 3. 图片优化

```html
<!-- 使用懒加载 -->
<img src="image.jpg" loading="lazy" alt="">

<!-- 使用 srcset 响应式图片 -->
<img srcset="image-320.jpg 320w,
             image-640.jpg 640w,
             image-1024.jpg 1024w"
     sizes="(max-width: 480px) 280px,
            (max-width: 960px) 580px,
            980px"
     src="image-640.jpg" alt="">
```

### 4. 代码分割

```javascript
// 动态导入
const HeavyModule = dynamic(
  () => import('./HeavyModule'),
  { ssr: false }
)
```

## 四、跨端 UI 框架

### 常用框架对比

| 框架 | 说明 | 适用场景 |
|------|------|----------|
| **Electron + Vue/React** | 常规 Web 技术栈 | 通用桌面应用 |
| **Tauri** | Rust 后端，更轻量 | 轻量级应用 |
| **UniApp** | H5 + 小程序 + App | 需要同时支持移动端 |
| **Flutter** | 自研渲染引擎 | 高度定制 UI |

## 五、最佳实践

### 1. 渐进增强

```javascript
// 先实现核心功能，再添加增强功能
function init() {
  // 基础功能（所有环境可用）
  initBasic()

  // 平台特定增强
  if (isElectron) {
    initElectronFeatures()
  }

  if (isTouchDevice) {
    initTouchFeatures()
  }
}
```

### 2. 功能检测

```javascript
// 检测功能支持情况
const features = {
  clipboard: !!navigator.clipboard,
  notifications: !!window.Notification,
  touch: 'ontouchstart' in window,
}

// 条件启用功能
if (features.clipboard) {
  enableClipboardFeature()
}
```

### 3. 统一错误处理

```javascript
// 统一错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason)
})
```

## 总结

Electron 跨端适配核心就两点：

1. **系统 API 差异** - 处理不同操作系统的路径、快捷键、原生功能差异
2. **响应式适配** - 适配不同窗口尺寸和触摸设备

Electron 内置 Chromium，H5 代码基本能直接运行，其他和普通 Web 开发无异。