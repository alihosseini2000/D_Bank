'use client';
import { useConnect, useAccount } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function WalletConnect() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="bg-blue-600 px-4 py-2 rounded-lg text-white"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}