"use client";

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'cyan' | 'purple' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-semibold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  
  const variantStyles = {
    cyan: 'bg-neon-cyan text-black hover:bg-black hover:text-neon-cyan border-2 border-neon-cyan shadow-neon-cyan',
    purple: 'bg-neon-purple text-white hover:bg-black hover:text-neon-purple border-2 border-neon-purple shadow-neon-purple',
    outline: 'bg-transparent text-white border-2 border-white/20 hover:border-neon-cyan hover:text-neon-cyan',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5',
    danger: 'bg-accent-red text-white hover:bg-black hover:text-accent-red border-2 border-accent-red hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
export default Button;
