---
layout: page
sidebar: false
---

<div class="category-index-page">

# 其他

其他技术文章与杂记

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./20240429.md">20240429</a></strong>
    <br>
    <span>技术笔记</span>
  </li>
  <li>
    <strong><a href="./20240726.md">20240726</a></strong>
    <br>
    <span>技术笔记</span>
  </li>
  <li>
    <strong><a href="./20240729.md">20240729</a></strong>
    <br>
    <span>技术笔记</span>
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
