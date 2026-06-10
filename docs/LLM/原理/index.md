---
layout: page
sidebar: false
---

<div class="category-index-page">

# LLM 应用机制

介绍大语言模型应用中的检索增强、推理能力与工具调用决策机制。

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
  <li data-href="./大语言模型推理能力的形成机制">
    <strong>大语言模型推理能力的形成机制</strong>
    <br>
    <span>从模式学习、规模效应到推理时计算</span>
  </li>
  <li data-href="./大语言模型的工具调用决策机制">
    <strong>大语言模型的工具调用决策机制</strong>
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
