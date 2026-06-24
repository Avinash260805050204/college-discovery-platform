"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../../store/use-store';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
import { Terminal, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    login(username, email);
    setIsLoading(false);
    router.push('/saved');
  };

  return (
    <div className="flex-1 bg-cyber-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <Card glow="cyan" className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center border-b border-cyber-card-border pb-4">
            <Cpu className="w-8 h-8 text-neon-cyan" />
            <h2 className="font-sans text-lg font-black text-cyber-fg tracking-wide uppercase">
              Sign In to Your Account
            </h2>
            <p className="text-[10px] text-cyber-text-secondary font-mono">
              Enter your credentials to access saved colleges
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-cyber-text-secondary uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. AlexCarter"
                className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2.5 text-xs text-cyber-fg placeholder-zinc-500 focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-cyber-text-secondary uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2.5 text-xs text-cyber-fg placeholder-zinc-500 focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <Button variant="cyan" size="md" type="submit" disabled={isLoading} className="mt-2 w-full flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="border-t border-cyber-card-border pt-4 text-center">
            <p className="font-mono text-[10px] text-cyber-text-secondary">
              New to CollegeVerse?{' '}
              <Link href="/signup" className="text-neon-cyan hover:underline uppercase">
                Create an Account
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
