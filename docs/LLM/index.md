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
    <strong><a href="./基础知识/mcp">基础知识</a></strong>
    <br>
    <span>MCP、Skill 等基础概念</span>
  </li>
  <li>
    <strong><a href="./框架/langchain">框架</a></strong>
    <br>
    <span>LangChain、LangGraph、LlamaIndex</span>
  </li>
  <li>
    <strong><a href="./python/01_Python简介">Python基础</a></strong>
    <br>
    <span>Python 编程入门到高级</span>
  </li>
  <li>
    <strong><a href="./Prompt Engineering/01_fewshot_少样本提示">提示词工程</a></strong>
    <br>
    <span>提示词优化与最佳实践</span>
  </li>
  <li>
    <strong><a href="./LangChain/01_llms_语言模型">LangChain</a></strong>
    <br>
    <span>LangChain 框架完整教程</span>
  </li>
  <li>
    <strong><a href="./LanGraph/01_basic_graph_基础图">LanGraph</a></strong>
    <br>
    <span>LanGraph 框架使用指南</span>
  </li>
  <li>
    <strong><a href="./FastAPI/01_FastAPI简介">FastAPI</a></strong>
    <br>
    <span>现代 Python API 开发框架</span>
  </li>
  <li>
    <strong><a href="./资源/前端设计skill网站">资源合集</a></strong>
    <br>
    <span>UI / UX &amp; Design 资源官网合集</span>
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
