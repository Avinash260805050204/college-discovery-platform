"use client";

import React from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '../../store/use-store';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Search className="w-4 h-4 text-neon-cyan" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-black/60 border border-white/10 rounded-md pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-500 font-mono tracking-wider focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all"
        placeholder="QUERY SYSTEM DATABASE (e.g. Stanford, Robotics, California)..."
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-white cursor-pointer"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
