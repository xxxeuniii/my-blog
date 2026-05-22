# Electron 打包与更新

## 一、打包工具选择

### 1. electron-builder（推荐）

功能强大，支持自动更新，配置简单：

```bash
npm install electron-builder --save-dev
```

### 2. electron-packager

更轻量，但不支持自动更新：

```bash
npm install electron-packager --save-dev
```

## 二、多平台打包配置

### 1. 打包命令汇总

```bash
# 打包所有平台
npm run dist

# 仅打包 Windows
npm run dist:win

# 仅打包 macOS
npm run dist:mac

# 仅打包 Linux
npm run dist:linux

# 打包指定平台和架构
electron-builder --win --x64    # Windows 64位
electron-builder --mac --arm64  # macOS ARM64
electron-builder --linux --ia32 # Linux 32位
```

### 2. package.json 配置示例

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "scripts": {
    "start": "electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder",
    "dist:win": "electron-builder --win",
    "dist:mac": "electron-builder --mac",
    "dist:linux": "electron-builder --linux",
    "dist:win32": "electron-builder --win --ia32",
    "dist:mac-arm": "electron-builder --mac --arm64",
    "dist:uos": "electron-builder --linux --x64 --config.nsis.target=appimage"
  },
  "build": {
    "appId": "com.example.myapp",
    "productName": "MyApp",
    "copyright": "Copyright © 2024",
    "directories": {
      "output": "dist",
      "buildResources": "build"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "package.json",
      "main.js",
      "preload.js"
    ],
    "extraResources": [
      {
        "from": "resources/",
        "to": "resources"
      }
    ],
    "mac": {
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        },
        "zip"
      ],
      "category": "public.app-category.productivity",
      "icon": "build/icon.icns",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        },
        "zip"
      ],
      "icon": "build/icon.ico",
      "verifyUpdateCodeSignature": false
    },
    "linux": {
      "target": ["AppImage", "deb", "rpm", "snap"],
      "icon": "build/icons",
      "category": "Utility",
      "desktop": {
        "Comment": "My Electron Application",
        "Keywords": "app;electron;utility"
      }
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "build/icon.ico",
      "uninstallerIcon": "build/icon.ico",
      "installerHeaderIcon": "build/icon.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    },
    "publish": {
      "provider": "github",
      "repo": "my-electron-app",
      "owner": "username",
      "releaseType": "release"
    }
  }
}
```

## 三、各平台打包详解

### 1. Windows 平台打包

#### 支持的目标格式

| 格式 | 说明 | 适用场景 |
|------|------|----------|
| `nsis` | 安装程序（推荐） | 桌面应用分发 |
| `nsis-web` | 网络安装程序 | 大体积应用 |
| `portable` | 便携版（免安装） | 临时使用 |
| `appx` | Microsoft Store 格式 | 应用商店上架 |
| `msi` | Windows Installer | 企业部署 |

#### 配置示例

```json
{
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]  // 同时打包 64 位和 32 位
      },
      {
        "target": "portable",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icon.ico",
    "verifyUpdateCodeSignature": false,
    "requestExecutionLevel": "highestAvailable",
    "extraResources": [
      {
        "from": "resources/win/",
        "to": "."
      }
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "installerIcon": "build/icon.ico",
    "uninstallerIcon": "build/icon.ico",
    "installerHeaderIcon": "build/icon.ico",
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "menuCategory": "MyApp",
    "runAfterFinish": true
  }
}
```

### 2. macOS 平台打包

#### 支持的目标格式

| 格式 | 说明 | 适用场景 |
|------|------|----------|
| `dmg` | 磁盘镜像（推荐） | 桌面应用分发 |
| `pkg` | 安装包 | 企业部署 |
| `zip` | 压缩包 | 快速分发 |

#### 配置示例（支持 Apple Silicon）

```json
{
  "mac": {
    "target": [
      {
        "target": "dmg",
        "arch": ["x64", "arm64"]  // 通用二进制
      },
      {
        "target": "pkg",
        "arch": ["x64", "arm64"]
      },
      "zip"
    ],
    "category": "public.app-category.productivity",
    "icon": "build/icon.icns",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist",
    "extendInfo": {
      "NSCameraUsageDescription": "需要访问摄像头进行视频通话",
      "NSMicrophoneUsageDescription": "需要访问麦克风进行语音通话"
    }
  }
}
```

#### 通用二进制说明

```bash
# 构建通用二进制（同时包含 x64 和 arm64）
electron-builder --mac --universal

# 仅构建 ARM64
electron-builder --mac --arm64

# 仅构建 x64
electron-builder --mac --x64
```

### 3. Linux/信创平台打包

#### 支持的国产信创系统

| 系统 | 基于 | 架构 | 推荐格式 |
|------|------|------|----------|
| 统信 UOS | Debian | x64/arm64 | deb/AppImage |
| 银河麒麟 | Ubuntu | x64/arm64 | deb/AppImage |
| 中标麒麟 | RHEL | x64 | rpm |
| 深度 Deepin | Debian | x64 | deb |
| 红旗 Linux | RHEL | x64 | rpm |

#### 配置示例

```json
{
  "linux": {
    "target": [
      "AppImage",      // 通用格式，所有 Linux 发行版可用
      {
        "target": "deb",
        "arch": ["x64", "arm64"]
      },
      {
        "target": "rpm",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icons",
    "category": "Utility",
    "desktop": {
      "Comment": "My Electron Application",
      "Keywords": "app;electron;utility",
      "StartupWMClass": "my-electron-app"
    },
    "extraResources": [
      {
        "from": "resources/linux/",
        "to": "."
      }
    ]
  }
}
```

#### 信创系统打包注意事项

```bash
# 在信创系统上直接构建
npm run dist:linux

# 交叉编译（在 Ubuntu 上为 ARM64 构建）
docker run --rm -v $(pwd):/project electronuserland/builder:wine \
  /bin/bash -c "cd /project && npm run dist:linux -- --arm64"

# 针对特定发行版构建
electron-builder --linux --deb --rpm
```

### 4. 跨平台打包策略

#### 策略一：本地分别构建（推荐）

```bash
# 在 Windows 上构建
npm run dist:win

# 在 macOS 上构建
npm run dist:mac

# 在 Linux/信创上构建
npm run dist:linux
```

#### 策略二：使用 CI/CD 自动构建

```yaml
# .github/workflows/build.yml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Windows
      if: matrix.os == 'windows-latest'
      run: npm run dist:win
    
    - name: Build macOS
      if: matrix.os == 'macos-latest'
      run: npm run dist:mac
    
    - name: Build Linux
      if: matrix.os == 'ubuntu-latest'
      run: npm run dist:linux
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: builds-${{ matrix.os }}
        path: dist/
```

#### 策略三：Docker 容器构建

```bash
# 创建 Dockerfile
FROM node:18-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run dist:linux
```

## 四、自动更新机制

### 1. 使用 electron-updater

```bash
npm install electron-updater --save
```

### 2. 主进程配置

```javascript
const { app, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.loadFile('index.html')
  
  // 检查更新
  checkForUpdates()
}

function checkForUpdates() {
  // 生产环境才检查更新
  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify()
    
    autoUpdater.on('update-available', (info) => {
      dialog.showMessageBox({
        type: 'info',
        title: '发现新版本',
        message: `新版本 ${info.version} 已发布，正在下载...`,
        buttons: ['确定']
      })
    })
    
    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        type: 'info',
        title: '已是最新版本',
        message: '当前版本已是最新。',
        buttons: ['确定']
      })
    })
    
    autoUpdater.on('update-downloaded', (info) => {
      dialog.showMessageBox({
        type: 'question',
        title: '更新下载完成',
        message: `新版本 ${info.version} 已下载完成，是否立即重启应用？`,
        buttons: ['重启', '稍后']
      }).then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
    })
    
    autoUpdater.on('error', (error) => {
      dialog.showErrorBox('更新失败', error.message)
    })
  }
}

app.whenReady().then(createWindow)
```

### 3. 预加载脚本暴露更新API

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback)
})
```

### 4. 渲染进程触发更新检查

```javascript
// renderer.js
document.getElementById('check-update-btn').addEventListener('click', () => {
  window.electronAPI.checkForUpdates()
})
```

## 四、代码签名

### macOS 代码签名

1. 获取开发者证书
2. 配置 entitlements.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.cs.allow-jit</key>
  <true/>
  <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
  <true/>
</dict>
</plist>
```

### Windows 代码签名

使用 EV 代码签名证书：

```json
{
  "build": {
    "win": {
      "certificateFile": "./cert.p12",
      "certificatePassword": "password"
    }
  }
}
```

## 五、发布策略

### 1. GitHub Releases

配置 `publish` 字段后，运行以下命令自动发布：

```bash
npm run dist
```

### 2. 自定义更新服务器

```javascript
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://your-server.com/updates/'
})
```

服务器目录结构：

```
updates/
├── latest-mac.yml
├── latest-win.yml
├── MyApp-1.0.0.dmg
├── MyApp-1.0.0.exe
└── MyApp-1.0.0.zip
```

## 六、版本管理

### 语义化版本控制

```bash
# 升级补丁版本 1.0.0 → 1.0.1
npm version patch

# 升级小版本 1.0.1 → 1.1.0
npm version minor

# 升级大版本 1.1.0 → 2.0.0
npm version major
```

### 更新日志生成

使用 standard-version：

```bash
npm install standard-version --save-dev
```

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

## 七、CI/CD 集成

### GitHub Actions 配置

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build and release
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: npm run dist
```

## 八、常见问题

### 1. 更新下载失败

- 检查网络连接
- 验证 GitHub token 权限
- 确认发布的版本 tag 正确

### 2. macOS 应用无法打开

- 确保正确签名
- 检查 Gatekeeper 设置
- 使用 `xattr -cr /path/to/app` 移除隔离属性

### 3. Windows 安装报毒

- 使用 EV 代码签名证书
- 向微软提交应用审核
- 更新病毒库白名单

### 4. 打包体积过大

- 使用 `asar` 压缩
- 移除不必要的依赖
- 使用 tree-shaking
- 配置 `files` 字段只包含必要文件

### 5. Node.js 版本兼容性问题

#### 问题表现
```
Error: The module was compiled against a different Node.js version
```

#### 解决方案

```bash
# 安装 electron-rebuild
npm install electron-rebuild --save-dev

# 在安装依赖后执行重建
./node_modules/.bin/electron-rebuild

# 或在 package.json 中添加脚本
{
  "scripts": {
    "rebuild": "electron-rebuild"
  }
}
```

#### 自动重建配置

```json
{
  "scripts": {
    "postinstall": "electron-rebuild"
  }
}
```

### 6. 系统架构不兼容（32位/64位）

#### 问题表现
- 64位应用无法在32位系统上运行
- 某些原生模块只支持特定架构

#### 解决方案

```json
{
  "build": {
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]  // 同时构建两个架构
        }
      ]
    }
  }
}
```

```bash
# 指定架构打包
electron-builder --win --ia32
electron-builder --mac --arm64
```

### 7. macOS 版本兼容性

#### 问题表现
- 在旧版 macOS 上启动崩溃
- 提示"无法打开应用，因为它来自身份不明的开发者"

#### 解决方案

```json
{
  "build": {
    "mac": {
      "minimumSystemVersion": "10.13",  // 指定最低 macOS 版本
      "hardenedRuntime": true,
      "gatekeeperAssess": false
    }
  }
}
```

### 8. Windows 系统兼容性

#### 问题表现
- Windows 7/8 上运行异常
- UAC 权限问题

#### 解决方案

```json
{
  "build": {
    "win": {
      "requestExecutionLevel": "asInvoker",  // 或 "requireAdministrator"
      "target": {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      }
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

### 9. 信创系统兼容性问题

#### 统信 UOS / 银河麒麟

```bash
# 安装依赖
sudo apt-get install -y libgconf-2-4 libnss3 libasound2

# 构建命令
electron-builder --linux --deb

# 设置执行权限
chmod +x ./dist/*.AppImage
```

#### 兼容性检查清单

| 检查项 | 说明 |
|--------|------|
| glibc 版本 | >= 2.27 (建议) |
| Node.js 版本 | LTS 版本 |
| 系统架构 | x64 或 arm64 |
| 依赖库 | libnss3、libasound2、libgconf-2-4 |

### 10. 原生模块兼容性

#### 解决方案

```javascript
// package.json
{
  "electronRebuild": {
    "force": true,
    "arch": "x64"
  }
}
```

```bash
# 使用环境变量指定 Electron 版本
ELECTRON_VERSION=28.0.0 npm rebuild
```

### 11. 网络代理问题

#### 问题表现
- 打包时无法下载 Electron
- 自动更新失败

#### 解决方案

```bash
# 设置代理
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port

# 或在 .npmrc 中配置
proxy=http://proxy:port
https-proxy=http://proxy:port
```

### 12. 路径长度限制（Windows）

#### 问题表现
```
Error: ENAMETOOLONG: name too long
```

#### 解决方案

```json
{
  "build": {
    "directories": {
      "output": "dist",  // 使用短路径
      "buildResources": "build"
    }
  }
}
```

### 13. 复制粘贴功能不适配

#### 问题表现
- 快捷键 Ctrl+C/Ctrl+V 无法使用
- 右键菜单没有复制粘贴选项
- 复制粘贴在某些系统上失效

#### 解决方案一：注册全局快捷键

```javascript
// main.js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // 注册复制快捷键
  globalShortcut.register('CommandOrControl+C', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.webContents.copy()
    }
  })

  // 注册粘贴快捷键
  globalShortcut.register('CommandOrControl+V', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.webContents.paste()
    }
  })
})
```

#### 解决方案二：实现自定义右键菜单

```javascript
// main.js
const { Menu, MenuItem } = require('electron')

const contextMenu = new Menu()
contextMenu.append(new MenuItem({ label: '复制', role: 'copy' }))
contextMenu.append(new MenuItem({ label: '粘贴', role: 'paste' }))
contextMenu.append(new MenuItem({ type: 'separator' }))
contextMenu.append(new MenuItem({ label: '全选', role: 'selectAll' }))

// 在所有窗口中监听右键菜单
app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (event, params) => {
    contextMenu.popup({ window: win, x: params.x, y: params.y })
  })
})
```

#### 解决方案三：渲染进程处理

```javascript
// renderer.js
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    e.preventDefault()
    document.execCommand('copy')
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
    e.preventDefault()
    document.execCommand('paste')
  }
})
```

#### 解决方案四：使用 Clipboard API

```javascript
// main.js
const { clipboard } = require('electron')

// 复制文本
clipboard.writeText('Hello World')

// 粘贴文本
const text = clipboard.readText()
console.log(text)
```

#### 解决方案五：启用 webSecurity

```javascript
// main.js
const win = new BrowserWindow({
  webPreferences: {
    webSecurity: true,  // 确保 webSecurity 启用
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})
```

#### 解决方案六：Preload 脚本暴露剪贴板 API

```javascript
// preload.js
const { contextBridge, clipboard } = require('electron')

contextBridge.exposeInMainWorld('clipboardAPI', {
  copy: (text) => clipboard.writeText(text),
  paste: () => clipboard.readText()
})
```

```javascript
// renderer.js
// 使用
window.clipboardAPI.copy('Hello')
const text = window.clipboardAPI.paste()
```

#### 常见问题排查

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 快捷键无效 | 快捷键被其他程序占用 | 使用全局快捷键注册 |
| 右键菜单不显示 | 未监听 context-menu 事件 | 添加事件监听器 |
| 粘贴失败 | 剪贴板为空或权限不足 | 检查剪贴板内容和权限 |
| 跨进程复制失败 | 主进程和渲染进程隔离 | 使用 IPC 通信 |

## 九、兼容性测试策略

### 1. 多环境测试矩阵

| 系统 | 版本 | 架构 | 测试重点 |
|------|------|------|----------|
| Windows | 7/10/11 | x64/ia32 | 安装、运行、更新 |
| macOS | 10.15+/12+/13+ | x64/arm64 | 签名、权限、沙箱 |
| Ubuntu | 18.04/20.04/22.04 | x64 | 依赖库、权限 |
| 统信 UOS | 20/22 | x64/arm64 | 兼容性、依赖 |
| 银河麒麟 | V10 | x64/arm64 | 兼容性、依赖 |

### 2. CI/CD 集成测试

```yaml
name: Compatibility Test

on: [push]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18.x
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run dist
    
    - name: Test
      run: |
        if [ "$RUNNER_OS" == "Windows" ]; then
          ./dist/*.exe --version
        elif [ "$RUNNER_OS" == "macOS" ]; then
          ./dist/*.app/Contents/MacOS/* --version
        else
          ./dist/*.AppImage --version
        fi
```

### 3. 兼容性日志收集

```javascript
// main.js
const { app } = require('electron')

app.on('ready', () => {
  console.log('Electron version:', process.versions.electron)
  console.log('Node.js version:', process.versions.node)
  console.log('Chrome version:', process.versions.chrome)
  console.log('Platform:', process.platform)
  console.log('Arch:', process.arch)
})
```

## 十、最佳实践

1. **保持更新检查轻量化**：不要过于频繁检查更新
2. **提供手动更新选项**：允许用户手动触发更新检查
3. **优雅处理更新失败**：提供明确的错误提示和重试机制
4. **测试更新流程**：在发布前完整测试更新流程
5. **备份旧版本**：保留历史版本供降级使用
6. **签名所有版本**：确保安全性和可信度