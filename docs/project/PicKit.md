# PicKit - 在线图片工具箱

## 项目简介

[PicKit](https://github.com/xxxeuniii/PicKit) 是一个简单高效的在线图片处理工具箱。项目基于 Vue 3 构建，图片处理过程全部在浏览器本地完成，无需上传到服务器，也无需注册登录。

PicKit 将常用的图片压缩、裁剪、格式转换和批量处理能力集中在一个网站中，适合日常开发、内容创作和办公场景使用。

**在线访问**：[https://pic-kit.vercel.app/](https://pic-kit.vercel.app/)

**核心流程**：

```text
选择本地图片
    ↓
选择压缩、裁剪、转换或批量处理工具
    ↓
浏览器本地完成图片处理
    ↓
预览并下载处理结果
```

---

## 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | Vue 3 |
| 构建工具 | Vite |
| UI 组件库 | Element Plus |
| 路由 | Vue Router |
| 国际化 | Vue I18n |
| 图片处理 | Canvas API |
| 高质量缩放 | Pica |
| 图片裁剪 | Cropper.js |
| PDF 生成 | jsPDF |
| 批量打包 | JSZip |
| PWA | vite-plugin-pwa |
| 部署 | Vercel |

---

## 核心功能

### 图片压缩

通过调整图片质量和尺寸减小文件体积。图片在浏览器本地读取和处理，适合在上传网站、发送邮件或发布文章前快速压缩图片。

### 图片裁剪

基于 Cropper.js 提供可视化裁剪操作，支持自由裁剪和多种常用宽高比例。

### 格式转换

使用 Canvas API 在 PNG、JPEG 和 WebP 等常见图片格式之间进行转换，处理完成后可以直接下载目标格式文件。

### 批量重命名

上传多张图片后按照统一规则批量重命名，并通过 JSZip 将结果打包下载，减少逐个修改文件名的重复操作。

### 批量裁剪

对多张图片应用统一裁剪规则，适合处理商品图、文章配图和社交媒体素材。

### 图片转 PDF

将多张图片按照顺序合并为一个 PDF 文件，方便整理扫描件、截图和图片资料。

---

## 工作原理

PicKit 是一个纯前端应用，用户选择的图片不会上传到后端服务器。

```text
本地图片文件
    │
    ├── File API：读取文件与图片信息
    ├── Canvas API：格式转换和图片导出
    ├── Pica：高质量图片缩放
    ├── Cropper.js：可视化裁剪
    ├── JSZip：批量文件打包
    └── jsPDF：生成 PDF 文件
```

这种架构省去了后端存储和文件上传流程，既降低了部署复杂度，也避免了图片离开用户设备。

---

## 项目结构

```text
PicKit/
├── public/                 # 静态资源与 robots.txt
├── src/
│   ├── App.vue             # 应用根组件
│   ├── main.js             # 应用入口
│   ├── router/             # 页面路由
│   └── views/              # 图片工具页面
├── index.html              # HTML 入口与 Meta 信息
├── package.json            # 依赖与脚本
└── vite.config.js          # Vite 与 PWA 配置
```

---

## 本地开发

```bash
git clone https://github.com/xxxeuniii/PicKit.git
cd PicKit
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

## 国际化与 PWA

项目使用 Vue I18n 支持中文、英文和日文界面，使不同语言用户都可以直接使用。

通过 `vite-plugin-pwa` 提供 PWA 能力，用户可以将 PicKit 安装到桌面或移动设备，并获得更接近原生应用的访问体验。

---

## SEO 优化

为了提高工具网站的自然搜索收录，PicKit 已完成基础 SEO 配置：

- 配置页面标题、描述、关键词和 robots Meta 标签
- 设置 canonical 链接
- 提供 `robots.txt`
- 生成并提交 `sitemap.xml`
- 为主要图片处理工具提供独立页面入口

---

## 项目特点

1. **纯前端处理**：无需后端服务，图片不会上传到服务器
2. **隐私友好**：处理过程均在用户设备中完成
3. **功能集中**：覆盖常见的单图和批量图片处理需求
4. **开箱即用**：无需注册登录，打开网页即可使用
5. **多语言支持**：支持中文、英文和日文
6. **可安装使用**：通过 PWA 提供更便捷的访问方式

---

## 当前限制与演进方向

- 大尺寸图片和批量任务受浏览器内存与设备性能限制
- 可以使用 Web Worker 将复杂图片处理任务移出主线程
- 可以增加图片水印、旋转、滤镜和 EXIF 信息清理功能
- 可以进一步完善自动化测试和不同浏览器的兼容性验证
- 可以为批量任务增加进度管理、失败重试和处理参数预设

---

## 项目链接

- 在线体验：[https://pic-kit.vercel.app/](https://pic-kit.vercel.app/)
- GitHub：[xxxeuniii/PicKit](https://github.com/xxxeuniii/PicKit)
- License：MIT
