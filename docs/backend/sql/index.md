---
layout: page
sidebar: false
---

<div class="category-index-page">

# SQL 数据库

SQL 数据库从基础到高级的完整学习内容。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./SQL基础语法">
    <strong>SQL基础语法</strong>
    <br>
    <span>SELECT、INSERT、UPDATE、DELETE 等基础操作</span>
  </li>
  <li data-href="./SQL高级查询">
    <strong>SQL高级查询</strong>
    <br>
    <span>JOIN、子查询、窗口函数等</span>
  </li>
  <li data-href="./SQL性能优化">
    <strong>SQL性能优化</strong>
    <br>
    <span>索引、查询优化技巧</span>
  </li>
  <li data-href="./数据库设计基础">
    <strong>数据库设计基础</strong>
    <br>
    <span>ER图、范式、表设计</span>
  </li>
  <li data-href="./索引与事务">
    <strong>索引与事务</strong>
    <br>
    <span>索引原理、事务ACID、锁机制</span>
  </li>
</ul>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('article-list')
  if (list) {
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = list.querySelectorAll('li').length
    }
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
