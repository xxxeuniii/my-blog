---
layout: page
sidebar: false
---

<div class="category-index-page">

# 工程化

软件工程化相关技术。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./git">
    <strong>Git</strong>
    <br>
    <span>版本控制系统</span>
  </li>
  <li data-href="./Engineering_frontent">
    <strong>前端工程化</strong>
    <br>
    <span>前端工程化实践</span>
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
