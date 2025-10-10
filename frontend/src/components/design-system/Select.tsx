import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  options,
  error, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2';
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'focus:ring-blue-500';
  const widthStyles = fullWidth ? 'w-full' : '';
  const themeStyles = 'border-gray-300 dark:border-gray-600';
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <select
        className={`${baseStyles} ${errorStyles} ${widthStyles} ${themeStyles} ${className}`}
        style={{ 
          backgroundColor: 'var(--bg-primary)', 
          color: 'var(--text-primary)' 
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
