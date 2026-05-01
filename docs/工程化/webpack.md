# **Webpack 详解**

## **一、Webpack 是什么？**

Webpack 是一个 **前端模块打包工具（Module Bundler）**，可以将 JavaScript、CSS、HTML、图片等资源进行打包、优化，最终输出浏览器可以运行的代码。

### **1. Webpack 的作用**

**模块化支持**：兼容 ES Modules、CommonJS、AMD 等模块格式。
**代码拆分（Code Splitting）**：按需加载，提升性能。
**资源优化**：支持 CSS、图片、字体等资源的优化和压缩。
**热更新（HMR）**：修改代码后，自动更新浏览器页面。
**插件扩展（Plugins）**：可通过插件增强功能，如自动生成 HTML、清理文件等。

***

## **二、Webpack 的核心概念**

Webpack 的工作流程可以分为 **入口（Entry）→ 解析（Loaders）→ 插件（Plugins）→ 输出（Output）** 这四个核心步骤。

### **1. Entry（入口）**

Webpack 需要指定一个 **入口文件** 作为打包的起点，通常是 `index.js`。

```js
module.exports = {
  entry: './src/index.js'  // 入口文件
};
```

***

### **2. Output（输出）**

Webpack 将处理后的代码输出到指定的文件夹和文件中。

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出目录
    filename: 'bundle.js'  // 输出文件名
  }
};
```

***

### **3. Loaders（加载器）**

Loaders 用于 **转换非 JavaScript 代码**，比如 TypeScript、SCSS、图片等。

- **处理 JavaScript（ES6+ 转 ES5）**

```js
module: {
  rules: [
    {
      test: /\.js$/, // 匹配 JS 文件
      exclude: /node_modules/, // 排除 node_modules
      use: 'babel-loader' // 使用 Babel 进行转换
    }
  ]
}
```

- **处理 CSS**

```js
module: {
  rules: [
    {
      test: /\.css$/, // 匹配 CSS 文件
      use: ['style-loader', 'css-loader'] // 依次使用两个 Loader
    }
  ]
}
```

- **处理 图片**

```js
module: {
  rules: [
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource' // 直接复制文件到 dist 目录
    }
  ]
}
```

***

### **4. Plugins（插件）**

Plugins 用于 **增强 Webpack 的功能**，如压缩代码、生成 HTML、清理文件等。

- **自动生成 HTML**

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',  // 使用模板
    filename: 'index.html'  // 生成的文件名
  })
]
```

- **清理 dist 目录**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
  new CleanWebpackPlugin()
]
```

***

### **5. DevServer（开发服务器）**

Webpack 允许启动一个本地服务器，支持 **热更新（HMR）**，不需要刷新页面即可看到代码变更。

```js
devServer: {
  contentBase: './dist',  // 静态资源目录
  hot: true,  // 开启热更新
  open: true  // 自动打开浏览器
}
```

运行命令：

```sh
npx webpack serve
```

***

## **三、Webpack 配置示例**

完整的 `webpack.config.js` 配置：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true,
  },
};
```

***

## **四、Webpack 进阶功能**

### **1. 代码分割（Code Splitting）**

Webpack 允许将代码拆分成多个文件，提高加载性能。

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',  // 代码分割策略
    },
  },
};
```

### **2. Tree Shaking**

Webpack 可以自动删除 **无用代码（Dead Code Elimination）**，减少打包体积。

```js
module.exports = {
  optimization: {
    usedExports: true,  // 启用 Tree Shaking
  },
};
```

***

## **五、Webpack 和 Vite 的对比**

| 维度       | Webpack   | Vite      |
| -------- | --------- | --------- |
| **启动速度** | 慢，需打包整个项目 | 快，按需加载    |
| **热更新**  | 慢         | 快，基于 ESM  |
| **适用场景** | 适用于大型复杂项目 | 适用于现代前端框架 |
| **插件系统** | 强大        | 依赖 Rollup |

**总结**：如果你的项目是 **Vue 3、React 18**，推荐使用 **Vite**，如果是 **大型企业级项目**，Webpack 仍然是最佳选择。

***

## **六、总结**

### **1. Webpack 核心概念**

- **Entry**（入口）：打包的起点。
- **Output**（输出）：指定打包后文件的存放位置。
- **Loaders**（加载器）：处理 JS、CSS、图片等资源。
- **Plugins**（插件）：增强 Webpack 功能，如生成 HTML、清理文件等。
- **DevServer**（开发服务器）：支持热更新，提高开发体验。

### **2. Webpack 的优势**

**适用于大型项目**
 **强大的插件和 Loader 生态**
 **支持代码分割、Tree Shaking、懒加载等优化策略**

------

如果你有更具体的 Webpack 使用问题，可以随时问我！

# webpack

## **1. Webpack 入口文件配置，多个入口如何分割**

`webpack.config.js` 中，我们可以通过 `entry` 字段配置单个或多个入口：

### **单入口**

```
module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  }
};
```

适用于普通单页应用（SPA）。

### **多入口**

```
module.exports = {
  entry: {
    main: "./src/index.js",
    admin: "./src/admin.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  }
};
```

适用于**多页面应用（MPA）**，Webpack 会根据 `entry` 配置分别打包成 `main.bundle.js` 和 `admin.bundle.js`。

### **代码分割（Code Splitting）**

#### **（1）动态导入**

Webpack 支持 `import()` 进行**按需加载**：

```
import("./module.js").then((module) => {
  module.default();
});
```

这种方式适合**懒加载**，比如路由动态加载。

#### **（2）使用 Webpack** **`optimization.splitChunks`**

在 `webpack.config.js` 里开启代码分割：

```
javascript复制编辑module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", // 分割所有模块
      minSize: 20000, // 最小分割体积
      maxSize: 50000, // 最大分割体积
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 提取 node_modules 代码
          priority: -10
        },
        default: {
          minChunks: 2, // 复用 2 次以上才会被提取
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

这样 `node_modules` 依赖会被单独打包，提高浏览器缓存利用率。
