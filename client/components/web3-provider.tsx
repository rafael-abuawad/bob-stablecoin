"use client";

import { WagmiProvider, createConfig } from "wagmi";
import { anvil } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    ssr: true,
    chains: [anvil],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "BOB Stablecoin",
    appDescription:
      "Overcollateralized algorithmic stablecoin pegged to the BOB backed by Ether. Made with Vyper 🐍",
    appUrl: "https://github.com/rafael-abuawad/bob-stablecoin",
    appIcon: "https://family.co/logo.png",
  }),
);

const queryClient = new QueryClient();

type Web3ProviderProps = React.HTMLAttributes<HTMLDivElement>;

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
