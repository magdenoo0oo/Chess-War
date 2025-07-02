import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TacticalCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

export const TacticalCard: React.FC<TacticalCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className = '',
  glowColor = 'primary',
  onClick,
}) => {
  const glowColors = {
    primary: 'shadow-tactical-primary/20 hover:shadow-tactical-primary/40',
    secondary: 'shadow-tactical-secondary/20 hover:shadow-tactical-secondary/40',
    success: 'shadow-tactical-success/20 hover:shadow-tactical-success/40',
    warning: 'shadow-tactical-warning/20 hover:shadow-tactical-warning/40',
    danger: 'shadow-tactical-danger/20 hover:shadow-tactical-danger/40',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        relative bg-war-gray/50 backdrop-blur-sm border border-tactical-primary/30 rounded-xl
        shadow-lg ${glowColors[glowColor]} transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6 border-b border-tactical-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-400 font-mono">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-tactical-primary/20 rounded-lg">
              <Icon className="w-6 h-6 text-war-green" />
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
      
      {/* Tactical Border Effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tactical-primary to-transparent opacity-50"></div>
    </motion.div>
  );
};