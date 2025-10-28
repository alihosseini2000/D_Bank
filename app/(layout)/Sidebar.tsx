import {
  LayoutDashboard,
  Repeat,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  Coins,
  Vote,
  Receipt,
  HelpCircle,
  User,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PageType } from '../App';

interface SidebarProps {
  isOpen: boolean;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  theme: 'light' | 'dark';
  isAdmin?: boolean;
}

export function Sidebar({ isOpen, currentPage, onNavigate, theme, isAdmin }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'swap' as PageType, label: 'Swap', icon: Repeat },
    { id: 'bridge' as PageType, label: 'Bridge', icon: ArrowLeftRight },
    { id: 'futures' as PageType, label: 'Futures', icon: TrendingUp },
    { id: 'lending' as PageType, label: 'Lending', icon: Landmark },
    { id: 'deposit' as PageType, label: 'Deposit', icon: Coins },
    { id: 'governance' as PageType, label: 'Governance', icon: Vote },
    { id: 'transactions' as PageType, label: 'Transactions', icon: Receipt },
    { id: 'support' as PageType, label: 'Support', icon: HelpCircle },
  ];

  const accountItems = [
    { id: 'profile' as PageType, label: 'Profile', icon: User },
  ];

  if (isAdmin) {
    accountItems.push({ id: 'admin' as PageType, label: 'Admin', icon: ShieldCheck });
  }

  return (
    <>
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-0 lg:w-16'
        } ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        } border-r overflow-hidden`}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20'
                        : ''
                    }`}
                    onClick={() => onNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                );
              })}
            </div>

            <Separator />

            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20'
                        : ''
                    }`}
                    onClick={() => onNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        {isOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex absolute top-4 -right-3 h-6 w-6 rounded-full border bg-background"
            onClick={() => {}}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => {}}
        />
      )}
    </>
  );
}
