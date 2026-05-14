# SQL 性能优化

## 一、性能优化概述

### 1.1 性能问题表现

- 查询响应时间长
- CPU 使用率高
- 内存占用大
- 磁盘 I/O 频繁

### 1.2 优化流程

```
识别问题 → 分析原因 → 实施优化 → 验证效果
```

## 二、查询优化

### 2.1 使用 EXPLAIN 分析

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 123;
```

**EXPLAIN 输出解读：**

| 字段 | 说明 | 理想值 |
|------|------|--------|
| type | 访问类型 | const > eq_ref > ref > range > index > ALL |
| key | 使用的索引 | 非 NULL |
| rows | 扫描行数 | 越小越好 |
| Extra | 额外信息 | 无 Using filesort, Using temporary |

### 2.2 避免全表扫描

```sql
-- 避免：全表扫描
SELECT * FROM orders WHERE status = 'completed';

-- 优化：添加索引
CREATE INDEX idx_order_status ON orders(status);

-- 验证：使用索引
SELECT * FROM orders WHERE status = 'completed';
```

### 2.3 优化 SELECT *

```sql
-- 避免：查询所有列
SELECT * FROM users WHERE id = 1;

-- 优化：只查询需要的列
SELECT name, email FROM users WHERE id = 1;
```

### 2.4 使用覆盖索引

```sql
-- 创建覆盖索引
CREATE INDEX idx_user_name_email ON users(name, email);

-- 查询只使用索引（覆盖索引）
SELECT name, email FROM users WHERE name = '张三';
```

### 2.5 避免在索引列上使用函数

```sql
-- 避免：索引失效
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- 优化：重写为范围查询
SELECT * FROM users 
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
```

## 三、索引优化

### 3.1 索引设计原则

```sql
-- 为 WHERE 条件创建索引
CREATE INDEX idx_order_user_id ON orders(user_id);

-- 为 JOIN 条件创建索引
CREATE INDEX idx_order_product_id ON order_items(product_id);

-- 为 ORDER BY 创建索引
CREATE INDEX idx_user_created_at ON users(created_at);
```

### 3.2 复合索引顺序

```sql
-- 创建复合索引（选择性高的列在前）
CREATE INDEX idx_order_user_status ON orders(user_id, status);

-- 有效查询
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders WHERE user_id = 1 AND status = 'paid';

-- 无效查询（不满足最左前缀）
SELECT * FROM orders WHERE status = 'paid';
```

### 3.3 索引维护

```sql
-- 查看索引使用情况
SHOW INDEX FROM orders;

-- 删除无效索引
DROP INDEX idx_unused ON orders;

-- 重建索引
ALTER TABLE orders ENGINE=InnoDB;
```

## 四、数据结构优化

### 4.1 选择合适的数据类型

```sql
-- 避免：使用过大的数据类型
CREATE TABLE users (
  id BIGINT,        -- 应使用 INT
  name VARCHAR(255) -- 应使用 VARCHAR(50)
);

-- 优化：选择合适的类型
CREATE TABLE users (
  id INT,
  name VARCHAR(50)
);
```

### 4.2 使用合适的存储引擎

```sql
-- InnoDB（推荐）：支持事务、行锁
CREATE TABLE orders (
  id INT PRIMARY KEY
) ENGINE=InnoDB;

-- MyISAM：不支持事务，查询快
CREATE TABLE logs (
  id INT PRIMARY KEY
) ENGINE=MyISAM;
```

### 4.3 分区表

```sql
-- 创建分区表（按日期分区）
CREATE TABLE orders (
  id INT PRIMARY KEY,
  order_date DATE
)
PARTITION BY RANGE (TO_DAYS(order_date)) (
  PARTITION p202401 VALUES LESS THAN (TO_DAYS('2024-02-01')),
  PARTITION p202402 VALUES LESS THAN (TO_DAYS('2024-03-01')),
  PARTITION p202403 VALUES LESS THAN (TO_DAYS('2024-04-01'))
);
```

## 五、查询重构

### 5.1 使用 JOIN 替代子查询

```sql
-- 避免：相关子查询
SELECT name FROM employees e
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.employee_id = e.id
);

-- 优化：使用 JOIN
SELECT DISTINCT e.name 
FROM employees e
JOIN orders o ON e.id = o.employee_id;
```

### 5.2 限制结果集大小

```sql
-- 避免：查询过多数据
SELECT * FROM large_table;

-- 优化：分页查询
SELECT * FROM large_table LIMIT 100 OFFSET 0;
```

### 5.3 使用 UNION ALL 替代 UNION

```sql
-- 避免：UNION 会去重，性能差
SELECT name FROM employees WHERE department_id = 1
UNION
SELECT name FROM employees WHERE department_id = 2;

-- 优化：UNION ALL 不去重，性能好
SELECT name FROM employees WHERE department_id = 1
UNION ALL
SELECT name FROM employees WHERE department_id = 2;
```

## 六、配置优化

### 6.1 调整缓冲区大小

```ini
# my.cnf
innodb_buffer_pool_size = 4G     # InnoDB 缓冲池
query_cache_size = 64M           # 查询缓存（MySQL 8.0 已移除）
tmp_table_size = 64M             # 临时表大小
max_heap_table_size = 64M        # 内存表大小
```

### 6.2 连接数配置

```ini
# my.cnf
max_connections = 1000           # 最大连接数
wait_timeout = 60                # 连接超时时间
interactive_timeout = 60         # 交互式连接超时
```

### 6.3 日志配置

```ini
# my.cnf
slow_query_log = 1               # 开启慢查询日志
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2              # 慢查询阈值（秒）
log_queries_not_using_indexes = 1 # 记录未使用索引的查询
```

## 七、缓存策略

### 7.1 应用层缓存

```python
# Python 示例：使用 Redis 缓存查询结果
import redis
import json

r = redis.Redis(host='localhost', port=6379)

def get_user(user_id):
    # 先从缓存获取
    cache_key = f'user:{user_id}'
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # 从数据库查询
    user = db.query("SELECT * FROM users WHERE id = %s", user_id)
    
    # 存入缓存（过期时间 5 分钟）
    r.setex(cache_key, 300, json.dumps(user))
    
    return user
```

### 7.2 查询缓存（MySQL 5.7）

```sql
-- 开启查询缓存
SET GLOBAL query_cache_type = ON;

-- 查询会自动缓存
SELECT * FROM users WHERE id = 1;

-- 第二次查询使用缓存
SELECT * FROM users WHERE id = 1;
```

## 八、读写分离

### 8.1 架构设计

```
         应用层
           |
    ┌──────┴──────┐
    ▼             ▼
  主库         从库
 (写操作)     (读操作)
    │             │
    └──────┬──────┘
           ▼
        数据同步
```

### 8.2 MySQL 复制配置

```ini
# 主库 my.cnf
server-id = 1
log-bin = mysql-bin
binlog-do-db = mydb

# 从库 my.cnf
server-id = 2
relay-log = relay-bin
read_only = 1
```

## 九、分库分表

### 9.1 垂直分表

```sql
-- 将大表拆分为多个小表
-- 用户基本信息表
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);

-- 用户扩展信息表
CREATE TABLE user_profiles (
  user_id INT PRIMARY KEY,
  bio TEXT,
  avatar_url VARCHAR(255)
);
```

### 9.2 水平分表

```sql
-- 根据 user_id 哈希分表
-- users_0
CREATE TABLE users_0 (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- users_1
CREATE TABLE users_1 (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- 查询时根据 user_id % 2 确定表名
```

## 十、监控与调优

### 10.1 慢查询日志

```sql
-- 查看慢查询日志
SHOW VARIABLES LIKE 'slow_query_log';

-- 分析慢查询
mysqldumpslow /var/log/mysql/slow.log
```

### 10.2 Performance Schema

```sql
-- 启用 Performance Schema
UPDATE performance_schema.setup_consumers 
SET ENABLED = 'YES' 
WHERE NAME LIKE '%statement%';

-- 查询执行次数最多的语句
SELECT DIGEST_TEXT, COUNT_STAR 
FROM performance_schema.events_statements_summary_by_digest 
ORDER BY COUNT_STAR DESC LIMIT 10;
```

### 10.3 操作系统监控

```bash
# CPU 监控
top

# 内存监控
free -h

# 磁盘 I/O
iostat -x 1

# 网络监控
netstat -tnlp
```

## 十一、实战案例

### 11.1 案例一：优化报表查询

```sql
-- 慢查询：统计每月销售额
SELECT 
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  SUM(total_amount) AS sales
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');

-- 优化：添加索引
CREATE INDEX idx_order_date_amount ON orders(order_date, total_amount);

-- 优化后查询（覆盖索引）
SELECT 
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  SUM(total_amount) AS sales
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');
```

### 11.2 案例二：优化分页查询

```sql
-- 慢查询：深分页
SELECT * FROM orders ORDER BY created_at DESC LIMIT 100000, 10;

-- 优化：使用主键索引
SELECT * FROM orders 
WHERE id > (SELECT id FROM orders ORDER BY id DESC LIMIT 100000, 1)
ORDER BY id DESC LIMIT 10;
```

### 11.3 案例三：优化 JOIN 查询

```sql
-- 慢查询：多表 JOIN
SELECT o.id, u.name, p.name 
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed';

-- 优化：添加索引
CREATE INDEX idx_order_user_id ON orders(user_id);
CREATE INDEX idx_order_product_id ON orders(product_id);
CREATE INDEX idx_order_status ON orders(status);
```

## 十二、性能优化检查清单

- [ ] 使用 EXPLAIN 分析慢查询
- [ ] 为 WHERE、JOIN、ORDER BY 列创建索引
- [ ] 避免 SELECT *，只查询需要的列
- [ ] 避免在索引列上使用函数
- [ ] 使用覆盖索引减少回表
- [ ] 合理配置数据库参数
- [ ] 开启慢查询日志监控
- [ ] 考虑读写分离和分库分表

## 总结

SQL 性能优化是一个系统性的工作：

1. **索引优化**：合理创建和使用索引
2. **查询优化**：写出高效的 SQL 语句
3. **配置优化**：调整数据库参数
4. **架构优化**：读写分离、分库分表
5. **监控优化**：持续监控和调优

通过系统化的方法，可以显著提升数据库性能。