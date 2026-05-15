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
  <li data-href="./window对象">
    <strong>window对象</strong>
    <br>
    <span>浏览器 Window 对象 API，控制浏览器窗口的各种方法。</span>
  </li>
  <li data-href="./地址栏各种特殊符号的含义">
    <strong>地址栏各种特殊符号的含义</strong>
    <br>
    <span>URL 特殊符号与编码知识，理解查询参数和哈希的使用。</span>
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
