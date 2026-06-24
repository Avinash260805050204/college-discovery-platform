import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'SYSTEM DATALINK ANOMALY',
  message = 'A critical failure has been encountered in the primary data sync. Link severed.',
  onRetry,
  retryText = 'RE-ESTABLISH DATALINK'
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-accent-red/20 rounded bg-accent-red/[0.02] relative overflow-hidden min-h-[300px]">
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-red/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-red/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-red/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-red/40" />
      
      <div className="p-4 rounded-full bg-accent-red/10 border border-accent-red/30 text-accent-red mb-4">
        <ShieldAlert className="w-8 h-8 text-accent-red" />
      </div>
      <h3 className="font-mono text-lg font-bold text-accent-red tracking-wider mb-2 uppercase">{title}</h3>
      <p className="text-zinc-400 text-sm max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  );
};
export default ErrorState;
