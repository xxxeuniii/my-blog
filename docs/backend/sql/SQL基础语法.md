# SQL 基础语法

## 一、SQL 简介

SQL（Structured Query Language）是用于管理关系型数据库的标准语言。

## 二、基础查询 - SELECT

### 2.1 基本语法

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT id, name, email FROM users;

-- 别名
SELECT id AS user_id, name AS username FROM users;
```

### 2.2 条件查询 - WHERE

```sql
-- 基本条件
SELECT * FROM users WHERE age > 18;

-- 多个条件
SELECT * FROM users WHERE age > 18 AND status = 'active';

-- 模糊查询
SELECT * FROM users WHERE name LIKE '%张%';

-- 范围查询
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- 空值判断
SELECT * FROM users WHERE email IS NOT NULL;
```

### 2.3 排序 - ORDER BY

```sql
-- 升序（默认）
SELECT * FROM users ORDER BY age ASC;

-- 降序
SELECT * FROM users ORDER BY age DESC;

-- 多列排序
SELECT * FROM users ORDER BY department, salary DESC;
```

### 2.4 限制数量 - LIMIT/OFFSET

```sql
-- 限制返回行数
SELECT * FROM users LIMIT 10;

-- 分页查询
SELECT * FROM users LIMIT 10 OFFSET 20; -- 第3页，每页10条
```

## 三、数据操作

### 3.1 插入数据 - INSERT

```sql
-- 插入单行
INSERT INTO users (name, email, age)
VALUES ('张三', 'zhangsan@example.com', 25);

-- 插入多行
INSERT INTO users (name, email, age)
VALUES 
  ('李四', 'lisi@example.com', 28),
  ('王五', 'wangwu@example.com', 30);
```

### 3.2 更新数据 - UPDATE

```sql
-- 更新单行
UPDATE users 
SET email = 'new_email@example.com' 
WHERE id = 1;

-- 更新多行
UPDATE users 
SET status = 'inactive' 
WHERE last_login < '2024-01-01';
```

### 3.3 删除数据 - DELETE

```sql
-- 删除指定行
DELETE FROM users WHERE id = 1;

-- 删除多行
DELETE FROM users WHERE status = 'deleted';
```

## 四、聚合函数

### 4.1 常用聚合函数

```sql
-- 计数
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT department) FROM users;

-- 求和
SELECT SUM(salary) FROM employees;

-- 平均值
SELECT AVG(age) FROM users;

-- 最大值/最小值
SELECT MAX(salary), MIN(salary) FROM employees;
```

### 4.2 分组 - GROUP BY

```sql
-- 按部门分组统计人数
SELECT department, COUNT(*) AS count 
FROM employees 
GROUP BY department;

-- 分组后筛选
SELECT department, AVG(salary) 
FROM employees 
GROUP BY department 
HAVING AVG(salary) > 5000;
```

## 五、数据定义

### 5.1 创建表 - CREATE TABLE

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2 修改表 - ALTER TABLE

```sql
-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 修改列
ALTER TABLE users MODIFY COLUMN phone VARCHAR(30);

-- 删除列
ALTER TABLE users DROP COLUMN phone;

-- 添加索引
ALTER TABLE users ADD INDEX idx_email (email);
```

### 5.3 删除表 - DROP TABLE

```sql
DROP TABLE users;
```

## 六、运算符

### 6.1 算术运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| + | 加法 | SELECT 1 + 2 |
| - | 减法 | SELECT 5 - 3 |
| * | 乘法 | SELECT 2 * 3 |
| / | 除法 | SELECT 10 / 2 |
| % | 取模 | SELECT 7 % 3 |

### 6.2 比较运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| = | 等于 | WHERE id = 1 |
| != / <> | 不等于 | WHERE status != 'active' |
| > | 大于 | WHERE age > 18 |
| < | 小于 | WHERE salary < 5000 |
| >= | 大于等于 | WHERE score >= 60 |
| <= | 小于等于 | WHERE price <= 100 |

### 6.3 逻辑运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| AND | 逻辑与 | WHERE age > 18 AND status = 'active' |
| OR | 逻辑或 | WHERE department = 'IT' OR salary > 8000 |
| NOT | 逻辑非 | WHERE NOT status = 'deleted' |
| IN | 在集合中 | WHERE id IN (1, 2, 3) |
| NOT IN | 不在集合中 | WHERE department NOT IN ('HR', 'Finance') |

## 七、常用函数

### 7.1 字符串函数

```sql
-- 字符串长度
SELECT LENGTH('Hello');

-- 字符串拼接
SELECT CONCAT('Hello', ' ', 'World');

-- 截取字符串
SELECT SUBSTRING('Hello World', 1, 5);

-- 转大写/小写
SELECT UPPER(name), LOWER(name) FROM users;

-- 去除空格
SELECT TRIM('  Hello  ');
```

### 7.2 日期函数

```sql
-- 当前日期时间
SELECT NOW();
SELECT CURDATE();
SELECT CURTIME();

-- 日期格式化
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');

-- 日期计算
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);
SELECT DATEDIFF('2024-12-31', NOW());
```

### 7.3 数值函数

```sql
-- 四舍五入
SELECT ROUND(3.14159, 2);

-- 向上/向下取整
SELECT CEIL(3.1), FLOOR(3.9);

-- 随机数
SELECT RAND();
```

## 八、注释

```sql
-- 单行注释

/*
 多行注释
 可以写很多内容
*/
```

## 九、练习示例

假设有如下表结构：

```sql
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  grade VARCHAR(20),
  score INT,
  created_at DATE
);
```

**练习题目**：

1. 查询所有学生信息
2. 查询年龄大于18岁的学生姓名和年龄
3. 计算每个年级的学生人数
4. 查询成绩最高的前5名学生
5. 将所有不及格（<60）学生的成绩更新为60

**参考答案**：

```sql
-- 1. 查询所有学生信息
SELECT * FROM students;

-- 2. 查询年龄大于18岁的学生姓名和年龄
SELECT name, age FROM students WHERE age > 18;

-- 3. 计算每个年级的学生人数
SELECT grade, COUNT(*) AS count FROM students GROUP BY grade;

-- 4. 查询成绩最高的前5名学生
SELECT * FROM students ORDER BY score DESC LIMIT 5;

-- 5. 更新不及格学生的成绩
UPDATE students SET score = 60 WHERE score < 60;
```

## 总结

SQL 基础语法是数据库操作的基石，掌握以下内容即可完成大部分日常操作：

1. **SELECT** - 查询数据
2. **INSERT/UPDATE/DELETE** - 数据操作
3. **WHERE** - 条件筛选
4. **ORDER BY/LIMIT** - 排序和分页
5. **GROUP BY/HAVING** - 分组统计
6. **聚合函数** - COUNT/SUM/AVG/MAX/MIN

下一章我们将学习 SQL 高级查询技巧。