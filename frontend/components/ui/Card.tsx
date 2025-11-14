import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

export function Card({
  variant = 'default',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variants = {
    default: 'bg-primary-100/50 border border-neutral-800/50 backdrop-blur-sm',
    elevated: 'bg-primary-100/60 border border-neutral-800/50 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 backdrop-blur-sm',
    outlined: 'bg-transparent border-2 border-accent-500/30',
  };

  const hoverStyles = hover
    ? 'hover:scale-[1.02] hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10 cursor-pointer transition-all duration-300'
    : '';

  return (
    <div
      className={clsx(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}

