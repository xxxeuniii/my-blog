---
layout: page
sidebar: false
---

<div class="category-index-page">

# 项目视图

项目实战与开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./上海银行排队项目.md">上海银行排队项目</a></strong>
    <br>
    <span>上海银行排队系统项目</span>
  </li>
  <li>
    <strong><a href="./微信管理平台.md">微信管理平台</a></strong>
    <br>
    <span>微信管理平台项目</span>
  </li>
  <li>
    <strong><a href="./柜面poc项目.md">柜面poc项目</a></strong>
    <br>
    <span>柜面 POC 项目</span>
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
