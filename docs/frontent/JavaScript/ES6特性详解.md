# ES6 特性详解

## 一、let 和 const

### 1.1 let 声明

```javascript
// let 声明的变量有块级作用域
if (true) {
  let x = 10;
  console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined

// let 不会提升
console.log(y); // ReferenceError
let y = 20;

// 同一作用域不能重复声明
let z = 30;
let z = 40; // SyntaxError: Identifier 'z' has already been declared
```

### 1.2 const 声明

```javascript
// const 声明常量，必须初始化
const PI = 3.14159;
console.log(PI); // 3.14159

// const 不能重新赋值
PI = 3; // TypeError: Assignment to constant variable

// const 对象的属性可以修改
const person = { name: 'Alice' };
person.name = 'Bob'; // 允许
person = {}; // TypeError
```

### 1.3 作用域对比

| 声明方式 | 作用域 | 提升 | 重复声明 |
|---------|--------|------|----------|
| var | 函数作用域 | 是 | 允许 |
| let | 块级作用域 | 否 | 不允许 |
| const | 块级作用域 | 否 | 不允许 |

## 二、箭头函数

### 2.1 基本语法

```javascript
// 基本形式
const add = (a, b) => a + b;

// 多行语句需要括号
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 单个参数可以省略括号
const double = x => x * 2;

// 无参数需要括号
const getRandom = () => Math.random();

// 返回对象需要括号
const createUser = (name, age) => ({ name, age });
```

### 2.2 箭头函数的特点

```javascript
// 箭头函数没有自己的 this
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // Alice，继承外层 this
    }, 100);
  }
};
obj.greet();

// 箭头函数不能作为构造函数
const Person = (name) => { this.name = name; };
new Person('Bob'); // TypeError

// 箭头函数没有 arguments
const sum = () => {
  console.log(arguments); // ReferenceError
};
sum(1, 2, 3);
```

## 三、模板字符串

### 3.1 基本用法

```javascript
// 多行字符串
const multiLine = `Line 1
Line 2
Line 3`;

// 变量插值
const name = 'Alice';
const greeting = `Hello, ${name}!`;

// 表达式插值
const a = 10;
const b = 20;
const result = `${a} + ${b} = ${a + b}`; // "10 + 20 = 30"

// 函数调用
const upper = str => str.toUpperCase();
const message = `Hello, ${upper('world')}!`; // "Hello, WORLD!"
```

### 3.2 标签模板

```javascript
const tag = (strings, ...values) => {
  console.log(strings); // ["Hello, ", "! Your age is ", ""]
  console.log(values);  // ["Alice", 25]
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
};

const name = 'Alice';
const age = 25;
tag`Hello, ${name}! Your age is ${age}`;
```

## 四、解构赋值

### 4.1 对象解构

```javascript
const person = { name: 'Alice', age: 25, city: 'Beijing' };

// 基本解构
const { name, age } = person;

// 重命名
const { name: userName, age: userAge } = person;

// 默认值
const { name, age, country = 'China' } = person;

// 嵌套解构
const user = {
  info: {
    name: 'Alice',
    address: { city: 'Beijing' }
  }
};
const { info: { name, address: { city } } } = user;
```

### 4.2 数组解构

```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [a, b] = numbers; // a=1, b=2

// 跳过元素
const [first, , third] = numbers; // first=1, third=3

// 剩余元素
const [head, ...tail] = numbers; // head=1, tail=[2,3,4,5]

// 默认值
const [x, y, z = 0] = [1, 2]; // z=0

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1
```

### 4.3 函数参数解构

```javascript
// 对象解构作为参数
const greet = ({ name, age }) => {
  console.log(`Hello ${name}, you are ${age} years old`);
};
greet({ name: 'Alice', age: 25 });

// 带默认值的解构参数
const createUser = ({ name = 'Anonymous', age = 0 } = {}) => {
  return { name, age };
};
createUser(); // { name: 'Anonymous', age: 0 }
```

## 五、扩展运算符和剩余参数

### 5.1 扩展运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// 复制数组
const copy = [...arr1];

// 函数调用
const nums = [1, 2, 3];
Math.max(...nums); // 3

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }
```

### 5.2 剩余参数

```javascript
// 函数剩余参数
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};
sum(1, 2, 3, 4); // 10

// 解构中的剩余参数
const [first, ...rest] = [1, 2, 3, 4]; // rest = [2, 3, 4]
```

## 六、类与继承

### 6.1 类的基本定义

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
  
  // 静态方法
  static create(name, age) {
    return new Person(name, age);
  }
  
  // getter 和 setter
  get info() {
    return `${this.name}, ${this.age} years old`;
  }
  
  set info(value) {
    const [name, age] = value.split(',');
    this.name = name.trim();
    this.age = parseInt(age);
  }
}

const person = new Person('Alice', 25);
person.greet(); // "Hello, my name is Alice"
console.log(person.info); // "Alice, 25 years old"
```

### 6.2 类的继承

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类构造函数
    this.grade = grade;
  }
  
  // 重写方法
  greet() {
    super.greet(); // 调用父类方法
    console.log(`I'm in grade ${this.grade}`);
  }
}

const student = new Student('Bob', 18, 12);
student.greet();
// "Hello, my name is Bob"
// "I'm in grade 12"
```

## 七、模块化

### 7.1 导出

```javascript
// export.js
// 命名导出
export const name = 'Alice';
export const age = 25;

export function greet() {
  return 'Hello';
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}

// 默认导出
export default function() {
  return 'Default export';
}
```

### 7.2 导入

```javascript
// import.js
// 导入命名导出
import { name, age, greet, Person } from './export.js';

// 重命名导入
import { name as userName } from './export.js';

// 导入全部
import * as utils from './export.js';

// 导入默认导出
import myFunction from './export.js';
```

## 八、Promise

### 8.1 Promise 基本用法

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Success!');
    } else {
      reject('Failed!');
    }
  }, 1000);
});

promise.then(result => {
  console.log(result); // "Success!"
}).catch(error => {
  console.error(error); // "Failed!"
}).finally(() => {
  console.log('Promise completed');
});
```

### 8.2 Promise 链式调用

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data.items;
  })
  .then(items => console.log(items.length))
  .catch(error => console.error(error));
```

### 8.3 Promise 静态方法

```javascript
// Promise.all: 所有都成功才成功
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Promise.race: 第一个完成就返回
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled: 等待所有完成
Promise.allSettled([promise1, promise2])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.error(result.reason);
      }
    });
  });
```

## 九、async/await

### 9.1 async 函数

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// 使用
fetchData().then(data => console.log(data));
```

### 9.2 await 并行执行

```javascript
async function fetchAll() {
  // 并行执行
  const [user, posts] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  const userData = await user.json();
  const postsData = await posts.json();
  
  return { user: userData, posts: postsData };
}
```

## 十、集合类型

### 10.1 Set

```javascript
const set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(2); // 重复元素被忽略

// 大小
console.log(set.size); // 2

// 检查存在
console.log(set.has(1)); // true

// 删除元素
set.delete(2);

// 遍历
for (const item of set) {
  console.log(item);
}

// 转换为数组
const arr = [...set];
```

### 10.2 Map

```javascript
const map = new Map();

// 设置键值对
map.set('name', 'Alice');
map.set('age', 25);

// 获取值
console.log(map.get('name')); // "Alice"

// 检查键是否存在
console.log(map.has('age')); // true

// 大小
console.log(map.size); // 2

// 删除
map.delete('age');

// 遍历
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
```

### 10.3 WeakSet 和 WeakMap

```javascript
// WeakSet: 弱引用，不阻止垃圾回收
const weakSet = new WeakSet();
let obj = { name: 'Alice' };
weakSet.add(obj);
obj = null; // 对象可以被垃圾回收

// WeakMap: 弱引用键
const weakMap = new WeakMap();
let key = { id: 1 };
weakMap.set(key, 'value');
key = null; // 键可以被垃圾回收
```

## 十一、迭代器和生成器

### 11.1 迭代器

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 11.2 生成器

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true

// 生成器可以无限生成
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
```

## 十二、其他特性

### 12.1 可选链

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'Beijing'
  }
};

// 传统方式
const city = user.address && user.address.city;

// 可选链
const city = user?.address?.city;

// 可选链调用函数
const result = user?.getInfo?.();
```

### 12.2 空值合并

```javascript
// 传统方式
const value = x || 'default'; // 0 和 '' 会被视为 falsy

// 空值合并
const value = x ?? 'default'; // 只有 null 和 undefined 才使用默认值
```

### 12.3 数值和数学扩展

```javascript
// 数值分隔符
const billion = 1_000_000_000;

// 二进制和八进制
const binary = 0b1010; // 10
const octal = 0o10; // 8

// Math 扩展
Math.trunc(4.9); // 4
Math.sign(-5); // -1
Math.cbrt(8); // 2
```

## 总结

ES6 (ES2015) 引入了大量新特性，极大提升了 JavaScript 的表达能力和开发效率：

1. **let/const**：块级作用域
2. **箭头函数**：简洁的函数语法
3. **模板字符串**：多行字符串和插值
4. **解构赋值**：方便的数据提取
5. **扩展运算符**：数组和对象展开
6. **类**：面向对象编程
7. **模块化**：import/export
8. **Promise**：异步编程
9. **async/await**：异步语法糖
10. **集合类型**：Set、Map、WeakSet、WeakMap

掌握这些特性是现代前端开发的基础。