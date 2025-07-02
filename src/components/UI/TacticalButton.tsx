import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TacticalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TacticalButton: React.FC<TacticalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
}) => {
  const variants = {
    primary: 'bg-tactical-primary hover:bg-tactical-primary/80 text-white shadow-lg shadow-tactical-primary/20',
    secondary: 'bg-tactical-secondary hover:bg-tactical-secondary/80 text-white shadow-lg shadow-tactical-secondary/20',
    danger: 'bg-tactical-danger hover:bg-tactical-danger/80 text-white shadow-lg shadow-tactical-danger/20',
    ghost: 'bg-transparent hover:bg-war-light/20 text-gray-300 hover:text-white border border-tactical-primary/30',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200 group
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-war-dark/50 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
      </div>
      
      {/* Tactical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </motion.button>
  );
};