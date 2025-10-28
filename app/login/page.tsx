"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Wallet, Mail, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { connectWallet } from '@/store/slices/userSlice';
import { saveUser } from '@/lib/mongodb';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface LoginPageProps {
    onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFACode, setTwoFACode] = useState('');
    const [showTwoFA, setShowTwoFA] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter()

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setShowTwoFA(true);
    };

    const handleTwoFASubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    const handleConnect = async (address: string) => {
        dispatch(connectWallet(address));
        await saveUser(address); // ذخیره در دیتابیس
        router.push('/dashboard');
    };

    const handleWalletConnect = () => {
        onLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1477039181047-efb4357d01bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBuZXR3b3JrfGVufDF8fHx8MTc2MTYxOTAxNXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Security background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md mx-auto"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                            <span className="text-2xl text-white">DF</span>
                        </div>
                        <h1 className="text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to access your DeFi dashboard</p>
                    </div>

                    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Sign In</CardTitle>
                            <CardDescription className="text-gray-400">
                                Choose your preferred authentication method
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="wallet" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="wallet">
                                        <Wallet className="h-4 w-4 mr-2" />
                                        Wallet
                                    </TabsTrigger>
                                    <TabsTrigger value="email">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="wallet" className="space-y-4">
                                    <Alert className="bg-cyan-500/10 border-cyan-500/50 text-cyan-500">
                                        <Shield className="h-4 w-4" />
                                        <AlertDescription>
                                            Connect your wallet to access your account securely
                                        </AlertDescription>
                                    </Alert>

                                    <ConnectButton.Custom>
                                        {({ account, chain, openConnectModal, mounted }) => {
                                            const ready = mounted;
                                            const connected = ready && account && chain;

                                            if (connected) {
                                                // ذخیره در Redux + DB
                                                dispatch(connectWallet(account.address));
                                                saveUser(account.address).then(() => {
                                                    router.push('/dashboard');
                                                });
                                            }

                                            return (
                                                <Button
                                                    onClick={openConnectModal}
                                                    disabled={!ready}
                                                    className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                                >
                                                    <Wallet className="mr-2 h-5 w-5" />
                                                    {connected ? 'Connected' : 'Connect Wallet'}
                                                </Button>
                                            );
                                        }}
                                    </ConnectButton.Custom>

                                    {/* <div className="space-y-3">
                                        <Button
                                            className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                                            onClick={handleWalletConnect}
                                        >
                                            <Wallet className="mr-2 h-5 w-5" />
                                            MetaMask
                                        </Button>
                                        <Button
                                            className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                            onClick={handleWalletConnect}
                                        >
                                            <Wallet className="mr-2 h-5 w-5" />
                                            WalletConnect
                                        </Button>
                                        <Button
                                            className="w-full bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                                            onClick={handleWalletConnect}
                                        >
                                            <Wallet className="mr-2 h-5 w-5" />
                                            Coinbase Wallet
                                        </Button>
                                    </div> */}
                                </TabsContent>

                                <TabsContent value="email" className="space-y-4">
                                    {!showTwoFA ? (
                                        <form onSubmit={handleEmailLogin} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-gray-200">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="bg-gray-800 border-gray-700 text-white"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-gray-200">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="bg-gray-800 border-gray-700 text-white"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="remember" />
                                                    <label
                                                        htmlFor="remember"
                                                        className="text-sm text-gray-400 cursor-pointer"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                                <a href="#" className="text-sm text-cyan-500 hover:text-cyan-400">
                                                    Forgot password?
                                                </a>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                            >
                                                Continue
                                            </Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleTwoFASubmit} className="space-y-4">
                                            <Alert className="bg-yellow-500/10 border-yellow-500/50 text-yellow-500">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>
                                                    Two-factor authentication is required for your security
                                                </AlertDescription>
                                            </Alert>

                                            <div className="space-y-2">
                                                <Label htmlFor="twofa" className="text-gray-200">
                                                    Authentication Code
                                                </Label>
                                                <Input
                                                    id="twofa"
                                                    type="text"
                                                    placeholder="Enter 6-digit code"
                                                    value={twoFACode}
                                                    onChange={(e) => setTwoFACode(e.target.value)}
                                                    maxLength={6}
                                                    required
                                                    className="bg-gray-800 border-gray-700 text-white text-center text-2xl tracking-widest"
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => setShowTwoFA(false)}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="flex-1 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                                >
                                                    Verify & Sign In
                                                </Button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="text-center text-sm text-gray-400">
                                        Don't have an account?{' '}
                                        <a href="#" className="text-cyan-500 hover:text-cyan-400">
                                            Sign up
                                        </a>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
