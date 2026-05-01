
import os
import shutil
import subprocess

git_dir = '.git'
if os.path.exists(git_dir):
    shutil.rmtree(git_dir)
    print(f'Deleted {git_dir}')

subprocess.run(['git', 'init'], check=True)
print('Git repository reinitialized')

