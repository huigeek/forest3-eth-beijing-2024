import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import dotenv from "dotenv";
// 加载环境变量
dotenv.config();

// 确保 COINMARKETCAP_API_KEY 已定义
// if (!process.env.COINMARKETCAP_API_KEY) {
//   console.error("COINMARKETCAP_API_KEY is not defined in the environment variables.");
// }
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY || "";
const LOCAL_ACCOUNT_PRIVATE_KEY = process.env.LOCAL_ACCOUNT_PRIVATE_KEY || "";
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
      coinbase: "ETH",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    Sepolia: {
      url: "https://eth-sepolia-public.unifra.io",
      chainId: 11155111,
      coinbase: "ETH",
      accounts: [LOCAL_ACCOUNT_PRIVATE_KEY],
    },
    // hardhat: {
    // If you want to do some forking, uncomment this
    // forking: {
    //   url: MAINNET_RPC_URL
    // },
    // chainId: 31337,
    // },
    localhost: {
      chainId: 31337,
      accounts: [LOCAL_ACCOUNT_PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
