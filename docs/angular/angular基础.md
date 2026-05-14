Angular 是一个基于 TypeScript 的前端框架，由 Google 维护，适用于构建单页面应用（SPA）。它采用组件化架构，提供了模块化的开发方式，并内置了依赖注入、路由管理、表单处理、HTTP 客户端等功能。

***

## **一、Angular 基础概念**

### **1. Angular 的核心特性**

- **组件（Component）**：UI 的基本构建块，每个组件包含 HTML 模板、CSS 样式和 TypeScript 逻辑。
- **模块（Module）**：使用 `NgModule` 进行模块化管理，默认根模块是 `AppModule`。
- 指令（Directive）

  ：
  - 结构型指令（如 `*ngIf`, `*ngFor`）
  - 属性型指令（如 `[ngClass]`, `[ngStyle]`）
- 数据绑定（Data Binding）

  ：
  - **插值绑定**：`{{ variable }}`
  - **属性绑定**：`[property]="value"`
  - **事件绑定**：`(event)="handler()"`
  - **双向绑定**：`[(ngModel)]="value"`
- **服务（Service）和依赖注入（Dependency Injection）**：用于逻辑分离和共享数据，使用 `@Injectable()` 标记。
- **路由（Router）**：用于管理单页面应用的导航，基于 `@angular/router`。

***

## **二、安装与创建项目**

### **1. 安装 Angular CLI**

```sh
npm install -g @angular/cli
```

### **2. 创建 Angular 项目**

```sh
ng new my-angular-app
cd my-angular-app
ng serve
```

默认访问地址：[http://localhost:4200](http://localhost:4200/)

***

## **三、组件（Component）**

组件是 Angular 应用的核心。每个组件由以下三部分组成：

- **HTML 模板（template）**
- **CSS 样式（styles）**
- **TypeScript 逻辑（class）**

### **1. 创建组件**

```sh
ng generate component my-component
# 或简写
ng g c my-component
```

### **2. 组件代码结构**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',  // 组件的 HTML 选择器
  templateUrl: './my-component.component.html',  // 组件的 HTML 模板
  styleUrls: ['./my-component.component.css']  // 组件的样式文件
})
export class MyComponent {
  title = 'Hello Angular';

  changeTitle() {
    this.title = 'Title Changed!';
  }
}
```

### **3. 组件模板**

```html
<h1>{{ title }}</h1>
<button (click)="changeTitle()">Change Title</button>
```

***

## **四、指令（Directives）**

### **1. 结构型指令**

- `*ngIf`：条件渲染
- `*ngFor`：循环列表
- `*ngSwitch`：条件分支

示例：

```html
<p *ngIf="isVisible">这个文本会根据 isVisible 变量决定是否显示。</p>

<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>

<div [ngSwitch]="status">
  <p *ngSwitchCase="'success'">成功</p>
  <p *ngSwitchCase="'error'">错误</p>
  <p *ngSwitchDefault>未知</p>
</div>
```

### **2. 属性型指令**

- `[ngClass]`：动态类
- `[ngStyle]`：动态样式

示例：

```html
<p [ngClass]="{'active': isActive}">动态样式</p>
<p [ngStyle]="{'color': color}">动态颜色</p>
```

***

## **五、数据绑定（Data Binding）**

### **1. 插值（Interpolation）**

```html
<h1>{{ title }}</h1>
```

### **2. 属性绑定（Property Binding）**

```html
<img [src]="imageUrl">
```

### **3. 事件绑定（Event Binding）**

```html
<button (click)="handleClick()">点击</button>
```

### **4. 双向数据绑定（Two-way Binding）**

```html
<input [(ngModel)]="name">
<p>输入的值是：{{ name }}</p>
```

> **注意**：需要导入 `FormsModule`

```ts
import { FormsModule } from '@angular/forms';
```

***

## **六、服务（Service）和依赖注入（DI）**

### **1. 创建服务**

```sh
ng generate service my-service
# 或简写
ng g s my-service
```

### **2. 服务代码**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // 自动提供依赖
})
export class MyService {
  getMessage() {
    return 'Hello from Service!';
  }
}
```

### **3. 在组件中使用**

```ts
import { Component } from '@angular/core';
import { MyService } from './my-service.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponent {
  message: string;

  constructor(private myService: MyService) {
    this.message = this.myService.getMessage();
  }
}
```

***

## **七、路由（Router）**

### **1. 配置路由**

在 `app-routing.module.ts` 中：

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### **2. 在 HTML 中使用路由**

```html
<a routerLink="/">首页</a>
<a routerLink="/about">关于</a>
<router-outlet></router-outlet>
```

***

## **八、表单处理**

### **1. 模板驱动表单**

```html
<form #myForm="ngForm">
  <input name="username" ngModel required>
  <button [disabled]="!myForm.valid">提交</button>
</form>
```

### **2. 响应式表单**

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
```

***

## **九、HTTP 请求**

### **1. 使用 HttpClient**

```sh
ng generate service api
```

在 `api.service.ts` 中：

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://api.example.com/data');
  }
}
```

在 `app.module.ts` 中导入 `HttpClientModule`：

```ts
import { HttpClientModule } from '@angular/common/http';
```

***

这是 Angular 的基础入门，你可以根据需求深入学习 `RxJS`、`State Management（NgRx）` 等高级功能！ 🚀
