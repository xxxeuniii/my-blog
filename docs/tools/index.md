---
layout: page
sidebar: false
---

<div class="category-index-page">

# 工具

开发工具与效率提升

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./基础工具.md">基础工具</a></strong>
    <br>
    <span>基础开发工具使用</span>
  </li>
  <li>
    <strong><a href="./实用命令行.md">实用命令行</a></strong>
    <br>
    <span>实用命令行工具</span>
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
