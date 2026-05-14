# Git 高级操作指南

## 一、变基（Rebase）

### 1.1 什么是变基

变基是将一个分支的提交移动到另一个分支的顶端，使提交历史更加线性和清晰。

### 1.2 基本语法

```bash
# 将当前分支变基到 target-branch
git rebase <target-branch>

# 在其他分支上执行变基
git rebase <target-branch> <feature-branch>
```

### 1.3 示例：将 feature 分支变基到 main

```bash
# 切换到 feature 分支
git checkout feature

# 变基到 main 分支
git rebase main
```

### 1.4 交互式变基

```bash
# 对最近 3 个提交进行交互式变基
git rebase -i HEAD~3

# 对指定提交范围进行交互式变基
git rebase -i <start-commit>..<end-commit>
```

### 1.5 交互式变基命令

| 命令 | 说明 |
|------|------|
| `pick` | 保留该提交（默认） |
| `reword` | 修改提交信息 |
| `edit` | 编辑该提交（修改代码） |
| `squash` | 将该提交合并到前一个提交 |
| `fixup` | 将该提交合并到前一个提交，但丢弃提交信息 |
| `drop` | 删除该提交 |
| `exec` | 在该提交后执行指定命令 |

### 1.6 变基 vs 合并

| 操作 | 优点 | 缺点 |
|------|------|------|
| **Merge** | 保留完整历史，安全 | 产生合并提交，历史复杂 |
| **Rebase** | 历史线性清晰 | 改变提交历史，可能冲突 |

### 1.7 变基的黄金法则

> **永远不要对已经推送到公共仓库的提交执行变基！**

### 1.8 解决变基冲突

```bash
# 变基过程中遇到冲突
# 1. 手动解决冲突
# 2. 标记冲突已解决
git add <conflicted-file>

# 3. 继续变基
git rebase --continue

# 或者跳过当前提交
git rebase --skip

# 或者完全放弃变基
git rebase --abort
```

## 二、撤销操作

### 2.1 撤销工作区修改

```bash
# 撤销单个文件
git checkout -- <file>

# 撤销所有文件
git checkout .
```

### 2.2 撤销暂存区修改

```bash
# 将暂存区文件放回工作区
git reset HEAD <file>

# 撤销所有暂存
git reset HEAD
```

### 2.3 撤销提交（修改最后一次提交）

```bash
# 修改最后一次提交的信息
git commit --amend

# 修改最后一次提交的内容（先修改文件，再执行）
git add <file>
git commit --amend --no-edit
```

### 2.4 撤销已推送的提交

```bash
# 创建一个新提交来撤销指定提交
git revert <commit-hash>

# 推送到远程
git push origin <branch>
```

### 2.5 硬重置（危险操作）

```bash
# 完全删除最近的提交（本地）
git reset --hard HEAD~1

# 如果已推送，强制覆盖远程（非常危险！）
git push origin <branch> --force
```

## 三、分支管理

### 3.1 创建和切换分支

```bash
# 创建分支
git branch <branch-name>

# 创建并切换分支
git checkout -b <branch-name>

# 使用新语法创建并切换
git switch -c <branch-name>
```

### 3.2 查看分支

```bash
# 查看本地分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 查看分支合并状态
git branch --merged
git branch --no-merged
```

### 3.3 删除分支

```bash
# 删除本地分支
git branch -d <branch-name>

# 强制删除未合并的分支
git branch -D <branch-name>

# 删除远程分支
git push origin --delete <branch-name>
```

### 3.4 合并分支

```bash
# 普通合并
git merge <branch-name>

# 快进合并（无冲突时）
git merge --ff <branch-name>

# 禁止快进合并（始终创建合并提交）
git merge --no-ff <branch-name>
```

## 四、远程操作

### 4.1 添加远程仓库

```bash
git remote add origin <remote-url>
```

### 4.2 查看远程仓库

```bash
git remote -v
```

### 4.3 拉取远程更新

```bash
# 拉取并合并
git pull origin <branch>

# 只拉取不合并
git fetch origin
```

### 4.4 推送本地分支

```bash
git push origin <branch>

# 设置上游分支（首次推送）
git push -u origin <branch>
```

### 4.5 跟踪远程分支

```bash
git checkout --track origin/<branch-name>
```

## 五、标签管理

### 5.1 创建标签

```bash
# 创建轻量标签
git tag <tag-name>

# 创建附注标签（推荐）
git tag -a <tag-name> -m "标签说明"

# 为指定提交创建标签
git tag -a <tag-name> <commit-hash>
```

### 5.2 查看标签

```bash
git tag

# 查看标签详情
git show <tag-name>
```

### 5.3 推送标签

```bash
# 推送单个标签
git push origin <tag-name>

# 推送所有标签
git push origin --tags
```

### 5.4 删除标签

```bash
# 删除本地标签
git tag -d <tag-name>

# 删除远程标签
git push origin --delete <tag-name>
```

## 六、暂存操作（Stash）

### 6.1 暂存工作区

```bash
# 暂存当前工作区
git stash

# 暂存并添加说明
git stash save "暂存说明"
```

### 6.2 查看暂存列表

```bash
git stash list
```

### 6.3 恢复暂存

```bash
# 恢复最近一次暂存并保留暂存记录
git stash apply

# 恢复指定暂存
git stash apply stash@{n}

# 恢复并删除暂存记录
git stash pop
```

### 6.4 删除暂存

```bash
# 删除最近一次暂存
git stash drop

# 删除指定暂存
git stash drop stash@{n}

# 清空所有暂存
git stash clear
```

## 七、日志查看

### 7.1 基础日志

```bash
# 查看提交历史
git log

# 简洁格式
git log --oneline

# 显示图形化分支
git log --graph

# 显示详细信息（包括修改内容）
git log -p
```

### 7.2 自定义格式

```bash
# 自定义输出格式
git log --format="%h %an %ar %s"

# 显示最近 n 条提交
git log -n 5

# 显示指定作者的提交
git log --author="username"

# 按时间范围筛选
git log --since="2024-01-01" --until="2024-01-31"
```

## 八、文件历史

### 8.1 查看文件修改历史

```bash
# 查看文件的所有修改记录
git log --follow <file>

# 查看文件的具体修改内容
git blame <file>
```

### 8.2 恢复历史版本

```bash
# 恢复文件到指定版本
git checkout <commit-hash> -- <file>
```

## 九、配置管理

### 9.1 查看配置

```bash
# 查看所有配置
git config --list

# 查看全局配置
git config --global --list

# 查看仓库配置
git config --local --list
```

### 9.2 设置配置

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 设置默认编辑器
git config --global core.editor "vim"

# 设置自动换行
git config --global core.autocrlf true
```

## 十、实用技巧

### 10.1 别名设置

```bash
# 设置别名
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

### 10.2 清理无用文件

```bash
# 清理未跟踪文件
git clean -f

# 清理未跟踪文件和目录
git clean -fd

# 预览将要删除的文件
git clean -n
```

### 10.3 查找大型文件

```bash
# 查找仓库中最大的文件
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | grep -v ^blob | sort -k3nr | head -20
```

### 10.4 修复 detached HEAD

```bash
# 创建新分支保存当前状态
git checkout -b <new-branch>
```

## 十一、工作流推荐

### 11.1 Git Flow

```bash
# 创建功能分支
git checkout -b feature/xxx develop

# 完成功能后合并
git checkout develop
git merge --no-ff feature/xxx

# 创建发布分支
git checkout -b release/1.0.0 develop

# 发布完成后合并到 main 和 develop
git checkout main
git merge --no-ff release/1.0.0
git tag -a 1.0.0

git checkout develop
git merge --no-ff release/1.0.0
```

### 11.2 GitHub Flow

```bash
# 从 main 创建功能分支
git checkout -b feature/xxx

# 开发完成后推送到远程
git push origin feature/xxx

# 创建 Pull Request

# 审查通过后合并到 main
```

## 总结

Git 的高级操作可以帮助您更好地管理代码历史和团队协作。掌握变基、撤销、分支管理等技能，可以让您的开发工作更加高效和专业。