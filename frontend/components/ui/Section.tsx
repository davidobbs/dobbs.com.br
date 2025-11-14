import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  container?: boolean;
}

export function Section({
  children,
  title,
  subtitle,
  container = true,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={clsx('py-20 md:py-28 lg:py-32', className)} {...props}>
      {container && (
        <div className="container-custom">
          {(title || subtitle) && (
            <div className="text-center mb-16 md:mb-20 lg:mb-24">
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-100 mb-5 md:mb-6 tracking-tight leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base md:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed px-4">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      )}
      {!container && children}
    </section>
  );
}

