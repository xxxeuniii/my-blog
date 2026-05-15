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
  <li data-href="./const">
    <strong>const</strong>
    <br>
    <span>const 变量声明</span>
  </li>
  <li data-href="./ts和js的区别">
    <strong>ts和js的区别</strong>
    <br>
    <span>TypeScript 与 JavaScript 对比</span>
  </li>
  <li data-href="./几个循环的区别">
    <strong>几个循环的区别</strong>
    <br>
    <span>for、forEach、map 等循环区别</span>
  </li>
  <li data-href="./操作数组的方法">
    <strong>操作数组的方法</strong>
    <br>
    <span>JavaScript 数组操作方法</span>
  </li>
  <li data-href="./数据类型">
    <strong>数据类型</strong>
    <br>
    <span>JS 数据类型详解</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const links = list.querySelectorAll('li')
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = links.length
    }
  }

  list.querySelectorAll('li[data-href]').forEach(li => {
    li.style.cursor = 'pointer'
    li.addEventListener('click', () => {
      const href = li.getAttribute('data-href')
      const target = li.getAttribute('target')
      if (target === '_blank') {
        window.open(href, '_blank')
      } else {
        window.location.href = href
      }
    })
  })
})
</script>

<style>
#article-list li[data-href]:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
}
</style>

</div>
