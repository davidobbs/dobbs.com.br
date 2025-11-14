import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'icon' | 'wordmark' | 'hud' | 'minimal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDot?: boolean;
}

export function Logo({ 
  variant = 'default', 
  className, 
  size = 'md',
  showDot = true 
}: LogoProps) {
  const sizes = {
    sm: { text: 'text-lg', icon: 'w-8 h-8', dot: 'w-1 h-1' },
    md: { text: 'text-xl', icon: 'w-10 h-10', dot: 'w-1.5 h-1.5' },
    lg: { text: 'text-2xl', icon: 'w-12 h-12', dot: 'w-2 h-2' },
    xl: { text: 'text-3xl', icon: 'w-14 h-14', dot: 'w-2.5 h-2.5' },
  };

  const sizeConfig = sizes[size];

  // Icon only variant
  if (variant === 'icon') {
    return (
      <Link href="/" className={cn('flex items-center justify-center group', className)}>
        <div
          className={cn(
            'relative rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center font-display font-bold text-primary-50 transition-all duration-300 group-hover:scale-105',
            sizeConfig.icon
          )}
        >
          <span className="relative z-10">{size === 'sm' ? 'D' : 'D'}</span>
          <div className="absolute inset-0 rounded-lg bg-accent-500/20 blur-sm animate-glow" />
          <div className="absolute inset-0 rounded-lg border border-accent-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    );
  }

  // Wordmark only variant
  if (variant === 'wordmark') {
    return (
      <Link href="/" className={cn('flex items-center space-x-2 group', className)}>
        <span
          className={cn(
            'font-display font-semibold text-neutral-200 tracking-tight transition-colors group-hover:text-accent-400',
            sizeConfig.text
          )}
        >
          dobbs
        </span>
        {showDot && (
          <span 
            className={cn(
              'rounded-full bg-accent-500 animate-glow transition-all group-hover:bg-accent-400',
              sizeConfig.dot
            )} 
          />
        )}
      </Link>
    );
  }

  // HUD variant with special effects
  if (variant === 'hud') {
    return (
      <Link href="/" className={cn('flex items-center space-x-3 group relative', className)}>
        {/* HUD corner lines */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-accent-500/40 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-accent-500/40 rounded-tr opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className={cn('relative', sizeConfig.icon)}>
          <div className="absolute inset-0 rounded-lg bg-accent-500/10 blur-md group-hover:bg-accent-500/20 transition-colors" />
          <div
            className={cn(
              'relative rounded-lg bg-gradient-to-br from-accent-500/20 to-accent-600/10 flex items-center justify-center font-display font-bold text-accent-400 border border-accent-500/30 backdrop-blur-sm transition-all duration-300 group-hover:border-accent-500/50 group-hover:scale-105',
              sizeConfig.icon
            )}
          >
            <span className="relative z-10">D</span>
            <div className="absolute inset-0 rounded-lg bg-accent-500/5 blur-sm animate-pulse-glow" />
          </div>
        </div>
        <div className="flex flex-col">
          <span 
            className={cn(
              'font-display font-semibold text-neutral-200 tracking-tight transition-colors group-hover:text-accent-400',
              sizeConfig.text
            )}
          >
            dobbs
          </span>
          {showDot && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className={cn('rounded-full bg-accent-500/60 animate-glow', sizeConfig.dot)} />
              <span className="text-[10px] text-accent-500/40 font-mono uppercase tracking-widest">online</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Minimal variant (just text, no icon)
  if (variant === 'minimal') {
    return (
      <Link href="/" className={cn('flex items-center space-x-2 group', className)}>
        <span
          className={cn(
            'font-display font-semibold text-neutral-200 tracking-tight transition-colors group-hover:text-accent-400',
            sizeConfig.text
          )}
        >
          dobbs
        </span>
      </Link>
    );
  }

  // Default: icon + wordmark
  return (
    <Link href="/" className={cn('flex items-center space-x-3 group', className)}>
      <div className={cn('relative', sizeConfig.icon)}>
        <div className="absolute inset-0 rounded-lg bg-accent-500/20 blur-md group-hover:bg-accent-500/30 transition-colors" />
        <div
          className={cn(
            'relative rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center font-display font-bold text-primary-50 shadow-lg shadow-accent-500/20 transition-all duration-300 group-hover:scale-105',
            sizeConfig.icon
          )}
        >
          <span className="relative z-10">D</span>
          <div className="absolute inset-0 rounded-lg bg-accent-500/30 blur-sm animate-glow" />
        </div>
      </div>
      <div className="flex flex-col">
        <span 
          className={cn(
            'font-display font-semibold text-neutral-200 tracking-tight transition-colors group-hover:text-accent-400',
            sizeConfig.text
          )}
        >
          dobbs
        </span>
        {showDot && (
          <span 
            className={cn(
              'rounded-full bg-accent-500 animate-glow transition-all group-hover:bg-accent-400 mt-0.5 self-start',
              sizeConfig.dot
            )} 
          />
        )}
      </div>
    </Link>
  );
}

