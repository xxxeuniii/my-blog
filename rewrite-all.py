#!/usr/bin/env python3
import subprocess
import sys
import os

def run_command(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    return result.returncode, result.stdout, result.stderr

def main():
    os.chdir(r'e:\note\my-blog')
    
    # 提交信息映射
    commit_msg_map = {
        '0318': '添加项目基础配置',
        '0312 update': '更新项目依赖',
        '1': '更新配置文件',
        '66': '调整部署配置',
        'no message': '修复小问题',
        '哎呀': '完善文档结构',
        '不改了': '完成功能开发',
        '啊啊啊啊啊啊啊啊': '修复构建问题',
        '11111111111111111': '更新部署脚本',
        'angular': '添加Angular学习笔记',
        '加个基础文件': '添加项目基础文件',
        '改下相对路径': '调整文件路径配置',
        '改下路径': '修复路径问题',
        'node改成20': '升级Node.js版本到20',
        '优化': '优化项目配置',
        '这个': '完善代码结构',
    }
    
    print("正在获取所有提交...")
    code, log_out, _ = run_command('git log --reverse --pretty=format:"%h|%s"')
    commits = log_out.strip().split('\n')
    
    print(f"找到 {len(commits)} 个提交")
    
    # 创建一个新的临时分支
    print("\n正在创建新的干净提交历史...")
    run_command('git checkout --orphan new-main')
    run_command('git reset --hard')
    
    # 按顺序重放提交
    for i, line in enumerate(commits):
        if not line:
            continue
            
        parts = line.split('|', 1)
        if len(parts) != 2:
            continue
            
        old_hash, old_msg = parts
        print(f"\n处理提交 {i+1}/{len(commits)}: {old_hash} - {old_msg}")
        
        # 检出该提交的内容
        code, _, _ = run_command(f'git checkout {old_hash} -- .')
        if code != 0:
            print(f"检出失败，跳过")
            continue
            
        # 添加所有更改
        run_command('git add -A')
        
        # 确定新的提交信息
        new_msg = commit_msg_map.get(old_msg, old_msg)
        
        # 提交
        env = os.environ.copy()
        env['GIT_COMMITTER_NAME'] = 'xxxeuniii'
        env['GIT_COMMITTER_EMAIL'] = 'your-email@example.com'
        env['GIT_AUTHOR_NAME'] = 'xxxeuniii'
        env['GIT_AUTHOR_EMAIL'] = 'your-email@example.com'
        
        commit_cmd = f'git commit -m "{new_msg}" --no-verify'
        result = subprocess.run(commit_cmd, shell=True, env=env, capture_output=True, text=True, encoding='utf-8', errors='ignore')
        
        if result.returncode != 0:
            print(f"提交可能为空，尝试再次提交...")
            run_command('git commit -m "Update" --allow-empty --no-verify')
    
    print("\n完成！新的提交历史已创建在 new-main 分支")
    
    # 替换main分支
    print("\n正在替换main分支...")
    run_command('git branch -M main old-main')
    run_command('git branch -M new-main main')
    
    print("\n现在强制推送到远程...")
    code, out, err = run_command('git push origin main --force')
    print(out)
    if err:
        print(err)
    
    print("\n删除旧的main分支...")
    run_command('git branch -D old-main')
    
    print("\n全部完成！")

if __name__ == '__main__':
    main()
