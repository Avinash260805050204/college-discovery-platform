"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Check, Plus, ArrowUpRight, MapPin, DollarSign, Percent } from 'lucide-react';
import { useStore } from '../store/use-store';
import { College } from '../types';
import Card from './ui/card';
import RatingBadge from './ui/rating-badge';
import Button from './ui/button';

interface CollegeCardProps {
  college: College;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const { savedColleges, toggleSaveCollege, compareList, addToCompare, removeFromCompare } = useStore();

  const isSaved = savedColleges.includes(college.id);
  const isCompared = compareList.includes(college.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSaveCollege(college.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college.id);
      if (!added) {
        alert('Comparison queue full! You can compare a maximum of 3 colleges side-by-side.');
      }
    }
  };

  return (
    <Card hoverable glow="dual" className="flex flex-col h-full gap-4 group transition-all duration-300">
      
      {/* Banner / Card Header */}
      <div className="relative h-32 w-full rounded overflow-hidden bg-gradient-to-br from-neon-cyan/10 to-neon-purple/20 border border-cyber-card-border flex items-center justify-center">
        <div className="absolute inset-0 cyber-grid opacity-[0.1]" />
        
        {/* Match Score Badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-neon-purple/20 border border-neon-purple/30 shadow-[0_0_8px_rgba(124,77,255,0.2)]">
          <span className="font-mono text-[9px] font-bold text-neon-pink tracking-widest uppercase">
            Match: {college.aiScore}%
          </span>
        </div>

        {/* Established text */}
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-cyber-text-secondary">
          ESTD. {college.establishedYear}
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-2 right-2">
          <RatingBadge rating={college.rating} showText={false} />
        </div>
      </div>

      {/* College Info */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-sans font-bold text-cyber-fg text-base tracking-wide group-hover:text-neon-cyan transition-colors line-clamp-1">
            {college.name}
          </h3>
          <button
            onClick={handleSave}
            className={`p-1.5 rounded border transition-all cursor-pointer ${
              isSaved
                ? 'bg-neon-pink/10 border-neon-pink text-neon-pink shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                : 'border-cyber-card-border text-cyber-text-secondary hover:text-cyber-text-primary hover:border-cyber-text-secondary/40'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save to Bookmarks'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-neon-pink' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-cyber-text-secondary">
          <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
          <span>{college.location.city}, {college.location.state}</span>
        </div>

        <p className="text-cyber-text-secondary text-xs line-clamp-2 mt-1">
          {college.overview}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-cyber-card-border">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-neon-cyan" /> FEES
            </span>
            <span className="font-mono text-xs font-semibold text-cyber-fg">
              ${college.fees.toLocaleString()}/yr
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider flex items-center gap-1">
              <Percent className="w-3 h-3 text-neon-cyan" /> PLACEMENT
            </span>
            <span className="font-mono text-xs font-semibold text-cyber-fg">
              {college.placementPercentage}% Rate
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleCompare}
          className={`flex-1 font-mono text-[10px] font-bold uppercase tracking-wider py-2 border rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isCompared
              ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]'
              : 'border-cyber-card-border text-cyber-text-secondary hover:text-cyber-text-primary hover:border-cyber-text-secondary/40'
          }`}
        >
          {isCompared ? (
            <>
              <Check className="w-3.5 h-3.5" /> Comparing
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Compare
            </>
          )}
        </button>

        <Link href={`/college/${college.id}`} className="flex-1">
          <Button variant="outline" size="sm" fullWidth className="py-2 text-[10px]">
            View Details <ArrowUpRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
export default CollegeCard;
