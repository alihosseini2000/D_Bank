import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/SidebarNav';
import { Footer } from './components/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AdminPage } from './components/pages/AdminPage';
import { SwapPage } from './components/pages/SwapPage';
import { BridgePage } from './components/pages/BridgePage';
import { FuturesPage } from './components/pages/FuturesPage';
import { LendingPage } from './components/pages/LendingPage';
import { DepositPage } from './components/pages/DepositPage';
import { GovernancePage } from './components/pages/GovernancePage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { SupportPage } from './components/pages/SupportPage';
import { Toaster } from './components/ui/sonner';

export type PageType = 'landing' | 'login' | 'dashboard' | 'profile' | 'admin' | 'swap' | 'bridge' | 'futures' | 'lending' | 'deposit' | 'governance' | 'transactions' | 'support';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'en' | 'es' | 'zh'>('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage />;
      case 'swap':
        return <SwapPage />;
      case 'bridge':
        return <BridgePage />;
      case 'futures':
        return <FuturesPage />;
      case 'lending':
        return <LendingPage />;
      case 'deposit':
        return <DepositPage />;
      case 'governance':
        return <GovernancePage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'support':
        return <SupportPage />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
    }
  };

  const isLandingOrLogin = currentPage === 'landing' || currentPage === 'login';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {!isLandingOrLogin && (
        <Header
          isLoggedIn={isLoggedIn}
          theme={theme}
          language={language}
          onThemeToggle={toggleTheme}
          onLanguageChange={setLanguage}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      <div className="flex">
        {!isLandingOrLogin && (
          <Sidebar
            isOpen={sidebarOpen}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            theme={theme}
            isAdmin={true}
          />
        )}

        <main className={`flex-1 ${!isLandingOrLogin ? 'pt-16' : ''} transition-all duration-300`}>
          {renderPage()}
        </main>
      </div>

      {!isLandingOrLogin && <Footer theme={theme} />}
      
      <Toaster theme={theme} />
    </div>
  );
}

export default App;
