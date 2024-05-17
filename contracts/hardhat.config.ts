import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import dotenv from "dotenv";
// 加载环境变量
dotenv.config();

// 确保 COINMARKETCAP_API_KEY 已定义
if (!process.env.COINMARKETCAP_API_KEY) {
  console.error("COINMARKETCAP_API_KEY is not defined in the environment variables.");
}
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
