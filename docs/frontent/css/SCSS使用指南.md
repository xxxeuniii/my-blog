# SCSS 使用指南

## 什么是 SCSS

SCSS（Sassy CSS）是 CSS 的扩展语言，是 Sass（Syntactically Awesome Style Sheets）的一种语法格式。它完全兼容 CSS，同时提供了变量、嵌套、混合宏、继承等强大功能。

## 安装与编译

### 1. 安装 Sass

```bash
# 使用 npm 安装
npm install -g sass

# 或作为项目依赖
npm install sass --save-dev
```

### 2. 编译命令

```bash
# 单文件编译
sass input.scss output.css

# 监听模式（开发时使用）
sass --watch input.scss output.css

# 监听目录
sass --watch src/styles:dist/styles

# 压缩输出
sass input.scss output.css --style compressed
```

## 核心特性

### 1. 变量（Variables）

```scss
// 定义变量
$primary-color: #1890ff;
$font-size: 14px;
$border-radius: 4px;

// 使用变量
.button {
  color: $primary-color;
  font-size: $font-size;
  border-radius: $border-radius;
}
```

### 2. 嵌套（Nesting）

```scss
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
          color: $primary-color;
          text-decoration: none;
        }
      }
    }
  }
}
```

### 3. 混合宏（Mixins）

```scss
// 定义混合宏
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin ellipsis($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// 使用混合宏
.container {
  @include flex-center;
}

.text {
  @include ellipsis(2);
}
```

### 4. 继承（Extend）

```scss
// 定义基础样式
%base-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

// 继承样式
.primary-button {
  @extend %base-button;
  background-color: $primary-color;
  color: white;
}

.secondary-button {
  @extend %base-button;
  background-color: #f5f5f5;
  color: #333;
}
```

### 5. 运算（Operations）

```scss
$width: 100px;

.box {
  width: $width;
  height: $width * 2;
  margin: $width / 2;
  padding: $width - 20px;
}
```

### 6. 条件语句

```scss
$theme: dark;

.body {
  @if $theme == dark {
    background-color: #1a1a1a;
    color: #fff;
  } @else {
    background-color: #fff;
    color: #333;
  }
}
```

### 7. 循环

```scss
// for 循环
@for $i from 1 through 5 {
  .col-#{$i} {
    width: ($i * 20)%;
  }
}

// each 循环
$colors: (
  primary: #1890ff,
  success: #52c41a,
  warning: #faad14,
  error: #f5222d
);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color;
  }
}
```

### 8. 函数（Functions）

```scss
// 定义函数
@function rem($px) {
  @return $px / 16px * 1rem;
}

// 使用函数
.title {
  font-size: rem(24px); // 输出 1.5rem
}
```

## 导入（Import）

```scss
// 导入其他 SCSS 文件（不生成额外 CSS）
@import './variables';
@import './mixins';
@import './base';

// 导入 CSS 文件（保持原样输出）
@import url('reset.css');
```

## 文件结构推荐

```
styles/
├── variables.scss    # 变量定义
├── mixins.scss       # 混合宏
├── functions.scss    # 函数
├── base.scss         # 基础样式
├── components/       # 组件样式
│   ├── button.scss
│   ├── card.scss
│   └── form.scss
├── layouts/          # 布局样式
│   ├── header.scss
│   ├── footer.scss
│   └── sidebar.scss
└── main.scss         # 主入口
```

## 实践技巧

### 1. 响应式设计

```scss
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@mixin respond-to($breakpoint) {
  @media screen and (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

.container {
  padding: 16px;

  @include respond-to(md) {
    padding: 24px;
  }

  @include respond-to(lg) {
    padding: 32px;
  }
}
```

### 2. CSS 变量集成

```scss
:root {
  --primary-color: #{$primary-color};
  --font-size: #{$font-size};
}

.element {
  color: var(--primary-color);
}
```

### 3. 深色模式

```scss
@mixin dark-mode {
  @media (prefers-color-scheme: dark) {
    @content;
  }
}

.card {
  background-color: #fff;

  @include dark-mode {
    background-color: #1a1a1a;
  }
}
```

## 总结

SCSS 通过变量、嵌套、混合宏等特性大大提升了 CSS 的开发效率和可维护性，是现代前端开发的必备技能。