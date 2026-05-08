import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card = ({ children, className = '', glow = false }: CardProps) => {
  return (
    <div className={`glass-card ${glow ? 'glow' : ''} ${className}`}>
      {children}
    </div>
  );
};
