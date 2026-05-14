# PyTorch

## 什么是 PyTorch

PyTorch 是由 Facebook AI Research (FAIR) 开发的开源深度学习框架，于 2017 年发布。它以 Python 为主要接口，提供了灵活的张量计算和自动微分功能。

### 核心特点

| 特点 | 说明 |
|------|------|
| **动态计算图** | 计算图在运行时动态构建，支持灵活调试 |
| **Pythonic** | 语法简洁，与 NumPy 类似，易于上手 |
| **自动微分** | 使用 `torch.autograd` 实现自动求导 |
| **GPU 加速** | 原生支持 CUDA，轻松利用 GPU 进行并行计算 |
| **分布式训练** | 内置分布式训练支持 |

## 基本概念

### 张量（Tensor）

张量是 PyTorch 的基本数据结构，类似于 NumPy 的数组，但支持 GPU 加速。

```python
import torch

# 创建张量
x = torch.tensor([1, 2, 3])
y = torch.tensor([[1, 2], [3, 4]])

# 张量运算
z = x + y
z = torch.matmul(y, y)
```

### 自动微分（Autograd）

PyTorch 使用动态图实现自动微分：

```python
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2 + 3 * x + 1

# 计算梯度
y.backward()
print(x.grad)  # 输出: tensor(7.)
```

### 神经网络模块

```python
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 50)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(50, 2)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

model = SimpleNet()
```

## 常用组件

### 数据加载

```python
from torch.utils.data import Dataset, DataLoader

class CustomDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

dataset = CustomDataset(data, labels)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)
```

### 损失函数

```python
# 分类任务
criterion = nn.CrossEntropyLoss()

# 回归任务
criterion = nn.MSELoss()

# 计算损失
loss = criterion(outputs, labels)
```

### 优化器

```python
import torch.optim as optim

optimizer = optim.Adam(model.parameters(), lr=1e-3)

# 训练循环
for epoch in range(10):
    optimizer.zero_grad()
    outputs = model(inputs)
    loss = criterion(outputs, labels)
    loss.backward()
    optimizer.step()
```

## GPU 加速

```python
# 检查 GPU 是否可用
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 将模型和数据移动到 GPU
model = model.to(device)
inputs = inputs.to(device)
labels = labels.to(device)
```

## 分布式训练

```python
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

# 初始化分布式环境
dist.init_process_group(backend="nccl")

# 创建分布式模型
model = DDP(model)
```

## 常用工具

### 模型保存与加载

```python
# 保存模型
torch.save(model.state_dict(), "model.pth")

# 加载模型
model.load_state_dict(torch.load("model.pth"))
```

### 混合精度训练

```python
from torch.cuda.amp import GradScaler, autocast

scaler = GradScaler()

with autocast():
    outputs = model(inputs)
    loss = criterion(outputs, labels)

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **研究** | 动态图适合快速原型开发和研究 |
| **深度学习** | 计算机视觉、自然语言处理 |
| **强化学习** | 动态图适合策略迭代 |
| **学术研究** | 学术界首选框架 |

## 生态系统

- **TorchVision**：计算机视觉工具库
- **TorchText**：自然语言处理工具库  
- **TorchAudio**：音频处理工具库
- **PyTorch Lightning**：高级训练框架
- **Hugging Face Transformers**：预训练模型库

## 总结

PyTorch 以其动态计算图、Pythonic 风格和强大的生态系统，成为学术界和工业界最受欢迎的深度学习框架之一，特别适合需要灵活调试和快速迭代的研究场景。