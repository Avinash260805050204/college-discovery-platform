import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'NO RECORDS RETRIEVED',
  message = 'The system search yielded 0 records matching the given configuration matrix.',
  onReset,
  resetText = 'RESET SYSTEM FILTERS'
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded bg-white/[0.01] relative overflow-hidden min-h-[300px]">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700" />
      
      <div className="p-4 rounded-full bg-zinc-800/30 border border-zinc-700/50 text-zinc-500 mb-4">
        <AlertCircle className="w-8 h-8 text-neon-cyan" />
      </div>
      <h3 className="font-mono text-lg font-bold text-white tracking-wider mb-2 uppercase">{title}</h3>
      <p className="text-zinc-400 text-sm max-w-md mb-6">{message}</p>
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset}>
          {resetText}
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
