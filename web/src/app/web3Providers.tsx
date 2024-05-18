"use client";
import {
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { WagmiConfig } from "~/config/wagmi";

const queryClient = new QueryClient();

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={WagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}
