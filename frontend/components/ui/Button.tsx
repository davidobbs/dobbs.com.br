import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseButtonProps {
  href?: never;
  asChild?: never;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseButtonProps {
  href: string;
  asChild?: boolean;
}

type ButtonComponentProps = ButtonProps | ButtonLinkProps;

const getButtonClasses = (variant: ButtonVariant, size: ButtonSize, className?: string) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-accent-500 text-primary-50 hover:bg-accent-400 focus:ring-accent-500/50 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:shadow-accent-500/30 font-display font-semibold',
    secondary:
      'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 focus:ring-neutral-600 border border-neutral-700',
    outline:
      'border-2 border-accent-500 text-accent-500 hover:bg-accent-500/10 focus:ring-accent-500/50 font-display',
    ghost: 'text-accent-500 hover:bg-accent-500/10 focus:ring-accent-500/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return clsx(baseStyles, variants[variant], sizes[size], className);
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonComponentProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = getButtonClasses(variant, size, className);

    if ('href' in props && props.href) {
      const { href, asChild, ...linkProps } = props as ButtonLinkProps;
      return (
        <Link href={href} className={classes} ref={ref as any} {...linkProps}>
          {children}
        </Link>
      );
    }

    const { ...buttonProps } = props as ButtonProps;
    return (
      <button ref={ref as any} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

