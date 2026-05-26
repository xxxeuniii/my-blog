# CSS 布局方式

## 布局方式对比

| 布局方式 | 适用场景 | 特点 | 兼容性 |
|---------|----------|------|--------|
| **Flexbox** | 一维布局 | 简单、灵活、适合行/列 | 所有现代浏览器 |
| **Grid** | 二维布局 | 强大、复杂、适合二维空间 | 所有现代浏览器 |
| **Table** | 表格布局 | 传统、结构化、不推荐用于布局 | 所有浏览器 |
| **Position** | 定位布局 | 绝对定位、层叠控制 | 所有浏览器 |
| **Float** | 浮动布局 | 传统、已过时 | 所有浏览器 |
| **Inline-block** | 行内块布局 | 行内元素布局 | 所有浏览器 |

---

## 1. Flexbox（弹性盒子）

### 基础概念

Flexbox 是一种**一维**布局模型，可以方便地实现行或列的布局。

### 容器属性

```css
.container {
  display: flex;                    /* 启用 flex 布局 */
  flex-direction: row;              /* 方向：row / row-reverse / column / column-reverse */
  flex-wrap: nowrap;                /* 换行：nowrap / wrap / wrap-reverse */
  justify-content: flex-start;      /* 主轴对齐：flex-start / flex-end / center / space-between / space-around */
  align-items: center;              /* 交叉轴对齐：stretch / flex-start / flex-end / center / baseline */
  align-content: flex-start;        /* 多行对齐：flex-start / flex-end / center / space-between / space-around / stretch */
  gap: 16px;                        /* 项目间距（0.63+） */
}
```

### 项目属性

```css
.item {
  flex-grow: 0;                     /* 放大比例：0（默认）/ 正数 */
  flex-shrink: 1;                   /* 缩小比例：正数（默认）/ 0 */
  flex-basis: auto;                 /* 基础大小：auto / 长度值 */
  flex: 0 1 auto;                   /* 简写：flex-grow flex-shrink flex-basis */
  align-self: auto;                 /* 单个项目对齐：auto / stretch / flex-start / flex-end / center / baseline */
}
```

### 完整示例

#### 基础水平布局

```css
/* 容器 */
.row {
  display: flex;
  gap: 16px;
}

/* 项目 */
.item {
  flex: 1;
  padding: 16px;
  background: #f5f5f5;
}
```

```html
<div class="row">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

#### 垂直居中

```css
/* 容器 */
.container {
  display: flex;
  justify-content: center;   /* 水平居中 */
  align-items: center;       /* 垂直居中 */
  height: 100vh;
  gap: 16px;
}
```

#### 间距分布

```css
/* 两端对齐 + 等距 */
.container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

/* 等距分布 */
.container {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}
```

#### 换行布局

```css
/* 自动换行 */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* 多行对齐 */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;  /* space-between / space-around / stretch */
  gap: 16px;
}
```

#### 比例分配

```css
/* 平分宽段 */
.container {
  display: flex;
  gap: 16px;
}

.item-1 { flex: 2; }   /* 占 2 份 */
.item-2 { flex: 1; }   /* 占 1 份 */
.item-3 { flex: 1; }   /* 占 1 份 */
```

---

## 2. Grid（网格布局）

### 基础概念

Grid 是一种**二维**布局模型，可以同时处理行和列。

### 容器属性

```css
.container {
  display: grid;                              /* 启用 grid 布局 */
  grid-template-columns: repeat(3, 1fr);       /* 列：重复 3 次，每列 1fr */
  grid-template-rows: auto 1fr auto;           /* 行：自动 / 占满剩余空间 / 自动 */
  grid-template-areas: 'header header header'  /* 网格区域名称 */
                       'sidebar content content'
                       'footer footer footer';
  gap: 16px;                                  /* 间距 */
  grid-gap: 16px;                             /* 间距（旧版） */
}
```

### 项目属性

```css
.item {
  grid-column: span 2;          /* 跨 2 列 */
  grid-row: span 2;             /* 跨 2 行 */
  grid-area: header;            /* 使用 grid-template-areas 定义的区域 */
  place-self: center;           /* align-self + justify-self */
}
```

### 完整示例

#### 基础网格布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 16px;
}

.item {
  padding: 16px;
  background: #f5f5f5;
}
```

#### 固定宽度 + 自适应

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}
```

#### 重复模式

```css
/* 重复 3 次宽度为 100px 的列 */
grid-template-columns: repeat(3, 100px);

/* 重复模式 */
grid-template-columns: repeat(3, 1fr 50px 1fr);
/* 结果：[1fr 50px 1fr] [1fr 50px 1fr] [1fr 50px 1fr] */
```

#### 响应式网格

```css
/* 移动端 */
.container {
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 网格区域

```css
.container {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar content content'
    'footer footer footer';
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

---

## 3. Table（表格布局）

### 基础概念

Table 布局使用 HTML 表格元素进行布局，已不推荐用于布局。

### 表格布局

```html
<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <th style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5;">姓名</th>
    <th style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5;">年龄</th>
    <th style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5;">邮箱</th>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;">张三</td>
    <td style="padding: 12px; border: 1px solid #ddd;">25</td>
    <td style="padding: 12px; border: 1px solid #ddd;">zhangsan@example.com</td>
  </tr>
</table>
```

### CSS 表格样式

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background: #f5f5f5;
}
```

---

## 4. Position（定位布局）

### 定位类型

```css
.container {
  position: relative;              /* 相对定位 */
  position: absolute;              /* 绝对定位 */
  position: fixed;                 /* 固定定位 */
  position: sticky;                /* 粘性定位 */
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

### 定位属性

```css
.item {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;

  width: 200px;
  height: 200px;

  z-index: 1;                      /* 层级 */
}
```

### 完整示例

#### 悬浮卡片

```css
.card {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 300px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
```

#### 相对定位偏移

```css
.parent {
  position: relative;
}

.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

---

## 5. Float（浮动布局）

### 基础概念

Float 是传统的布局方式，现代开发中不推荐使用。

### 浮动布局

```css
.container {
  overflow: hidden;                /* 清除浮动 */
}

.left {
  float: left;
  width: 200px;
}

.right {
  float: right;
  width: 200px;
}
```

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
```

---

## 6. Inline-block（行内块布局）

### 基础概念

将块级元素设为行内块元素，实现左右排列。

### 行内块布局

```css
.container {
  text-align: center;
}

.item {
  display: inline-block;
  width: 200px;
  height: 200px;
  background: #f5f5f5;
  vertical-align: top;
}
```

---

## 7. 布局选择指南

```
布局方式选择：

一维布局（行或列）：
┌─────────────────────────────────────┐
│ Flexbox                             │
│ - 列表项排列                         │
│ - 导航栏                             │
│ - 卡片网格（单列）                   │
└─────────────────────────────────────┘

二维布局（行和列）：
┌─────────────────────────────────────┐
│ Grid                                │
│ - 复杂网格布局                       │
│ - 数据表格                           │
│ - 响应式网格                         │
└─────────────────────────────────────┘

特殊场景：
┌─────────────────────────────────────┐
│ Position                             │
│ - 悬浮元素                           │
│ - 模态框                             │
│ - 层叠定位                           │
└─────────────────────────────────────┘
```

---

## 常见布局模式

### 1. 等宽网格

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
```

### 2. 响应式导航栏

```css
/* 桌面：横向布局 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 移动端：纵向布局 */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
}
```

### 3. 双栏布局

```css
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}

/* 移动端 */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

---

## 总结

```
布局方式对比：

Flexbox：
- 优点：简单、灵活、适合一维布局
- 缺点：不支持二维布局
- 适用：导航、卡片列表

Grid：
- 优点：强大、支持二维布局
- 缺点：学习曲线稍陡
- 适用：复杂网格、数据表格

Position：
- 优点：灵活的定位控制
- 缺点：脱离文档流
- 适用：悬浮元素、层叠定位

Table：
- 优点：结构化、适合数据展示
- 缺点：不适合页面布局
- 适用：表格数据
```
