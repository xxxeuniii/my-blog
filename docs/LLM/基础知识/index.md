---
layout: page
sidebar: false
---

<div class="category-index-page">

# 基础知识

大语言模型基础概念、微调方法、深度学习框架等。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">6</div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./基本概念">
    <strong>基本概念</strong>
    <br>
    <span>大语言模型基础概念</span>
  </li>
  <li data-href="./微调">
    <strong>微调</strong>
    <br>
    <span>模型微调方法与实践</span>
  </li>
  <li data-href="./PyTorch">
    <strong>PyTorch</strong>
    <br>
    <span>深度学习框架</span>
  </li>
  <li data-href="./TensorFlow">
    <strong>TensorFlow</strong>
    <br>
    <span>深度学习框架</span>
  </li>
  <li data-href="./mcp">
    <strong>MCP</strong>
    <br>
    <span>模型上下文协议</span>
  </li>
  <li data-href="./skill">
    <strong>Skill</strong>
    <br>
    <span>技能系统</span>
  </li>
</ul>

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

</div>
