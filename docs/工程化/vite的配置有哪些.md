Vite 是一个现代前端构建工具，配置灵活、极速启动，常用于 Vue 3、React、Svelte 等现代框架项目。它的配置文件是 `vite.config.js`（或 `.ts`），其配置项丰富但结构清晰。

以下是 Vite 常用配置项分类详解，并附带示例和链接至官网文档，供你在银行类前端项目中灵活使用。

------

## 基本结构

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: '.',          // 项目根目录
  base: '/',          // 静态资源路径前缀
  resolve: { ... },   // 路径别名
  css: { ... },       // 全局样式配置
  server: { ... },    // 开发服务器配置
  build: { ... },     // 打包配置
  define: { ... },    // 注入环境变量
})
```

------

## 配置项分类说明

### 1. `root`：项目根目录（默认是项目目录）

```js
root: 'src',
```

适用于你将所有资源置于 `src/` 子目录下的项目结构。

------

### 2. `base`：部署路径（重要）

```js
base: '/static/', 
```

适合部署到子路径，如银行内网系统 `/app/static/`。

------

### 3. `plugins`：插件配置

```js
plugins: [vue(), legacy(), inspect()],
```

- `@vitejs/plugin-vue`：支持 Vue 组件
- `@vitejs/plugin-legacy`：支持老浏览器（如 IE11）
- `vite-plugin-inspect`：调试插件

------

### 4. `resolve`：路径别名与扩展

```js
resolve: {
  alias: {
    '@': '/src',
    'components': '/src/components',
  },
  extensions: ['.js', '.vue', '.json']
}
```

------

### 5. `css`：CSS 配置

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`
    }
  }
}
```

可用于配置 Less、Sass 全局变量注入。

------

### 6. `server`：开发服务器配置

```js
server: {
  host: '0.0.0.0',
  port: 3000,
  open: true,
  proxy: {
    '/api': {
      target: 'https://api.bank.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```

典型应用：开发环境代理银行后台接口。

------

### 7. `build`：构建配置（重点）

```js
build: {
  outDir: 'dist',
  assetsDir: 'static',
  sourcemap: false,
  rollupOptions: {
    input: {
      main: '/index.html',
      dashboard: '/dashboard.html'
    },
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      }
    }
  }
}
```

用于控制构建输出目录、拆包策略等。

------

### 8. `define`：注入全局变量

```js
define: {
  __APP_VERSION__: JSON.stringify('1.0.0')
}
```

你可以在业务代码中使用 `__APP_VERSION__` 变量。

------

### 9. `envDir` & `.env` 支持

```js
envDir: './env',
```

Vite 默认支持 `.env`, `.env.development`, `.env.production`，变量前缀需为 `VITE_` 才能在代码中访问。

```env
VITE_API_BASE=https://api.bank.com
```

------

## 官方文档链接（建议收藏）

- Vite 配置参考文档：https://vitejs.dev/config/
- 插件生态：https://vitejs.dev/plugins/
- Vue 项目使用指南：https://vitejs.dev/guide/

------

如果你提供你的实际项目结构或目标（如微前端、NPM 组件库、银行系统业务前后端分离等），我可以帮你输出一套**完整且可运行的 Vite 配置模板**，并解释每个配置项的作用与适用场景。需要的话请告诉我具体需求。