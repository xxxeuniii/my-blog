import{_ as s,o as n,c as p,ag as t}from"./chunks/framework.-Wrcbzkw.js";const h=JSON.parse('{"title":"多模态提示","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/16_multimodal_多模态提示.md","filePath":"LLM/Prompt Engineering/16_multimodal_多模态提示.md","lastUpdated":1778844283000}'),e={name:"LLM/Prompt Engineering/16_multimodal_多模态提示.md"};function l(i,a,o,d,c,r){return n(),p("div",null,[...a[0]||(a[0]=[t(`<h1 id="多模态提示" tabindex="-1">多模态提示 <a class="header-anchor" href="#多模态提示" aria-label="Permalink to &quot;多模态提示&quot;">​</a></h1><p>图片+文字组合输入的提示方式。</p><hr><h2 id="支持多模态的模型" tabindex="-1">支持多模态的模型 <a class="header-anchor" href="#支持多模态的模型" aria-label="Permalink to &quot;支持多模态的模型&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模型</th><th>支持格式</th></tr></thead><tbody><tr><td>GPT-4 Vision</td><td>图片URL/Base64</td></tr><tr><td>Claude-3</td><td>图片+文档</td></tr><tr><td>Gemini</td><td>图片+视频+音频</td></tr><tr><td>通义千问VL</td><td>图片</td></tr></tbody></table><hr><h2 id="示例一-设计稿分析" tabindex="-1">示例一：设计稿分析 <a class="header-anchor" href="#示例一-设计稿分析" aria-label="Permalink to &quot;示例一：设计稿分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你是一名UI设计师，请分析以下设计稿：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[图片]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请从以下维度分析：</span></span>
<span class="line"><span>1. 整体布局是否合理</span></span>
<span class="line"><span>2. 色彩搭配是否协调</span></span>
<span class="line"><span>3. 交互体验可能存在的问题</span></span>
<span class="line"><span>4. 改进建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回JSON格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;layout_score&quot;: 分数1-10,</span></span>
<span class="line"><span>  &quot;color_score&quot;: 分数1-10,</span></span>
<span class="line"><span>  &quot;issues&quot;: [&quot;问题列表&quot;],</span></span>
<span class="line"><span>  &quot;suggestions&quot;: [&quot;改进建议&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例二-代码截图审查" tabindex="-1">示例二：代码截图审查 <a class="header-anchor" href="#示例二-代码截图审查" aria-label="Permalink to &quot;示例二：代码截图审查&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你是一名资深工程师，请审查这段代码的问题：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[代码截图]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请识别：</span></span>
<span class="line"><span>1. 编程语言和框架</span></span>
<span class="line"><span>2. 代码逻辑问题</span></span>
<span class="line"><span>3. 潜在Bug</span></span>
<span class="line"><span>4. 性能问题</span></span>
<span class="line"><span>5. 安全风险</span></span></code></pre></div><hr><h2 id="示例三-图表数据分析" tabindex="-1">示例三：图表数据分析 <a class="header-anchor" href="#示例三-图表数据分析" aria-label="Permalink to &quot;示例三：图表数据分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请分析以下图表，提取关键数据：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[折线图/柱状图/饼图]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请返回：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;chart_type&quot;: &quot;图表类型&quot;,</span></span>
<span class="line"><span>  &quot;title&quot;: &quot;图表标题&quot;,</span></span>
<span class="line"><span>  &quot;key_data_points&quot;: [&quot;关键数据点&quot;],</span></span>
<span class="line"><span>  &quot;trend&quot;: &quot;趋势描述&quot;,</span></span>
<span class="line"><span>  &quot;insights&quot;: [&quot;洞察&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例四-营业执照-证件识别" tabindex="-1">示例四：营业执照/证件识别 <a class="header-anchor" href="#示例四-营业执照-证件识别" aria-label="Permalink to &quot;示例四：营业执照/证件识别&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请从以下图片中提取信息：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[证件图片]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回JSON：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;company_name&quot;: &quot;公司名称&quot;,</span></span>
<span class="line"><span>  &quot;legal_person&quot;: &quot;法人&quot;,</span></span>
<span class="line"><span>  &quot;registration_code&quot;: &quot;注册号&quot;,</span></span>
<span class="line"><span>  &quot;address&quot;: &quot;地址&quot;,</span></span>
<span class="line"><span>  &quot;business_scope&quot;: &quot;经营范围&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例五-多图对比" tabindex="-1">示例五：多图对比 <a class="header-anchor" href="#示例五-多图对比" aria-label="Permalink to &quot;示例五：多图对比&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请对比以下两张设计稿的差异：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>设计稿V1：[图片]</span></span>
<span class="line"><span>设计稿V2：[图片]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析：</span></span>
<span class="line"><span>1. 布局变化</span></span>
<span class="line"><span>2. 颜色变化</span></span>
<span class="line"><span>3. 功能变化</span></span>
<span class="line"><span>4. 改进点</span></span></code></pre></div><hr><h2 id="提示技巧" tabindex="-1">提示技巧 <a class="header-anchor" href="#提示技巧" aria-label="Permalink to &quot;提示技巧&quot;">​</a></h2><table tabindex="0"><thead><tr><th>技巧</th><th>说明</th></tr></thead><tbody><tr><td>指定格式</td><td>明确告诉模型你希望的输出格式</td></tr><tr><td>分步引导</td><td>先识别图片类型，再分析内容</td></tr><tr><td>补充文字</td><td>图片质量差时，用文字补充说明</td></tr><tr><td>控制数量</td><td>单次不要发太多图，建议1-3张</td></tr></tbody></table><h2 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h2><table tabindex="0"><thead><tr><th>问题</th><th>解决方案</th></tr></thead><tbody><tr><td>图片太大</td><td>压缩到1-2MB</td></tr><tr><td>模型不识别</td><td>用文字描述关键内容</td></tr><tr><td>输出不准确</td><td>指定输出格式，减少自由度</td></tr></tbody></table>`,25)])])}const q=s(e,[["render",l]]);export{h as __pageData,q as default};
