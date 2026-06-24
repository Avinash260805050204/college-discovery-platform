"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../store/use-store';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, savedColleges, compareList, theme, toggleTheme } = useStore();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Find Colleges', href: '/colleges' },
    { name: 'Compare', href: '/compare', badge: compareList.length > 0 ? compareList.length : undefined },
    { name: 'Saved', href: '/saved', badge: savedColleges.length > 0 ? savedColleges.length : undefined },
  ];

  const activeLinkStyle = "text-neon-cyan border-b-2 border-neon-cyan";
  const inactiveLinkStyle = "text-zinc-400 hover:text-cyber-text-primary hover:border-b-2 hover:border-cyber-text-primary/40";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-cyber-card-border bg-cyber-bg/85 backdrop-blur-md transition-colors duration-300">
      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Cpu className="h-6 w-6 text-neon-cyan group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
              <span className="font-mono text-lg font-black tracking-widest bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                COLLEGEVERSE<span className="text-cyber-fg">_AI</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 h-full">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-xs font-semibold tracking-wider h-16 flex items-center border-b-2 border-transparent transition-all px-2 relative ${
                    isActive ? activeLinkStyle : inactiveLinkStyle
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-neon-purple text-white rounded-full leading-none shadow-[0_0_6px_rgba(124,77,255,0.4)]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-cyber-card-bg border border-cyber-card-border text-zinc-400 hover:text-cyber-text-primary cursor-pointer transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-yellow" /> : <Moon className="w-4 h-4 text-neon-purple" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-zinc-400">
                  User: <span className="text-neon-cyan font-bold">{user?.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-red hover:text-cyber-text-primary hover:bg-accent-red/20 px-3 py-1.5 border border-accent-red/40 rounded transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-neon-cyan hover:bg-neon-cyan/10 px-3.5 py-2 border border-neon-cyan/40 rounded transition-all"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-cyber-card-bg border border-cyber-card-border text-zinc-400 hover:text-cyber-text-primary cursor-pointer transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-yellow" /> : <Moon className="w-4 h-4 text-neon-purple" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded text-zinc-400 hover:text-cyber-text-primary hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyber-card-border bg-cyber-bg/95 backdrop-blur-lg"
          >
            <div className="space-y-1 px-2 pb-4 pt-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-sm font-mono font-semibold rounded ${
                      isActive
                        ? 'bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-cyber-text-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-neon-purple text-white rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
              
              <div className="border-t border-cyber-card-border pt-4 mt-2 px-3">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-xs text-zinc-400">
                      User: <span className="text-neon-cyan font-bold">{user?.username}</span>
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-center font-mono text-xs font-semibold uppercase tracking-wider text-accent-red border border-accent-red/40 rounded py-2 hover:bg-accent-red/20 transition-all cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center font-mono text-xs font-semibold uppercase tracking-wider text-neon-cyan border border-neon-cyan/40 rounded py-2 hover:bg-neon-cyan/10 transition-all"
                  >
                    Sign In / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
