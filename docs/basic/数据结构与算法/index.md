---
layout: page
sidebar: false
---

<div class="category-index-page">

# 数据结构与算法

数据结构与算法基础。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./数据结构与算法">数据结构与算法</a></strong>
    <br>
    <span>数组链表栈队列哈希表、排序二分查找递归</span>
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
