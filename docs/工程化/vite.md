# **Vite 详解**

## **一、Vite 是什么？**

Vite（法语“快速”的意思）是一个 **现代前端构建工具**，专为 **开发体验优化**，主要用于 **Vue、React** 等框架的开发。相比 Webpack，Vite **启动更快、构建更快、热更新更快**，是新一代前端开发工具。

### **1. Vite 的特点**

 **极快的开发服务器**（基于 ES Module，避免了 Webpack 的“打包等待”）
  **原生 ES Module 支持**（只编译当前使用的模块，提升速度）
  **更快的热更新（HMR）**（仅更新改动部分，减少浏览器刷新）
  **内置支持 TypeScript、Vue、React、CSS 预处理器**
  **Rollup 构建优化**（生产环境使用 Rollup 进行打包，优化输出）

------

## **二、Vite 的核心原理**

Vite **分为两种模式**：

1. **开发模式（Dev Mode）**：基于 **ES Module**，不需要打包，按需加载文件。
2. **生产模式（Build Mode）**：使用 **Rollup** 进行打包优化，生成高效的静态文件。

### **1. 传统 Webpack 的问题**

Webpack **启动慢**，因为：

- 需要 **提前打包** 整个项目（即使只改了一行代码）。
- 代码改动后，热更新 **重新编译整个 Bundle**，导致速度变慢。

### **2. Vite 解决方案**

- 开发模式下，Vite **不需要打包**，直接基于 **浏览器的 ES Module** 机制进行按需加载。
- 修改代码时，Vite **只编译改动的模块**，而不是重新打包整个项目，**HMR（热更新）速度更快**。

------

## **三、Vite 的安装与使用**

### **1. 安装 Vite**

Vite 支持 **Vue、React、Svelte 等框架**，可以直接创建项目：

```sh
# 直接创建 Vue 项目
npm create vite@latest my-vite-app -- --template vue

# 创建 React 项目
npm create vite@latest my-vite-app -- --template react
```

或者手动安装：

```sh
npm install vite -g  # 全局安装
```

------

### **2. 运行 Vite**

```sh
npm run dev  # 启动开发服务器
```

 **Vite 启动速度极快**，因为它 **不需要打包**，直接使用浏览器解析模块。

------

## **四、Vite 的核心配置**

Vite 的配置文件是 `vite.config.js`，支持 TypeScript 版本 `vite.config.ts`。

### **1. 基本配置**

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],  // 引入 Vue 插件
  server: {
    port: 3000,  // 指定端口
    open: true,  // 自动打开浏览器
    proxy: {      // 配置代理（解决跨域问题）
      '/api': {
        target: 'https://your-api.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',  // 指定输出目录
    minify: 'esbuild',  // 使用 esbuild 进行更快的压缩
  }
});
```

------

## **五、Vite 重要特性**

### **1. HMR（热更新）**

Vite 内置 **模块热替换（HMR）**，当你修改代码时，Vite 只会更新变更的部分，而不会重新加载整个页面。

```js
// example.js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

// 监听模块变更
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('Module updated:', newModule);
  });
}
```

------

### **2. 内置支持 TypeScript**

Vite **无需额外配置**，即可支持 TypeScript：

```ts
const name: string = "Vite";
console.log(`Hello, ${name}!`);
```

但如果要 **开启类型检查**，需要安装 `typescript`：

```sh
npm install typescript -D
```

------

### **3. CSS 预处理器支持**

Vite **原生支持 SCSS / LESS / Stylus**：

```scss
// styles.scss
$primary-color: #42b983;
body {
  background-color: $primary-color;
}
```

直接在 Vue 组件中使用：

```vue
<style lang="scss">
@import './styles.scss';
</style>
```

------

### **4. 环境变量**

Vite 支持 `.env` 文件：

```sh
# .env
VITE_API_URL=https://api.example.com
```

在代码中使用：

```js
console.log(import.meta.env.VITE_API_URL);
```

------

## **六、Vite 和 Webpack 的对比**

| 维度         | Vite                             | Webpack                         |
| ------------ | -------------------------------- | ------------------------------- |
| **启动速度** |  极快（基于 ES Modules）        |  较慢（需先打包）              |
| **热更新**   |  快速（仅更新改动部分）         |  较慢（重新编译整个 Bundle）   |
| **构建速度** |  生产模式使用 esbuild，速度更快 |  生产模式使用 Terser，速度较慢 |
| **代码拆分** |  基于 Rollup 进行 Tree Shaking  |  可配置                        |
| **生态支持** |  Vue 官方推荐，支持 Vue、React  |  生态成熟，插件丰富            |
| **适用场景** |  适合现代前端（Vue3、React18）  | 🏢 适合大型项目                  |

**总结**：

- **开发阶段**：Vite **比 Webpack 更快**，适合前端开发体验优化。

- **生产阶段**：Vite **使用 Rollup 打包**，性能与 Webpack **接近**。

- 综合建议

  ：

  - **Vue 3 / React 18** 项目推荐 **Vite**。
  - **企业级复杂项目**（如微前端、多子应用）仍然建议 **Webpack**。

------

## **七、Vite 插件**

Vite 使用 **Rollup 插件机制**，但有自己独特的插件 API：

### **1. 使用 Vue 插件**

```sh
npm install @vitejs/plugin-vue -D
```

在 `vite.config.js` 中配置：

```js
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()]
});
```

### **2. 使用 React 插件**

```sh
npm install @vitejs/plugin-react -D
```

在 `vite.config.js` 配置：

```js
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()]
});
```

------

## **八、总结**

### **1. Vite 适合什么项目？**

 **Vue 3 / React 18 项目**
  **追求快速热更新的项目**
  **静态网站、SPA、SSR 项目**

### **2. Webpack vs Vite 何时选择？**

- **新项目**（Vue / React） **推荐 Vite**
- **老项目迁移** 🏢 **Webpack 仍然适用**
- **大型企业项目** 🏢 **Webpack 插件更丰富**

------

 **Vite 是前端开发的未来**，如果你的项目使用 Vue 3 / React 18，强烈推荐使用 Vite！