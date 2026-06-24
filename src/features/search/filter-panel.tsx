"use client";

import React from 'react';
import { useStore } from '../../store/use-store';
import Card from '../../components/ui/card';
import { SlidersHorizontal, MapPin, DollarSign, Star, BookOpen, Percent, RefreshCw } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const { filters, setFilters, resetFilters } = useStore();

  const states = ['All', 'California', 'Massachusetts', 'New York', 'Texas', 'Washington', 'Illinois'];
  const ratings = [0, 4.0, 4.5, 4.8];
  const courseTypes = ['All', 'Engineering', 'Management', 'Science', 'Arts'];
  const placements = [0, 85, 90, 95];

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <h3 className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-neon-cyan" /> FILTER MATRIX
        </h3>
        <button
          onClick={resetFilters}
          className="font-mono text-[10px] text-zinc-500 hover:text-neon-cyan transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> RESET
        </button>
      </div>

      {/* State Filter */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neon-cyan" /> LOCATION STATE
        </label>
        <select
          value={filters.state}
          onChange={(e) => setFilters({ state: e.target.value })}
          className="bg-black/60 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan cursor-pointer"
        >
          {states.map((s) => (
            <option key={s} value={s} className="bg-cyber-bg-dark">
              {s.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Course Type Filter */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-neon-cyan" /> COURSE TYPE
        </label>
        <select
          value={filters.courseType}
          onChange={(e) => setFilters({ courseType: e.target.value })}
          className="bg-black/60 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan cursor-pointer"
        >
          {courseTypes.map((c) => (
            <option key={c} value={c} className="bg-cyber-bg-dark">
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Fees Max Filter */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-neon-cyan" /> MAXIMUM TUITION
          </span>
          <span className="text-neon-cyan font-bold">${filters.feesMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="30000"
          max="80000"
          step="5000"
          value={filters.feesMax}
          onChange={(e) => setFilters({ feesMax: parseInt(e.target.value) })}
          className="w-full accent-neon-cyan cursor-pointer"
        />
        <div className="flex justify-between font-mono text-[9px] text-zinc-600">
          <span>$30K</span>
          <span>$80K</span>
        </div>
      </div>

      {/* Rating Min Filter */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-neon-cyan" /> MINIMUM RATING
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {ratings.map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ratingMin: r })}
              className={`py-1.5 rounded font-mono text-xs border transition-all cursor-pointer ${
                filters.ratingMin === r
                  ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                  : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/20'
              }`}
            >
              {r === 0 ? 'ALL' : `${r.toFixed(1)}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Placement Min Filter */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-neon-cyan" /> MIN PLACEMENT RATE
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {placements.map((p) => (
            <button
              key={p}
              onClick={() => setFilters({ placementMin: p })}
              className={`py-1.5 rounded font-mono text-xs border transition-all cursor-pointer ${
                filters.placementMin === p
                  ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                  : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/20'
              }`}
            >
              {p === 0 ? 'ALL' : `${p}%+`}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
export default FilterPanel;
