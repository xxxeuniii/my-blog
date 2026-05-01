# TypeScript 

TypeScript 是一种强类型的 JavaScript 超集，在面试中经常被问到。以下是一些常见的 TypeScript 面试题，涵盖了基础知识、类型系统、类与接口、模块、以及高级特性等方面：

### 基础知识

1. **TypeScript 的优点是什么？**
   - 提高代码的可维护性和可读性。
   - 提供静态类型检查，减少运行时错误。
   - 支持最新的 JavaScript 特性，并向下兼容旧版本。

2. **TypeScript 和 JavaScript 有什么区别？**
   - TypeScript 是 JavaScript 的超集，增加了静态类型、接口、枚举、泛型等特性。
   - TypeScript 需要编译成 JavaScript 才能在浏览器或 Node.js 环境中运行。

### 类型系统

3. **如何在 TypeScript 中定义变量类型？**

   ```typescript
   let age: number = 25;
   let name: string = "John";
   let isStudent: boolean = true;
   ```

4. **什么是接口？如何使用接口定义对象类型？**

   ```typescript
   interface Person {
     name: string;
     age: number;
   }

   const john: Person = {
     name: "John",
     age: 30
   };
   ```

5. **如何使用联合类型（Union Types）？**

   ```typescript
   let value: string | number;
   value = "Hello";
   value = 123;
   ```

### 类与接口

6. **如何在 TypeScript 中定义类和类的继承？**

   ```typescript
   class Animal {
     name: string;
     constructor(name: string) {
       this.name = name;
     }
     makeSound(): void {
       console.log(`${this.name} makes a sound.`);
     }
   }

   class Dog extends Animal {
     constructor(name: string) {
       super(name);
     }
     makeSound(): void {
       console.log(`${this.name} barks.`);
     }
   }

   const dog = new Dog("Buddy");
   dog.makeSound(); // Buddy barks.
   ```

7. **如何在 TypeScript 中实现接口？**

   ```typescript
   interface Flyable {
     fly(): void;
   }
   
   class Bird implements Flyable {
     fly(): void {
       console.log("Bird is flying.");
     }
   }
   ```

### 模块与命名空间

8. **如何在 TypeScript 中使用模块？**

   ```typescript
   // moduleA.ts
   export const pi = 3.14;

   // moduleB.ts
   import { pi } from './moduleA';
   console.log(pi); // 3.14
   ```

9. **如何在 TypeScript 中使用命名空间？**

   ```typescript
   namespace MyNamespace {
     export class MyClass {
       greet() {
         console.log("Hello from MyNamespace!");
       }
     }
   }
   
   const myClassInstance = new MyNamespace.MyClass();
   myClassInstance.greet(); // Hello from MyNamespace!
   ```

### 高级特性

10. **什么是泛型？如何在 TypeScript 中使用泛型？**

    ```typescript
    function identity<T>(arg: T): T {
      return arg;
    }

    const num = identity<number>(123); // 123
    const str = identity<string>("Hello"); // Hello
    ```

11. **如何在 TypeScript 中定义枚举（Enums）？**

    ```typescript
    enum Direction {
      Up,
      Down,
      Left,
      Right
    }

    let dir: Direction = Direction.Up;
    ```

12. **TypeScript 中的类型断言（Type Assertions）是什么？**

    ```typescript
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    ```

13. **如何在 TypeScript 中使用映射类型（Mapped Types）？**

    ```typescript
    type Readonly<T> = {
      readonly [P in keyof T]: T[P];
    };

    interface User {
      name: string;
      age: number;
    }

    const readonlyUser: Readonly<User> = {
      name: "John",
      age: 25
    };

    // readonlyUser.name = "Doe"; // Error: Cannot assign to 'name' because it is a read-only property.
    ```

14. **什么是 `never` 类型？在什么情况下使用？**

    ```typescript
    function error(message: string): never {
      throw new Error(message);
    }
    
    function infiniteLoop(): never {
      while (true) {}
    }
    ```

### 工具与环境

15. **如何配置 TypeScript 项目？**

    ```json
    // tsconfig.json
    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }
    ```

16. **如何在 TypeScript 中使用 `type` 和 `interface` 关键字，区别是什么？**

    ```typescript
    type Point = {
      x: number;
      y: number;
    };
    
    interface IPoint {
      x: number;
      y: number;
    }
    
    const point1: Point = { x: 1, y: 2 };
    const point2: IPoint = { x: 1, y: 2 };
    ```

在 TypeScript 中，`type` 和 `interface` 都可以用来定义对象的形状，它们在很多情况下是可以互换使用的。但是它们也有一些区别，各有优缺点和适用场景。

#### 使用 `type`

`type` 关键字用来定义类型别名，可以用来定义基本类型、对象类型、联合类型、交叉类型等。

示例：

```typescript
// 定义一个基本类型的别名
type Name = string;

// 定义一个对象类型
type User = {
  name: string;
  age: number;
};

// 定义联合类型
type StringOrNumber = string | number;

// 定义交叉类型
type UserWithAddress = User & {
  address: string;
};

// 使用类型别名
const user: User = {
  name: "John",
  age: 30
};
```

#### 使用 `interface`

`interface` 关键字专门用来定义对象类型，可以用于定义类的形状和实现接口，还可以进行扩展（继承）。

示例：

```typescript
// 定义一个接口
interface User {
  name: string;
  age: number;
}

// 扩展接口
interface UserWithAddress extends User {
  address: string;
}

// 使用接口
const user: UserWithAddress = {
  name: "John",
  age: 30,
  address: "123 Main St"
};

// 接口也可以用于类的实现
class Person implements User {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### `type` 和 `interface` 的区别

#### 1. **对象类型扩展**

- `interface` 支持声明合并，即多次定义同一个接口会自动合并：

  ```typescript
  interface User {
    name: string;
  }

  interface User {
    age: number;
  }

  const user: User = {
    name: "John",
    age: 30
  };
  ```

- `type` 不支持声明合并：

  ```typescript
  type User = {
    name: string;
  };
  
  // 下面的声明会报错：标识符“User”重复
  // type User = {
  //   age: number;
  // };
  
  const user: User = {
    name: "John"
  };
  ```

#### 2. **联合类型和交叉类型**

- `type` 可以定义联合类型和交叉类型：

  ```typescript
  type StringOrNumber = string | number;
  type UserWithAddress = User & { address: string };
  ```

- `interface` 不支持定义联合类型，但可以通过继承实现交叉类型：

  ```typescript
  interface User {
    name: string;
    age: number;
  }
  
  interface Address {
    address: string;
  }
  
  interface UserWithAddress extends User, Address {}
  
  const user: UserWithAddress = {
    name: "John",
    age: 30,
    address: "123 Main St"
  };
  ```

#### 3. **类型别名**

- `type` 可以用于基本类型、元组、映射类型等：

  ```typescript
  type Name = string;
  type Tuple = [number, string];
  type ReadonlyUser = Readonly<User>;
  ```

- `interface` 只能用于定义对象类型和类的形状。

#### 4. **高级类型特性**

- `type` 可以使用类型操作符，如 `keyof`、`typeof`、`in` 等：

  ```typescript
  type Keys = keyof User; // "name" | "age"
  ```

### 什么时候使用 `type` 或 `interface`

- **使用 `interface`**：当你需要定义对象类型并且可能会被扩展时，推荐使用 `interface`。`interface` 在面向对象编程中更为常用，并且其声明合并特性在定义库和复杂对象时非常有用。
- **使用 `type`**：当你需要定义基本类型、联合类型、交叉类型或使用高级类型特性时，推荐使用 `type`。`type` 更加灵活，可以定义更多种类的类型。

总结来说，如果只是定义对象类型，并且可能会进行扩展，优先选择 `interface`。如果需要更复杂的类型定义或类型操作，选择 `type`。

### 实践应用

17. **如何处理 TypeScript 中的 `null` 和 `undefined`？**

    ```typescript
    function greet(name: string | null): string {
      if (name === null) {
        return "Hello, guest!";
      } else {
        return `Hello, ${name}!`;
      }
    }
    ```

18. **如何在 TypeScript 中进行类型守卫（Type Guards）？**

    ```typescript
    function isString(value: any): value is string {
      return typeof value === 'string';
    }
    
    function printValue(value: string | number) {
      if (isString(value)) {
        console.log(`String value: ${value}`);
      } else {
        console.log(`Number value: ${value}`);
      }
    }
    ```

这些问题覆盖了 TypeScript 的广泛知识点，面试中可以根据实际需求选择问答。同时，面试官可能会根据你的回答深入探讨具体的实现和应用细节。