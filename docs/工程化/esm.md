### **ESM（ES Modules）详解**

**ESM（ECMAScript Modules）**，即 **ES6 模块化**，是 JavaScript 在 **ECMAScript 2015（ES6）** 规范中引入的 **官方标准模块化** 方案。它是目前浏览器和 Node.js 都支持的 **模块化系统**，也是现代前端开发的主流方案。

------

## **1. ESM 介绍**

在 ESM 之前，JavaScript 主要使用 **CommonJS（Node.js）** 和 **AMD/RequireJS（前端）** 进行模块化，但这些方案都有一定的缺陷，比如：

- **CommonJS** 是同步加载，不适用于浏览器环境。
- **AMD** 代码复杂，可读性差。
- **没有官方标准，导致不同模块化方案之间不兼容。**

为了解决这些问题，**ES6 模块化（ESM）** 作为官方标准，原生支持 **按需加载、静态分析、异步导入**，并且能够运行在 **浏览器** 和 **Node.js** 中。

------

## **2. ESM 语法**

### **（1）导出模块**

ESM 提供两种导出方式：

- **命名导出（Named Export）**
- **默认导出（Default Export）**

#### **① 命名导出（Named Export）**

允许导出多个变量、函数或类，使用 `{}` 结构导入。

```js
// math.js - 命名导出
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

导入时，需要使用 **解构 `{}`**：

```js
// main.js - 导入模块
import { add, subtract } from './math.js';

console.log(add(2, 3)); // 输出 5
console.log(subtract(8, 3)); // 输出 5
```

#### **② 默认导出（Default Export）**

一个模块只能有一个 `export default`，导入时可以任意命名：

```js
// greet.js - 默认导出
export default function greet(name) {
  return `Hello, ${name}!`;
}
```

导入时：

```js
// main.js - 导入默认模块
import greet from './greet.js'; // 这里可以任意命名
console.log(greet('Alice')); // 输出 "Hello, Alice!"
```

#### **③ 混合使用（Named + Default）**

```js
// utils.js
export const version = '1.0.0';
export function log(msg) {
  console.log(msg);
}
export default function greet(name) {
  console.log(`Hello, ${name}!`);
}
// main.js
import greet, { version, log } from './utils.js';

greet('Bob');  // "Hello, Bob!"
log(version);  // "1.0.0"
```

------

### **（2）导入模块**

| **导入方式**         | **示例**                                    | **说明**                    |
| -------------------- | ------------------------------------------- | --------------------------- |
| **命名导入**         | `import { add } from './math.js'`           | 仅导入 `add` 方法           |
| **别名导入**         | `import { add as sum } from './math.js'`    | 使用 `sum` 代替 `add`       |
| **默认导入**         | `import greet from './greet.js'`            | 只能有一个 `export default` |
| **整体导入**         | `import * as math from './math.js'`         | `math.add()` 访问导出内容   |
| **动态导入（异步）** | `import('./math.js').then(module => {...})` | 适用于按需加载              |

示例：

```js
import * as math from './math.js';

console.log(math.add(3, 5)); // 使用 math.add
console.log(math.subtract(9, 4)); // 使用 math.subtract
```

------

## **3. ESM 的特点**

### **✅ 静态解析**

ESM **在编译阶段**（而不是运行时）解析模块，可以进行 **Tree Shaking（去除无用代码）**，减少最终打包体积，提高性能。

```js
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// main.js
import { add } from './math.js'; // 只导入 add
console.log(add(2, 3));
```

在打包时，`subtract()` 由于未使用，会被 **Tree Shaking** 删除，减少打包体积。

------

### **✅ 原生支持异步加载**

与 CommonJS **同步加载** 不同，ESM 支持 **异步加载**，可以在需要时动态导入模块：

```js
if (someCondition) {
  import('./utils.js').then(module => {
    module.default('Bob');
  });
}
```

适用于 **按需加载**，比如路由懒加载：

```js
const moduleA = () => import('./moduleA.js');
```

------

### **✅ 适用于浏览器和 Node.js**

#### **1️⃣ 浏览器原生支持**

```html
<script type="module">
  import { add } from './math.js';
  console.log(add(2, 3));
</script>
```

在浏览器环境中，ESM 以 **异步方式加载**，不会阻塞页面渲染。

#### **2️⃣ Node.js 中使用**

在 `package.json` 中 **声明 ESM 模块**：

```json
{
  "type": "module"
}
```

然后可以直接使用 `import`：

```js
import { readFile } from 'fs/promises';
const data = await readFile('file.txt', 'utf-8');
console.log(data);
```

如果 `package.json` 里没有 `"type": "module"`，可以使用 `.mjs` 作为扩展名：

```sh
node --experimental-modules main.mjs
```

------

## **4. ESM vs CommonJS**

| **特性**     | **ESM（ES6 Modules）**         | **CommonJS**                     |
| ------------ | ------------------------------ | -------------------------------- |
| **导入方式** | `import { } from 'file.js'`    | `const module = require('file')` |
| **导出方式** | `export` / `export default`    | `module.exports = {}`            |
| **是否异步** | ✅ 异步支持（浏览器 & Node.js） | ❌ 同步阻塞（仅适合 Node.js）     |
| **静态分析** | ✅ 支持（可 Tree Shaking）      | ❌ 不支持                         |
| **适用环境** | ✅ 浏览器 & Node.js             | ❌ 仅 Node.js                     |

------

## **5. 适用场景**

| **场景**                     | **使用 ESM 还是 CommonJS？**       |
| ---------------------------- | ---------------------------------- |
| **前端开发（React/Vue）**    | ✅ **ESM**，原生支持                |
| **Node.js（服务器端）**      | ✅ 推荐 ESM，但 CommonJS 仍广泛使用 |
| **CLI 工具开发**             | ✅ 取决于环境，CommonJS 使用更广泛  |
| **打包优化（Tree Shaking）** | ✅ 仅 ESM 支持                      |

------

## **6. 结论**

- ESM（ES6 Modules）是 JavaScript 官方的模块化方案，适用于 **前端和 Node.js**。
- ESM 采用 `import` 和 `export` 语法，支持 **Tree Shaking**，提升打包优化能力。
- 相比 CommonJS，ESM 支持 **异步加载**，适合浏览器和现代 JavaScript 项目。
- **推荐前端开发使用 ESM，Node.js 也逐步迁移到 ESM。**

------

 