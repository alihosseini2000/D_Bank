'use client';

import { LayoutDashboard, Repeat, ArrowLeftRight, TrendingUp, Landmark, Coins, Vote, Receipt, HelpCircle, User, ShieldCheck, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const { theme, isConnected, isAdmin } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'swap', label: 'Swap', icon: Repeat },
    { id: 'bridge', label: 'Bridge', icon: ArrowLeftRight },
    { id: 'futures', label: 'Futures', icon: TrendingUp },
    { id: 'lending', label: 'Lending', icon: Landmark },
    { id: 'deposit', label: 'Deposit', icon: Coins },
    { id: 'governance', label: 'Governance', icon: Vote },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const accountItems = [
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (isAdmin) {
    accountItems.push({ id: 'admin', label: 'Admin', icon: ShieldCheck });
  }

  if (!isConnected) return null;

  return (
    <>
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 w-64 ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        } border-r overflow-hidden`}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => router.push(`/${item.id}`)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>

            <Separator />

            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => router.push(`/${item.id}`)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}