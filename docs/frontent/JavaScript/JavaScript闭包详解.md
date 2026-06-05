# JavaScript 闭包详解

## 什么是闭包？

闭包是 JavaScript 中一个非常重要的概念。简单来说，**闭包就是能够访问外部函数变量的内部函数**。

### 生活中的类比

想象一下：
- 你有一个房间（外部函数），里面放了一些私人物品（变量）
- 你给了朋友一把钥匙（返回内部函数）
- 朋友拿着钥匙，可以随时进来取用那些私人物品（访问外部函数变量）

### 闭包的例子

```javascript
// 外部函数
function outer() {
  // 外部函数的变量
  let count = 0;
  
  // 内部函数 - 这就是一个闭包！
  function inner() {
    count++;  // 访问外部函数的变量
    console.log(`count = ${count}`);
  }
  
  // 返回内部函数
  return inner;
}

// 使用
const counter = outer();  // 现在 counter 就是 inner 函数
counter();  // 输出：count = 1
counter();  // 输出：count = 2
counter();  // 输出：count = 3
```

看到了吗？虽然 `outer` 函数已经执行完了，但内部函数 `inner` 仍然"记得" `count` 变量！

## Python vs JavaScript 闭包对比

是的，Python 和 JavaScript 在闭包概念上非常相似！

### Python 的闭包

```python
def outer():
    count = 0
    
    def inner():
        nonlocal count
        count += 1
        print(f"count = {count}")
    
    return inner

counter = outer()
counter()  # count = 1
counter()  # count = 2
```

### JavaScript 的闭包

```javascript
function outer() {
  let count = 0;
  
  function inner() {
    count++;
    console.log(`count = ${count}`);
  }
  
  return inner;
}

const counter = outer();
counter();  // count = 1
counter();  // count = 2
```

## 闭包的特点

### 1. 可以访问外部函数的变量

```javascript
function makeGreeting(name) {
  // name 是外部函数的变量
  return function() {
    // 内部函数可以访问 name
    console.log(`Hello, ${name}!`);
  };
}

const greetAlice = makeGreeting('Alice');
const greetBob = makeGreeting('Bob');

greetAlice();  // Hello, Alice!
greetBob();    // Hello, Bob!
```

### 2. 变量会一直"活着"

```javascript
function createAdder(x) {
  return function(y) {
    return x + y;  // x 会一直被记住
  };
}

const add5 = createAdder(5);
const add10 = createAdder(10);

console.log(add5(3));   // 8 (5 + 3)
console.log(add10(3));  // 13 (10 + 3)
```

### 3. 每个闭包有独立的变量副本

```javascript
function makeCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

// 两个独立的计数器
const counter1 = makeCounter();
const counter2 = makeCounter();

counter1.increment();
counter1.increment();
console.log(counter1.getCount());  // 2

counter2.increment();
console.log(counter2.getCount());  // 1
```

## 闭包的实际应用

### 1. 数据私有化

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // 私有变量，外部无法直接访问
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`存入 ${amount}，当前余额 ${balance}`);
      }
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        console.log(`取出 ${amount}，当前余额 ${balance}`);
      }
    },
    checkBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);   // 存入 500，当前余额 1500
account.withdraw(300);  // 取出 300，当前余额 1200
console.log(account.checkBalance());  // 1200

// balance 是私有的，外部无法直接访问
// console.log(account.balance);  // undefined
```

### 2. 函数工厂

```javascript
function createGreeter(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

sayHello('Alice');  // Hello, Alice!
sayHi('Bob');       // Hi, Bob!
```

### 3. 循环中的闭包

```javascript
// 错误的写法
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 输出 3, 3, 3（不是预期的 0, 1, 2）
  }, 1000);
}

// 正确的写法 1：使用闭包
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);  // 输出 0, 1, 2
    }, 1000);
  })(i);
}

// 正确的写法 2：使用 let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 输出 0, 1, 2
  }, 1000);
}
```

### 4. 缓存函数结果

```javascript
function createCache() {
  const cache = {};
  
  return function(key, value) {
    if (value !== undefined) {
      cache[key] = value;
      console.log(`缓存 ${key}: ${value}`);
    } else {
      if (cache[key]) {
        console.log(`从缓存读取 ${key}: ${cache[key]}`);
        return cache[key];
      } else {
        console.log(`缓存中没有 ${key}`);
        return undefined;
      }
    }
  };
}

const cache = createCache();
cache('name', 'Alice');      // 缓存 name: Alice
cache('age', 25);           // 缓存 age: 25
cache('name');              // 从缓存读取 name: Alice
cache('phone');             // 缓存中没有 phone
```

## 装饰器和闭包的关系

还记得你之前问的装饰器吗？装饰器其实就是闭包的一个应用！

### JavaScript 中的装饰器模式

```javascript
// 装饰器函数
function withLogging(fn) {
  return function() {
    console.log('函数开始执行');
    const result = fn.apply(this, arguments);
    console.log('函数执行结束');
    return result;
  };
}

// 原函数
function sayHello() {
  console.log('Hello!');
}

// 使用装饰器
const decoratedSayHello = withLogging(sayHello);
decoratedSayHello();
// 输出：
// 函数开始执行
// Hello!
// 函数执行结束
```

### 带参数的装饰器

```javascript
function withSeparator(separator) {
  return function(fn) {
    return function() {
      console.log(separator.repeat(20));
      const result = fn.apply(this, arguments);
      console.log(separator.repeat(20));
      return result;
    };
  };
}

function sayHello() {
  console.log('Hello!');
}

// 使用
const helloWithStars = withSeparator('*')(sayHello);
helloWithStars();
// 输出：
// ********************
// Hello!
// ********************
```

这就是你刚才描述的场景！用分隔符把函数包起来！

## 常见问题

### Q1: 闭包会不会造成内存泄漏？

是的，如果闭包引用的变量一直不被释放，可能会造成内存占用。但现代 JavaScript 引擎（V8 等）有很好的垃圾回收机制，正常使用不会有问题。

### Q2: 什么时候该用闭包？

- 需要保持变量状态
- 需要私有化数据
- 需要创建函数工厂

### Q3: 闭包和作用域的关系？

闭包依赖于 JavaScript 的词法作用域（Lexical Scoping），函数在定义时就确定了它的作用域，而不是在执行时。

## 总结

### 闭包的三个条件

1. **函数嵌套函数**
2. **内部函数访问外部函数的变量**
3. **内部函数被返回出来**

### Python vs JavaScript 闭包

| 特性 | Python | JavaScript |
|------|--------|------------|
| 定义方式 | 嵌套函数 | 嵌套函数 |
| 修改外部变量 | 需要 `nonlocal` 或 `global` | 可以直接修改（let/var） |
| 用途 | 装饰器、数据私有化 | 闭包、装饰器模式 |

### 记住

闭包就是：**一个函数能够"记住"并访问它的词法作用域，即使这个函数在它的词法作用域之外执行。**
