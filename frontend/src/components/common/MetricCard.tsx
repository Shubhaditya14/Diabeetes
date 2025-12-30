import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: number | string;
  format?: 'number' | 'percent' | 'decimal';
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  subtitle?: string;
}

export function MetricCard({
  title,
  value,
  format = 'number',
  trend,
  icon,
  subtitle,
}: MetricCardProps) {
  const formatValue = () => {
    if (typeof value === 'string') return value;
    switch (format) {
      case 'percent':
        return `${(value * 100).toFixed(1)}%`;
      case 'decimal':
        return value.toFixed(2);
      default:
        return value.toLocaleString();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-neutral" />;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        {icon && <span className="text-gray-400 dark:text-gray-500">{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
          {formatValue()}
        </span>
        {trend && getTrendIcon()}
      </div>
      {subtitle && (
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">{subtitle}</span>
      )}
    </Card>
  );
}
