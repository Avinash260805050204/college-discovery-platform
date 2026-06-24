"use client";

import React from 'react';
import { useStore } from '../../store/use-store';
import { mockColleges } from '../../data/colleges';
import CollegeCard from '../../components/college-card';
import EmptyState from '../../components/ui/empty-state';
import Button from '../../components/ui/button';
import Card from '../../components/ui/card';
import { LogIn, FolderOpen } from 'lucide-react';
import Link from 'next/link';

export default function SavedCollegesPage() {
  const { user, isAuthenticated, savedColleges, toggleSaveCollege } = useStore();

  const savedItems = mockColleges.filter((c) => savedColleges.includes(c.id));

  const handlePurgeAll = () => {
    if (confirm('Are you sure you want to clear all bookmarked colleges?')) {
      savedColleges.forEach((id) => toggleSaveCollege(id));
    }
  };

  return (
    <div className="flex-1 bg-cyber-bg py-8 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl flex flex-col gap-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-card-border pb-6">
          <div>
            <h1 className="font-sans text-xl sm:text-2xl font-black text-cyber-fg tracking-wide uppercase">
              Saved Universities
            </h1>
            <p className="text-cyber-text-secondary font-mono text-[10px] uppercase">
              View and manage your bookmarked universities
            </p>
          </div>

          {isAuthenticated && savedItems.length > 0 && (
            <button
              onClick={handlePurgeAll}
              className="font-mono text-xs font-semibold text-accent-red hover:bg-accent-red/10 border border-accent-red/30 rounded px-4 py-2 transition-all cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Auth Guard */}
        {!isAuthenticated ? (
          <Card glow="purple" className="flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto my-8 gap-4">
            <LogIn className="w-10 h-10 text-neon-purple" />
            <h3 className="font-sans text-base font-bold text-cyber-fg uppercase tracking-wider">
              Sign In Required
            </h3>
            <p className="text-xs text-cyber-text-secondary">
              Please sign in to view and manage your bookmarked colleges.
            </p>
            <Link href="/login" className="w-full mt-2">
              <Button variant="purple" size="md" fullWidth>
                Sign In / Sign Up
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Status dashboard */}
            <div className="p-4 rounded border border-cyber-card-border bg-cyber-card-bg flex justify-between items-center font-mono text-xs text-cyber-text-secondary">
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-neon-cyan" />
                Logged in as: <span className="text-neon-cyan font-bold">{user?.username}</span>
              </span>
              <span>{savedItems.length} Bookmarks</span>
            </div>

            {/* Saved Items */}
            {savedItems.length === 0 ? (
              <EmptyState
                title="No Saved Colleges"
                message="You haven't bookmarked any colleges yet. Go to the explorer directory to find colleges."
                onReset={() => window.location.href = '/colleges'}
                resetText="Find Colleges"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
