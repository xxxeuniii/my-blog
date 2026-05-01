#!/usr/bin/env python3
import subprocess
import sys
import os

def run_command(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

def main():
    os.chdir(r'e:\note\my-blog')
    
    print("正在重写提交历史，移除Co-Authored-By信息...")
    
    # 使用git filter-branch来移除所有Co-Authored-By
    filter_cmd = '''
git filter-branch -f --msg-filter '
    grep -v "^Co-Authored-By:"
' HEAD
'''
    
    code, out, err = run_command(filter_cmd)
    print(out)
    if err:
        print(err)
    
    print("\n提交历史重写完成！")

if __name__ == '__main__':
    main()
