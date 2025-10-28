import { WagmiConfig, createConfig, mainnet, bsc, polygon } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'DeFi Bank',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, bsc, polygon],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}