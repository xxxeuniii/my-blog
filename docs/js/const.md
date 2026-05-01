# const

在 JavaScript 中，使用 `const` 定义的对象是可以修改其属性的，但不能重新赋值。`const` 关键字确保的是变量绑定的不可变性，而不是对象内容的不可变性。

### 示例说明

#### 1. 修改对象属性

```javascript
const person = {
    name: "Alice",
    age: 25
};

// 修改对象属性
person.name = "Bob";
person.age = 30;

console.log(person); // { name: "Bob", age: 30 }
```

#### 2. 重新赋值对象

```javascript
const person = {
    name: "Alice",
    age: 25
};

// 重新赋值对象会抛出错误
person = {
    name: "Charlie",
    age: 35
};

console.log(person); // TypeError: Assignment to constant variable.
```

### 详细解释

- **属性修改**：使用 `const` 声明的对象可以修改其属性。这是因为 `const` 声明的只是对象的引用，而不是真正冻结对象内容。
- **重新赋值**：试图重新赋值整个对象会抛出 `TypeError` 错误，因为 `const` 保证了引用的不可变性。

### 深度冻结对象

如果需要完全不可修改对象，可以使用 `Object.freeze` 方法进行深度冻结。

```javascript
const person = Object.freeze({
    name: "Alice",
    age: 25
});

// 尝试修改被冻结的对象属性不会生效
person.name = "Bob";

console.log(person); // { name: "Alice", age: 25 }
```

对于深度冻结（冻结嵌套对象），需要递归地调用 `Object.freeze`：

```javascript
function deepFreeze(obj) {
    Object.keys(obj).forEach(name => {
        let prop = obj[name];

        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });

    return Object.freeze(obj);
}

const person = deepFreeze({
    name: "Alice",
    age: 25,
    address: {
        city: "Wonderland"
    }
});

// 尝试修改深度冻结的对象属性不会生效
person.address.city = "Reality";

console.log(person); // { name: "Alice", age: 25, address: { city: "Wonderland" } }
```

### 总结

- **`const` 定义的对象**：可以修改对象的属性，但不能重新赋值。
- **属性修改**：使用 `const` 定义的对象允许修改其内部属性。
- **重新赋值**：重新赋值 `const` 对象会抛出错误。
- **冻结对象**：使用 `Object.freeze` 可以防止对象被修改。对于深层次的对象，需递归使用 `Object.freeze` 进行深度冻结。