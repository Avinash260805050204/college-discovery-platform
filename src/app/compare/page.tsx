"use client";

import React, { useState } from 'react';
import { useStore } from '../../store/use-store';
import { mockColleges } from '../../data/colleges';
import { ComparisonTable } from '../../features/compare/comparison-table';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
import EmptyState from '../../components/ui/empty-state';
import { Cpu, Plus, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const comparedColleges = mockColleges.filter((c) => compareList.includes(c.id));

  const availableColleges = mockColleges.filter(
    (c) => !compareList.includes(c.id) && c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCollege = (id: string) => {
    const added = addToCompare(id);
    if (!added) {
      alert('Comparison queue full! You can compare a maximum of 3 colleges side-by-side.');
    } else {
      setSearchQuery('');
    }
  };

  return (
    <div className="flex-1 bg-cyber-bg py-8 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-card-border pb-6">
          <div>
            <h1 className="font-sans text-xl sm:text-2xl font-black text-cyber-fg tracking-wide uppercase">
              College Comparison Matrix
            </h1>
            <p className="text-cyber-text-secondary font-mono text-[10px] uppercase">
              Compare fees, placement percentages, ratings, and courses side-by-side
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="font-mono text-xs font-semibold text-accent-red hover:bg-accent-red/10 border border-accent-red/30 rounded px-4 py-2 transition-all cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Comparison Render */}
        {compareList.length === 0 ? (
          <EmptyState
            title="Comparison Matrix Empty"
            message="You haven't added any colleges to compare. Browse our directory or select colleges below to begin."
            onReset={() => window.location.href = '/colleges'}
            resetText="Browse Colleges"
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center text-xs font-mono text-cyber-text-secondary">
              <span>Comparison Dashboard // {compareList.length} of 3 slots occupied</span>
              <span>Metric Highlighting: Active</span>
            </div>

            <ComparisonTable colleges={comparedColleges} onRemove={removeFromCompare} />
          </div>
        )}

        {/* Add College Drawer */}
        {compareList.length < 3 && (
          <Card glow="purple" className="flex flex-col gap-4 mt-6">
            <h3 className="font-sans text-sm font-bold text-neon-purple uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add College to Compare
            </h3>
            <p className="text-xs text-cyber-text-secondary">
              Search and add colleges directly into the comparison grids. Vacant slots: {3 - compareList.length}
            </p>
            
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-3.5 h-3.5 text-neon-purple" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges..."
                className="w-full bg-cyber-bg border border-cyber-card-border rounded pl-9 pr-4 py-2 text-xs text-cyber-fg placeholder-zinc-500 font-mono tracking-wider focus:outline-none focus:border-neon-purple transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto mt-2 pr-1">
              {availableColleges.length === 0 ? (
                <span className="font-mono text-xs text-cyber-text-muted">No matching colleges found...</span>
              ) : (
                availableColleges.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleAddCollege(c.id)}
                    className="p-3 rounded border border-cyber-card-border bg-cyber-card-bg hover:border-neon-purple/40 hover:bg-white/[0.03] transition-all cursor-pointer flex justify-between items-center group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-xs font-semibold text-cyber-fg group-hover:text-neon-purple transition-colors line-clamp-1">
                        {c.name}
                      </span>
                      <span className="font-mono text-[9px] text-cyber-text-secondary">{c.location.city}, {c.location.state}</span>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-neon-purple opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              )}
            </div>
          </Card>
        )}

        {/* Info Box */}
        <div className="p-4 rounded border border-cyber-card-border bg-cyber-card-bg flex items-start gap-3 font-mono text-xs text-cyber-text-secondary">
          <HelpCircle className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-cyber-text-primary">How comparison works:</span>
            <span>
              We automatically compare key metrics like tuition, career placement rates, and ratings across your selections to help you isolate the best values.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
