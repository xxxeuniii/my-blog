---
layout: page
sidebar: false
---

<div class="category-index-page">

# LangChain

LLM 应用开发框架，构建智能代理与 RAG 系统。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./01_llms_语言模型">
    <strong>01. 语言模型</strong>
    <br>
    <span>LLM 基础与使用</span>
  </li>
  <li data-href="./02_prompts_提示词模板">
    <strong>02. 提示词模板</strong>
    <br>
    <span>模板化提示词管理</span>
  </li>
  <li data-href="./03_chains_链式调用">
    <strong>03. 链式调用</strong>
    <br>
    <span>LCEL 与链组合</span>
  </li>
  <li data-href="./04_memory_记忆功能">
    <strong>04. 记忆功能</strong>
    <br>
    <span>对话上下文管理</span>
  </li>
  <li data-href="./05_loaders_文档加载器">
    <strong>05. 文档加载器</strong>
    <br>
    <span>多种格式文档加载</span>
  </li>
  <li data-href="./06_vector_stores_向量数据库">
    <strong>06. 向量数据库</strong>
    <br>
    <span>向量化与相似性检索</span>
  </li>
  <li data-href="./07_agents_智能代理">
    <strong>07. 智能代理</strong>
    <br>
    <span>AI 代理与工具调用</span>
  </li>
  <li data-href="./08_rag_检索增强生成">
    <strong>08. 检索增强生成</strong>
    <br>
    <span>RAG 系统构建</span>
  </li>
  <li data-href="./langchain_notes">
    <strong>LangChain 笔记</strong>
    <br>
    <span>学习笔记与总结</span>
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
