# Tailwind CSS 指南

## 什么是 Tailwind CSS

Tailwind CSS 是一个实用优先的 CSS 框架，通过提供大量的 utility class 来快速构建自定义界面。

## 安装与配置

### 1. 安装依赖

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Vite 配置

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()]
}
```

### 3. 创建样式文件

```css
/* src/style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 核心概念

### 1. Utility First

```html
<!-- 使用 Tailwind utility class -->
<div class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg">
  Button
</div>
```

### 2. 响应式设计

```html
<!-- 不同屏幕尺寸应用不同样式 -->
<div class="text-center sm:text-left md:text-right">
  Responsive Text
</div>
```

### 3. 自定义主题

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#52c41a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
```

### 4. 组件提取

```css
/* 使用 @apply 提取组件 */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
```

```html
<button class="btn-primary">Primary Button</button>
```

## 常用 Utility Class

### 布局

```html
<div class="flex">...</div>          <!-- 弹性布局 -->
<div class="grid">...</div>          <!-- 网格布局 -->
<div class="block">...</div>         <!-- 块级元素 -->
<div class="inline">...</div>        <!-- 行内元素 -->
<div class="hidden">...</div>        <!-- 隐藏元素 -->
```

### 间距

```html
<div class="m-4">...</div>           <!-- margin: 1rem -->
<div class="p-4">...</div>           <!-- padding: 1rem -->
<div class="mx-auto">...</div>        <!-- 水平居中 -->
<div class="my-2">...</div>          <!-- margin-top/bottom: 0.5rem -->
```

### 颜色

```html
<div class="text-blue-500">...</div>    <!-- 文字颜色 -->
<div class="bg-gray-100">...</div>      <!-- 背景颜色 -->
<div class="border-red-500">...</div>   <!-- 边框颜色 -->
```

### 字体

```html
<div class="text-sm">...</div>       <!-- 字体大小 -->
<div class="font-bold">...</div>     <!-- 字体粗细 -->
<div class="text-center">...</div>   <!-- 文本对齐 -->
```

### 圆角

```html
<div class="rounded">...</div>       <!-- 圆角 -->
<div class="rounded-full">...</div>  <!-- 圆形 -->
<div class="rounded-lg">...</div>    <!-- 大圆角 -->
```

### 阴影

```html
<div class="shadow">...</div>        <!-- 阴影 -->
<div class="shadow-lg">...</div>     <!-- 大阴影 -->
<div class="shadow-none">...</div>   <!-- 无阴影 -->
```

## 实践技巧

### 1. 悬停状态

```html
<button class="bg-blue-500 hover:bg-blue-600 transition-colors">
  Hover Me
</button>
```

### 2. 焦点状态

```html
<input class="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
```

### 3. 条件渲染

```html
<div class="hidden md:block">Only visible on medium screens</div>
```

### 4. 自定义配置

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    }
  }
}
```

## 与 SCSS 结合

```scss
/* 在 SCSS 中使用 Tailwind */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
}
```

## 性能优化

### 1. 生产构建

```bash
npm run build
```

### 2. 树摇优化

Tailwind 会自动移除未使用的样式。

### 3. 内容路径配置

确保配置文件中包含所有需要扫描的文件路径。

## 总结

Tailwind CSS 通过 utility-first 的方式大大提高了开发效率，适合快速构建现代 Web 界面。