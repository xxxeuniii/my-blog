---
layout: page
sidebar: false
---

<div class="category-index-page">

# Webpack

前端资源打包工具。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./webpack.md">
    <strong>Webpack</strong>
    <br>
    <span>Webpack 使用指南</span>
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
