import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"提示词压缩与缓存","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/22_compression_caching_压缩与缓存.md","filePath":"LLM/Prompt Engineering/22_compression_caching_压缩与缓存.md","lastUpdated":1778766566000}'),l={name:"LLM/Prompt Engineering/22_compression_caching_压缩与缓存.md"};function t(i,a,c,o,r,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="提示词压缩与缓存" tabindex="-1">提示词压缩与缓存 <a class="header-anchor" href="#提示词压缩与缓存" aria-label="Permalink to &quot;提示词压缩与缓存&quot;">​</a></h1><p>Token优化、降低延迟、成本控制。</p><hr><h2 id="为什么需要优化token" tabindex="-1">为什么需要优化Token <a class="header-anchor" href="#为什么需要优化token" aria-label="Permalink to &quot;为什么需要优化Token&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>成本因素：</span></span>
<span class="line"><span>- Token按使用量计费</span></span>
<span class="line"><span>- 大上下文窗口会显著增加成本</span></span>
<span class="line"><span></span></span>
<span class="line"><span>性能因素：</span></span>
<span class="line"><span>- Token越多，生成越慢</span></span>
<span class="line"><span>- 响应延迟增加用户体验差</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实际场景：</span></span>
<span class="line"><span>- 一个复杂Prompt可能用掉5000+ tokens</span></span>
<span class="line"><span>- 1M tokens约$5</span></span>
<span class="line"><span>- 每天1000次请求 → $25/天 → $750/月</span></span></code></pre></div><hr><h2 id="技巧一-压缩prompt" tabindex="-1">技巧一：压缩Prompt <a class="header-anchor" href="#技巧一-压缩prompt" aria-label="Permalink to &quot;技巧一：压缩Prompt&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>原始版（啰嗦）：</span></span>
<span class="line"><span>你是一个非常专业的而且经验丰富的数据分析师，请帮我仔细地分析一下这些数据，然后给出详细的建议...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>压缩版（简洁）：</span></span>
<span class="line"><span>你是数据分析师，请分析数据并给出建议。</span></span></code></pre></div><hr><h2 id="技巧二-移除冗余说明" tabindex="-1">技巧二：移除冗余说明 <a class="header-anchor" href="#技巧二-移除冗余说明" aria-label="Permalink to &quot;技巧二：移除冗余说明&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>❌ 冗余：</span></span>
<span class="line"><span>你要帮我做文本分类。类别有：正面、负面、中性。</span></span>
<span class="line"><span>正面是指...负面是指...中性是指...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>✅ 精简：</span></span>
<span class="line"><span>文本分类，返回正面/负面/中性。</span></span></code></pre></div><hr><h2 id="技巧三-重用组件" tabindex="-1">技巧三：重用组件 <a class="header-anchor" href="#技巧三-重用组件" aria-label="Permalink to &quot;技巧三：重用组件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>将常用的角色设定、格式要求做成模板，动态插入。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>模板示例：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;role&quot;: &quot;你是[角色]&quot;,</span></span>
<span class="line"><span>  &quot;format&quot;: &quot;返回JSON：{\\&quot;result\\&quot;: ...}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="技巧四-缓存机制" tabindex="-1">技巧四：缓存机制 <a class="header-anchor" href="#技巧四-缓存机制" aria-label="Permalink to &quot;技巧四：缓存机制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>相同问题 → 直接返回缓存结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>缓存策略：</span></span>
<span class="line"><span>1. 精确匹配：问题完全一样</span></span>
<span class="line"><span>2. 语义缓存：相似问题返回相似答案</span></span>
<span class="line"><span>3. TTL：缓存过期时间（如1小时）</span></span>
<span class="line"><span>4. 优先级：高频问题优先缓存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实现示例：</span></span>
<span class="line"><span>from cachetools import TTLCache</span></span>
<span class="line"><span>cache = TTLCache(maxsize=1000, ttl=3600)  # 1小时过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_response(prompt):</span></span>
<span class="line"><span>    if prompt in cache:</span></span>
<span class="line"><span>        return cache[prompt]</span></span>
<span class="line"><span>    response = llm.generate(prompt)</span></span>
<span class="line"><span>    cache[prompt] = response</span></span>
<span class="line"><span>    return response</span></span></code></pre></div><hr><h2 id="技巧五-流式输出-降低感知延迟" tabindex="-1">技巧五：流式输出（降低感知延迟） <a class="header-anchor" href="#技巧五-流式输出-降低感知延迟" aria-label="Permalink to &quot;技巧五：流式输出（降低感知延迟）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>API调用：</span></span>
<span class="line"><span>openai.ChatCompletion.create(</span></span>
<span class="line"><span>  stream=True,</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户体验：</span></span>
<span class="line"><span>- 普通模式：等3秒 → 完整显示</span></span>
<span class="line"><span>- 流式模式：0.2秒 → 逐字显示（虽然总时间一样，但感觉快很多）</span></span></code></pre></div><hr><h2 id="成本估算对比" tabindex="-1">成本估算对比 <a class="header-anchor" href="#成本估算对比" aria-label="Permalink to &quot;成本估算对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>原始</th><th>优化后</th><th>节省</th></tr></thead><tbody><tr><td>单次请求Token</td><td>2000</td><td>800</td><td>60%</td></tr><tr><td>每千次请求成本</td><td>$10</td><td>$4</td><td>60%</td></tr><tr><td>月请求（10万次）</td><td>$1000</td><td>$400</td><td>$600</td></tr></tbody></table><hr><h2 id="综合优化策略" tabindex="-1">综合优化策略 <a class="header-anchor" href="#综合优化策略" aria-label="Permalink to &quot;综合优化策略&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 设计阶段优化</span></span>
<span class="line"><span>   - Prompt简洁直接</span></span>
<span class="line"><span>   - 避免冗余描述</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 运行阶段优化</span></span>
<span class="line"><span>   - 实现缓存</span></span>
<span class="line"><span>   - 优先用小模型处理简单任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 长期优化</span></span>
<span class="line"><span>   - 定期清理不用的缓存</span></span>
<span class="line"><span>   - 分析Token使用报表</span></span>
<span class="line"><span>   - 持续压缩优化</span></span></code></pre></div>`,26)])])}const b=s(l,[["render",t]]);export{u as __pageData,b as default};
