# SQL 高级查询

## 一、多表连接 - JOIN

### 1.1 JOIN 类型

| JOIN 类型 | 说明 | 返回结果 |
|-----------|------|----------|
| INNER JOIN | 内连接 | 两个表的交集 |
| LEFT JOIN | 左连接 | 左表全部 + 右表匹配行 |
| RIGHT JOIN | 右连接 | 右表全部 + 左表匹配行 |
| FULL JOIN | 全连接 | 两个表的并集 |
| CROSS JOIN | 笛卡尔积 | 所有组合 |

### 1.2 INNER JOIN

```sql
-- 查询员工及其所在部门
SELECT 
  e.name AS employee_name,
  d.name AS department_name
FROM employees e
INNER JOIN departments d 
  ON e.department_id = d.id;
```

### 1.3 LEFT JOIN

```sql
-- 查询所有部门及其员工（包括没有员工的部门）
SELECT 
  d.name AS department_name,
  e.name AS employee_name
FROM departments d
LEFT JOIN employees e 
  ON d.id = e.department_id;
```

### 1.4 多表 JOIN

```sql
-- 查询订单、客户和产品信息
SELECT 
  o.order_id,
  c.name AS customer_name,
  p.name AS product_name,
  o.quantity,
  o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
```

## 二、子查询

### 2.1 标量子查询

```sql
-- 查询工资高于平均工资的员工
SELECT name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### 2.2 列子查询

```sql
-- 查询在部门IT或HR工作的员工
SELECT name, department_id 
FROM employees 
WHERE department_id IN (
  SELECT id FROM departments WHERE name IN ('IT', 'HR')
);
```

### 2.3 表子查询

```sql
-- 查询每个部门工资最高的员工
SELECT e.name, e.salary, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE (e.department_id, e.salary) IN (
  SELECT department_id, MAX(salary) 
  FROM employees 
  GROUP BY department_id
);
```

### 2.4 相关子查询

```sql
-- 查询比同部门平均工资高的员工
SELECT name, salary, department_id
FROM employees e1
WHERE salary > (
  SELECT AVG(salary) 
  FROM employees e2 
  WHERE e2.department_id = e1.department_id
);
```

## 三、窗口函数

### 3.1 排名函数

```sql
-- 按工资排名
SELECT 
  name,
  salary,
  RANK() OVER (ORDER BY salary DESC) AS salary_rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
```

### 3.2 分组排名

```sql
-- 每个部门内按工资排名
SELECT 
  name,
  department_id,
  salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;
```

### 3.3 聚合窗口函数

```sql
-- 计算累计工资和移动平均
SELECT 
  name,
  salary,
  SUM(salary) OVER (ORDER BY id) AS cumulative_sum,
  AVG(salary) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
FROM employees;
```

### 3.4 LEAD 和 LAG

```sql
-- 获取前一行和后一行的数据
SELECT 
  name,
  salary,
  LAG(salary) OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary) OVER (ORDER BY salary) AS next_salary
FROM employees;
```

## 四、CTE（公共表表达式）

### 4.1 基本 CTE

```sql
WITH department_stats AS (
  SELECT 
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
)
SELECT 
  d.name,
  ds.employee_count,
  ds.avg_salary
FROM departments d
JOIN department_stats ds ON d.id = ds.department_id;
```

### 4.2 递归 CTE

```sql
-- 查询组织结构（递归查询）
WITH RECURSIVE org_hierarchy AS (
  -- 基础查询：顶级员工
  SELECT 
    id, 
    name, 
    manager_id, 
    1 AS level
  FROM employees 
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- 递归查询：下属员工
  SELECT 
    e.id, 
    e.name, 
    e.manager_id, 
    oh.level + 1
  FROM employees e
  JOIN org_hierarchy oh ON e.manager_id = oh.id
)
SELECT * FROM org_hierarchy ORDER BY level;
```

## 五、集合操作

### 5.1 UNION / UNION ALL

```sql
-- 合并两个查询结果（去重）
SELECT name FROM employees WHERE department_id = 1
UNION
SELECT name FROM employees WHERE department_id = 2;

-- 合并两个查询结果（不去重）
SELECT name FROM employees WHERE salary > 8000
UNION ALL
SELECT name FROM employees WHERE status = 'active';
```

### 5.2 INTERSECT

```sql
-- 求两个查询的交集
SELECT name FROM employees WHERE department_id = 1
INTERSECT
SELECT name FROM employees WHERE salary > 5000;
```

### 5.3 EXCEPT / MINUS

```sql
-- 求差集（MySQL 不支持，可用 NOT IN）
SELECT name FROM employees WHERE department_id = 1
EXCEPT
SELECT name FROM employees WHERE salary > 5000;

-- MySQL 替代方案
SELECT name FROM employees 
WHERE department_id = 1 
  AND name NOT IN (SELECT name FROM employees WHERE salary > 5000);
```

## 六、PIVOT 和 UNPIVOT

### 6.1 行转列（PIVOT）

```sql
-- 将行数据转换为列
SELECT 
  department_id,
  SUM(CASE WHEN gender = '男' THEN 1 ELSE 0 END) AS male_count,
  SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS female_count
FROM employees
GROUP BY department_id;
```

### 6.2 列转行（UNPIVOT）

```sql
-- 将列数据转换为行
SELECT 
  department_id,
  'male' AS gender,
  male_count AS count
FROM department_gender_stats
UNION ALL
SELECT 
  department_id,
  'female' AS gender,
  female_count AS count
FROM department_gender_stats;
```

## 七、窗口帧

### 7.1 行范围

```sql
-- 计算移动总和（前2行+当前行+后2行）
SELECT 
  date,
  sales,
  SUM(sales) OVER (
    ORDER BY date 
    ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING
  ) AS moving_total
FROM daily_sales;
```

### 7.2 值范围

```sql
-- 计算累计销售（到当前日期为止）
SELECT 
  date,
  sales,
  SUM(sales) OVER (
    ORDER BY date 
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_sales
FROM daily_sales;
```

## 八、高级过滤技巧

### 8.1 条件聚合

```sql
-- 统计各状态的订单数量
SELECT 
  COUNT(*) AS total_orders,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_count,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_count,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled_count
FROM orders;
```

### 8.2 NULL 安全比较

```sql
-- NULL 值处理
SELECT 
  name,
  COALESCE(email, '未填写') AS email,
  IFNULL(phone, '无') AS phone
FROM users;
```

### 8.3 正则表达式

```sql
-- 正则匹配邮箱格式
SELECT * FROM users 
WHERE email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
```

## 九、实战案例

### 9.1 案例一：查询每个用户的最近订单

```sql
WITH user_orders AS (
  SELECT 
    user_id,
    order_id,
    order_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) AS rn
  FROM orders
)
SELECT * FROM user_orders WHERE rn = 1;
```

### 9.2 案例二：计算月度同比增长率

```sql
WITH monthly_sales AS (
  SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(total_amount) AS sales
  FROM orders
  GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT 
  month,
  sales,
  LAG(sales) OVER (ORDER BY month) AS prev_month_sales,
  ROUND((sales - LAG(sales) OVER (ORDER BY month)) / LAG(sales) OVER (ORDER BY month) * 100, 2) AS growth_rate
FROM monthly_sales;
```

### 9.3 案例三：查询连续7天登录的用户

```sql
WITH user_logins AS (
  SELECT 
    user_id,
    login_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn,
    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS group_key
  FROM user_login
)
SELECT user_id 
FROM user_logins 
GROUP BY user_id, group_key 
HAVING COUNT(*) >= 7;
```

## 十、性能考虑

### 10.1 子查询 vs JOIN

```sql
-- 不推荐：相关子查询，效率低
SELECT name FROM employees e
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.employee_id = e.id
);

-- 推荐：使用 JOIN
SELECT DISTINCT e.name 
FROM employees e
JOIN orders o ON e.id = o.employee_id;
```

### 10.2 LIMIT 在子查询中的应用

```sql
-- 先限制再 JOIN，提高性能
SELECT * FROM (
  SELECT * FROM large_table LIMIT 1000
) t
JOIN other_table o ON t.id = o.id;
```

## 总结

SQL 高级查询主要包括：

1. **JOIN** - 多表关联查询
2. **子查询** - 嵌套查询
3. **窗口函数** - 排名、聚合、移动计算
4. **CTE** - 公共表表达式，支持递归
5. **集合操作** - UNION、INTERSECT、EXCEPT
6. **PIVOT/UNPIVOT** - 行列转换

掌握这些高级技巧可以处理复杂的数据分析需求。