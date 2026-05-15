---
layout: page
sidebar: false
---

<div class="category-index-page">

# 资源

LLM 相关的学习资源与工具。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">1</div>
  </div>
</div>

<div id="article-list">
  <li data-href="./前端设计skill网站">
    <strong>前端设计 Skill 网站</strong>
    <br>
    <span>UI / UX & Design 资源官网合集</span>
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
