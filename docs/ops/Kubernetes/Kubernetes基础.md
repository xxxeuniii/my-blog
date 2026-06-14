# Kubernetes 基础

Kubernetes，简称 **K8s**，是一个用于自动部署、扩缩容和管理容器化应用的开源容器编排平台。

## K8s 是什么

Docker 解决了“如何把应用打包并运行在容器中”，Kubernetes 解决了“如何在多台服务器上稳定运行和管理大量容器”。

| 能力 | Docker | Kubernetes |
| --- | --- | --- |
| 核心用途 | 构建和运行容器 | 编排和管理容器集群 |
| 运行范围 | 通常是单台服务器 | 多台服务器组成的集群 |
| 故障恢复 | 需要手动处理 | 自动重启和重新调度 |
| 扩缩容 | 手动创建容器 | 声明副本数或自动扩缩容 |
| 服务发现 | 需要额外配置 | 内置 Service 和 DNS |
| 滚动更新 | 需要自行编排 | 内置滚动更新与回滚 |

## 集群架构

一个 Kubernetes 集群通常由控制平面和工作节点组成。

```text
Kubernetes 集群
├── Control Plane（控制平面）
│   ├── API Server：集群统一入口
│   ├── Scheduler：选择 Pod 运行节点
│   ├── Controller Manager：维持期望状态
│   └── etcd：保存集群状态
└── Worker Node（工作节点）
    ├── kubelet：管理本节点 Pod
    ├── kube-proxy：处理服务网络
    └── Container Runtime：运行容器
```

## 核心对象

| 对象 | 作用 |
| --- | --- |
| Cluster | 完整的 Kubernetes 集群 |
| Node | 集群中的一台服务器 |
| Namespace | 对集群资源进行逻辑隔离 |
| Pod | K8s 最小调度单位，包含一个或多个容器 |
| Deployment | 管理无状态应用的副本、更新和回滚 |
| StatefulSet | 管理有状态应用，提供稳定身份和存储 |
| DaemonSet | 保证每个指定节点运行一个 Pod |
| Service | 为一组 Pod 提供稳定访问入口 |
| Ingress | 管理集群外部的 HTTP/HTTPS 访问 |
| ConfigMap | 保存非敏感配置 |
| Secret | 保存密码、令牌等敏感配置 |
| PersistentVolume | 为 Pod 提供持久化存储 |

## Pod、Deployment 和 Service 的关系

```text
用户请求
  → Ingress
  → Service（稳定地址与负载均衡）
  → Deployment 管理的一组 Pod
  → Pod 内运行应用容器
```

- **Pod** 可能随时被删除并重新创建，IP 地址不固定。
- **Deployment** 确保指定数量的 Pod 始终运行。
- **Service** 使用标签找到 Pod，并为它们提供稳定访问地址。

## 部署一个 Nginx 应用

创建 `nginx.yaml`：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.27
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 100m
              memory: 64Mi
            limits:
              cpu: 500m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

应用配置：

```bash
kubectl apply -f nginx.yaml
```

## 常用 kubectl 命令

### 查看资源

```bash
# 查看节点
kubectl get nodes

# 查看 Pod
kubectl get pods

# 查看所有命名空间中的 Pod
kubectl get pods -A

# 查看 Deployment 和 Service
kubectl get deployments
kubectl get services

# 查看资源详细信息
kubectl describe pod <pod-name>
```

### 排查问题

```bash
# 查看容器日志
kubectl logs <pod-name>

# 持续查看日志
kubectl logs -f <pod-name>

# 多容器 Pod 指定容器
kubectl logs <pod-name> -c <container-name>

# 进入容器
kubectl exec -it <pod-name> -- sh

# 查看集群事件
kubectl get events --sort-by=.metadata.creationTimestamp
```

### 更新与扩缩容

```bash
# 修改副本数量
kubectl scale deployment nginx --replicas=5

# 更新镜像
kubectl set image deployment/nginx nginx=nginx:1.28

# 查看发布状态
kubectl rollout status deployment/nginx

# 查看发布历史
kubectl rollout history deployment/nginx

# 回滚上一个版本
kubectl rollout undo deployment/nginx
```

## Service 类型

| 类型 | 访问范围 | 常见用途 |
| --- | --- | --- |
| ClusterIP | 仅集群内部 | 微服务之间通信 |
| NodePort | 通过节点端口访问 | 测试或临时访问 |
| LoadBalancer | 通过云负载均衡访问 | 云环境对外服务 |
| ExternalName | 映射外部域名 | 引用集群外服务 |

生产环境中的 HTTP/HTTPS 服务通常使用 `Ingress + ClusterIP Service` 对外提供访问。

## 配置与密钥

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
stringData:
  DATABASE_PASSWORD: change-me
```

Secret 默认只进行 Base64 编码，并不等于加密。生产环境应结合密钥管理服务、访问控制和静态加密使用。

## 健康检查

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

- **Liveness Probe**：判断容器是否需要重启。
- **Readiness Probe**：判断容器是否可以接收流量。
- **Startup Probe**：为启动较慢的应用提供启动保护。

## 学习与使用方式

| 场景 | 推荐方式 |
| --- | --- |
| 本地学习 | Minikube、kind、Docker Desktop Kubernetes |
| 小型集群 | K3s |
| 自建生产集群 | kubeadm |
| 云上生产环境 | 托管 Kubernetes 服务 |

## 生产运维要点

- 为容器设置 CPU、内存请求值和限制值
- 配置健康检查、滚动更新与优雅停止
- 使用 Namespace 和 RBAC 隔离资源与权限
- 为关键服务配置多个副本和反亲和性
- 建立日志、指标、链路追踪和告警体系
- 定期备份 etcd 与有状态业务数据
- 谨慎管理 Secret、镜像来源和集群权限
- 对集群、节点和依赖组件制定升级计划

## 常见问题排查顺序

```text
kubectl get pods
  → kubectl describe pod
  → kubectl logs
  → 检查 Service 与 Endpoints
  → 检查 Ingress、网络策略和 DNS
  → 检查节点资源与集群事件
```
