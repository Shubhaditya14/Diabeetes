import { useQuery } from '@tanstack/react-query';
import { Activity, Brain, TrendingDown, Clock } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { PredictionChart } from '../components/charts/PredictionChart';
import { useEventStream } from '../hooks/useEventStream';
import { useDrift } from '../hooks/useDrift';
import { getHealth, getRecentPredictions } from '../services/api';
import type { ModelStatus } from '../types';

export function Dashboard() {
  const { predictions, latestPrediction, isConnected } = useEventStream();
  const { drift, driftLog } = useDrift();

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    refetchInterval: 30000,
  });

  const { data: recentPredictions } = useQuery({
    queryKey: ['recent'],
    queryFn: getRecentPredictions,
    refetchInterval: 5000,
  });

  // Combine SSE predictions with API recent predictions
  const allPredictions = predictions.length > 0 ? predictions : recentPredictions || [];

  const getModelStatus = (): ModelStatus => {
    if (!health?.model_loaded) return 'error';
    if (drift?.drift_detected) return 'drift';
    return 'healthy';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Real-time monitoring of your ML pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-danger'}`}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Model Status"
          value={getModelStatus() === 'healthy' ? 'Healthy' : getModelStatus()}
          icon={<Activity className="w-5 h-5" />}
          subtitle={health?.model_type || 'Loading...'}
        />
        <MetricCard
          title="Predictions Today"
          value={allPredictions.length}
          icon={<Brain className="w-5 h-5" />}
          trend="up"
        />
        <MetricCard
          title="Drift Score"
          value={drift?.drift_score ?? 0}
          format="decimal"
          icon={<TrendingDown className="w-5 h-5" />}
          trend={drift?.drift_detected ? 'up' : 'neutral'}
          subtitle={drift?.drift_detected ? 'Drift detected!' : 'Within threshold'}
        />
        <MetricCard
          title="Drift Checks"
          value={driftLog.length}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Total checks performed"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions Chart */}
        <Card>
          <CardHeader
            title="Real-time Predictions"
            subtitle="Latest prediction values and key features"
          />
          <PredictionChart predictions={allPredictions} />
        </Card>

        {/* Recent Predictions List */}
        <Card>
          <CardHeader
            title="Recent Predictions"
            subtitle="Latest prediction results"
          />
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {allPredictions.slice(0, 10).map((p, idx) => (
              <div
                key={`${p.timestamp}-${idx}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={p.prediction === 1 ? 'drift' : 'healthy'}
                    size="sm"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {p.prediction === 1 ? 'Diabetic' : 'Healthy'}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      Age: {p.age}, BMI: {p.bmi?.toFixed(1)}, Glucose: {p.glucose?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(p.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {allPredictions.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No predictions yet. Start the generator service.
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Latest Prediction Details */}
      {latestPrediction && (
        <Card>
          <CardHeader
            title="Latest Prediction Details"
            subtitle={`Received at ${new Date(latestPrediction.timestamp).toLocaleString()}`}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(latestPrediction)
              .filter(([key]) => !['prediction', 'timestamp'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="text-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-lg font-semibold font-mono text-gray-900 dark:text-white">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                  </p>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
}
