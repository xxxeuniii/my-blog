# Cron 定时任务

## 一、什么是 Cron

**Cron** 是 Linux/Unix 系统中用于**定时执行任务**的守护进程。它允许用户在指定的时间自动运行脚本或命令，是自动化运维的核心工具。

**主要用途：**
- 定期备份数据库
- 定时清理日志文件
- 定期同步数据
- 自动化运维脚本执行
- 定时生成报表

## 二、Cron 服务管理

```bash
# 查看 cron 服务状态
systemctl status cron

# 启动 cron 服务
systemctl start cron

# 设置开机自启
systemctl enable cron

# 重启 cron 服务
systemctl restart cron

# 停止 cron 服务
systemctl stop cron
```

## 三、Cron 表达式

```
┌───────────── 分钟 (0-59)
│ ┌───────────── 小时 (0-23)
│ │ ┌───────────── 日期 (1-31)
│ │ │ ┌───────────── 月份 (1-12)
│ │ │ │ ┌───────────── 星期 (0-6, 0=周日)
│ │ │ │ │
│ │ │ │ │
* * * * * command
```

## 四、特殊字符详解

| 字符 | 含义 | 示例 |
|------|------|------|
| `*` | 匹配任何值 | `* * * * *` 每分钟执行 |
| `*/n` | 每隔 n 个单位 | `*/10 * * * *` 每10分钟 |
| `a,b,c` | 列举多个值 | `0 9,18 * * *` 9点和18点 |
| `a-b` | 范围值 | `0 9-18 * * *` 9点到18点 |

## 五、常用命令

```bash
# 编辑当前用户的定时任务
crontab -e

# 查看当前用户的定时任务
crontab -l

# 删除当前用户的定时任务
crontab -r

# 指定用户查看/编辑定时任务
crontab -u username -l
crontab -u username -e

# 查看系统定时任务目录
ls /etc/cron.*
```

## 六、系统级定时任务

系统级定时任务存放在 `/etc/cron.*` 目录：

```bash
# 系统定时任务目录
/etc/cron.d/        # 自定义系统任务
/etc/cron.daily/    # 每天执行一次
/etc/cron.hourly/   # 每小时执行一次
/etc/cron.weekly/   # 每周执行一次
/etc/cron.monthly/  # 每月执行一次

# 系统级配置文件
/etc/crontab        # 系统定时任务配置
/etc/cron.allow     # 允许使用 cron 的用户列表
/etc/cron.deny      # 禁止使用 cron 的用户列表
```

## 七、示例

```bash
# 每天凌晨 2 点执行备份
0 2 * * * /usr/bin/backup.sh

# 每小时执行一次
0 * * * * /usr/bin/check.sh

# 每周一、三、五的 9:30 执行
30 9 * * 1,3,5 /usr/bin/sync.sh

# 每 10 分钟执行一次
*/10 * * * * /usr/bin/heartbeat.sh

# 工作日 9:00-18:00 每小时执行
0 9-18 * * 1-5 /usr/bin/report.sh

# 每月 1 号凌晨 3 点执行
0 3 1 * * /usr/bin/monthly_report.sh

# 每周日凌晨 1 点执行
0 1 * * 0 /usr/bin/weekly_cleanup.sh

# 指定 PATH 环境变量
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
0 2 * * * /usr/bin/backup.sh

# 输出日志到文件
0 2 * * * /usr/bin/backup.sh >> /var/log/backup.log 2>&1

# 设置邮件通知（需要配置 sendmail）
MAILTO=admin@example.com
0 2 * * * /usr/bin/backup.sh
```

## 八、Cron 日志查看

```bash
# 查看 cron 执行日志（Debian/Ubuntu）
tail -f /var/log/syslog | grep CRON

# 查看 cron 执行日志（CentOS/RHEL）
tail -f /var/log/cron

# 查看最近 100 条 cron 日志
grep CRON /var/log/syslog | tail -n 100
```

## 九、调试技巧

```bash
# 测试 cron 表达式是否正确
# 使用 run-parts 测试目录中的脚本
run-parts --test /etc/cron.daily

# 手动运行定时任务测试
/usr/bin/backup.sh

# 检查脚本是否有执行权限
chmod +x /usr/bin/backup.sh

# 在脚本开头添加完整路径
#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin

# 将输出重定向到日志文件便于排查
0 2 * * * /usr/bin/backup.sh >> /var/log/backup.log 2>&1
```

## 十、常见问题

### 问题 1：定时任务没有执行
- 检查 cron 服务是否运行：`systemctl status cron`
- 检查脚本路径是否正确（使用绝对路径）
- 检查脚本是否有执行权限
- 查看 cron 日志：`grep CRON /var/log/syslog`

### 问题 2：环境变量问题
- Cron 的环境变量有限，建议在脚本中设置完整 PATH
- 使用绝对路径执行命令
- 在 crontab 文件顶部设置环境变量

### 问题 3：脚本执行失败
- 将输出重定向到日志文件查看错误信息
- 手动运行脚本测试
- 检查脚本语法错误：`bash -n script.sh`