#!/usr/bin/env python3
import subprocess
import sys
import os

def run_command(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

def main():
    os.chdir(r'e:\note\my-blog')
    
    print("正在查找有Co-Authored-By的提交...")
    
    # 获取所有提交哈希
    code, log_out, _ = run_command('git log --pretty=format:"%h"')
    commits = log_out.split()
    
    print(f"找到 {len(commits)} 个提交")
    
    # 检查每个提交
    commits_to_fix = []
    for commit in commits:
        code, show_out, _ = run_command(f'git show {commit}')
        if 'Co-Authored-By:' in show_out:
            commits_to_fix.append(commit)
            print(f"找到需要修复的提交: {commit}")
    
    if not commits_to_fix:
        print("没有需要修复的提交")
        return
    
    print(f"\n共需要修复 {len(commits_to_fix)} 个提交")
    
    # 创建一个临时脚本用于git filter-branch
    filter_script = r'''
import sys

for line in sys.stdin:
    if not line.strip().startswith('Co-Authored-By:'):
        sys.stdout.write(line)
'''
    
    with open(r'e:\note\my-blog\filter-msg.py', 'w', encoding='utf-8') as f:
        f.write(filter_script)
    
    print("\n正在使用git filter-branch重写提交历史...")
    
    filter_cmd = '''
git filter-branch -f --msg-filter "python e:\\\\note\\\\my-blog\\\\filter-msg.py" -- --all
'''
    
    code, out, err = run_command(filter_cmd)
    print(out)
    if err:
        print(err)
    
    print("\n清理备份引用...")
    run_command('git update-ref -d refs/original/refs/heads/main')
    
    print("\n完成！现在强制推送...")
    code, out, err = run_command('git push origin main --force')
    print(out)
    if err:
        print(err)

if __name__ == '__main__':
    main()
