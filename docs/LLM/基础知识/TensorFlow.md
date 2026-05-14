# TensorFlow

## 什么是 TensorFlow

TensorFlow 是由 Google Brain 团队开发的开源深度学习框架，于 2015 年发布。它提供了完整的机器学习工具链，支持从研究到生产的全流程。

### 核心特点

| 特点 | 说明 |
|------|------|
| **静态计算图** | 计算图预先定义，优化性能 |
| **多语言支持** | 支持 Python、C++、Java、Go 等 |
| **生产部署** | 原生支持部署到移动端、嵌入式设备 |
| **TensorBoard** | 强大的可视化工具 |
| **Keras** | 高级 API，简化模型构建 |

## 基本概念

### 张量（Tensor）

张量是 TensorFlow 的基本数据结构：

```python
import tensorflow as tf

# 创建张量
x = tf.constant([1, 2, 3])
y = tf.constant([[1, 2], [3, 4]])

# 张量运算
z = x + y
z = tf.matmul(y, y)
```

### 自动微分（GradientTape）

```python
x = tf.Variable(2.0)

with tf.GradientTape() as tape:
    y = x ** 2 + 3 * x + 1

# 计算梯度
grad = tape.gradient(y, x)
print(grad)  # 输出: tf.Tensor(7.0, shape=(), dtype=float32)
```

### Keras 神经网络

```python
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Dense(50, activation='relu', input_shape=(10,)),
    layers.Dense(2, activation='softmax')
])

model.summary()
```

## 常用组件

### 数据加载

```python
import tensorflow as tf

# 使用 tf.data
dataset = tf.data.Dataset.from_tensor_slices((data, labels))
dataset = dataset.shuffle(1000).batch(32).prefetch(tf.data.AUTOTUNE)
```

### 损失函数与优化器

```python
# 分类任务
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy()

# 回归任务
loss_fn = tf.keras.losses.MeanSquaredError()

# 优化器
optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)
```

### 训练循环

```python
@tf.function
def train_step(inputs, labels):
    with tf.GradientTape() as tape:
        outputs = model(inputs, training=True)
        loss = loss_fn(labels, outputs)
    
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss

# 训练
for epoch in range(10):
    for inputs, labels in dataset:
        loss = train_step(inputs, labels)
```

## GPU 加速

```python
# 检查 GPU 是否可用
print("GPU 可用:", tf.config.list_physical_devices('GPU'))

# 设置内存增长
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
```

## 分布式训练

```python
# 策略选择
strategy = tf.distribute.MirroredStrategy()

with strategy.scope():
    model = create_model()
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')

model.fit(train_dataset, epochs=10)
```

## 常用工具

### 模型保存与加载

```python
# 保存整个模型
model.save("my_model")

# 加载模型
loaded_model = tf.keras.models.load_model("my_model")
```

### TensorBoard 可视化

```python
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir="./logs")

model.fit(
    train_dataset,
    epochs=10,
    callbacks=[tensorboard_callback]
)

# 启动 TensorBoard
# tensorboard --logdir=./logs
```

## TF Lite 部署

```python
# 转换为 TF Lite 模型
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# 保存
with open("model.tflite", "wb") as f:
    f.write(tflite_model)
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **生产部署** | 支持移动端、嵌入式、云端部署 |
| **大规模训练** | 分布式训练支持良好 |
| **研究** | TensorFlow 2.x 支持动态图 |
| **企业级应用** | Google 内部广泛使用 |

## 生态系统

- **Keras**：高级神经网络 API
- **TensorBoard**：可视化工具
- **TF Lite**：移动端部署
- **TF.js**：浏览器端运行
- **TensorFlow Serving**：生产环境部署
- **TPU 支持**：Google 专属硬件加速

## 总结

TensorFlow 是一个功能全面的深度学习框架，特别适合需要从研究到生产无缝过渡的场景。其静态图优化和强大的部署能力使其成为工业界的首选框架之一。