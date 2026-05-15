---
layout: page
sidebar: false
---

<div class="category-index-page">

# 操作系统基础

操作系统核心概念。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./操作系统基础">操作系统基础</a></strong>
    <br>
    <span>进程线程协程、并发并行、内存管理、Linux基础</span>
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
