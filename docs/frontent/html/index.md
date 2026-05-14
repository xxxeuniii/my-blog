---
layout: page
sidebar: false
---

<div class="category-index-page">

# HTML

超文本标记语言基础与进阶，Web 开发的基石。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./window对象">window对象</a></strong>
    <br>
    <span>浏览器 Window 对象 API，控制浏览器窗口的各种方法。</span>
  </li>
  <li>
    <strong><a href="./地址栏各种特殊符号的含义">地址栏各种特殊符号的含义</a></strong>
    <br>
    <span>URL 特殊符号与编码知识，理解查询参数和哈希的使用。</span>
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
