---
layout: page
sidebar: false
---

<div class="category-index-page">

# 提示词工程

提示词优化与最佳实践

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./01_fewshot_少样本提示">01. 少样本提示</a></strong>
    <br>
    <span>Few-shot Prompting</span>
  </li>
  <li>
    <strong><a href="./02_cot_思维链">02. 思维链</a></strong>
    <br>
    <span>Chain-of-Thought</span>
  </li>
  <li>
    <strong><a href="./03_json_结构化输出">03. 结构化输出</a></strong>
    <br>
    <span>JSON 格式输出</span>
  </li>
  <li>
    <strong><a href="./04_zeroshot_零样本提示">04. 零样本提示</a></strong>
    <br>
    <span>Zero-shot Prompting</span>
  </li>
  <li>
    <strong><a href="./05_tot_思维树">05. 思维树</a></strong>
    <br>
    <span>Tree-of-Thought</span>
  </li>
  <li>
    <strong><a href="./06_react_推理行动">06. ReAct</a></strong>
    <br>
    <span>Reasoning + Acting</span>
  </li>
  <li>
    <strong><a href="./07_self_consistency_自洽性">07. 自洽性</a></strong>
    <br>
    <span>Self-Consistency</span>
  </li>
  <li>
    <strong><a href="./08_prompt_chaining_提示链">08. 提示链</a></strong>
    <br>
    <span>Prompt Chaining</span>
  </li>
  <li>
    <strong><a href="./09_system_prompt_系统提示词">09. 系统提示词</a></strong>
    <br>
    <span>System Prompt</span>
  </li>
  <li>
    <strong><a href="./10_temperature_温度参数">10. 温度参数</a></strong>
    <br>
    <span>Temperature</span>
  </li>
  <li>
    <strong><a href="./11_top_p_核采样">11. 核采样</a></strong>
    <br>
    <span>Top-p Sampling</span>
  </li>
  <li>
    <strong><a href="./12_fewshot_cot_融合">12. 少样本 + CoT</a></strong>
    <br>
    <span>结合使用</span>
  </li>
  <li>
    <strong><a href="./13_prompt_injection_提示词注入">13. 提示词注入</a></strong>
    <br>
    <span>安全与防护</span>
  </li>
  <li>
    <strong><a href="./14_api_parameters_常用参数">14. API 参数</a></strong>
    <br>
    <span>API 配置详解</span>
  </li>
  <li>
    <strong><a href="./15_context_window_上下文窗口管理">15. 上下文窗口管理</a></strong>
    <br>
    <span>Context Window</span>
  </li>
  <li>
    <strong><a href="./16_multimodal_多模态提示">16. 多模态提示</a></strong>
    <br>
    <span>Multimodal</span>
  </li>
  <li>
    <strong><a href="./17_emotion_prompting_情感提示">17. 情感提示</a></strong>
    <br>
    <span>Emotion Prompting</span>
  </li>
  <li>
    <strong><a href="./18_generated_knowledge_生成知识">18. 生成知识</a></strong>
    <br>
    <span>Generated Knowledge</span>
  </li>
  <li>
    <strong><a href="./19_instruction_hierarchy_指令层级">19. 指令层级</a></strong>
    <br>
    <span>Instruction Hierarchy</span>
  </li>
  <li>
    <strong><a href="./20_refusal_suppression_拒绝抑制">20. 拒绝抑制</a></strong>
    <br>
    <span>Refusal Suppression</span>
  </li>
  <li>
    <strong><a href="./21_evaluation_iteration_评估与迭代">21. 评估与迭代</a></strong>
    <br>
    <span>Evaluation &amp; Iteration</span>
  </li>
  <li>
    <strong><a href="./22_compression_caching_压缩与缓存">22. 压缩与缓存</a></strong>
    <br>
    <span>Compression &amp; Caching</span>
  </li>
  <li>
    <strong><a href="./23_dynamic_rag_动态RAG提示词">23. 动态 RAG 提示词</a></strong>
    <br>
    <span>Dynamic RAG</span>
  </li>
  <li>
    <strong><a href="./24_dspy_提示词程序化">24. DSPy</a></strong>
    <br>
    <span>提示词程序化</span>
  </li>
  <li>
    <strong><a href="./25_meta_prompt_元提示词">25. 元提示词</a></strong>
    <br>
    <span>Meta Prompting</span>
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
