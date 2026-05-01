# 20240506

```JavaScript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import externalGlobals from "rollup-plugin-external-globals";
import { viteExternalsPlugin } from "vite-plugin-externals";
import vueCase from "./plugin/vite-plugin-case/index.js";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vueCase(),
    vue(),
    viteExternalsPlugin({
      "nt-nui": "nui",
      vue: "Vue",
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  envDir: "./env",
  server: {
    cors: true,
    port: 8001,
    proxy: {
      "/api": {
        target: "http://10.20.30.40:1234/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
          //这个设置能看到代理前后的地址
        bypass(req, res, options: any) {
          const proxyURL = options.target + options.rewrite(req.url);
          console.log("proxyURL", proxyURL);
          req.headers["x-req-proxyURL"] = proxyURL; // 设置未生效
          res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头可以看到
        },
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["vue", "nui", "vue-router"],
      plugins: [
        externalGlobals({ vue: "Vue", nui: "nui", "vue-router": "VueRouter" }),
      ],
      output: {
        format: "iife",
        chunkFileNames: "main.js",
        inlineDynamicImports: true,
      },
    },
  },
});

```

## 配置说明

### 基础配置

- `base: "./"`：设置项目基础路径为相对路径
- `plugins`：配置 Vite 插件，包括自定义的 `vueCase()` 插件、Vue 官方插件和外部依赖插件

### 路径别名

```JavaScript
resolve: {
  alias: {
    "@": path.join(__dirname, "./src"),
  },
},
```

使用 `@` 作为 `src` 目录的别名，方便在代码中引用模块。

### 环境变量

- `envDir: "./env"`：指定环境变量文件所在目录

### 开发服务器

```JavaScript
server: {
  cors: true,
  port: 8001,
  proxy: {
    "/api": {
      target: "http://10.20.30.40:1234/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

- `cors: true`：启用 CORS 跨域支持
- `port: 8001`：开发服务器端口
- `proxy`：配置代理，将 `/api` 请求转发到后端服务

### 构建配置

```JavaScript
build: {
  rollupOptions: {
    external: ["vue", "nui", "vue-router"],
    plugins: [
      externalGlobals({ vue: "Vue", nui: "nui", "vue-router": "VueRouter" }),
    ],
    output: {
      format: "iife",
      chunkFileNames: "main.js",
      inlineDynamicImports: true,
    },
  },
},
```

- `external`：将 Vue、nui、vue-router 标记为外部依赖，不打包进最终产物
- `externalGlobals`：将外部依赖转换为全局变量引用
- `output.format: "iife"`：输出格式为立即执行函数
- `inlineDynamicImports: true`：将动态导入内联到主文件中

