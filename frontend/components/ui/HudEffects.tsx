import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HudBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glow' | 'scan' | 'grid' | 'outlined';
  intensity?: 'subtle' | 'medium' | 'strong';
}

/**
 * Componente de borda HUD com efeitos visuais
 * Variantes: default, glow, scan, grid
 */
export function HudBorder({
  children,
  variant = 'default',
  intensity = 'medium',
  className,
  ...props
}: HudBorderProps) {
  const intensityClasses = {
    subtle: 'border-accent-500/10',
    medium: 'border-accent-500/20',
    strong: 'border-accent-500/40',
  };

  const variantClasses = {
    default: cn(
      'relative border rounded-xl',
      intensityClasses[intensity],
      'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none',
      'before:bg-gradient-to-r before:from-transparent before:via-accent-500/5 before:to-transparent',
      'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500'
    ),
    glow: cn(
      'relative border rounded-xl',
      intensityClasses[intensity],
      'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none',
      'before:shadow-[0_0_20px_rgba(20,244,201,0.1)]',
      'hover:before:shadow-[0_0_30px_rgba(20,244,201,0.2)]',
      'before:transition-all before:duration-300'
    ),
    scan: cn(
      'relative border rounded-xl overflow-hidden',
      intensityClasses[intensity],
      'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none',
      'before:bg-gradient-to-r before:from-transparent before:via-accent-500/20 before:to-transparent',
      'before:animate-scan'
    ),
    grid: cn(
      'relative border rounded-xl',
      intensityClasses[intensity],
      'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none',
      'before:bg-grid-pattern before:bg-grid before:opacity-20',
      'after:absolute after:inset-0 after:rounded-xl after:pointer-events-none',
      'after:border after:border-accent-500/10'
    ),
    outlined: cn(
      'relative border-2 rounded-xl',
      intensityClasses[intensity],
      'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none',
      'before:bg-gradient-to-r before:from-transparent before:via-accent-500/10 before:to-transparent',
      'hover:before:opacity-100 before:opacity-0 before:transition-opacity before:duration-500'
    ),
  };

  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
}

interface HudCornerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'all';
}

/**
 * Componente de cantos HUD (linhas nos cantos)
 */
export function HudCorner({
  size = 'md',
  position = 'all',
  className,
  ...props
}: HudCornerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const borderWidth = {
    sm: 'border-[1px]',
    md: 'border-[1.5px]',
    lg: 'border-2',
  };

  const corners = {
    'top-left': (
      <div
        className={cn(
          'absolute top-0 left-0',
          sizeClasses[size],
          borderWidth[size],
          'border-t border-l border-accent-500/40 rounded-tl-lg'
        )}
      />
    ),
    'top-right': (
      <div
        className={cn(
          'absolute top-0 right-0',
          sizeClasses[size],
          borderWidth[size],
          'border-t border-r border-accent-500/40 rounded-tr-lg'
        )}
      />
    ),
    'bottom-left': (
      <div
        className={cn(
          'absolute bottom-0 left-0',
          sizeClasses[size],
          borderWidth[size],
          'border-b border-l border-accent-500/40 rounded-bl-lg'
        )}
      />
    ),
    'bottom-right': (
      <div
        className={cn(
          'absolute bottom-0 right-0',
          sizeClasses[size],
          borderWidth[size],
          'border-b border-r border-accent-500/40 rounded-br-lg'
        )}
      />
    ),
    all: (
      <>
        <div
          className={cn(
            'absolute top-0 left-0',
            sizeClasses[size],
            borderWidth[size],
            'border-t border-l border-accent-500/40 rounded-tl-lg'
          )}
        />
        <div
          className={cn(
            'absolute top-0 right-0',
            sizeClasses[size],
            borderWidth[size],
            'border-t border-r border-accent-500/40 rounded-tr-lg'
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0',
            sizeClasses[size],
            borderWidth[size],
            'border-b border-l border-accent-500/40 rounded-bl-lg'
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            sizeClasses[size],
            borderWidth[size],
            'border-b border-r border-accent-500/40 rounded-br-lg'
          )}
        />
      </>
    ),
  };

  return (
    <div className={cn('relative', className)} {...props}>
      {corners[position]}
    </div>
  );
}

interface HudGridProps extends HTMLAttributes<HTMLDivElement> {
  density?: 'sparse' | 'normal' | 'dense';
}

/**
 * Componente de grid HUD de fundo
 */
export function HudGrid({ density = 'normal', className, ...props }: HudGridProps) {
  const densityClasses = {
    sparse: 'bg-grid-pattern bg-grid opacity-10',
    normal: 'bg-grid-pattern-dense bg-grid-dense opacity-20',
    dense: 'bg-grid-pattern-dense bg-grid-dense opacity-30',
  };

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', densityClasses[density], className)}
      {...props}
    />
  );
}

interface HudGlowProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'accent' | 'primary' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Componente de brilho HUD
 */
export function HudGlow({
  color = 'accent',
  size = 'md',
  position = 'center',
  className,
  ...props
}: HudGlowProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[32rem] h-[32rem]',
  };

  const colorClasses = {
    accent: 'bg-accent-500',
    primary: 'bg-primary-400',
    success: 'bg-success',
  };

  const positionClasses = {
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl opacity-20 pointer-events-none',
        sizeClasses[size],
        colorClasses[color],
        positionClasses[position],
        className
      )}
      {...props}
    />
  );
}

