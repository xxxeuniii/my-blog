---
layout: page
sidebar: false
---

# Angular 基础

Angular 是由 Google 开发和维护的开源前端框架，用于构建大型企业级应用。它采用 TypeScript 编写，提供了完整的 MVC 架构和丰富的功能模块。

## 一、环境搭建

### 安装 Angular CLI

```bash
npm install -g @angular/cli
```

### 创建新项目

```bash
ng new my-angular-app
cd my-angular-app
ng serve --open
```

### 项目结构

```
my-angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # 根组件
│   │   ├── app.module.ts       # 根模块
│   │   └── app-routing.module.ts # 路由模块
│   ├── main.ts                 # 入口文件
│   └── index.html
├── angular.json                # 项目配置
└── package.json
```

## 二、核心概念

### 1. 组件 (Component)

组件是 Angular 应用的基本构建块，由模板、类和样式组成。

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  user = { name: 'John', age: 30 };
}
```

```html
<!-- app.component.html -->
<h1>{{ title }}</h1>
<p>Hello, {{ user.name }}</p>
```

### 2. 模块 (Module)

模块用于组织相关的组件、指令和服务。

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 3. 服务 (Service)

服务用于共享数据和逻辑，通过依赖注入使用。

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];

  getUsers() {
    return this.users;
  }
}
```

### 4. 指令 (Directive)

#### 结构型指令

```html
<!-- *ngIf -->
<div *ngIf="isLoggedIn">Welcome!</div>

<!-- *ngFor -->
<ul>
  <li *ngFor="let user of users">{{ user.name }}</li>
</ul>

<!-- *ngSwitch -->
<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">Admin Panel</p>
  <p *ngSwitchCase="'user'">User Panel</p>
  <p *ngSwitchDefault>Guest</p>
</div>
```

#### 属性型指令

```html
<!-- [ngClass] -->
<div [ngClass]="{ active: isActive, disabled: isDisabled }"></div>

<!-- [ngStyle] -->
<div [ngStyle]="{ color: 'red', fontSize: '20px' }"></div>
```

## 三、数据绑定

### 插值绑定

```html
<p>{{ message }}</p>
```

### 属性绑定

```html
<img [src]="imageUrl" [alt]="imageAlt">
<button [disabled]="!isEnabled">Click</button>
```

### 事件绑定

```html
<button (click)="onClick()">Click me</button>
<input (input)="onInput($event)">
```

### 双向绑定

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <input [(ngModel)]="name">
    <p>Hello, {{ name }}</p>
  `
})
export class ExampleComponent {
  name = '';
}
```

## 四、生命周期钩子

| 钩子 | 说明 |
|------|------|
| `ngOnChanges` | 输入属性变化时触发 |
| `ngOnInit` | 组件初始化完成后触发 |
| `ngDoCheck` | 每次变更检测时触发 |
| `ngAfterContentInit` | 内容投影完成后触发 |
| `ngAfterContentChecked` | 内容变更检测后触发 |
| `ngAfterViewInit` | 视图初始化完成后触发 |
| `ngAfterViewChecked` | 视图变更检测后触发 |
| `ngOnDestroy` | 组件销毁前触发 |

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: '<p>Lifecycle Example</p>'
})
export class LifecycleComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('Component initialized');
  }

  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
```

## 五、路由

### 配置路由

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // 404 路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 使用路由

```html
<!-- 导航链接 -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<!-- 路由出口 -->
<router-outlet></router-outlet>
```

### 动态路由

```typescript
const routes: Routes = [
  { path: 'user/:id', component: UserComponent }
];
```

```typescript
import { ActivatedRoute } from '@angular/router';

export class UserComponent {
  constructor(private route: ActivatedRoute) {
    const userId = this.route.snapshot.paramMap.get('id');
  }
}
```

## 六、表单

### 模板驱动表单

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <input name="username" ngModel required>
  <input name="email" ngModel email>
  <button type="submit">Submit</button>
</form>
```

### 响应式表单

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class MyFormComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="username">
  <input formControlName="email">
  <button type="submit">Submit</button>
</form>
```

## 七、HTTP 客户端

```typescript
import { HttpClient } from '@angular/common/http';

export class DataService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://api.example.com/data');
  }

  postData(data: any) {
    return this.http.post('https://api.example.com/data', data);
  }
}
```

### 拦截器

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authReq);
  }
}
```

## 八、依赖注入

### 注入器层次

```typescript
// 根级别（应用全局）
@Injectable({ providedIn: 'root' })

// 模块级别
@NgModule({ providers: [MyService] })

// 组件级别
@Component({ providers: [MyService] })
```

## 九、管道 (Pipe)

### 内置管道

```html
{{ date | date:'yyyy-MM-dd' }}
{{ text | uppercase }}
{{ number | currency:'CNY' }}
{{ array | slice:0:5 }}
```

### 自定义管道

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

```html
{{ 'hello' | reverse }} <!-- olleh -->
```

## 十、Angular 特性

### 1. 单向数据流

数据从父组件流向子组件，确保可预测性。

### 2. 变更检测

Angular 自动检测数据变化并更新视图。

### 3. 模块化架构

清晰的模块划分，便于大型项目管理。

### 4. TypeScript 支持

完整的类型安全和智能提示。

### 5. RxJS 集成

强大的响应式编程能力。

## 十一、性能优化

1. **OnPush 变更检测策略**
2. **虚拟滚动 (Virtual Scroll)**
3. **懒加载模块**
4. **AOT 编译**
5. **Web Workers**

## 十二、最佳实践

1. 使用 Angular CLI 生成代码
2. 遵循单一职责原则
3. 使用服务共享数据
4. 合理使用生命周期钩子
5. 避免在模板中使用复杂表达式
6. 使用 trackBy 优化 *ngFor 性能