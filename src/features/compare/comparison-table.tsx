"use client";

import React from 'react';
import { College } from '../../types';
import RatingBadge from '../../components/ui/rating-badge';
import Button from '../../components/ui/button';
import { Trash2, ArrowUpRight, DollarSign, Award, Percent, Cpu, MapPin } from 'lucide-react';
import Link from 'next/link';

interface ComparisonTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ colleges, onRemove }) => {
  if (colleges.length === 0) return null;

  const isComparingMultiple = colleges.length > 1;
  const bestFees = isComparingMultiple ? Math.min(...colleges.map(c => c.fees)) : null;
  const bestPlacement = isComparingMultiple ? Math.max(...colleges.map(c => c.placementPercentage)) : null;
  const bestRating = isComparingMultiple ? Math.max(...colleges.map(c => c.rating)) : null;
  const bestAiScore = isComparingMultiple ? Math.max(...colleges.map(c => c.aiScore)) : null;

  const categories = [
    {
      name: 'Location',
      icon: <MapPin className="w-3.5 h-3.5 text-neon-cyan" />,
      getValue: (c: College) => `${c.location.city}, ${c.location.state}`,
      isHighlighted: () => false,
    },
    {
      name: 'Fees',
      icon: <DollarSign className="w-3.5 h-3.5 text-neon-cyan" />,
      getValue: (c: College) => `$${c.fees.toLocaleString()}/yr`,
      isHighlighted: (c: College) => c.fees === bestFees,
      highlightLabel: 'LOWEST FEE',
    },
    {
      name: 'Placement Rate',
      icon: <Percent className="w-3.5 h-3.5 text-neon-cyan" />,
      getValue: (c: College) => `${c.placementPercentage}%`,
      isHighlighted: (c: College) => c.placementPercentage === bestPlacement,
      highlightLabel: 'HIGHEST RATE',
    },
    {
      name: 'Rating',
      icon: <Award className="w-3.5 h-3.5 text-neon-cyan" />,
      renderValue: (c: College) => <RatingBadge rating={c.rating} showText={false} />,
      isHighlighted: (c: College) => c.rating === bestRating,
      highlightLabel: 'HIGHEST RATED',
    },
    {
      name: 'Match Score',
      icon: <Cpu className="w-3.5 h-3.5 text-neon-cyan" />,
      getValue: (c: College) => `${c.aiScore}% Match`,
      isHighlighted: (c: College) => c.aiScore === bestAiScore,
      highlightLabel: 'BEST MATCH',
    },
    {
      name: 'Courses',
      icon: <Cpu className="w-3.5 h-3.5 text-neon-cyan" />,
      renderValue: (c: College) => (
        <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1">
          {c.courses.map((course, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono px-2 py-0.5 bg-cyber-bg border border-cyber-card-border rounded text-cyber-fg"
              title={`Fees: $${course.fees}`}
            >
              {course.name}
            </span>
          ))}
        </div>
      ),
      isHighlighted: () => false,
    },
    {
      name: 'Facilities',
      icon: <Cpu className="w-3.5 h-3.5 text-neon-cyan" />,
      renderValue: (c: College) => (
        <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1">
          {c.facilities.map((fac, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono px-2 py-0.5 bg-neon-cyan/5 border border-neon-cyan/10 rounded text-neon-cyan"
            >
              {fac}
            </span>
          ))}
        </div>
      ),
      isHighlighted: () => false,
    }
  ];

  return (
    <div className="w-full overflow-x-auto rounded border border-cyber-card-border bg-cyber-card-bg transition-colors duration-300">
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead>
          <tr className="border-b border-cyber-card-border bg-cyber-card-bg">
            <th className="p-4 w-1/4 font-mono text-xs text-cyber-text-secondary uppercase tracking-wider border-r border-cyber-card-border">
              Comparison Metric
            </th>
            
            {colleges.map((c) => (
              <th key={c.id} className="p-4 w-1/4 border-r border-cyber-card-border last:border-r-0 relative">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-sans text-sm font-bold text-cyber-fg uppercase tracking-wide line-clamp-1">
                      {c.name}
                    </h4>
                    <button
                      onClick={() => onRemove(c.id)}
                      className="p-1 rounded text-cyber-text-muted hover:text-accent-red hover:bg-accent-red/10 border border-transparent hover:border-accent-red/20 transition-all cursor-pointer"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-[9px] text-cyber-text-muted">ESTD: {c.establishedYear}</span>
                  <Link href={`/college/${c.id}`} className="mt-1">
                    <Button variant="outline" size="sm" className="w-full text-[9px] py-1">
                      View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </th>
            ))}
            
            {Array.from({ length: 3 - colleges.length }).map((_, idx) => (
              <th key={`empty-${idx}`} className="p-4 w-1/4 border-r border-cyber-card-border last:border-r-0 text-center opacity-30">
                <div className="flex flex-col justify-center items-center py-6 border border-dashed border-cyber-card-border rounded">
                  <span className="font-mono text-[10px] text-cyber-text-muted tracking-wider">Empty Slot</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={idx} className="border-b border-cyber-card-border hover:bg-white/[0.01] transition-all">
              <td className="p-4 font-sans text-xs text-cyber-text-primary font-bold uppercase tracking-wide border-r border-cyber-card-border bg-cyber-card-bg flex items-center gap-2">
                {cat.icon}
                {cat.name}
              </td>
              
              {colleges.map((c) => {
                const isWinner = cat.isHighlighted(c);
                return (
                  <td
                    key={c.id}
                    className={`p-4 border-r border-cyber-card-border last:border-r-0 transition-all ${
                      isWinner ? 'bg-accent-green/[0.03]' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 justify-center h-full">
                      <div className="text-sm text-cyber-fg font-mono">
                        {cat.renderValue ? cat.renderValue(c) : cat.getValue(c)}
                      </div>
                      
                      {isWinner && cat.highlightLabel && (
                        <span className="self-start text-[8px] font-mono px-1.5 py-0.5 rounded bg-accent-green/10 border border-accent-green/20 text-accent-green tracking-widest font-bold">
                          ★ {cat.highlightLabel}
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
              
              {Array.from({ length: 3 - colleges.length }).map((_, idx) => (
                <td key={`empty-cell-${idx}`} className="p-4 border-r border-cyber-card-border last:border-r-0 bg-cyber-card-bg/20" />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ComparisonTable;
