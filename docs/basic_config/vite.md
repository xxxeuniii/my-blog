# vite

## 20240411
### vite分包规则

Vite 使用 Rollup 作为其底层的打包工具来进行项目的构建。在进行代码分包时，Vite 通过配置 Rollup 的 `output.manualChunks` 选项来实现自定义的分包规则。以下是关于 Vite 分包规则的基本说明：

### **`output.manualChunks` 配置**

`output.manualChunks` 是一个函数或对象，用于指定哪些模块应该被打包到特定的自定义块（chunk）中。这有助于将大型应用分解为多个较小的、可按需加载的文件，以提高首屏加载速度和整体性能。

**1. 函数形式：**

当 `manualChunks` 是一个函数时，它接收每个模块的文件路径 (`filePath`) 作为参数，并应返回一个字符串或 `null`。返回值表示该模块应被分配到的 chunk 名称。例如：

Javascript

```javascript
1// vite.config.js
2export default defineConfig({
3  build: {
4    rollupOptions: {
5      output: {
6        manualChunks(id) {
7          // 根据文件路径或其他条件决定分包逻辑
8          if (id.includes('node_modules/lodash')) {
9            return 'vendor-lodash';
10          } else if (id.includes('node_modules/moment')) {
11            return 'vendor-moment';
12          }
13          // 如果不符合任何自定义规则，则返回 null，让 Rollup 使用默认分包逻辑
14          return null;
15        },
16      },
17    },
18  },
19});
```

在这个例子中，所有引用 `lodash` 或 `moment` 模块的代码会被分别打包到名为 `vendor-lodash.js` 和 `vendor-moment.js` 的独立文件中。

**2. 对象形式：**

`manualChunks` 也可以是一个对象，键是目标 chunk 名称，值是一个数组或回调函数，用于指定应该被包含在该 chunk 中的模块。例如：

Javascript

```javascript
1// vite.config.js
2export default defineConfig({
3  build: {
4    rollupOptions: {
5      output: {
6        manualChunks: {
7          'vendor-libs': ['lodash', 'moment'], // 直接列出模块名
8          'my-custom-chunk': id => {
9            // 使用回调函数定义更复杂的匹配规则
10            return id.includes('src/my-special-module') || id.includes('src/another-module');
11          },
12        },
13      },
14    },
15  },
16});
```

在这个示例中，`lodash` 和 `moment` 模块会被打包到 `vendor-libs.js` 文件中，而所有包含 `'src/my-special-module'` 或 `'src/another-module'` 的模块会被打包到 `my-custom-chunk.js` 文件中。

### **分包原则与最佳实践：**

- **按需加载**：根据模块的功能或依赖关系，将不立即需要的代码分到单独的 chunk 中，以便在首次加载页面时仅加载关键资源，后续再按需加载其他 chunk。
- **公共库分离**：将第三方库（如 `lodash`、`moment` 等）独立打包，因为它们通常不会频繁变动，可以利用浏览器缓存提高重复访问时的加载速度。
- **业务逻辑分组**：按照业务模块划分 chunk，确保相关代码一起加载，避免跨 chunk 造成的额外网络请求和解析成本。
- **避免过度分包**：虽然分包有助于减小单个文件大小，但过多的 chunk 可能增加 HTTP 请求的数量，导致网络开销增大。需要权衡 chunk 数量与文件大小，合理设定分包粒度。
- **考虑 Tree Shaking**：Vite 和 Rollup 支持 Tree Shaking，自动去除未使用的代码。在制定分包规则时，应确保不影响这一优化机制。

综上所述，Vite 的分包规则是由开发者通过配置 `rollupOptions.output.manualChunks` 来定义的，可以根据项目特性和性能优化需求，灵活运用函数或对象形式来定制模块到 chunk 的映射规则，以实现高效的代码分片和按需加载
