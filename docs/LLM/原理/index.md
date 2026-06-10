---
layout: page
sidebar: false
---

<div class="category-index-page">

# 大模型原理

理解大模型如何检索知识、完成推理，以及在 Agent 系统中选择调用外部工具。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./RAG的原理">
    <strong>RAG 的原理</strong>
    <br>
    <span>从文档索引、语义检索到增强生成</span>
  </li>
  <li data-href="./大模型为什么具有推理能力">
    <strong>大模型为什么具有推理能力</strong>
    <br>
    <span>从模式学习、规模效应到推理时计算</span>
  </li>
  <li data-href="./大模型如何判断何时调用MCP">
    <strong>大模型如何判断何时调用 MCP</strong>
    <br>
    <span>模型如何在直接回答与调用工具之间做选择</span>
  </li>
</ul>

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
        window.location.href = li.getAttribute('data-href')
      })
    })
  }
})
</script>

</div>
