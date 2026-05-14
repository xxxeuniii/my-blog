import{_ as n,o as s,c as p,ag as t}from"./chunks/framework.-Wrcbzkw.js";const b=JSON.parse('{"title":"Prompt Chaining (提示链)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/08_prompt_chaining_提示链.md","filePath":"LLM/Prompt Engineering/08_prompt_chaining_提示链.md","lastUpdated":1778755451000}'),e={name:"LLM/Prompt Engineering/08_prompt_chaining_提示链.md"};function l(i,a,r,d,c,o){return s(),p("div",null,[...a[0]||(a[0]=[t(`<h1 id="prompt-chaining-提示链" tabindex="-1">Prompt Chaining (提示链) <a class="header-anchor" href="#prompt-chaining-提示链" aria-label="Permalink to &quot;Prompt Chaining (提示链)&quot;">​</a></h1><p>将复杂任务拆分为多个步骤，逐步完成。</p><hr><h2 id="示例一-文章处理流水线" tabindex="-1">示例一：文章处理流水线 <a class="header-anchor" href="#示例一-文章处理流水线" aria-label="Permalink to &quot;示例一：文章处理流水线&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 文章总结：</span></span>
<span class="line"><span>请总结以下文章的核心内容（3个要点）：</span></span>
<span class="line"><span>&quot;人工智能技术的快速发展正在深刻改变各行各业...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 提取关键词：</span></span>
<span class="line"><span>基于刚才的总结，提取5个关键词</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步 - 生成标题：</span></span>
<span class="line"><span>根据总结和关键词，生成3个吸引人的文章标题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第四步 - 撰写摘要：</span></span>
<span class="line"><span>将总结扩展成一段100字的文章摘要</span></span></code></pre></div><hr><h2 id="示例二-用户评论分析" tabindex="-1">示例二：用户评论分析 <a class="header-anchor" href="#示例二-用户评论分析" aria-label="Permalink to &quot;示例二：用户评论分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 情感分类：</span></span>
<span class="line"><span>判断以下评论的情感（正面/负面/中性）：</span></span>
<span class="line"><span>&quot;等了半小时才上菜，菜品还有点凉&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 关键信息提取：</span></span>
<span class="line"><span>从评论中提取：问题类型、等待时间、具体不满点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步 - 严重程度评估：</span></span>
<span class="line"><span>基于提取的信息，评估这个问题的严重程度（1-5分）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第四步 - 生成回复：</span></span>
<span class="line"><span>针对这条评论，生成一条合适的商家回复</span></span></code></pre></div><hr><h2 id="示例三-需求文档生成" tabindex="-1">示例三：需求文档生成 <a class="header-anchor" href="#示例三-需求文档生成" aria-label="Permalink to &quot;示例三：需求文档生成&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 需求收集：</span></span>
<span class="line"><span>从用户描述中提取功能需求：</span></span>
<span class="line"><span>&quot;我希望有一个功能能自动备份手机照片到云端，并且能按时间分类&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 需求分析：</span></span>
<span class="line"><span>将需求拆分为：</span></span>
<span class="line"><span>- 核心功能（必须）</span></span>
<span class="line"><span>- 附加功能（应该有）</span></span>
<span class="line"><span>- 扩展功能（可以有）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步 - 编写PRD：</span></span>
<span class="line"><span>基于以上分析，撰写产品需求文档，包含：</span></span>
<span class="line"><span>- 产品概述</span></span>
<span class="line"><span>- 功能列表</span></span>
<span class="line"><span>- 用户场景</span></span>
<span class="line"><span>- 非功能需求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第四步 - 技术评估：</span></span>
<span class="line"><span>评估实现难度和周期</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>优势</th></tr></thead><tbody><tr><td>复杂长任务</td><td>拆解后更清晰</td></tr><tr><td>多阶段处理</td><td>每步专注单一任务</td></tr><tr><td>流水线生产</td><td>结果可复用、可调整</td></tr><tr><td>质量要求高</td><td>每步可审核、修正</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>单一职责</td><td>每步只做一个明确任务</td></tr><tr><td>上下文传递</td><td>前一步输出作为后一步输入</td></tr><tr><td>可独立优化</td><td>某步效果不好可单独改进</td></tr><tr><td>结果验证</td><td>中间步骤可检查、修正</td></tr></tbody></table><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>每步指令要清晰明确</li><li>适当在prompt中传递前一步的结果</li><li>如果某步出错，可以单独重试</li><li>不要拆得太细，反而增加复杂度</li></ul><h2 id="prompt-chaining-vs-react" tabindex="-1">Prompt Chaining vs ReAct <a class="header-anchor" href="#prompt-chaining-vs-react" aria-label="Permalink to &quot;Prompt Chaining vs ReAct&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方法</th><th>区别</th></tr></thead><tbody><tr><td>Chaining</td><td>按顺序执行，线性流程</td></tr><tr><td>ReAct</td><td>推理+行动+观察，循环迭代</td></tr></tbody></table>`,20)])])}const u=n(e,[["render",l]]);export{b as __pageData,u as default};
