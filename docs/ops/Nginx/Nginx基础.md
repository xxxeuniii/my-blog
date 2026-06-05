# Nginx 基础

Nginx 是一个高性能的 HTTP 服务器和反向代理服务器。

## 一、常用命令

```bash
# 启动
nginx

# 停止
nginx -s stop

# 优雅停止
nginx -s quit

# 重载配置
nginx -s reload

# 检查配置语法
nginx -t

# 查看版本
nginx -v
```

## 二、配置文件结构

```
nginx.conf
├── http
│   ├── server
│   │   ├── listen
│   │   ├── server_name
│   │   └── location
│   └── upstream
└── events
```

## 三、基本配置

### 最简配置

```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }
}
```

## 四、反向代理

```nginx
server {
    listen 80;
    server_name myapp.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 五、负载均衡

```nginx
upstream backend {
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;
    server 192.168.1.12:3000;
}

server {
    listen 80;
    server_name myapp.com;

    location / {
        proxy_pass http://backend;
    }
}
```

### 负载均衡策略

```nginx
upstream backend {
    # 轮询（默认）
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;

    # 权重
    server 192.168.1.10:3000 weight=3;
    server 192.168.1.11:3000 weight=1;

    # IP 哈希（会话保持）
    ip_hash;

    # 最少连接
    least_conn;
}
```

## 六、静态文件服务

```nginx
server {
    listen 80;
    server_name static.myapp.com;

    location / {
        root /var/www/static;
        index index.html;
        
        # 启用 gzip
        gzip on;
        gzip_types text/plain text/css application/json;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## 七、HTTPS 配置

```nginx
server {
    listen 443 ssl http2;
    server_name myapp.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name myapp.com;
    return 301 https://$server_name$request_uri;
}
```

## 八、location 匹配规则

| 规则 | 说明 |
|------|------|
| `=` | 精确匹配 |
| `^~` | 前缀匹配，停止正则 |
| `~` | 正则匹配（区分大小写） |
| `~*` | 正则匹配（不区分大小写） |
| `/` | 普通前缀匹配 |

```nginx
# 精确匹配
location = / {
    # 只匹配 /
}

# 前缀匹配
location ^~ /api/ {
    # 匹配 /api/*，停止正则
}

# 正则匹配
location ~ /api/\d+$ {
    # 匹配 /api/123 等
}

# 普通匹配
location / {
    # 匹配所有
}
```

## 九、常见配置示例

### React/Vue 项目部署

```nginx
server {
    listen 80;
    server_name myapp.com;
    root /var/www/myapp/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Node.js API 代理

```nginx
server {
    listen 80;
    server_name api.myapp.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 图片防盗链

```nginx
location ~* \.(jpg|jpeg|png|gif)$ {
    valid_referers none blocked myapp.com;
    if ($invalid_referer) {
        return 403;
    }
}
```

## 十、性能优化

```nginx
# worker 进程数
worker_processes auto;

# 每个 worker 最大连接数
worker_connections 1024;

# 开启高效传输
sendfile on;
tcp_nopush on;
tcp_nodelay on;

# Gzip 压缩
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

# 打开文件缓存
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;

# 连接超时
keepalive_timeout 65;
client_max_body_size 50M;
```

## 十一、常用命令

```bash
# 测试配置
nginx -t

# 重载配置
nginx -s reload

# 停止
nginx -s stop

# 查看进程
ps aux | grep nginx

# 查看端口
netstat -tlnp | grep 80
```