import React, { ButtonHTMLAttributes } from 'react';
import { joinClassNames } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outlined' | 'text';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-full font-medium text-sm transition-colors border border-solid';

  const variantStyles = {
    default:
      'bg-foreground text-background border-transparent hover:bg-[#383838] dark:hover:bg-[#ccc]',
    outlined:
      'border-black/[.08] hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-slate-800',
    text: 'border-transparent hover:bg-[#f2f2f2] dark:hover:bg-slate-800',
  };

  const combinedClasses = joinClassNames(
    baseStyles,
    variantStyles[variant],
    className
  );

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
