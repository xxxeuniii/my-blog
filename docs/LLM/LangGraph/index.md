---
layout: page
sidebar: false
---

<div class="category-index-page">

# LangGraph

状态管理工作流框架，构建复杂 AI 应用。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./01_basic_graph_基础图">
    <strong>01. 基础图</strong>
    <br>
    <span>基础图结构与节点定义</span>
  </li>
  <li data-href="./02_conditional_branch_条件分支">
    <strong>02. 条件分支</strong>
    <br>
    <span>条件判断与路由</span>
  </li>
  <li data-href="./03_cycle_loop_循环">
    <strong>03. 循环</strong>
    <br>
    <span>循环执行与迭代</span>
  </li>
  <li data-href="./04_human_in_loop_人机交互">
    <strong>04. 人机交互</strong>
    <br>
    <span>人类在环模式</span>
  </li>
  <li data-href="./05_state_management_状态管理">
    <strong>05. 状态管理</strong>
    <br>
    <span>状态存储与传递</span>
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
