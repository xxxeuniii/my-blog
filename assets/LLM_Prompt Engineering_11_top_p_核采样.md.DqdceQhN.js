import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"Top-p (核采样)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/11_top_p_核采样.md","filePath":"LLM/Prompt Engineering/11_top_p_核采样.md","lastUpdated":1778838722000}'),t={name:"LLM/Prompt Engineering/11_top_p_核采样.md"};function l(i,a,r,o,d,c){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="top-p-核采样" tabindex="-1">Top-p (核采样) <a class="header-anchor" href="#top-p-核采样" aria-label="Permalink to &quot;Top-p (核采样)&quot;">​</a></h1><p>另一种控制输出随机性的参数，与Temperature类似但不同。</p><hr><h2 id="参数解释" tabindex="-1">参数解释 <a class="header-anchor" href="#参数解释" aria-label="Permalink to &quot;参数解释&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Top-p = 0.0 ~ 1.0（通常）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Top-p = 1.0：</span></span>
<span class="line"><span>- 使用全部词汇概率分布</span></span>
<span class="line"><span>- 输出最随机、最大胆</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Top-p = 0.9：</span></span>
<span class="line"><span>- 只从前90%概率的词汇中选择</span></span>
<span class="line"><span>- 过滤掉长尾、低概率词汇</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Top-p = 0.1：</span></span>
<span class="line"><span>- 只从最高概率的10%词汇中选择</span></span>
<span class="line"><span>- 输出非常保守、稳定</span></span></code></pre></div><hr><h2 id="top-p-vs-temperature" tabindex="-1">Top-p vs Temperature <a class="header-anchor" href="#top-p-vs-temperature" aria-label="Permalink to &quot;Top-p vs Temperature&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>控制方式</th><th>效果</th></tr></thead><tbody><tr><td>Temperature</td><td>直接缩放概率分布</td><td>控制整体随机性</td></tr><tr><td>Top-p</td><td>累积概率阈值</td><td>动态调整词汇候选集</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>举例：</span></span>
<span class="line"><span>词汇概率：[0.5, 0.2, 0.15, 0.1, 0.05]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Top-p=0.9：</span></span>
<span class="line"><span>累积：0.5 → 0.7 → 0.85 → 0.95</span></span>
<span class="line"><span>包含到0.9，所以前4个词都在候选集</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Top-p=0.5：</span></span>
<span class="line"><span>累积：0.5 → 0.7</span></span>
<span class="line"><span>只包含前2个词</span></span></code></pre></div><hr><h2 id="推荐用法" tabindex="-1">推荐用法 <a class="header-anchor" href="#推荐用法" aria-label="Permalink to &quot;推荐用法&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>Top-p</th><th>Temperature</th></tr></thead><tbody><tr><td>稳定输出</td><td>0.9</td><td>0.3</td></tr><tr><td>平衡模式</td><td>0.95</td><td>0.7</td></tr><tr><td>创意模式</td><td>1.0</td><td>1.0</td></tr></tbody></table><hr><h2 id="实际建议" tabindex="-1">实际建议 <a class="header-anchor" href="#实际建议" aria-label="Permalink to &quot;实际建议&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>一般规则：</span></span>
<span class="line"><span>1. 只调一个（Temperature 或 Top-p），不要同时调</span></span>
<span class="line"><span>2. 默认从 Top-p=0.95 或 Temperature=0.7 开始</span></span>
<span class="line"><span>3. 太保守 → 降低Top-p 或 提高Temperature</span></span>
<span class="line"><span>4. 太随机 → 提高Top-p 或 降低Temperature</span></span>
<span class="line"><span></span></span>
<span class="line"><span>安全区间：</span></span>
<span class="line"><span>- 精确任务：Top-p 0.8-0.95 或 Temperature 0.1-0.3</span></span>
<span class="line"><span>- 创意任务：Top-p 0.95-1.0 或 Temperature 0.8-1.0</span></span></code></pre></div>`,15)])])}const _=s(t,[["render",l]]);export{u as __pageData,_ as default};
