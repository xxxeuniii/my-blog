import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"ReAct (Reasoning + Acting)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/06_react_推理行动.md","filePath":"LLM/Prompt Engineering/06_react_推理行动.md","lastUpdated":1778839000000}'),t={name:"LLM/Prompt Engineering/06_react_推理行动.md"};function l(i,a,r,c,d,o){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="react-reasoning-acting" tabindex="-1">ReAct (Reasoning + Acting) <a class="header-anchor" href="#react-reasoning-acting" aria-label="Permalink to &quot;ReAct (Reasoning + Acting)&quot;">​</a></h1><p>推理 + 行动，结合工具使用的框架。</p><hr><h2 id="示例一-天气查询" tabindex="-1">示例一：天气查询 <a class="header-anchor" href="#示例一-天气查询" aria-label="Permalink to &quot;示例一：天气查询&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：北京今天天气怎么样？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>推理：我需要获取北京的实时天气数据</span></span>
<span class="line"><span>行动：调用天气API查询北京当前天气</span></span>
<span class="line"><span>观察：API返回数据 - 温度26℃，晴，空气质量优</span></span>
<span class="line"><span>结论：北京今天天气晴朗，气温26℃，适合户外活动</span></span></code></pre></div><hr><h2 id="示例二-股票分析" tabindex="-1">示例二：股票分析 <a class="header-anchor" href="#示例二-股票分析" aria-label="Permalink to &quot;示例二：股票分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：帮我分析一下腾讯股票是否值得买入</span></span>
<span class="line"><span></span></span>
<span class="line"><span>推理：我需要获取腾讯的最新股票数据和分析信息</span></span>
<span class="line"><span>行动：调用股票API查询腾讯股价、基本面数据</span></span>
<span class="line"><span>观察：</span></span>
<span class="line"><span>- 当前股价：380港元</span></span>
<span class="line"><span>- 市盈率：18.5</span></span>
<span class="line"><span>- 近期趋势：震荡上行</span></span>
<span class="line"><span>- 分析师评级：买入/持有/卖出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>结论：综合估值和趋势，可以考虑分批建仓，但需注意风险</span></span></code></pre></div><hr><h2 id="示例三-代码调试" tabindex="-1">示例三：代码调试 <a class="header-anchor" href="#示例三-代码调试" aria-label="Permalink to &quot;示例三：代码调试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：帮我找出这段Python代码的问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>import requests</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_user(user_id):</span></span>
<span class="line"><span>    response = requests.get(f&quot;https://api.example.com/user/{user_id}&quot;)</span></span>
<span class="line"><span>    return response.json()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>推理：</span></span>
<span class="line"><span>1. 这个函数调用外部API获取用户数据</span></span>
<span class="line"><span>2. 但没有处理可能的异常情况</span></span>
<span class="line"><span></span></span>
<span class="line"><span>行动：</span></span>
<span class="line"><span>- 检查网络请求是否成功</span></span>
<span class="line"><span>- 检查返回数据格式</span></span>
<span class="line"><span>- 检查异常处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>发现的问题：</span></span>
<span class="line"><span>1. 没有超时设置，可能无限等待</span></span>
<span class="line"><span>2. 没有异常捕获，API失败会崩溃</span></span>
<span class="line"><span>3. 没有验证user_id格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建议修复：</span></span>
<span class="line"><span>def get_user(user_id, timeout=5):</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        response = requests.get(</span></span>
<span class="line"><span>            f&quot;https://api.example.com/user/{user_id}&quot;,</span></span>
<span class="line"><span>            timeout=timeout</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        response.raise_for_status()</span></span>
<span class="line"><span>        return response.json()</span></span>
<span class="line"><span>    except requests.RequestException as e:</span></span>
<span class="line"><span>        return {&quot;error&quot;: str(e)}</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>说明</th></tr></thead><tbody><tr><td>需要外部数据</td><td>调用API、查数据库</td></tr><tr><td>需要执行操作</td><td>搜索、计算、代码运行</td></tr><tr><td>复杂多步骤</td><td>推理→行动→观察→结论</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>步骤</th><th>说明</th></tr></thead><tbody><tr><td>推理 (Reason)</td><td>分析需要什么</td></tr><tr><td>行动 (Act)</td><td>执行操作获取信息</td></tr><tr><td>观察 (Observe)</td><td>理解返回结果</td></tr><tr><td>结论 (Conclude)</td><td>整合给出答案</td></tr></tbody></table><h2 id="react-vs-普通prompt" tabindex="-1">ReAct vs 普通Prompt <a class="header-anchor" href="#react-vs-普通prompt" aria-label="Permalink to &quot;ReAct vs 普通Prompt&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方式</th><th>适用场景</th></tr></thead><tbody><tr><td>普通Prompt</td><td>模型知识足够解决的问题</td></tr><tr><td>ReAct</td><td>需要外部信息、工具配合的场景</td></tr></tbody></table>`,18)])])}const b=s(t,[["render",l]]);export{u as __pageData,b as default};
