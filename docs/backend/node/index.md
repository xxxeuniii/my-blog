---
layout: page
sidebar: false
---

<div class="category-index-page">

# Node.js

Node.js 服务端开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./node基础">node基础</a></strong>
    <br>
    <span>Node.js 基础入门</span>
  </li>
  <li>
    <strong><a href="./node服务端开发">node服务端开发</a></strong>
    <br>
    <span>Node.js 服务端开发实践</span>
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
