# Java 基础

## 一、核心概念

### JDK、JRE、JVM 关系

```
┌─────────────────────────────────────────────────────┐
│                    JDK                              │
│  ┌─────────────────────────────────────────────┐    │
│  │                   JRE                       │    │
│  │  ┌─────────────────────────────────────┐    │    │
│  │  │                JVM                   │    │    │
│  │  │  (Java Virtual Machine)              │    │    │
│  │  │  - 字节码解释/即时编译               │    │    │
│  │  │  - 内存管理与垃圾回收                 │    │    │
│  │  │  - 线程调度与安全沙箱                 │    │    │
│  │  └─────────────────────────────────────┘    │    │
│  │  + 核心类库 (rt.jar 等)                      │    │
│  │  + 运行时支持文件                            │    │
│  └─────────────────────────────────────────────┘    │
│  + 开发工具 (javac, java, javadoc, jar 等)         │
└─────────────────────────────────────────────────────┘
```

| 组件 | 全称 | 作用 |
|------|------|------|
| **JVM** | Java Virtual Machine | 执行字节码，提供跨平台能力 |
| **JRE** | Java Runtime Environment | 运行 Java 程序的最小环境 |
| **JDK** | Java Development Kit | 开发 Java 程序的完整工具集 |

### Java 平台版本

- **Java SE**：标准版 (Standard Edition)
  - 核心基础库，桌面应用开发
- **Java EE**：企业版 (Enterprise Edition)
  - 服务器端开发，包含 Servlet、JSP、EJB 等
- **Java ME**：微型版 (Micro Edition)
  - 嵌入式设备开发

## 二、面向对象编程

### 三大特性

**1. 封装 (Encapsulation)**
- 将数据和操作数据的方法绑定在一起
- 通过访问修饰符控制访问权限
- 隐藏内部实现细节

```java
public class Person {
    private String name;  // 私有字段
    
    public String getName() {  // 公开访问方法
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

**2. 继承 (Inheritance)**
- 子类继承父类的属性和方法
- 使用 `extends` 关键字
- 支持方法重写 (Override)

```java
public class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

public class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
}
```

**3. 多态 (Polymorphism)**
- 同一接口有不同的实现方式
- 编译时多态（方法重载）
- 运行时多态（方法重写）

### 访问修饰符

| 修饰符 | 本类 | 同包 | 子类 | 全局 |
|--------|------|------|------|------|
| `private` | ✓ | ✗ | ✗ | ✗ |
| `default` | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

## 三、基本数据类型

### 原始类型 vs 引用类型

**原始类型 (8种)**

| 类型 | 大小 | 默认值 | 范围 |
|------|------|--------|------|
| `byte` | 1字节 | 0 | -128 ~ 127 |
| `short` | 2字节 | 0 | -32768 ~ 32767 |
| `int` | 4字节 | 0 | -2^31 ~ 2^31-1 |
| `long` | 8字节 | 0L | -2^63 ~ 2^63-1 |
| `float` | 4字节 | 0.0f | 单精度浮点 |
| `double` | 8字节 | 0.0d | 双精度浮点 |
| `char` | 2字节 | '\u0000' | Unicode 字符 |
| `boolean` | 1字节 | false | true / false |

**引用类型**
- 类、接口、数组
- 默认值为 `null`
- 存储对象的引用地址

## 四、常用关键字

### 流程控制

```java
// 条件判断
if (condition) {
    // 语句块
} else if (anotherCondition) {
    // 语句块
} else {
    // 语句块
}

// 循环
for (int i = 0; i < 10; i++) {
    // 循环体
}

while (condition) {
    // 循环体
}

do {
    // 循环体
} while (condition);
```

### 异常处理

```java
try {
    // 可能抛出异常的代码
} catch (ExceptionType e) {
    // 异常处理
} finally {
    // 无论是否异常都会执行
}
```

### 其他关键字

- `static`：静态成员，属于类而非实例
- `final`：不可变的，常量
- `abstract`：抽象类或方法
- `interface`：接口定义
- `this`：当前对象引用
- `super`：父类引用

## 五、集合框架

### 集合层次结构

```
Collection
├── List (有序可重复)
│   ├── ArrayList (数组实现)
│   ├── LinkedList (链表实现)
│   └── Vector (线程安全)
├── Set (无序不可重复)
│   ├── HashSet (哈希表)
│   ├── LinkedHashSet (有序哈希表)
│   └── TreeSet (有序集合)
└── Queue (队列)
    ├── LinkedList
    └── PriorityQueue (优先队列)

Map (键值对)
├── HashMap (哈希表)
├── LinkedHashMap (有序哈希表)
├── TreeMap (有序映射)
└── Hashtable (线程安全)
```

### 选择合适的集合

| 场景 | 推荐集合 |
|------|----------|
| 快速随机访问 | `ArrayList` |
| 频繁插入删除 | `LinkedList` |
| 去重 | `HashSet` |
| 有序去重 | `TreeSet` |
| 键值对存储 | `HashMap` |

## 六、Java 8+ 特性

### Lambda 表达式

```java
// 传统匿名内部类
Runnable r1 = new Runnable() {
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda 表达式
Runnable r2 = () -> System.out.println("Hello");
```

### Stream API

```java
List<String> list = Arrays.asList("a", "b", "c");

// 过滤、映射、收集
List<String> result = list.stream()
    .filter(s -> s.startsWith("a"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### Optional 类

```java
Optional<String> optional = Optional.ofNullable(getValue());

// 安全获取值
String value = optional.orElse("default");

// 如果存在则执行
optional.ifPresent(v -> System.out.println(v));
```

## 七、JVM 内存模型

```
JVM 内存区域
┌───────────────────────────────────────────────────┐
│                    堆 (Heap)                     │
│  ┌───────────────────────────────────────────┐   │
│  │  新生代 (Young Generation)                │   │
│  │  ├── Eden (伊甸园区)                      │   │
│  │  ├── Survivor 0                          │   │
│  │  └── Survivor 1                          │   │
│  └───────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────┐   │
│  │  老年代 (Old Generation)                  │   │
│  └───────────────────────────────────────────┘   │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│                  方法区 (Method Area)             │
│  - 类信息、常量池、静态变量                       │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│                虚拟机栈 (VM Stack)                │
│  - 每个线程一个栈                                │
│  - 存储局部变量、操作数栈、方法返回地址            │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│               本地方法栈 (Native Stack)           │
│  - 执行本地方法 (JNI)                            │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│              程序计数器 (PC Register)             │
│  - 当前线程执行的字节码位置                        │
└───────────────────────────────────────────────────┘
```

## 八、设计模式

### 常用设计模式

| 模式 | 类型 | 作用 |
|------|------|------|
| **单例模式** | 创建型 | 确保类只有一个实例 |
| **工厂模式** | 创建型 | 封装对象创建过程 |
| **策略模式** | 行为型 | 定义算法族，运行时切换 |
| **观察者模式** | 行为型 | 一对多依赖，状态变更通知 |
| **适配器模式** | 结构型 | 接口转换，兼容不同接口 |

**单例模式示例**

```java
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

## 九、最佳实践

1. **命名规范**：类名 PascalCase，方法和变量 camelCase
2. **异常处理**：不要吞掉异常，合理选择异常类型
3. **资源管理**：使用 try-with-resources 自动关闭资源
4. **代码复用**：提取公共方法，避免重复代码
5. **日志记录**：合理使用日志框架，避免 System.out
6. **并发安全**：注意多线程环境下的数据一致性