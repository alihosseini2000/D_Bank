import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // برای caching
import { RainbowKitProvider, getDefaultConfig, useConnectModal } from '@rainbow-me/rainbowkit';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'D_Bank',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet, bsc, polygon],
});

export const metadata: Metadata = {
  title: 'D_Bank - DeFi Platform',
  description: 'Decentralized Banking App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <header className="bg-primary p-4 flex justify-between">
                <h1 className="text-2xl">D_Bank</h1>
                {/* Wallet Connect Button - رفع باگ اتصال */}
                <WalletConnect />
              </header>
              <main className="flex min-h-screen">{children}</main>
              <footer className="bg-primary p-4 text-center">© 2025 D_Bank</footer>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

// کامپوننت ساده والت (بهینه‌شده با error handling)
function WalletConnect() {
  const { connect, error } = useConnectModal(); // از RainbowKit
  if (error) console.error('Wallet Error:', error); // رفع باگ لاگ
  return (
    <button onClick={() => connect()} className="bg-blue-600 px-4 py-2 rounded">
      Connect Wallet
    </button>
  );
}