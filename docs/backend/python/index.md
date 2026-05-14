---
layout: page
sidebar: false
---

<div class="category-index-page">

# Python

Python 编程与应用开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./fastapi基础">FastAPI 基础</a></strong>
    <br>
    <span>FastAPI 快速入门与常用功能</span>
  </li>
  <li>
    <strong><a href="./基于flask开发的dify">基于flask开发的dify</a></strong>
    <br>
    <span>基于 Flask 开发的 Dify 应用</span>
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
