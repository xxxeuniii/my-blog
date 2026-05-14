from langchain_community.document_loaders import TextLoader, DirectoryLoader
import os

def main():
    print("=" * 60)
    print("05_loaders_文档加载器.py")
    print("=" * 60)
    
    # 创建测试目录和文件
    os.makedirs("docs", exist_ok=True)
    
    # 创建测试文档
    with open("docs/knowledge1.txt", "w", encoding="utf-8") as f:
        f.write("LangChain 是一个用于构建 LLM 应用的框架。")
    
    with open("docs/knowledge2.txt", "w", encoding="utf-8") as f:
        f.write("LangChain 支持多种 LLM，包括 OpenAI、Anthropic 等。")
    
    print("1. 加载单个文件")
    print("-" * 40)
    loader = TextLoader("docs/knowledge1.txt", encoding="utf-8")
    documents = loader.load()
    print(f"加载了 {len(documents)} 个文档")
    print("文档内容:")
    print(documents[0].page_content)
    print()
    
    print("2. 加载目录下所有文件")
    print("-" * 40)
    loader = DirectoryLoader("docs", glob="*.txt")
    all_docs = loader.load()
    print(f"加载了 {len(all_docs)} 个文档")
    for i, doc in enumerate(all_docs):
        print(f"文档 {i+1}: {doc.page_content}")
    print()
    
    # 清理测试文件
    os.remove("docs/knowledge1.txt")
    os.remove("docs/knowledge2.txt")
    os.rmdir("docs")


if __name__ == "__main__":
    main()