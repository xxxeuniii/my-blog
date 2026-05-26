# Linux 基础

Linux 是一种开源的操作系统，广泛用于服务器领域。

## 一、常用命令

### 文件操作

| 命令 | 说明 | 示例 |
|------|------|------|
| `ls` | 列出目录内容 | `ls -la` |
| `cd` | 切换目录 | `cd /home` |
| `pwd` | 显示当前目录 | `pwd` |
| `mkdir` | 创建目录 | `mkdir test` |
| `rm` | 删除文件 | `rm -rf test` |
| `cp` | 复制文件 | `cp a.txt b.txt` |
| `mv` | 移动/重命名 | `mv a.txt b.txt` |
| `cat` | 查看文件内容 | `cat test.txt` |
| `tail` | 查看文件末尾 | `tail -f log.txt` |
| `grep` | 搜索内容 | `grep "error" log.txt` |

### 系统操作

| 命令 | 说明 |
|------|------|
| `top` | 查看系统进程 |
| `htop` | 交互式进程查看 |
| `df` | 查看磁盘使用 |
| `free` | 查看内存使用 |
| `ps` | 查看进程 |
| `kill` | 杀死进程 |
| `chmod` | 修改权限 |
| `chown` | 修改所有者 |

### 网络操作

| 命令 | 说明 |
|------|------|
| `ping` | 测试网络连通 |
| `curl` | 发送 HTTP 请求 |
| `wget` | 下载文件 |
| `ssh` | 远程连接 |
| `scp` | 远程复制 |
| `netstat` | 查看网络端口 |
| `iptables` | 防火墙配置 |

## 二、文件权限

### 权限说明

```
r = 4 (读)
w = 2 (写)
x = 1 (执行)
```

### 示例

```bash
# 修改权限
chmod 755 test.sh    # rwxr-xr-x
chmod +x test.sh     # 添加执行权限

# 修改所有者
chown user:group file
```

## 三、用户管理

```bash
# 添加用户
useradd username

# 删除用户
userdel username

# 添加用户组
groupadd groupname

# 修改密码
passwd username
```

## 四、进程管理

```bash
# 查看进程
ps aux

# 查找进程
ps aux | grep nginx

# 杀死进程
kill -9 PID

# 后台运行
nohup npm start &

# 查看后台任务
jobs

# 切换后台任务
fg %1
```

## 五、压缩与解压

```bash
# tar 压缩
tar -cvf archive.tar file1 file2

# tar 解压
tar -xvf archive.tar

# tar.gz 压缩
tar -czvf archive.tar.gz file1 file2

# tar.gz 解压
tar -xzvf archive.tar.gz

# zip 压缩
zip -r archive.zip folder/

# zip 解压
unzip archive.zip
```

## 六、软件安装

### Ubuntu/Debian

```bash
# 安装
apt-get install nginx

# 更新
apt-get update

# 卸载
apt-get remove nginx
```

### CentOS/RHEL

```bash
# 安装
yum install nginx

# 更新
yum update

# 卸载
yum remove nginx
```

## 七、常用服务管理

```bash
# systemctl 方式（Ubuntu 16+ / CentOS 7+）
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl status nginx
systemctl enable nginx   # 开机启动
systemctl disable nginx  # 禁用开机启动

# service 方式
service nginx start
service nginx stop
service nginx restart
```

## 八、日志查看

```bash
# 系统日志
/var/log/syslog
/var/log/messages
/var/log/nginx/error.log

# 查看实时日志
tail -f /var/log/syslog

# 查看最后 100 行
tail -n 100 /var/log/syslog
```

## 九、磁盘管理

```bash
# 查看磁盘使用
df -h

# 查看当前目录大小
du -sh *

# 挂载磁盘
mount /dev/sdb1 /mnt

# 卸载磁盘
umount /mnt
```

## 十、SSH 远程连接

```bash
# 连接到远程服务器
ssh user@192.168.1.100

# 指定端口
ssh -p 2222 user@192.168.1.100

# 密钥登录
ssh -i ~/.ssh/id_rsa user@192.168.1.100

# 远程复制
scp file.txt user@server:/path/
```

## 十一、常用快捷键

| 快捷键 | 说明 |
|--------|------|
| Ctrl+C | 终止当前命令 |
| Ctrl+Z | 暂停当前命令 |
| Ctrl+L | 清屏 |
| Ctrl+A | 移动到行首 |
| Ctrl+E | 移动到行尾 |
| Tab | 自动补全 |
| Ctrl+R | 搜索历史命令 |