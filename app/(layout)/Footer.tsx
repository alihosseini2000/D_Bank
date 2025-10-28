"use client"

import { Twitter, Github, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface FooterProps {
  theme: 'light' | 'dark';
}

export function Footer() {

  const { theme } = useSelector((state: RootState) => state.user);

  return (
    <footer
      className={`border-t mt-auto ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white">DF</span>
              </div>
              <span className="text-lg">DeFi Bank</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              The future of decentralized finance.
            </p>
          </div>

          <div>
            <h3 className="mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-cyan-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Community</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t text-center ${
            theme === 'dark'
              ? 'border-gray-800 text-gray-400'
              : 'border-gray-200 text-gray-600'
          }`}
        >
          <p>© 2025 DeFi Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
