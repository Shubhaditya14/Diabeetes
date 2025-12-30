import {
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { useDrift } from '../hooks/useDrift';
import { getDriftReportUrl } from '../services/api';

export function Drift() {
  const { drift, driftLog, isLoading, refetch } = useDrift();

  // Parse feature shifts for chart
  const featureShifts = drift?.feature_shifts
    ? Object.entries(drift.feature_shifts).map(([feature, shift]) => ({
        feature: feature.replace(/_/g, ' '),
        shift: Math.abs(shift as number),
        isHigh: Math.abs(shift as number) > 0.1,
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Data Drift Monitoring
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor data distribution changes between training and production
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => refetch()}
          loading={isLoading}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Check Now
        </Button>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Current Drift Status
              </h3>
              {drift ? (
                <div className="flex items-center gap-3">
                  {drift.drift_detected ? (
                    <>
                      <AlertTriangle className="w-8 h-8 text-warning" />
                      <div>
                        <p className="text-xl font-bold text-warning">Drift Detected</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Data distribution has shifted significantly
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-8 h-8 text-success" />
                      <div>
                        <p className="text-xl font-bold text-success">No Drift</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Data distribution is stable
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
              )}
            </div>
            <StatusBadge status={drift?.drift_detected ? 'drift' : 'healthy'} size="lg" />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Drift Score
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold font-mono text-gray-900 dark:text-white">
              {drift?.drift_score?.toFixed(3) ?? '---'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Threshold: 0.15 (15%)
            </p>
          </div>
        </Card>
      </div>

      {/* Feature Shifts Chart */}
      {featureShifts.length > 0 && (
        <Card>
          <CardHeader
            title="Feature Distribution Shifts"
            subtitle="Relative change in feature means compared to training data"
            action={<BarChart3 className="w-5 h-5 text-gray-400" />}
          />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureShifts} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis type="number" stroke="#6B7280" fontSize={12} />
              <YAxis
                dataKey="feature"
                type="category"
                stroke="#6B7280"
                fontSize={12}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F1F5F9',
                }}
                formatter={(value) => [`${((value as number) * 100).toFixed(1)}%`, 'Shift']}
              />
              <Bar dataKey="shift" radius={[0, 4, 4, 0]}>
                {featureShifts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isHigh ? '#F59E0B' : '#0D9488'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-teal rounded" />
              <span className="text-gray-500 dark:text-gray-400">Normal (&lt;10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-warning rounded" />
              <span className="text-gray-500 dark:text-gray-400">High (&gt;10%)</span>
            </div>
          </div>
        </Card>
      )}

      {/* Drift Report */}
      <Card>
        <CardHeader
          title="Evidently Drift Report"
          subtitle="Detailed statistical analysis of data drift"
          action={
            <a
              href={getDriftReportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-deep-blue dark:text-teal hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open Full Report
            </a>
          }
        />
        <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <iframe
            src={getDriftReportUrl()}
            className="w-full h-96 bg-white"
            title="Drift Report"
          />
        </div>
      </Card>

      {/* Drift History */}
      <Card>
        <CardHeader
          title="Drift Check History"
          subtitle="Historical drift detection results"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Timestamp
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {driftLog
                .slice()
                .reverse()
                .slice(0, 20)
                .map((entry, idx) => (
                  <tr
                    key={`${entry.timestamp}-${idx}`}
                    className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-mono text-xs">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge
                        status={entry.drift_detected ? 'drift' : 'healthy'}
                        size="sm"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-900 dark:text-white">
                      {entry.drift_score?.toFixed(4) ?? 'N/A'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {driftLog.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No drift history available. Run a drift check to get started.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
