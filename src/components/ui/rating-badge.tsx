import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  showText?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, showText = true }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-accent-yellow/40 shadow-[0_0_8px_rgba(250,204,21,0.15)]">
      <Star className="w-3.5 h-3.5 fill-accent-yellow text-accent-yellow" />
      <span className="font-mono text-xs font-bold text-accent-yellow">{rating.toFixed(1)}</span>
      {showText && <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">/ 5.0</span>}
    </div>
  );
};
export default RatingBadge;
