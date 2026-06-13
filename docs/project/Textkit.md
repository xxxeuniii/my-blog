# TextKit - 在线文本处理工具箱

## 项目简介

[TextKit](https://github.com/xxxeuniii/Textkit) 是一个一站式在线文本处理工具集合，提供正则表达式测试、加密解密、UUID 生成、文字统计、大小写转换和 Token 数量计算等常用能力。

所有文本数据均在浏览器本地处理，不会上传到服务器，适合开发调试、内容编辑和日常办公场景使用。

**在线访问**：[https://textkit-livid.vercel.app/](https://textkit-livid.vercel.app/)

**核心流程**：

```text
输入或粘贴文本
    ↓
选择需要使用的文本工具
    ↓
浏览器本地完成处理
    ↓
查看并复制结果
```

---

## 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | Vue 3 |
| 构建工具 | Vite |
| 样式方案 | Tailwind CSS |
| UI 组件 | Headless UI、Heroicons |
| 路由 | Vue Router |
| 状态管理 | Pinia |
| 国际化 | Vue I18n |
| 工具函数 | VueUse |
| 加密解密 | CryptoJS |
| UUID 生成 | uuid |
| 代码高亮 | Highlight.js |
| 部署 | Vercel |

---

## 核心功能

### 正则表达式测试器

输入正则表达式和测试文本后，实时查看匹配结果，帮助开发者验证规则并定位正则表达式问题。

### 加密解密工具

基于 CryptoJS 在浏览器本地完成文本加密与解密，适合快速验证加密结果和处理临时文本数据。

### UUID 生成器

快速生成 UUID，适合用于测试数据、数据库主键、请求标识和开发调试。

### 文字计数统计

统计文本中的字符、单词和内容长度，适合写作、内容发布和表单长度检查。

### 大小写转换

将文本转换为大写、小写或其他常用命名格式，减少批量修改文本格式的重复操作。

### Token 数量计算

估算文本的 Token 数量，为大模型提示词编写、上下文管理和 API 成本评估提供参考。

---

## 工作原理

TextKit 是一个纯前端单页应用，每个工具以独立页面或组件实现，文本处理逻辑直接运行在浏览器中。

```text
用户输入文本
    │
    ├── JavaScript：文本统计、转换与正则匹配
    ├── CryptoJS：文本加密与解密
    ├── uuid：生成 UUID
    ├── Highlight.js：高亮展示内容
    └── Vue 响应式系统：实时更新处理结果
```

由于不依赖后端 API，应用部署简单，处理响应快，也能避免敏感文本离开用户设备。

---

## 项目结构

```text
Textkit/
├── public/                 # 静态资源
├── screenshots/            # 项目效果图
├── src/
│   ├── assets/             # 样式与资源
│   ├── components/         # 公共组件
│   ├── composables/        # 可复用组合式函数
│   ├── i18n/               # 多语言配置
│   ├── router/             # 页面路由
│   ├── stores/             # Pinia 状态管理
│   ├── views/              # 文本工具页面
│   ├── App.vue             # 应用根组件
│   └── main.js             # 应用入口
├── tailwind.config.js      # Tailwind CSS 配置
├── vercel.json             # Vercel 部署配置
└── vite.config.js          # Vite 配置
```

---

## 本地开发

```bash
git clone https://github.com/xxxeuniii/Textkit.git
cd Textkit
npm install
npm run dev
```

常用命令：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览生产构建 |

---

## 界面与国际化

TextKit 支持明暗主题切换，并针对手机、平板和桌面设备提供响应式布局。

项目使用 Vue I18n 支持中文、英文和日文，并根据浏览器语言自动选择界面语言。

---

## SEO 优化

TextKit 针对工具网站的搜索收录进行了多项优化：

- 动态设置页面标题和 Meta 描述
- 配置 Google、百度和 Bing 搜索引擎验证
- 添加 JSON-LD 结构化数据
- 使用 Hreflang 标记多语言页面
- 为工具页面配置真实链接和站内锚文本
- 根据浏览器语言展示对应内容

---

## 项目特点

1. **本地处理**：所有文本处理均在浏览器中完成
2. **隐私友好**：无需上传文本，适合处理敏感内容
3. **工具集中**：覆盖开发和写作中常见的文本处理需求
4. **实时反馈**：输入变化后立即更新处理结果
5. **多语言支持**：支持中文、英文和日文
6. **响应式设计**：适配手机、平板和桌面设备

---

## 当前限制与演进方向

- Token 数量可能属于估算值，可继续接入不同模型的精确 tokenizer
- 可以增加 JSON 格式化、Base64、URL 编解码和文本差异对比
- 可以支持用户保存常用正则表达式和处理配置
- 可以使用 Web Worker 优化超长文本处理性能
- 可以补充自动化测试和无障碍访问能力

---

## 项目链接

- 在线体验：[https://textkit-livid.vercel.app/](https://textkit-livid.vercel.app/)
- GitHub：[xxxeuniii/Textkit](https://github.com/xxxeuniii/Textkit)
- License：MIT
