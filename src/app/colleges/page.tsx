"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/use-store';
import { useColleges } from '../../hooks/use-colleges';
import SearchBar from '../../features/search/search-bar';
import FilterPanel from '../../features/search/filter-panel';
import CollegeCard from '../../components/college-card';
import { CollegeCardSkeleton } from '../../components/ui/skeleton';
import EmptyState from '../../components/ui/empty-state';
import ErrorState from '../../components/ui/error-state';
import Button from '../../components/ui/button';
import { SortOption } from '../../services/college.service';
import { ChevronLeft, ChevronRight, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CollegesPage() {
  const { searchQuery, filters, resetFilters, compareList, clearCompare } = useStore();
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  const { data, isLoading, isError, refetch } = useColleges({
    search: searchQuery,
    filters,
    sortBy,
    page,
    limit: itemsPerPage,
  });

  return (
    <div className="flex-1 bg-cyber-bg py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl flex flex-col gap-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cyber-card-border pb-6">
          <div>
            <h1 className="font-sans text-xl sm:text-2xl font-black text-cyber-fg tracking-wide uppercase">
              College Finder
            </h1>
            <p className="text-cyber-text-secondary font-mono text-[10px] uppercase">
              Query our database to find the best match
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto font-mono text-xs">
            <span className="text-cyber-text-secondary whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-cyber-fg focus:outline-none focus:border-neon-cyan cursor-pointer w-full md:w-48"
            >
              <option value="rating">Highest Rating</option>
              <option value="fees-asc">Fees: Low to High</option>
              <option value="fees-desc">Fees: High to Low</option>
              <option value="placement">Placement Rate</option>
              <option value="aiScore">Compatibility Match</option>
            </select>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters (Left Sidebar) */}
          <div className="lg:col-span-3">
            <FilterPanel />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            <SearchBar />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <CollegeCardSkeleton key={idx} />
                ))}
              </div>
            ) : isError ? (
              <ErrorState onRetry={refetch} />
            ) : !data || data.items.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="flex flex-col gap-8">
                
                <div className="font-mono text-xs text-cyber-text-secondary flex justify-between items-center border-b border-cyber-card-border pb-2">
                  <span>Showing {data.items.length} of {data.total} colleges</span>
                  <span>Page {data.page}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.items.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Pagination */}
                {data.total > itemsPerPage && (
                  <div className="flex justify-between items-center pt-4 border-t border-cyber-card-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </Button>
                    
                    <span className="font-mono text-xs text-cyber-text-secondary">
                      Page {page} of {Math.ceil(data.total / itemsPerPage)}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => (data.hasMore ? p + 1 : p))}
                      disabled={!data.hasMore}
                      className="flex items-center gap-1"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Floating Compare Queue Drawer */}
        {compareList.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg p-4 rounded border border-neon-cyan bg-cyber-bg/95 shadow-shadow-neon-cyan backdrop-blur-md flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-neon-cyan animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-cyber-fg uppercase tracking-wider">
                  Comparison Queue Ready
                </span>
                <span className="text-[10px] text-cyber-text-secondary font-mono">
                  {compareList.length} of 3 colleges selected
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCompare}
                className="font-mono text-[10px] font-bold text-cyber-text-muted hover:text-accent-red uppercase px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <Link href="/compare">
                <Button variant="cyan" size="sm" className="text-[10px] py-1.5">
                  Compare Now <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
