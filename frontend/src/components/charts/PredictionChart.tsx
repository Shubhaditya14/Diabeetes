import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { PredictionRecord } from '../../types';

interface PredictionChartProps {
  predictions: PredictionRecord[];
}

export function PredictionChart({ predictions }: PredictionChartProps) {
  // Transform data for chart - show last 20 predictions
  const chartData = predictions
    .slice(0, 20)
    .reverse()
    .map((p, index) => ({
      index: index + 1,
      prediction: p.prediction,
      glucose: p.glucose,
      bmi: p.bmi,
      time: new Date(p.timestamp).toLocaleTimeString(),
    }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No prediction data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis
          dataKey="time"
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
        />
        <YAxis stroke="#6B7280" fontSize={12} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            border: 'none',
            borderRadius: '8px',
            color: '#F1F5F9',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="prediction"
          stroke="#0D9488"
          strokeWidth={2}
          dot={{ fill: '#0D9488', strokeWidth: 2 }}
          name="Prediction (0=Healthy, 1=Diabetic)"
        />
        <Line
          type="monotone"
          dataKey="glucose"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          name="Glucose"
        />
        <Line
          type="monotone"
          dataKey="bmi"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={false}
          name="BMI"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
