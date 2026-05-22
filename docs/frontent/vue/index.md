---
layout: page
sidebar: false
---

<div class="category-index-page">

# Vue

Vue 前端框架开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./vue2和vue3的区别">
    <strong>vue2和vue3的区别</strong>
    <br>
    <span>Vue 2 与 Vue 3 对比</span>
  </li>
  <li data-href="./ref和reactive的区别">
    <strong>ref和reactive的区别</strong>
    <br>
    <span>Vue3 响应式变量定义方式的区别</span>
  </li>
  <li data-href="./Vue生命周期详解">
    <strong>Vue生命周期详解</strong>
    <br>
    <span>setup 和 unmounted 执行顺序</span>
  </li>
  <li data-href="./Vue组件通信方法">
    <strong>Vue组件通信方法</strong>
    <br>
    <span>provide 和 injection 详解</span>
  </li>
  <li data-href="./Vue组件动态引入">
    <strong>Vue组件动态引入</strong>
    <br>
    <span>路由分割、异步组件、动态组件切换</span>
  </li>
  <li data-href="./Vue组件引入方式对比">
    <strong>Vue组件引入方式对比</strong>
    <br>
    <span>import、defineAsyncComponent、require.context 等方式的优缺点对比</span>
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
