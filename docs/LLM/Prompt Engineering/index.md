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
  <li data-href="./01_fewshot_少样本提示">
    <strong>01. 少样本提示</strong>
    <br>
    <span>Few-shot Prompting</span>
  </li>
  <li data-href="./02_cot_思维链">
    <strong>02. 思维链</strong>
    <br>
    <span>Chain-of-Thought</span>
  </li>
  <li data-href="./03_json_结构化输出">
    <strong>03. 结构化输出</strong>
    <br>
    <span>JSON 格式输出</span>
  </li>
  <li data-href="./04_zeroshot_零样本提示">
    <strong>04. 零样本提示</strong>
    <br>
    <span>Zero-shot Prompting</span>
  </li>
  <li data-href="./05_tot_思维树">
    <strong>05. 思维树</strong>
    <br>
    <span>Tree-of-Thought</span>
  </li>
  <li data-href="./06_react_推理行动">
    <strong>06. ReAct</strong>
    <br>
    <span>Reasoning + Acting</span>
  </li>
  <li data-href="./07_self_consistency_自洽性">
    <strong>07. 自洽性</strong>
    <br>
    <span>Self-Consistency</span>
  </li>
  <li data-href="./08_prompt_chaining_提示链">
    <strong>08. 提示链</strong>
    <br>
    <span>Prompt Chaining</span>
  </li>
  <li data-href="./09_system_prompt_系统提示词">
    <strong>09. 系统提示词</strong>
    <br>
    <span>System Prompt</span>
  </li>
  <li data-href="./10_temperature_温度参数">
    <strong>10. 温度参数</strong>
    <br>
    <span>Temperature</span>
  </li>
  <li data-href="./11_top_p_核采样">
    <strong>11. 核采样</strong>
    <br>
    <span>Top-p Sampling</span>
  </li>
  <li data-href="./12_fewshot_cot_融合">
    <strong>12. 少样本 + CoT</strong>
    <br>
    <span>结合使用</span>
  </li>
  <li data-href="./13_prompt_injection_提示词注入">
    <strong>13. 提示词注入</strong>
    <br>
    <span>安全与防护</span>
  </li>
  <li data-href="./14_api_parameters_常用参数">
    <strong>14. API 参数</strong>
    <br>
    <span>API 配置详解</span>
  </li>
  <li data-href="./15_context_window_上下文窗口管理">
    <strong>15. 上下文窗口管理</strong>
    <br>
    <span>Context Window</span>
  </li>
  <li data-href="./16_multimodal_多模态提示">
    <strong>16. 多模态提示</strong>
    <br>
    <span>Multimodal</span>
  </li>
  <li data-href="./17_emotion_prompting_情感提示">
    <strong>17. 情感提示</strong>
    <br>
    <span>Emotion Prompting</span>
  </li>
  <li data-href="./18_generated_knowledge_生成知识">
    <strong>18. 生成知识</strong>
    <br>
    <span>Generated Knowledge</span>
  </li>
  <li data-href="./19_instruction_hierarchy_指令层级">
    <strong>19. 指令层级</strong>
    <br>
    <span>Instruction Hierarchy</span>
  </li>
  <li data-href="./20_refusal_suppression_拒绝抑制">
    <strong>20. 拒绝抑制</strong>
    <br>
    <span>Refusal Suppression</span>
  </li>
  <li data-href="./21_evaluation_iteration_评估与迭代">
    <strong>21. 评估与迭代</strong>
    <br>
    <span>Evaluation &amp; Iteration</span>
  </li>
  <li data-href="./22_compression_caching_压缩与缓存">
    <strong>22. 压缩与缓存</strong>
    <br>
    <span>Compression &amp; Caching</span>
  </li>
  <li data-href="./23_dynamic_rag_动态RAG提示词">
    <strong>23. 动态 RAG 提示词</strong>
    <br>
    <span>Dynamic RAG</span>
  </li>
  <li data-href="./24_dspy_提示词程序化">
    <strong>24. DSPy</strong>
    <br>
    <span>提示词程序化</span>
  </li>
  <li data-href="./25_meta_prompt_元提示词">
    <strong>25. 元提示词</strong>
    <br>
    <span>Meta Prompting</span>
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
