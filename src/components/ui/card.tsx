import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'cyan' | 'purple' | 'dual';
  variant?: 'glass' | 'solid';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = 'none',
  variant = 'glass',
  hoverable = false,
  className = '',
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'shadow-neon-cyan border-neon-cyan/30',
    purple: 'shadow-neon-purple border-neon-purple/30',
    dual: 'shadow-cyber-glow border-neon-cyan/20',
  };

  const variantStyles = {
    glass: 'glassmorphism',
    solid: 'bg-cyber-bg-medium border border-white/10',
  };

  const hoverStyle = hoverable ? 'glassmorphism-hover cursor-pointer' : '';

  return (
    <div
      className={`rounded p-6 relative overflow-hidden transition-all duration-300 ${variantStyles[variant]} ${glowStyles[glow]} ${hoverStyle} ${className}`}
      {...props}
    >
      {/* Abstract Cyber Grid overlay inside cards to give it a technical feel */}
      <div className="absolute inset-0 cyber-grid opacity-[0.1] pointer-events-none" />
      {/* Cybernetic corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-cyan/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-cyan/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan/40" />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export default Card;
