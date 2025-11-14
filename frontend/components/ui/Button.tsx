import Link from 'next/link';
import { clsx } from 'clsx';
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

type AnchorButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  href: string;
};

type ButtonComponentProps = NativeButtonProps | AnchorButtonProps;
type ButtonRef = HTMLButtonElement | HTMLAnchorElement;

const isLinkProps = (props: ButtonComponentProps): props is AnchorButtonProps => 'href' in props;
const getDomProps = <T extends ButtonComponentProps>(props: T): Omit<T, keyof BaseButtonProps> => {
  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...domProps
  } = props;
  return domProps;
};

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

export const Button = forwardRef<ButtonRef, ButtonComponentProps>((props, ref) => {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = getButtonClasses(variant, size, className);

  if (isLinkProps(props)) {
    const { href, ...linkProps } = getDomProps(props);
    return (
      <Link href={href} className={classes} ref={ref as Ref<HTMLAnchorElement>} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = getDomProps(props);
  return (
    <button ref={ref as Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

