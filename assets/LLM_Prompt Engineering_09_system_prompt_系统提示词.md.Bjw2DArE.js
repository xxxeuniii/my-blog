import{_ as s,o as n,c as t,ag as p}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"System Prompt (系统提示词)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/09_system_prompt_系统提示词.md","filePath":"LLM/Prompt Engineering/09_system_prompt_系统提示词.md","lastUpdated":1778838640000}'),e={name:"LLM/Prompt Engineering/09_system_prompt_系统提示词.md"};function l(i,a,o,d,r,c){return n(),t("div",null,[...a[0]||(a[0]=[p(`<h1 id="system-prompt-系统提示词" tabindex="-1">System Prompt (系统提示词) <a class="header-anchor" href="#system-prompt-系统提示词" aria-label="Permalink to &quot;System Prompt (系统提示词)&quot;">​</a></h1><p>设定AI的整体行为和角色。</p><hr><h2 id="示例一-基础角色设定" tabindex="-1">示例一：基础角色设定 <a class="header-anchor" href="#示例一-基础角色设定" aria-label="Permalink to &quot;示例一：基础角色设定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>系统提示词：</span></span>
<span class="line"><span>你是一名资深Java后端工程师，有10年开发经验，精通Spring、MySQL、Redis。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户提问：</span></span>
<span class="line"><span>&quot;帮我解释一下什么是微服务架构&quot;</span></span></code></pre></div><hr><h2 id="示例二-多角色协作" tabindex="-1">示例二：多角色协作 <a class="header-anchor" href="#示例二-多角色协作" aria-label="Permalink to &quot;示例二：多角色协作&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>系统提示词：</span></span>
<span class="line"><span>你是一个会议记录助手。你的职责：</span></span>
<span class="line"><span>1. 准确记录会议内容</span></span>
<span class="line"><span>2. 提取关键决策和待办事项</span></span>
<span class="line"><span>3. 用简洁清晰的语言总结</span></span>
<span class="line"><span>4. 用JSON格式返回结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会议记录输出格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;meeting_title&quot;: &quot;会议主题&quot;,</span></span>
<span class="line"><span>  &quot;date&quot;: &quot;日期&quot;,</span></span>
<span class="line"><span>  &quot;participants&quot;: [&quot;参会人&quot;],</span></span>
<span class="line"><span>  &quot;decisions&quot;: [&quot;决策1&quot;, &quot;决策2&quot;],</span></span>
<span class="line"><span>  &quot;action_items&quot;: [{&quot;task&quot;: &quot;任务&quot;, &quot;owner&quot;: &quot;负责人&quot;, &quot;deadline&quot;: &quot;截止日期&quot;}],</span></span>
<span class="line"><span>  &quot;summary&quot;: &quot;会议总结&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例三-安全边界设定" tabindex="-1">示例三：安全边界设定 <a class="header-anchor" href="#示例三-安全边界设定" aria-label="Permalink to &quot;示例三：安全边界设定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>系统提示词：</span></span>
<span class="line"><span>你是一个法律顾问助手。请遵守以下规则：</span></span>
<span class="line"><span>1. 只提供法律信息，不提供具体法律建议</span></span>
<span class="line"><span>2. 涉及具体案件必须建议咨询律师</span></span>
<span class="line"><span>3. 不回答任何涉及违法的问题</span></span>
<span class="line"><span>4. 回答时注明仅供参考</span></span></code></pre></div><hr><h2 id="示例四-风格统一" tabindex="-1">示例四：风格统一 <a class="header-anchor" href="#示例四-风格统一" aria-label="Permalink to &quot;示例四：风格统一&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>系统提示词：</span></span>
<span class="line"><span>你是一名技术文档撰写专家。请按以下风格工作：</span></span>
<span class="line"><span>- 语言：简洁、专业、易懂</span></span>
<span class="line"><span>- 格式：使用Markdown，适当使用代码块</span></span>
<span class="line"><span>- 长度：回答控制在200字以内</span></span>
<span class="line"><span>- 结尾：如有代码，提供完整可运行的示例</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>说明</th></tr></thead><tbody><tr><td>固定角色</td><td>AI始终以特定身份回答</td></tr><tr><td>格式统一</td><td>所有输出符合特定格式</td></tr><tr><td>安全边界</td><td>限制AI的回答范围</td></tr><tr><td>风格设定</td><td>统一输出语言、格式、长度</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>放在开头</td><td>System Prompt 在对话最前面</td></tr><tr><td>具体明确</td><td>角色描述要具体，避免泛泛而谈</td></tr><tr><td>包含格式</td><td>明确输出格式要求</td></tr><tr><td>安全边界</td><td>设置禁区和不回答的问题</td></tr><tr><td>可动态调整</td><td>不同任务用不同System Prompt</td></tr></tbody></table>`,19)])])}const m=s(e,[["render",l]]);export{u as __pageData,m as default};
