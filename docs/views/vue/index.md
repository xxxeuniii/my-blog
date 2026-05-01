---
layout: page
sidebar: false
---

<div class="category-index-page">

# Vue 视图

Vue 开发实践

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./vue2和vue3的区别.md">vue2和vue3的区别</a></strong>
    <br>
    <span>Vue 2 与 Vue 3 对比</span>
  </li>
  <li>
    <strong><a href="./vue3基础.md">vue3基础</a></strong>
    <br>
    <span>Vue 3 基础入门</span>
  </li>
  <li>
    <strong><a href="./vue3项目.md">vue3项目</a></strong>
    <br>
    <span>Vue 3 项目开发</span>
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
