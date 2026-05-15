---
layout: page
sidebar: false
---

<div class="category-index-page">

# 后端

后端开发相关技术。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">4</div>
  </div>
</div>

<div id="article-list">
  <li data-href="./node">
    <strong>Node.js</strong>
    <br>
    <span>Node.js 运行时</span>
  </li>
  <li data-href="./python">
    <strong>Python</strong>
    <br>
    <span>Python 编程语言</span>
  </li>
  <li data-href="./sql">
    <strong>SQL</strong>
    <br>
    <span>SQL 数据库</span>
  </li>
  <li data-href="./server">
    <strong>服务器</strong>
    <br>
    <span>服务器配置与管理</span>
  </li>
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
