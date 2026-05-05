---
layout: page
sidebar: false
---

<div class="category-index-page">

# JavaScript

JS 核心语法与特性

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./const">const</a></strong>
    <br>
    <span>const 变量声明</span>
  </li>
  <li>
    <strong><a href="./ts和js的区别">ts和js的区别</a></strong>
    <br>
    <span>TypeScript 与 JavaScript 对比</span>
  </li>
  <li>
    <strong><a href="./几个循环的区别">几个循环的区别</a></strong>
    <br>
    <span>for、forEach、map 等循环区别</span>
  </li>
  <li>
    <strong><a href="./操作数组的方法">操作数组的方法</a></strong>
    <br>
    <span>JavaScript 数组操作方法</span>
  </li>
  <li>
    <strong><a href="./数据类型">数据类型</a></strong>
    <br>
    <span>JS 数据类型详解</span>
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
