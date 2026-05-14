# LESS 使用指南

## 什么是 LESS

LESS 是一种 CSS 预处理器，它扩展了 CSS 的功能，提供了变量、嵌套、混合、运算等特性，让 CSS 编写更加高效和可维护。

## 安装与编译

### 1. 安装 LESS

```bash
# 使用 npm 安装
npm install -g less

# 或作为项目依赖
npm install less --save-dev
```

### 2. 编译命令

```bash
# 单文件编译
lessc input.less output.css

# 监听模式
lessc --watch input.less output.css

# 压缩输出
lessc --compress input.less output.css
```

## 核心特性

### 1. 变量（Variables）

```less
// 定义变量
@primary-color: #1890ff;
@font-size: 14px;
@border-radius: 4px;

// 使用变量
.button {
  color: @primary-color;
  font-size: @font-size;
  border-radius: @border-radius;
}
```

### 2. 嵌套（Nesting）

```less
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        display: block;
        padding: 8px 16px;
        color: #333;

        &:hover {
          color: @primary-color;
          text-decoration: none;
        }
      }
    }
  }
}
```

### 3. 混合（Mixins）

```less
// 定义混合
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ellipsis(@lines: 1) {
  & when (@lines = 1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & when (@lines > 1) {
    display: -webkit-box;
    -webkit-line-clamp: @lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// 使用混合
.container {
  .flex-center();
}

.text {
  .ellipsis(2);
}
```

### 4. 带参数的混合

```less
// 带参数默认值
.button-style(@bg-color: #ccc, @text-color: #333) {
  background-color: @bg-color;
  color: @text-color;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}

.primary-button {
  .button-style(@primary-color, #fff);
}

.secondary-button {
  .button-style(); // 使用默认值
}
```

### 5. 运算（Operations）

```less
@width: 100px;

.box {
  width: @width;
  height: @width * 2;
  margin: @width / 2;
  padding: @width - 20px;
}
```

### 6. 条件语句

```less
@theme: dark;

.body {
  & when (@theme = dark) {
    background-color: #1a1a1a;
    color: #fff;
  }
  & when (@theme = light) {
    background-color: #fff;
    color: #333;
  }
}
```

### 7. 循环

```less
// 使用递归实现循环
.generate-columns(@n) when (@n > 0) {
  .generate-columns(@n - 1);
  .col-@{n} {
    width: (@n * 100% / 12);
  }
}

.generate-columns(12);
```

### 8. 继承（Extend）

```less
.base-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button:extend(.base-button) {
  background-color: @primary-color;
  color: white;
}
```

## 导入（Import）

```less
// 导入其他 LESS 文件
@import './variables.less';
@import './mixins.less';

// 导入 CSS 文件（保持原样）
@import (css) './reset.css';
```

## 文件结构推荐

```
styles/
├── variables.less    # 变量定义
├── mixins.less       # 混合
├── base.less         # 基础样式
├── components/       # 组件样式
│   ├── button.less
│   ├── card.less
│   └── form.less
├── layouts/          # 布局样式
│   ├── header.less
│   ├── footer.less
│   └── sidebar.less
└── main.less         # 主入口
```

## 实践技巧

### 1. 响应式设计

```less
@breakpoints: {
  sm: 576px;
  md: 768px;
  lg: 992px;
  xl: 1200px;
}

.respond-to(@breakpoint) {
  @media screen and (min-width: @breakpoints[@breakpoint]) {
    @content();
  }
}

.container {
  padding: 16px;

  .respond-to(md) {
    padding: 24px;
  }

  .respond-to(lg) {
    padding: 32px;
  }
}
```

### 2. CSS 变量集成

```less
:root {
  --primary-color: @primary-color;
  --font-size: @font-size;
}

.element {
  color: var(--primary-color);
}
```

## SCSS vs LESS 对比

| 特性 | SCSS | LESS |
|------|------|------|
| 变量语法 | `$var` | `@var` |
| 混合定义 | `@mixin` | `.mixin()` |
| 混合调用 | `@include` | `.mixin()` |
| 继承 | `@extend` | `:extend()` |
| 条件语句 | `@if/@else` | `when` |
| 循环 | `@for/@each` | 递归混合 |
| 导入 | `@import` | `@import` |

## 总结

LESS 是一个轻量级的 CSS 预处理器，语法简洁直观，学习曲线平缓，适合需要快速上手的项目。