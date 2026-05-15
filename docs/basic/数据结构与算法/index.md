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
    <strong><a href="./数据结构">数据结构</a></strong>
    <br>
    <span>数组、链表、栈、队列、哈希表、二叉树</span>
  </li>
  <li>
    <strong><a href="./算法">算法</a></strong>
    <br>
    <span>排序、二分查找、递归、双指针、复杂度</span>
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
