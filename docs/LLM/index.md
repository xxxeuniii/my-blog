---
layout: page
sidebar: false
---

<div class="category-index-page">

# LLM

大语言模型与 AI 应用开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./基础知识/mcp.md">基础知识</a></strong>
    <br>
    <span>MCP、Skill 等基础概念</span>
  </li>
  <li>
    <strong><a href="./框架/langchain.md">框架</a></strong>
    <br>
    <span>LangChain、LangGraph、LlamaIndex</span>
  </li>
  <li>
    <strong><a href="./资源/ui-ux-design-resources.md">资源合集</a></strong>
    <br>
    <span>UI / UX & Design 资源官网合集</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const links = list.querySelectorAll('a')
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = links.length
    }
  }
})
</script>

</div>
