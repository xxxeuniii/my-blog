# DApp 基础

DApp（Decentralized Application，去中心化应用）是基于区块链技术构建的应用程序。

## 一、DApp 核心概念

### 什么是 DApp

DApp 是运行在去中心化网络上的应用程序，其核心逻辑通过智能合约实现，数据存储在分布式网络中。

### 核心特征

- **去中心化** - 无需中心化服务器
- **智能合约** - 业务逻辑写在链上，自动执行
- **用户主权** - 用户通过私钥控制资产和数据
- **开源透明** - 代码和规则公开可查
- **不可篡改** - 数据一旦上链无法修改

### 传统 App vs DApp

| 对比 | 传统 App | DApp |
|------|----------|------|
| 数据存储 | 中心化服务器 | 区块链 |
| 控制权 | 平台方 | 用户私钥 |
| 停机风险 | 服务器故障 | 节点网络维护 |
| 信任机制 | 平台信用 | 密码学+共识算法 |
| 典型案例 | 微信、支付宝 | Uniswap、OpenSea |

## 二、技术架构

### 架构图

```
┌─────────────────────────────────────────────────┐
│                  前端界面                        │
│            (React/Vue + ethers.js)             │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               钱包连接层                        │
│            (MetaMask/WalletConnect)            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              智能合约层                         │
│           (Solidity + Hardhat)                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              区块链网络层                       │
│         (以太坊 / Solana / Polygon)             │
└─────────────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React、Vue |
| 区块链交互 | ethers.js、web3.js、wagmi |
| 智能合约 | Solidity（以太坊）、Rust（Solana） |
| 开发框架 | Hardhat、Truffle、Foundry |
| 钱包 | MetaMask、WalletConnect |
| 存储 | IPFS、Arweave |
| 索引 | The Graph |

## 三、智能合约

### 简单示例（Solidity）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    uint256 private value;

    // 存储数据
    function store(uint256 newValue) public {
        value = newValue;
    }

    // 读取数据
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

### 部署流程

```bash
# 1. 编译合约
npx hardhat compile

# 2. 部署到测试网
npx hardhat run scripts/deploy.js --network sepolia

# 3. 部署到主网
npx hardhat run scripts/deploy.js --network mainnet
```

## 四、前端集成

### 连接钱包

```javascript
// 使用 ethers.js
import { ethers } from 'ethers'

async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('请安装 MetaMask')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const accounts = await provider.send('eth_requestAccounts', [])
  return accounts[0]
}
```

### 调用合约

```javascript
import { ethers } from 'ethers'

// 合约 ABI
const abi = [
  'function store(uint256 newValue) public',
  'function retrieve() public view returns (uint256)'
]

const contractAddress = '0x123...'

async function callContract() {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(contractAddress, abi, signer)

  // 调用合约方法
  const tx = await contract.store(42)
  await tx.wait()

  // 读取合约数据
  const value = await contract.retrieve()
  console.log(value)
}
```

### 完整示例

```javascript
import { createConfig, http, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Wagmi 配置
const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// 组件中使用
function App() {
  const { connect, connectors } = useConnect()
  const { isConnected, address } = useAccount()
  const { readContract, writeContract } = useContractRead()

  return (
    <div>
      {isConnected ? (
        <div>已连接: {address}</div>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>
          连接钱包
        </button>
      )}
    </div>
  )
}
```

## 五、DApp 类型

### 1. DeFi（去中心化金融）

| 类型 | 说明 | 示例 |
|------|------|------|
| DEX | 去中心化交易所 | Uniswap、SushiSwap |
| 借贷 | 抵押借贷 | Aave、Compound |
| 收益 | 收益优化 | Yearn Finance |
| 稳定币 | 加密资产 | DAI、USDT |

### 2. NFT 市场

```javascript
// ERC-721 NFT 标准
contract NFT is ERC721 {
    uint256 private tokenCount;

    function mint(address to, string memory uri) public {
        tokenCount++;
        _mint(to, tokenCount);
        _setTokenURI(tokenCount, uri);
    }
}
```

### 3. GameFi（链游）

- Play-to-Earn（玩赚）
- 游戏资产 NFT 化
- 道具确权

### 4. DAO（去中心化组织）

```solidity
// 简单投票合约
contract SimpleDAO {
    mapping(address => bool) public voters;
    uint256 public voteCount;
    bool public proposalPassed;

    function vote() public {
        require(voters[msg.sender], "Not eligible");
        voteCount++;
        if (voteCount > 10) {
            proposalPassed = true;
        }
    }
}
```

## 六、常用工具

### 开发框架

| 工具 | 说明 |
|------|------|
| Hardhat | 以太坊开发框架 |
| Truffle | 智能合约开发套件 |
| Foundry | Rust 编写的高速框架 |
| Remix | 在线 Solidity IDE |

### 前端库

| 库 | 说明 |
|------|------|
| ethers.js | 以太坊交互库 |
| web3.js | 区块链交互库 |
| wagmi | React Hooks 库 |
| viem | 轻量级 TypeScript 库 |

### 钱包

| 钱包 | 说明 |
|------|------|
| MetaMask | 浏览器插件钱包 |
| WalletConnect | 钱包连接协议 |
| Rainbow | 移动端钱包 |

## 七、开发流程

### 1. 需求设计

- 明确应用场景（DeFi、NFT、GameFi）
- 设计代币经济模型
- 确定区块链选择

### 2. 智能合约开发

```bash
# 初始化 Hardhat 项目
npm init
npm install --save-dev hardhat
npx hardhat init

# 编写合约
# 编写测试
npx hardhat test

# 安全审计
```

### 3. 前端开发

- 连接钱包
- 合约交互
- UI 界面

### 4. 部署测试网

```bash
# 部署到 Sepolia 测试网
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. 部署主网

```bash
# 部署到主网
npx hardhat run scripts/deploy.js --network mainnet
```

## 八、注意事项

### 1. 安全性

- 智能合约需要安全审计
- 防止重入攻击、整数溢出
- 使用 OpenZeppelin 库

### 2. 用户体验

- 钱包连接失败处理
- 交易_pending_状态处理
- Gas 费用提示

### 3. 成本优化

- 使用 Layer2 降低 Gas
- 批量操作减少交易
- 合理设计存储结构

## 九、总结

DApp 开发核心：
1. 智能合约 - 业务逻辑上链
2. 前端集成 - ethers.js/wagmi
3. 钱包连接 - MetaMask
4. 区块链选择 - 以太坊、Polygon等

与传统 App 最大区别：用户通过私钥掌控资产和数据。