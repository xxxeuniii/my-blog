---
layout: page
sidebar: false
---

<div class="category-index-page">

# Python 基础

Python 编程入门到高级

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./Python基础教程">Python 基础教程</a></strong>
    <br>
    <span>包含简介、变量、运算、条件语句、循环、函数、列表、字典、异常处理、文件操作、模块导入等内容</span>
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