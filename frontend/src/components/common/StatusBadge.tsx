import type { ModelStatus } from '../../types';

interface StatusBadgeProps {
  status: ModelStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<ModelStatus, { color: string; bgColor: string; text: string }> = {
  healthy: {
    color: 'bg-success',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    text: 'Healthy',
  },
  drift: {
    color: 'bg-warning',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'Drift Detected',
  },
  training: {
    color: 'bg-info',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'Training',
  },
  error: {
    color: 'bg-danger',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    text: 'Error',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${config.bgColor}
        ${sizeClasses[size]}
        rounded-full font-medium
      `}
    >
      <span
        className={`
          ${dotSizes[size]}
          rounded-full
          ${config.color}
          animate-pulse-dot
        `}
      />
      <span className="text-gray-700 dark:text-gray-300">{config.text}</span>
    </span>
  );
}
