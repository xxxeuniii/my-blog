在 Vue3 的 Composition API 中，`ref` 和 `reactive` 都用于创建响应式数据，但它们的使用方式和原理有所不同。以下是它们的主要区别：

------

## **1. `ref` 与 `reactive` 的核心区别**

|                | **`ref`**                                             | **`reactive`**                         |
| -------------- | ----------------------------------------------------- | -------------------------------------- |
| **数据类型**   | 适用于**基本类型**和**对象**                          | 适用于**对象和数组**                   |
| **结构**       | 返回一个**带 `.value` 属性**的响应式对象              | 返回一个**直接可用的响应式对象**       |
| **深度响应性** | **基本类型自动响应**，但对象类型**内部仍需 `.value`** | **深度响应式**，对象内部属性也是响应式 |
| **解构行为**   | 解构时会**丢失响应性**，需要 `toRef()` 或 `toRefs()`  | 直接解构不会丢失响应性                 |
| **适用场景**   | 适用于**基本数据类型**或需要独立管理的变量            | 适用于**复杂数据结构**（对象、数组等） |

------

## **2. `ref` 示例**

### **（1）`ref` 适用于基本数据类型**

```ts
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++; // 必须通过 .value 访问
};
```

✅ **特点：**

- `count` 是响应式的，但必须用 `.value` 访问和修改。
- 适用于**数字、字符串、布尔值等基本类型**。

------

### **（2）`ref` 适用于对象**

```ts
import { ref } from 'vue';

const user = ref({ name: 'Eunie', age: 25 });

const updateUser = () => {
  user.value.name = 'Alice'; // 修改对象属性时，仍需 .value
};
```

✅ **特点：**

- `ref` 也可以用于对象，但仍需通过 `user.value` 访问。
- **对象内部仍然是响应式的**，但如果直接 `user = {}` 赋值，响应性会丢失。

------

## **3. `reactive` 示例**

### **（1）`reactive` 适用于对象**

```ts
import { reactive } from 'vue';

const user = reactive({ name: 'Eunie', age: 25 });

const updateUser = () => {
  user.name = 'Alice'; // 直接修改，无需 .value
};
```

✅ **特点：**

- 直接对 `user` 进行修改，无需 `.value`。
- **对象内部属性也是响应式的**，可直接修改。

------

### **（2）`reactive` 适用于数组**

```ts
import { reactive } from 'vue';

const todos = reactive([{ id: 1, text: '学习 Vue3' }]);

const addTodo = () => {
  todos.push({ id: 2, text: '学习 Pinia' }); // 直接操作
};
```

✅ **特点：**

- **数组也是响应式的**，可以直接 `push/pop` 操作。

------

## **4. `ref` 和 `reactive` 的解构问题**

如果你想从 `reactive` 或 `ref` 对象中**解构属性**，要小心响应性丢失的问题。

### **（1）`ref` 解构会丢失响应性**

```ts
const user = ref({ name: 'Eunie', age: 25 });
const { name, age } = user.value; // ❌ 这样会丢失响应性
```

**✅ 解决方案**：

```ts
import { toRef } from 'vue';

const user = ref({ name: 'Eunie', age: 25 });
const name = toRef(user.value, 'name'); // ✅ 这样 name 仍是响应式的
```

------

### **（2）`reactive` 解构会丢失响应性**

```ts
const user = reactive({ name: 'Eunie', age: 25 });
const { name } = user; // ❌ 解构后 name 变成普通变量，失去响应性
```

**✅ 解决方案**：

```ts
import { toRefs } from 'vue';

const user = reactive({ name: 'Eunie', age: 25 });
const { name } = toRefs(user); // ✅ 这样 name 仍然是响应式的
```

------

## **5. 什么时候用 `ref`，什么时候用 `reactive`？**

✅ **使用 `ref`：**

- 适用于 **基本数据类型**（字符串、数字、布尔值）。
- 需要**解构后仍然保持响应性**（使用 `toRef` ）。

✅ **使用 `reactive`：**

- 适用于 **对象和数组**，可以直接修改内部属性。
- 需要对整个对象进行**深度响应式管理**。

✅ **混合使用 `ref` 和 `reactive`：**

```ts
import { reactive, ref } from 'vue';

const user = reactive({ name: 'Eunie', age: ref(25) }); // `age` 仍然是 ref
```

这样 `user.age.value` 仍然可以单独监听变化。

------

## **6. 总结**

| 特性         | `ref`                                          | `reactive`                          |
| ------------ | ---------------------------------------------- | ----------------------------------- |
| 适用数据类型 | **基本类型**（数字、字符串、布尔） 或 **对象** | **对象和数组**                      |
| 访问方式     | `.value` 访问和修改                            | 直接访问和修改                      |
| 深度响应式   | 仅 `ref` 自身是响应式，**对象内部不是**        | **对象内部所有属性都是响应式的**    |
| 结构解构     | 解构后**丢失响应性**，需 `toRef`               | 解构后**丢失响应性**，需 `toRefs`   |
| 推荐使用场景 | 1️⃣ 需要解构时仍保持响应式2️⃣ 适用于单一变量       | 1️⃣ 适用于对象、数组 2️⃣ 需要深度响应式 |

------

## **7. 实际项目中的使用经验**

- **状态存储**：使用 `reactive` 管理全局状态，如用户信息、表单数据等。
- **独立变量**：对于 `loading`、`error` 这类独立变量，使用 `ref`，因为它们是基本类型。
- **解构问题**：在从 `store` 或 `reactive` 对象中提取数据时，使用 `toRefs()` 确保响应性不丢失。

通过合理选择 `ref` 和 `reactive`，保证了**代码的简洁性和高效性**，避免了 Vue2 中 `data` 和 `computed` 的分散定义问题，使得状态管理更加直观和易于维护。