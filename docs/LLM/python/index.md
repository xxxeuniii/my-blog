---
layout: page
sidebar: false
---

<div class="category-index-page">

# Python 基础

Python 编程从入门到精通的完整教程。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">1</div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./Python基础教程">
    <strong>Python 基础教程</strong>
    <br>
    <span>Python 编程入门到高级</span>
  </li>
</ul>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('article-list')
  if (list) {
    list.querySelectorAll('li[data-href]').forEach(li => {
      li.style.cursor = 'pointer'
      li.addEventListener('click', () => {
        const href = li.getAttribute('data-href')
        window.location.href = href
      })
    })
  }
})
</script>

<style>
#article-list li[data-href]:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
}
</style>
