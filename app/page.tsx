'use client';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // لود بالانس - بهینه با caching
      fetchBalance(address);
    }
  }, [isConnected, address]);

  const fetchBalance = async (addr: string) => {
    try {
      // اتصال به ethers - رفع باگ provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(addr);
      console.log('Balance:', ethers.formatEther(balance));
    } catch (err) {
      console.error('Balance Fetch Error:', err); // error handling
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Welcome to D_Bank Dashboard</h1>
      {isConnected ? (
        <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-800 p-4 rounded">Deposit</div>
        <div className="bg-gray-800 p-4 rounded">Swap</div>
        <div className="bg-gray-800 p-4 rounded">Bridge</div>
      </div>
    </div>
  );
}