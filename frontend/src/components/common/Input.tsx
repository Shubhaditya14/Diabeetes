import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, className = '', ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          px-3 py-2
          bg-white dark:bg-slate-700
          border rounded-lg
          text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-deep-blue dark:focus:ring-teal
          transition-colors
          ${error
            ? 'border-danger focus:ring-danger'
            : 'border-gray-300 dark:border-slate-600'
          }
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{hint}</span>
      )}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
