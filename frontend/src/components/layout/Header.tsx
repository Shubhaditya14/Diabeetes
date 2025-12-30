import { useQuery } from '@tanstack/react-query';
import { Activity, Moon, Sun } from 'lucide-react';
import { getHealth } from '../../services/api';
import { useDrift } from '../../hooks/useDrift';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    refetchInterval: 30000,
  });

  const { drift } = useDrift();

  const getStatusColor = () => {
    if (!health?.model_loaded) return 'bg-danger';
    if (drift?.drift_detected) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusText = () => {
    if (!health?.model_loaded) return 'Model Error';
    if (drift?.drift_detected) return 'Drift Detected';
    return 'Healthy';
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-deep-blue dark:text-teal" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Diabetes Prediction MLOps
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-time monitoring dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Model Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-full">
            <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} animate-pulse-dot`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getStatusText()}
            </span>
            {health?.model_type && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                ({health.model_type})
              </span>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
