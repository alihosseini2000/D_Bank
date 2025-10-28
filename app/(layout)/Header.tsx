'use client';

import React from 'react';
import { Moon, Sun, Globe, Menu, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme, setLanguage, disconnectWallet } from '@/store/slices/userSlice';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';

export function Header() {
  const dispatch = useDispatch();
  const { theme, language, isConnected, address } = useSelector((state: RootState) => state.user);
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { isConnected: wagmiConnected } = useAccount();

  // همگام‌سازی Wagmi با Redux
  React.useEffect(() => {
    if (wagmiConnected && !isConnected) {
      // بعداً از لاگین می‌گیریم
    }
  }, [wagmiConnected, isConnected]);

  const handleLogout = () => {
    disconnect();
    dispatch(disconnectWallet());
    router.push('/login');
  };

  const handleNavigate = (page: any) => {
    router.push(`/${page}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } transition-colors duration-300`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-white">DF</span>
            </div>
            <span className="text-xl hidden sm:inline">DeFi Bank</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 bg-cyan-500 text-white border-0">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => dispatch(setLanguage('en'))}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch(setLanguage('es'))}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch(setLanguage('zh'))}>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {isConnected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      {address ? address.slice(0, 2).toUpperCase() : 'JD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleNavigate('profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('transactions')}>
                  Transactions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}