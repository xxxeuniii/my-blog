---
layout: page
sidebar: false
---

<div class="category-index-page">

# LangChain

LangChain 框架完整教程

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./01_llms_语言模型">01. 语言模型</a></strong>
    <br>
    <span>LLM 基础与使用</span>
  </li>
  <li>
    <strong><a href="./02_prompts_提示词模板">02. 提示词模板</a></strong>
    <br>
    <span>模板化提示词管理</span>
  </li>
  <li>
    <strong><a href="./03_chains_链式调用">03. 链式调用</a></strong>
    <br>
    <span>LCEL 与链组合</span>
  </li>
  <li>
    <strong><a href="./04_memory_记忆功能">04. 记忆功能</a></strong>
    <br>
    <span>对话上下文管理</span>
  </li>
  <li>
    <strong><a href="./05_loaders_文档加载器">05. 文档加载器</a></strong>
    <br>
    <span>多种格式文档加载</span>
  </li>
  <li>
    <strong><a href="./06_vector_stores_向量数据库">06. 向量数据库</a></strong>
    <br>
    <span>向量化与相似性检索</span>
  </li>
  <li>
    <strong><a href="./07_agents_智能代理">07. 智能代理</a></strong>
    <br>
    <span>AI 代理与工具调用</span>
  </li>
  <li>
    <strong><a href="./08_rag_检索增强生成">08. 检索增强生成</a></strong>
    <br>
    <span>RAG 系统构建</span>
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
