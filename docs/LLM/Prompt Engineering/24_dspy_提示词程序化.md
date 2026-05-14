# 提示词程序化 (DSPy)

从"手动调参"转向"编译优化"。

---

## 背景问题

```
传统Prompt调优方式：
- 手动改Prompt
- 试错法（试10次选最好）
- 不可复现
- 无法系统化优化
- 难以上线到生产

更糟糕的是：
- 换了一个模型，一切要重调
- 换了一个用例，一切要重调
- 团队协作困难
```

---

## DSPy是什么

```
DSPy = Declarative Self-improving Language Programs

核心思想：
- 把Prompt编程化（像写代码）
- 自动优化（编译Prompt）
- 可复现、可测试、可维护
- 模型无关（一套代码通吃多个模型）

类似：
- 传统Prompt = 手写汇编
- DSPy = 高级编程语言+编译器
```

---

## 快速上手

```python
import dspy

# 1. 定义模块（像函数）
class QA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate_answer = dspy.ChainOfThought("question -> answer")

    def forward(self, question):
        return self.generate_answer(question=question)

# 2. 编译（自动优化）
from dspy.teleprompt import BootstrapFewShot

# 准备训练数据
trainset = [
    dspy.Example(question="...", answer="..."),
    # ...
]

# 编译优化
compiled_qa = BootstrapFewShot().compile(
    QA(),
    trainset=trainset
)

# 3. 用！
result = compiled_qa(question="你的问题")
print(result.answer)
```

---

## 为什么这么强

```
自动优化做了什么：
1. 自动Few-shot：从训练数据中挑最好的例子
2. 自动Prompt调优：找到效果最好的Prompt模板
3. 自动COT：判断什么时候需要分步思考
4. 自动组合：多个模块的最佳组合方式

不用你一个个试，自动搞定！
```

---

## 核心概念

| 概念 | 说明 |
|------|------|
| Module | 模块，可组合 |
| Signature | 输入输出签名 ("question->answer") |
| Teleprompter | 自动优化器 |
| LM | 大模型适配器 |

---

## 实际示例：论文总结

```python
# 定义Pipeline
class PaperSummary(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract_points = dspy.ChainOfThought("paper_text -> key_points")
        self.summarize = dspy.ChainOfThought("key_points -> summary")

    def forward(self, paper_text):
        key_points = self.extract_points(paper_text=paper_text)
        summary = self.summarize(key_points=key_points.key_points)
        return summary

# 编译优化
compiled = BootstrapFewShot().compile(PaperSummary(), trainset)

# 使用
result = compiled(paper_text="你的论文内容")
print(result.summary)
```

---

## 适合用DSPy的场景

| 场景 | 理由 |
|------|------|
| 复杂Pipeline | 需要多个LLM调用链式工作 |
| 需要上线生产 | 稳定性、可维护性要求高 |
| 团队协作 | 需要版本管理和复现 |
| 持续优化 | 有数据，想持续迭代 |
| 模型切换 | 可能要换不同模型测试 |

---

## 对比：传统 vs DSPy

| 维度 | 传统Prompt | DSPy |
|------|------------|------|
| 开发方式 | 手工试错 | 编程+自动优化 |
| 可复现 | ❌ 很难 | ✅ 代码即一切 |
| 换模型 | 全重调 | 改一行配置 |
| 团队协作 | Prompt满天飞 | Git管理 |
| 上线维护 | 高风险 | 低风险 |
```
