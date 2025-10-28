// app/(providers)/Providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, bsc, polygon } from 'wagmi/chains';
import ReduxProvider from '@/store/ReduxProvider';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'D_Bank',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, bsc, polygon],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
}