---
layout: page
sidebar: false
---

<div class="category-index-page">

# D2C

基于 LangChain 多 Agent 架构的设计转代码平台，将 Figma 设计稿转换为可运行的前端代码。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">说明文章</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="../前端/D2C设计转代码平台">
    <strong>项目介绍与架构</strong>
    <br>
    <span>D2C 的技术栈、五个 Agent 协同流水线与核心实现</span>
  </li>
  <li data-href="./数据清洗Agent设计">
    <strong>Agent 1：数据清洗 Agent 设计</strong>
    <br>
    <span>清理 Figma 原始节点数据，为结构转换和代码生成提供可靠输入</span>
  </li>
  <li data-href="./结构转换Agent设计">
    <strong>Agent 2：结构转换 Agent 设计</strong>
    <br>
    <span>将设计工具节点转换为稳定、可生成代码的组件 DSL</span>
  </li>
  <li data-href="./知识检索Agent设计">
    <strong>Agent 3：知识检索 Agent 设计</strong>
    <br>
    <span>为代码生成阶段补充组件库 API、规范和项目知识</span>
  </li>
  <li data-href="./代码生成Agent设计">
    <strong>Agent 4：代码生成 Agent 设计</strong>
    <br>
    <span>利用大模型将结构化设计信息组织为可维护的前端代码</span>
  </li>
  <li data-href="./测试验证Agent设计">
    <strong>Agent 5：测试验证 Agent 设计</strong>
    <br>
    <span>通过静态检查和模型审查建立生成代码的质量闭环</span>
  </li>
  <li data-href="https://github.com/xxxeuniii/D2C" target="_blank">
    <strong>GitHub 源码</strong>
    <br>
    <span>查看 D2C 项目的源代码与最新进展</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = list.querySelectorAll('li:not([target="_blank"])').length
    }
    list.querySelectorAll('li[data-href]').forEach(li => {
      li.style.cursor = 'pointer'
      li.addEventListener('click', () => {
        const href = li.getAttribute('data-href')
        if (li.getAttribute('target') === '_blank') {
          window.open(href, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = href
        }
      })
    })
  }
})
</script>

</div>
