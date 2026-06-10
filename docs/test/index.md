---
layout: page
sidebar: false
---

<div class="category-index-page">

# 软件测试

软件测试是保证软件质量的重要手段，涵盖测试理论、测试方法、测试工具等内容。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./测试基础">
    <strong>测试基础</strong>
    <br>
    <span>软件测试的基本概念与分类</span>
  </li>
  <li data-href="./测试流程">
    <strong>测试流程</strong>
    <br>
    <span>传统软件测试流程与阶段</span>
  </li>
  <li data-href="./测试方法">
    <strong>测试方法</strong>
    <br>
    <span>黑盒测试、白盒测试、灰盒测试</span>
  </li>
  <li data-href="./测试类型">
    <strong>测试类型</strong>
    <br>
    <span>单元测试、集成测试、系统测试、验收测试</span>
  </li>
  <li data-href="./测试用例设计">
    <strong>测试用例设计</strong>
    <br>
    <span>等价类划分、边界值分析、因果图法</span>
  </li>
</ul>
</div>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
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