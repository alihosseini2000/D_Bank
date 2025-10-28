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
import { PageType } from '../App';

interface HeaderProps {
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  language: string;
  onThemeToggle: () => void;
  onLanguageChange: (lang: 'en' | 'es' | 'zh') => void;
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
  onToggleSidebar: () => void;
}

export function Header({
  isLoggedIn,
  theme,
  language,
  onThemeToggle,
  onLanguageChange,
  onLogout,
  onNavigate,
  onToggleSidebar,
}: HeaderProps) {
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
            onClick={onToggleSidebar}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-white">DF</span>
            </div>
            <span className="text-xl hidden sm:inline">DeFi Bank</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
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
              <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('es')}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('zh')}>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('transactions')}>
                  Transactions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
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
