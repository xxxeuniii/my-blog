---
layout: page
sidebar: false
---

<div class="category-index-page">

# CSS

层叠样式表与前端样式开发，从基础到现代 CSS 技术。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./css3的新特性">CSS3 新特性</a></strong>
    <br>
    <span>CSS3 新增特性与用法详解，动画、渐变、弹性布局等。</span>
  </li>
  <li>
    <strong><a href="./SCSS使用指南">SCSS 使用指南</a></strong>
    <br>
    <span>SCSS 预处理器的核心特性：变量、嵌套、混合宏、继承等。</span>
  </li>
  <li>
    <strong><a href="./LESS使用指南">LESS 使用指南</a></strong>
    <br>
    <span>LESS 预处理器的使用方法，包含变量、混合、运算等特性。</span>
  </li>
  <li>
    <strong><a href="./TailwindCSS指南">Tailwind CSS 指南</a></strong>
    <br>
    <span>实用优先的 CSS 框架，通过 utility class 快速构建界面。</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const links = list.querySelectorAll('a')
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = links.length
    }
  }
})
</script>

</div>
