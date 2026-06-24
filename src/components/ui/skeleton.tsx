import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  className = '',
  ...props
}) => {
  const shapeClass = variant === 'circle' ? 'rounded-full' : 'rounded';
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-zinc-800/40 via-zinc-700/30 to-zinc-800/40 ${shapeClass} ${className}`}
      {...props}
    />
  );
};

export const CollegeCardSkeleton: React.FC = () => {
  return (
    <div className="rounded p-6 glassmorphism border border-white/5 relative overflow-hidden flex flex-col gap-4">
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export default Skeleton;
