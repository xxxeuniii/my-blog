import{_ as a,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"元提示词 (Meta-Prompt)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/25_meta_prompt_元提示词.md","filePath":"LLM/Prompt Engineering/25_meta_prompt_元提示词.md","lastUpdated":1778839096000}'),l={name:"LLM/Prompt Engineering/25_meta_prompt_元提示词.md"};function t(i,s,c,o,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="元提示词-meta-prompt" tabindex="-1">元提示词 (Meta-Prompt) <a class="header-anchor" href="#元提示词-meta-prompt" aria-label="Permalink to &quot;元提示词 (Meta-Prompt)&quot;">​</a></h1><p>任务拆解、调度与自我反思。</p><hr><h2 id="什么是元提示词" tabindex="-1">什么是元提示词 <a class="header-anchor" href="#什么是元提示词" aria-label="Permalink to &quot;什么是元提示词&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词 = 提示词的提示词</span></span>
<span class="line"><span></span></span>
<span class="line"><span>核心思想：</span></span>
<span class="line"><span>- 让模型自己决定该怎么做</span></span>
<span class="line"><span>- 不是直接给步骤，而是让模型生成步骤</span></span>
<span class="line"><span>- 自我反思、自我纠正</span></span>
<span class="line"><span>- 复杂任务拆解调度</span></span></code></pre></div><hr><h2 id="模式一-任务拆解调度" tabindex="-1">模式一：任务拆解调度 <a class="header-anchor" href="#模式一-任务拆解调度" aria-label="Permalink to &quot;模式一：任务拆解调度&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你是一个任务调度器。给定用户问题，请：</span></span>
<span class="line"><span>1. 分析问题需要哪些步骤</span></span>
<span class="line"><span>2. 把任务分解为子任务</span></span>
<span class="line"><span>3. 按顺序执行子任务</span></span>
<span class="line"><span>4. 组合结果给出最终答案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;plan&quot;: [&quot;步骤1&quot;, &quot;步骤2&quot;, &quot;步骤3&quot;],</span></span>
<span class="line"><span>  &quot;results&quot;: [...]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实际运行：</span></span>
<span class="line"><span>问题 → 生成计划 → 执行每一步 → 聚合结果</span></span></code></pre></div><hr><h2 id="模式二-自我反思" tabindex="-1">模式二：自我反思 <a class="header-anchor" href="#模式二-自我反思" aria-label="Permalink to &quot;模式二：自我反思&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请回答问题，然后进行自我反思：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>步骤：</span></span>
<span class="line"><span>1. 给出初步答案</span></span>
<span class="line"><span>2. 批判自己：答案有没有问题？</span></span>
<span class="line"><span>3. 基于批判，给出改进后的最终答案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>初步答案：...</span></span>
<span class="line"><span>批判：这里逻辑有问题，因为...</span></span>
<span class="line"><span>最终答案：修正后的答案...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>好处：自动纠正错误</span></span></code></pre></div><hr><h2 id="模式三-元优化-自动改进prompt" tabindex="-1">模式三：元优化（自动改进Prompt） <a class="header-anchor" href="#模式三-元优化-自动改进prompt" aria-label="Permalink to &quot;模式三：元优化（自动改进Prompt）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请分析这个Prompt，然后给出优化建议：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始Prompt：[Prompt]</span></span>
<span class="line"><span>存在问题：[AI分析问题]</span></span>
<span class="line"><span>优化建议：[建议]</span></span>
<span class="line"><span>优化后的Prompt：[改进版本]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实际：可以让LLM自动优化自己用的Prompt！</span></span></code></pre></div><hr><h2 id="完整的复杂任务处理流程" tabindex="-1">完整的复杂任务处理流程 <a class="header-anchor" href="#完整的复杂任务处理流程" aria-label="Permalink to &quot;完整的复杂任务处理流程&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词 + 反射 + 修正：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 理解：这个问题需要做什么？</span></span>
<span class="line"><span>2. 计划：分几步做？</span></span>
<span class="line"><span>3. 执行：一步步做</span></span>
<span class="line"><span>4. 检查：做错了吗？</span></span>
<span class="line"><span>5. 修正：如果错了，重新来</span></span>
<span class="line"><span>6. 输出：最终结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用代码实现：</span></span>
<span class="line"><span>while not is_acceptable(answer):</span></span>
<span class="line"><span>    plan = generate_plan(question)</span></span>
<span class="line"><span>    answer = execute_plan(plan)</span></span>
<span class="line"><span>    critique = critique_answer(answer)</span></span>
<span class="line"><span>    if critique[&quot;is_good&quot;]:</span></span>
<span class="line"><span>        break</span></span></code></pre></div><hr><h2 id="自我反思prompt示例" tabindex="-1">自我反思Prompt示例 <a class="header-anchor" href="#自我反思prompt示例" aria-label="Permalink to &quot;自我反思Prompt示例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请回答数学题：&quot;3个苹果+2个苹果=？&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请按以下格式回答：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;reasoning&quot;: &quot;思考过程&quot;,</span></span>
<span class="line"><span>  &quot;answer&quot;: &quot;你的答案&quot;,</span></span>
<span class="line"><span>  &quot;reflection&quot;: {</span></span>
<span class="line"><span>    &quot;check&quot;: &quot;检查一下这个答案对吗？&quot;,</span></span>
<span class="line"><span>    &quot;correction&quot;: &quot;如果错了，正确应该是？&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一次输出：</span></span>
<span class="line"><span>reasoning: 3+2=5</span></span>
<span class="line"><span>answer: 5</span></span>
<span class="line"><span>reflection:</span></span>
<span class="line"><span>  check: 对的，3个加2个是5个</span></span>
<span class="line"><span>  correction: 不需要</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二次（故意错）：</span></span>
<span class="line"><span>reasoning: 3+2=4</span></span>
<span class="line"><span>answer: 4</span></span>
<span class="line"><span>reflection:</span></span>
<span class="line"><span>  check: 错了！3+2=5，算错了</span></span>
<span class="line"><span>  correction: 5个</span></span></code></pre></div><hr><h2 id="实际案例-代码审查" tabindex="-1">实际案例：代码审查 <a class="header-anchor" href="#实际案例-代码审查" aria-label="Permalink to &quot;实际案例：代码审查&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>元提示词：</span></span>
<span class="line"><span>你是一个代码审查专家，请按以下流程审查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 理解：这段代码想做什么？</span></span>
<span class="line"><span>2. 分析：有没有bug？性能问题？安全问题？</span></span>
<span class="line"><span>3. 自我验证：我的分析对吗？再仔细检查一遍</span></span>
<span class="line"><span>4. 建议：给出具体修复方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>[代码]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;understanding&quot;: &quot;理解&quot;,</span></span>
<span class="line"><span>  &quot;issues&quot;: [&quot;问题1&quot;, &quot;问题2&quot;],</span></span>
<span class="line"><span>  &quot;self_check&quot;: &quot;自我验证结果&quot;,</span></span>
<span class="line"><span>  &quot;suggestions&quot;: [&quot;修复建议&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>理由</th></tr></thead><tbody><tr><td>复杂推理</td><td>需要分步验证</td></tr><tr><td>高要求任务</td><td>减少错误概率</td></tr><tr><td>自动优化</td><td>让模型改进自己</td></tr><tr><td>不确定性高</td><td>多步验证更可靠</td></tr></tbody></table><hr><h2 id="权衡" tabindex="-1">权衡 <a class="header-anchor" href="#权衡" aria-label="Permalink to &quot;权衡&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>优点：</span></span>
<span class="line"><span>- 更可靠，错误更少</span></span>
<span class="line"><span>- 输出质量更高</span></span>
<span class="line"><span>- 可观察性强（能看到思考过程）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>缺点：</span></span>
<span class="line"><span>- 慢（多轮调用）</span></span>
<span class="line"><span>- 贵（Token消耗多）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建议：只在重要任务用</span></span></code></pre></div>`,29)])])}const q=a(l,[["render",t]]);export{u as __pageData,q as default};
