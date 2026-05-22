# Angular 进阶

本文详细介绍 Angular 的进阶内容，包括依赖注入、路由守卫、响应式编程、性能优化等内容。

## 一、依赖注入详解

### 1. 注入器层次

Angular 有三层注入器：

```typescript
// 根注入器（应用全局单例）
@Injectable({
  providedIn: 'root'  // 推荐方式
})
export class UserService {
  private users = []
  getUsers() { return this.users }
}

// 模块级注入器
@Injectable()
@Injectable({
  providedIn: UserModule  // 在模块中提供
})
export class UserService { }

// 组件级注入器
@Component({
  providers: [UserService]  // 组件级实例
})
export class UserComponent { }
```

### 2. 注入 Token

```typescript
import { InjectionToken } from '@angular/core';

// 定义 Token
export const API_URL = new InjectionToken<string>('API_URL');

// 使用 Token
@Injectable()
export class ApiService {
  constructor(@Inject(API_URL) private url: string) {}
}

// 模块中提供
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]
```

### 3. 工厂函数

```typescript
// 使用 factory 创建服务
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  static factory(http: HttpClient) {
    return () => http.get('/config').toPromise();
  }
}

@Injectable({
  providedIn: 'root',
  useFactory: ConfigService.factory,
  deps: [HttpClient]
})
export class ConfigLoader {}
```

## 二、路由守卫

### 1. 路由守卫类型

| 守卫 | 作用 | 返回值 |
|------|------|--------|
| `CanActivate` | 进入路由前检查 | `boolean` / `UrlTree` |
| `CanActivateChild` | 进入子路由前检查 | `boolean` / `UrlTree` |
| `CanDeactivate` | 离开路由前检查 | `boolean` / `UrlTree` |
| `CanLoad` | 懒加载模块前检查 | `boolean` / `UrlTree` |
| `Resolve` | 路由解析数据 | 数据 / `UrlTree` |

### 2. 登录守卫示例

```typescript
// auth.guard.ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // 未登录，重定向到登录页
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
```

### 3. 离开确认守卫

```typescript
// can-deactivate.guard.ts
@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// 组件中实现
export class EditComponent implements CanComponentDeactivate {
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('有未保存的更改，确定要离开吗？');
    }
    return true;
  }
}
```

### 4. 路由配置使用守卫

```typescript
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canLoad: [AuthGuard]  // 懒加载守卫
  }
];
```

## 三、RxJS 响应式编程

### 1. 常用操作符

```typescript
import { of, from, interval } from 'rxjs';
import { map, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// map - 转换数据
of(1, 2, 3).pipe(
  map(x => x * 10)
).subscribe(x => console.log(x)); // 10, 20, 30

// filter - 过滤数据
of(1, 2, 3, 4, 5).pipe(
  filter(x => x % 2 === 0)
).subscribe(x => console.log(x)); // 2, 4

// debounceTime - 防抖
from(document.querySelectorAll('input')).pipe(
  debounceTime(300)
).subscribe();

// switchMap - 切换流（搜索建议）
searchInput.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => ajax(`/api/search?q=${term}`)),
  catchError(() => of({ response: [] }))
).subscribe();

// combineLatest - 组合多个流
combineLatest([name$, age$]).pipe(
  map(([name, age]) => `${name} is ${age} years old`)
).subscribe();
```

### 2. 异步管道

```typescript
// 组件中
export class UserListComponent {
  users$ = this.http.get<User[]>('/api/users');
}

// 模板中（自动订阅和取消订阅）
@Component({
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent {
  users$: Observable<User[]>;
  constructor(private http: HttpClient) {}
}
```

### 3. 错误处理

```typescript
fetchData() {
  this.http.get('/api/data').pipe(
    catchError(error => {
      console.error('请求失败', error);
      return of({ error: true, data: [] });  // 返回默认值
      // 或 return throwError(() => error);  // 重新抛出
    }),
    retry(3),  // 重试 3 次
    retryWhen(errors => errors.pipe(
      delay(1000)  // 延迟 1 秒后重试
    ))
  ).subscribe();
}
```

## 四、性能优化

### 1. 变更检测策略

```typescript
// OnPush 策略 - 手动控制变更检测
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class UserComponent {
  @Input() user: User;

  constructor(private cdr: ChangeDetectorRef) {}

  // 手动触发变更检测
  refresh() {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
}
```

### 2. 懒加载模块

```typescript
// 路由懒加载
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings.component').then(c => c.SettingsComponent)
  }
];

// 预加载策略
@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // 只有包含 data: { preload: true } 的路由才预加载
    return route.data?.preload ? load() : of(null);
  }
}
```

### 3. 虚拟滚动

```html
<!-- 使用 CDK Virtual Scrolling -->
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items" class="item">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [ScrollingModule]
})
export class AppModule {}
```

### 4. 管道优化

```typescript
// 不好的写法 - 每次变更都调用
@Component({
  template: `{{ getExpensiveValue() }}`
})
export class BadComponent {
  getExpensiveValue() {
    // 每次变更检测都会执行
    return this.compute();
  }
}

// 好的写法 - 使用 pipe
@Component({
  template: `{{ data$ | async | filter }}`
})
export class GoodComponent {
  data$ = this.http.get('/api/data');
}
```

## 五、国际化

### 1. 安装 Angular i18n

```bash
ng add @angular/localize
```

### 2. 标记翻译文本

```typescript
// 组件中
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `
    <h1 i18n="@@welcome">欢迎</h1>
    <p i18n="@@userCountMessage">用户数：{{ count }}</p>
  `
})
export class GreetingComponent {
  count = 100;
}
```

### 3. 多语言配置

```typescript
// angular.json
"i18n": {
  "locales": {
    "en": "messages.en.xlf",
    "zh": "messages.zh.xlf"
  }
}
```

### 4. 运行时切换语言

```typescript
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'zh' }
  ]
})
export class AppModule {}
```

## 六、单元测试

### 1. 组件测试

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', () => {
    userService.getUser.and.returnValue({ name: 'John' });
    fixture.detectChanges();
    expect(component.user?.name).toBe('John');
  });
});
```

### 2. 服务测试

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

## 七、最佳实践

### 1. 项目结构

```
src/
├── app/
│   ├── core/           # 核心模块（单例服务）
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── core.module.ts
│   ├── shared/         # 共享模块
│   │   ├── components/
│   │   ├── pipes/
│   │   ├── directives/
│   │   └── shared.module.ts
│   ├── features/       # 功能模块
│   │   ├── user/
│   │   └── admin/
│   └── app.component.ts
├── assets/
└── environments/
```

### 2. 命名规范

```typescript
// 组件 - 特性 + 组件类型
user-list.component.ts
user-detail.component.ts

// 服务 - 功能 + Service
user.service.ts
auth.service.ts

// 管道 - 功能 + Pipe
filter.pipe.ts
sort.pipe.ts
```

### 3. 组件设计原则

- **单一职责** - 一个组件只做一件事
- **输入输出清晰** - @Input 和 @Output 明确
- **智能展示分离** - 数据逻辑在服务中，UI 逻辑在组件中
- **使用 OnPush** - 提高性能

### 4. 状态管理选择

| 场景 | 推荐方案 |
|------|----------|
| 简单状态 | Service + BehaviorSubject |
| 中等复杂度 | NgRx / Akita |
| 复杂应用 | NgRx（Redux 模式） |

```typescript
// 简单状态管理 - BehaviorSubject
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private user$ = new BehaviorSubject<User | null>(null);

  getUser() {
    return this.user$.asObservable();
  }

  setUser(user: User) {
    this.user$.next(user);
  }

  clearUser() {
    this.user$.next(null);
  }
}
```

## 八、Angular vs 其他框架

### 对比 Vue

| 特性 | Angular | Vue |
|------|---------|-----|
| 学习曲线 | 陡峭 | 平缓 |
| 体积 | 较大 | 较小 |
| 双向绑定 | 内置 | 内置 |
| TypeScript | 必须 | 可选 |
| 依赖注入 | 完善 | 简单 |
| 适用场景 | 企业级应用 | 中小型应用 |

### 对比 React

| 特性 | Angular | React |
|------|---------|-------|
| 框架类型 | 全栈框架 | 视图库 |
| 状态管理 | RxJS / NgRx | Redux / Context |
| 模板 | HTML 增强 | JSX |
| 生态 | 完整 | 灵活 |
| 学习成本 | 较高 | 中等 |

## 总结

Angular 是一个功能完善的企业级框架，适合大型项目开发。掌握依赖注入、路由守卫、RxJS 和性能优化等进阶内容，能够更好地构建高质量的 Angular 应用。