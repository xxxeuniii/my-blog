# cat-web - 猫主题视觉交互网站

## 项目简介

[cat-web](https://github.com/xxxeuniii/cat-web) 是一个为“派派小猫”制作的视觉系单页网站。项目没有采用传统信息展示型页面的设计方式，而是将猫主题图片、暗色视觉、动态文字和鼠标交互组合成一个沉浸式网页体验。

页面由首屏展示区和探索区组成，并通过多种独立视觉组件增强交互反馈。

**在线体验**：[https://cat-web-six.vercel.app/](https://cat-web-six.vercel.app/)

**核心体验**：

```text
进入暗色主题页面
    ↓
浏览猫主题首屏与探索内容
    ↓
移动鼠标触发跟随、激光和揭示效果
    ↓
通过动态文字、闪电和颗粒效果强化视觉氛围
```

---

## 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | React 19 |
| 开发语言 | TypeScript |
| 构建工具 | Vite 8 |
| 动画库 | Framer Motion |
| 样式方案 | CSS、Tailwind CSS |
| 图片处理脚本 | Sharp |
| 代码规范 | ESLint |

---

## 页面结构

项目采用简洁的单页结构，主要包含两个内容区块和一个全局视觉叠层：

```text
App
├── HeroSection
├── ExplorationsSection
└── GrainOverlay
```

### `HeroSection`

作为页面首屏，负责建立整体视觉氛围，并承载主要标题、猫主题视觉素材和进入页面后的第一组交互效果。

### `ExplorationsSection`

用于展示进一步的视觉探索内容，让页面从首屏自然过渡到更多交互实验。

### `GrainOverlay`

覆盖于页面上方的颗粒纹理层，为纯黑背景增加材质感，避免页面视觉过于平整。

---

## 核心交互组件

### `HeadFollow`

根据鼠标位置调整猫头或视觉元素的朝向，制造角色正在观察访问者的互动感。

### `LaserCursor`

将鼠标位置与激光视觉效果关联，让光标成为页面叙事和交互的一部分。

### `ScratchReveal`

通过刮擦式交互逐步揭示隐藏内容，让用户主动参与页面内容展示。

### `Lightning`

生成闪电视觉效果，为暗色背景增加瞬时光效和动态张力。

### `FuzzyText`

为文字增加模糊、扰动或动态变化效果，使标题和说明文字更贴合视觉实验主题。

### `useTypewriter`

封装打字机效果逻辑，用于控制文字逐字显示的节奏。

---

## 工作原理

cat-web 将不同交互效果拆分为独立 React 组件，并通过 Framer Motion 管理动画状态与过渡。

```text
鼠标移动与用户操作
    │
    ├── React 组件状态：记录交互位置和显示状态
    ├── Framer Motion：处理动画与过渡
    ├── CSS：实现布局、滤镜和视觉样式
    ├── 图片资源：猫主题素材与精灵图
    └── GrainOverlay：统一叠加页面材质
```

这种组件化方式可以将复杂的视觉效果隔离开，方便独立调整动画参数，也便于将单个效果复用到其他页面中。

---

## 项目结构

```text
cat-web/
├── public/
│   ├── cat-cool.png
│   ├── cate-cute.png
│   ├── frame_front.webp
│   ├── icons.svg
│   └── sprite.webp
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FuzzyText.tsx
│   │   ├── GrainOverlay.tsx
│   │   ├── HeadFollow.tsx
│   │   ├── LaserCursor.tsx
│   │   ├── Lightning.tsx
│   │   └── ScratchReveal.tsx
│   ├── hooks/
│   │   └── useTypewriter.ts
│   ├── sections/
│   │   ├── ExplorationsSection.tsx
│   │   └── HeroSection.tsx
│   ├── App.tsx
│   └── main.tsx
├── generate-placeholders.js
├── tailwind.config.js
└── vite.config.ts
```

---

## 本地开发

```bash
git clone https://github.com/xxxeuniii/cat-web.git
cd cat-web
npm install
npm run dev
```

常用命令：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 执行 TypeScript 检查并构建生产版本 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm run preview` | 本地预览生产构建 |

---

## 设计特点

1. **视觉体验优先**：页面重点不是信息密度，而是氛围与互动体验
2. **交互组件化**：每种视觉效果都拆分为独立 React 组件
3. **鼠标驱动反馈**：通过跟随、激光与刮擦效果响应用户操作
4. **统一暗色氛围**：深色背景、闪电和颗粒材质共同构建设计语言
5. **轻量单页结构**：内容区块少，重点突出，适合视觉实验展示

---

## 当前限制与演进方向

- README 当前仍是 React + Vite 模板内容，可以补充项目介绍和效果预览
- 可以为触屏设备设计点击、拖动或陀螺仪交互，替代鼠标跟随
- 可以根据 `prefers-reduced-motion` 为动画敏感用户降低动态强度
- 可以继续优化大型图片和动态效果的加载与渲染性能
- 可以补充在线体验地址、项目截图和部署流程

---

## 项目链接

- 在线体验：[https://cat-web-six.vercel.app/](https://cat-web-six.vercel.app/)
- GitHub：[xxxeuniii/cat-web](https://github.com/xxxeuniii/cat-web)
