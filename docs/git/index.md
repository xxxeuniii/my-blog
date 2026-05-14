---
layout: page
sidebar: false
---

<div class="category-index-page">

# Git

版本控制与代码管理

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./git术语">Git 术语</a></strong>
    <br>
    <span>Git 常用术语与命令说明</span>
  </li>
  <li>
    <strong><a href="./Git高级操作指南">Git 高级操作指南</a></strong>
    <br>
    <span>变基、撤销操作、分支管理、标签管理等高级技巧</span>
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
