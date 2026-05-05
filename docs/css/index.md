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
    <strong><a href="./css3的新特性">css3的新特性</a></strong>
    <br>
    <span>CSS3 新增特性与用法详解，动画、渐变、弹性布局等。</span>
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
