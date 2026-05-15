import{_ as s,o as n,c as t,ag as p}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"Few-shot + COT 融合","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/12_fewshot_cot_融合.md","filePath":"LLM/Prompt Engineering/12_fewshot_cot_融合.md","lastUpdated":1778838236000}'),e={name:"LLM/Prompt Engineering/12_fewshot_cot_融合.md"};function l(i,a,o,d,r,c){return n(),t("div",null,[...a[0]||(a[0]=[p(`<h1 id="few-shot-cot-融合" tabindex="-1">Few-shot + COT 融合 <a class="header-anchor" href="#few-shot-cot-融合" aria-label="Permalink to &quot;Few-shot + COT 融合&quot;">​</a></h1><p>既给例子，又让模型一步步思考。</p><hr><h2 id="示例一-情感分析" tabindex="-1">示例一：情感分析 <a class="header-anchor" href="#示例一-情感分析" aria-label="Permalink to &quot;示例一：情感分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请分析以下评论的情感，并展示推理过程。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子：</span></span>
<span class="line"><span>&quot;这个电影太精彩了，笑中带泪&quot; → 正面</span></span>
<span class="line"><span>推理：评论中使用了&quot;精彩&quot;、&quot;笑中带泪&quot;等积极词汇，表达了对电影的赞赏。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;等了2小时电影才开始，差评&quot; → 负面</span></span>
<span class="line"><span>推理：评论中提到&quot;等2小时&quot;表示不满，&quot;差评&quot;直接表达了负面情感。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请分析：</span></span>
<span class="line"><span>&quot;前半部分还行，后半部分太拖沓了&quot;</span></span></code></pre></div><hr><h2 id="示例二-数学应用题" tabindex="-1">示例二：数学应用题 <a class="header-anchor" href="#示例二-数学应用题" aria-label="Permalink to &quot;示例二：数学应用题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请解答以下问题，并展示完整推理过程。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子：</span></span>
<span class="line"><span>&quot;小明有10元，买了3本练习本，每本2元，还剩多少？&quot;</span></span>
<span class="line"><span>解：</span></span>
<span class="line"><span>1. 总钱数：10元</span></span>
<span class="line"><span>2. 花费：3 × 2 = 6元</span></span>
<span class="line"><span>3. 剩余：10 - 6 = 4元</span></span>
<span class="line"><span>答案：4元</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请解答：</span></span>
<span class="line"><span>&quot;小红有25元，买了一支钢笔8元，又买了3支铅笔，每支3元，还剩多少？&quot;</span></span></code></pre></div><hr><h2 id="示例三-代码审查" tabindex="-1">示例三：代码审查 <a class="header-anchor" href="#示例三-代码审查" aria-label="Permalink to &quot;示例三：代码审查&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请审查以下代码，识别问题并展示分析过程。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子：</span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>def divide(a, b):</span></span>
<span class="line"><span>    return a / b</span></span>
<span class="line"><span></span></span>
<span class="line"><span>审查过程：</span></span>
<span class="line"><span>1. 检查函数逻辑：直接返回a除以b</span></span>
<span class="line"><span>2. 潜在问题：如果b为0会抛出ZeroDivisionError</span></span>
<span class="line"><span>3. 严重程度：高</span></span>
<span class="line"><span>4. 建议：添加除零检查</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请审查：</span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>def find_max(scores):</span></span>
<span class="line"><span>    return max(scores)</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>效果</th></tr></thead><tbody><tr><td>复杂格式要求</td><td>既给格式例子，又让展示过程</td></tr><tr><td>推理类任务</td><td>例子演示推理步骤</td></tr><tr><td>专业领域</td><td>专业判断标准和过程</td></tr><tr><td>教学场景</td><td>展示思考过程</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>例子包含过程</td><td>不仅给答案，要展示&quot;为什么&quot;</td></tr><tr><td>格式一致</td><td>例子的格式要和期望输出一致</td></tr><tr><td>引导词</td><td>用&quot;推理过程&quot;、&quot;分析步骤&quot;等引导</td></tr><tr><td>渐进复杂</td><td>例子从简单到复杂</td></tr></tbody></table>`,16)])])}const b=s(e,[["render",l]]);export{u as __pageData,b as default};
