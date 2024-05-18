import {
  getDefaultConfig,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  base,
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
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    scrollSepolia,
    optimism,
    sepolia,
    base,
  ],
  ssr: true,
});
