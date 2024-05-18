import {
  getDefaultConfig,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  injectedWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  base,
  hardhat,
  optimism,
  scrollSepolia,
  sepolia,
} from "wagmi/chains";

const { wallets } = getDefaultWallets();
export const WagmiConfig = getDefaultConfig({
  appName: "Forest3",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, injectedWallet, okxWallet],
    },
  ],
  chains: [
    scrollSepolia,
    optimism,
    sepolia,
    base,
    hardhat,
  ],
  ssr: true,
});
