# Linux 进阶

## 一、网络管理

### 1.1 网络配置

```bash
# 查看网络接口
ip addr show
ifconfig

# 查看路由表
ip route show
route -n

# 查看 DNS 配置
cat /etc/resolv.conf

# 测试 DNS 解析
nslookup example.com
dig example.com

# 修改主机名
hostnamectl set-hostname new-hostname
```

### 1.2 端口管理

```bash
# 查看所有监听端口
netstat -tuln
ss -tuln

# 查看指定端口占用
lsof -i :8080
netstat -tuln | grep 8080

# 检查端口是否开放
nc -zv localhost 8080
telnet localhost 8080
```

### 1.3 防火墙配置

**firewalld（CentOS 7+）：**

```bash
# 查看状态
firewall-cmd --state

# 查看开放端口
firewall-cmd --list-ports

# 开放端口
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --reload

# 关闭端口
firewall-cmd --remove-port=8080/tcp --permanent
firewall-cmd --reload
```

**ufw（Ubuntu/Debian）：**

```bash
# 启用防火墙
ufw enable

# 查看状态
ufw status

# 开放端口
ufw allow 8080/tcp

# 关闭端口
ufw deny 8080/tcp

# 删除规则
ufw delete allow 8080/tcp
```

---

## 二、系统监控与性能分析

### 2.1 系统资源监控

```bash
# 查看 CPU 信息
cat /proc/cpuinfo
lscpu

# 查看内存信息
cat /proc/meminfo
free -h

# 查看磁盘 I/O
iostat -x 1
iotop

# 查看网络流量
iftop
nload

# 查看系统负载
uptime
w
```

### 2.2 进程监控

```bash
# 交互式进程查看
htop

# 查看进程树
pstree

# 查看线程数
pstree -p | wc -l

# 查看进程详细信息
ps aux | grep nginx
ps -ef | grep nginx

# 查看进程打开的文件
lsof -p PID
```

### 2.3 性能分析工具

```bash
# 系统活动报告
sar -u 1 10  # CPU 使用
sar -r 1 10  # 内存使用
sar -n DEV 1 10  # 网络流量

# 跟踪进程系统调用
strace -p PID

# 分析 CPU 占用
top -p PID
```

---

## 三、日志管理

### 3.1 日志位置

```bash
# 系统日志
/var/log/syslog          # Debian/Ubuntu
/var/log/messages        # CentOS/RHEL

# 用户日志
/var/log/auth.log        # 认证日志
/var/log/secure          # 安全日志

# 应用日志
/var/log/nginx/          # Nginx 日志
/var/log/mysql/          # MySQL 日志
/var/log/apache2/        # Apache 日志
```

### 3.2 日志查看命令

```bash
# 实时查看日志
tail -f /var/log/syslog

# 查看最近 100 行
tail -n 100 /var/log/syslog

# 查看包含特定关键词的日志
grep "ERROR" /var/log/syslog
grep -i "error" /var/log/syslog  # 忽略大小写

# 查看特定时间范围的日志
sed -n '/Jan 15 10:00:00/,/Jan 15 11:00:00/p' /var/log/syslog

# 统计日志中关键词出现次数
grep "ERROR" /var/log/syslog | wc -l

# 查看日志文件大小
ls -lh /var/log/*.log

# 压缩旧日志
gzip /var/log/syslog.1
```

---

## 四、用户与权限进阶

### 4.1 用户组管理

```bash
# 创建用户组
groupadd developers

# 删除用户组
groupdel developers

# 将用户添加到组
usermod -aG developers username

# 查看用户所属组
groups username

# 查看所有用户
cat /etc/passwd

# 查看所有组
cat /etc/group
```

### 4.2 权限进阶

```bash
# 设置 SUID（执行时拥有文件所有者权限）
chmod u+s /usr/bin/passwd

# 设置 SGID（执行时拥有文件所属组权限）
chmod g+s /var/www

# 设置粘滞位（只有所有者可删除）
chmod +t /tmp

# 递归修改权限
chmod -R 755 /var/www

# 递归修改所有者
chown -R www-data:www-data /var/www
```

### 4.3 sudo 权限

```bash
# 编辑 sudoers 文件
visudo

# 允许用户执行所有命令
username ALL=(ALL) ALL

# 允许用户执行特定命令
username ALL=(ALL) /usr/bin/service, /usr/bin/systemctl

# 无需密码执行 sudo
username ALL=(ALL) NOPASSWD: ALL
```

---

## 五、文件查找与处理

### 5.1 文件查找

```bash
# 按名称查找
find /path -name "*.log"

# 按大小查找
find /path -size +100M  # 大于 100MB
find /path -size -10k   # 小于 10KB

# 按类型查找
find /path -type f      # 文件
find /path -type d      # 目录

# 按时间查找
find /path -mtime -7    # 7天内修改
find /path -atime -1    # 1天内访问

# 查找并执行命令
find /path -name "*.log" -exec rm {} \;
find /path -name "*.log" -delete
```

### 5.2 文件内容处理

```bash
# 查看文件内容（分页）
more /var/log/syslog
less /var/log/syslog

# 查看文件头部
head -n 20 /var/log/syslog

# 统计文件行数、单词数、字节数
wc -l file.txt    # 行数
wc -w file.txt    # 单词数
wc -c file.txt    # 字节数

# 排序文件
sort file.txt
sort -n file.txt  # 数值排序
sort -r file.txt  # 逆序排序

# 去重
uniq file.txt
sort file.txt | uniq

# 替换文本
sed -i 's/old/new/g' file.txt

# 显示行号
cat -n file.txt
```

---

## 六、系统维护

### 6.1 系统更新

```bash
# Debian/Ubuntu
apt update && apt upgrade -y

# CentOS/RHEL
yum update -y

# 检查更新历史
cat /var/log/apt/history.log    # Debian
cat /var/log/yum.log            # CentOS
```

### 6.2 清理系统

```bash
# 清理缓存
apt clean            # Debian
yum clean all        # CentOS

# 删除旧内核（Debian）
apt autoremove --purge

# 清理临时文件
rm -rf /tmp/*
rm -rf /var/tmp/*

# 清理日志
find /var/log -type f -name "*.log.*" -delete
```

### 6.3 系统时间

```bash
# 查看当前时间
date

# 设置时间
date -s "2024-01-15 10:30:00"

# 同步时间（NTP）
timedatectl set-ntp true
ntpdate pool.ntp.org

# 查看时区
timedatectl

# 设置时区
timedatectl set-timezone Asia/Shanghai
```

---

## 七、实用脚本示例

### 7.1 备份脚本

```bash
#!/bin/bash
# backup.sh - 数据库备份脚本

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup"
DB_NAME="example_db"
DB_USER="backup_user"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库
mysqldump -u $DB_USER -p $DB_NAME > "$BACKUP_DIR/db_backup_$DATE.sql"

# 压缩备份
gzip "$BACKUP_DIR/db_backup_$DATE.sql"

# 删除 7 天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/db_backup_$DATE.sql.gz"
```

### 7.2 监控脚本

```bash
#!/bin/bash
# monitor.sh - 系统监控脚本

CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
MEM_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
DISK_USAGE=$(df -h / | grep / | awk '{print $5}' | sed 's/%//g')

echo "=== System Monitor ==="
echo "CPU Usage: $CPU_USAGE%"
echo "Memory Usage: $MEM_USAGE%"
echo "Disk Usage: $DISK_USAGE%"

# 如果 CPU 使用率超过 80% 发送告警
if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    echo "WARNING: CPU usage is high!" | mail -s "System Alert" admin@example.com
fi
```

---

## 八、服务器安全加固

### 8.1 基础安全设置

```bash
# 禁止 root 远程登录
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

# 禁用密码登录（使用密钥登录）
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

# 修改 SSH 端口
sed -i 's/Port 22/Port 2222/' /etc/ssh/sshd_config
systemctl restart sshd
```

### 8.2 安全扫描

```bash
# 扫描开放端口
nmap localhost

# 检查系统漏洞
apt install debsecan    # Debian
debsecan

# 检查 rootkit
apt install chkrootkit
chkrootkit

# 检查恶意软件
apt install rkhunter
rkhunter --check
```

---

## 九、常用命令速查表

### 文件操作

| 命令 | 说明 |
|------|------|
| `ls -la` | 列出目录内容（详细） |
| `mkdir -p dir1/dir2` | 创建多级目录 |
| `rm -rf dir` | 强制删除目录 |
| `cp -r src dest` | 递归复制 |
| `grep -r "pattern" dir` | 递归搜索 |

### 系统管理

| 命令 | 说明 |
|------|------|
| `systemctl status service` | 查看服务状态 |
| `systemctl enable service` | 开机自启 |
| `journalctl -u service` | 查看服务日志 |
| `df -h` | 磁盘使用 |
| `du -sh dir` | 目录大小 |
| `free -h` | 内存使用 |

### 网络命令

| 命令 | 说明 |
|------|------|
| `ip addr` | 网络接口 |
| `ip route` | 路由表 |
| `ss -tuln` | 监听端口 |
| `curl url` | HTTP 请求 |
| `ssh user@host` | 远程连接 |

### 文本处理

| 命令 | 说明 |
|------|------|
| `grep "pattern" file` | 搜索文本 |
| `sed 's/old/new/' file` | 替换文本 |
| `awk '{print $1}' file` | 字段提取 |
| `sort file` | 排序 |
| `wc -l file` | 统计行数 |