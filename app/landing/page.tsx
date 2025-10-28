'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Zap, Lock, TrendingUp, Coins, Vote } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    { icon: Shield, title: 'Secure & Trustless', description: 'Non-custodial solutions with military-grade encryption' },
    { icon: Zap, title: 'Lightning Fast', description: 'Execute trades and transfers in milliseconds' },
    { icon: Lock, title: 'Multi-Chain', description: 'Bridge assets across multiple blockchain networks' },
    { icon: TrendingUp, title: 'Advanced Trading', description: 'Futures, options, and perpetual contracts' },
    { icon: Coins, title: 'High Yields', description: 'Earn competitive APY on your deposits' },
    { icon: Vote, title: 'Community Governed', description: 'Vote on proposals and shape the future' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGJsb2NrY2hhaW4lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTYyNzM5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Blockchain background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <span className="text-3xl font-bold">DF</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              The Future of Decentralized Finance
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Trade, lend, borrow, and earn with the most advanced DeFi platform. Secure, fast, and transparent.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
                onClick={() => router.push('/login')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  $2.5B+
                </div>
                <div className="text-gray-400 text-sm">Total Value Locked</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  500K+
                </div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-gray-400 text-sm">Supported Chains</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose DeFi Bank</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of financial services with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-500" />
                      </div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your DeFi Journey?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users already earning, trading, and building wealth on DeFi Bank
            </p>
            <Button
              size="lg"
              className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold"
              onClick={() => router.push('/login')}
            >
              Launch App
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}