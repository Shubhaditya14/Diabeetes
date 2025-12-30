import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Send, CheckCircle, XCircle, RefreshCw, Brain } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { makePrediction, getRecentPredictions } from '../services/api';
import type { PredictionInput } from '../types';

const initialFormData: PredictionInput = {
  age: 45,
  gender: 1,
  pulse_rate: 72,
  systolic_bp: 120,
  diastolic_bp: 80,
  glucose: 5.5,
  height: 1.7,
  weight: 75,
  bmi: 26,
  family_diabetes: 0,
  hypertensive: 0,
  family_hypertension: 0,
  cardiovascular_disease: 0,
  stroke: 0,
};

const formFields: Array<{
  key: keyof PredictionInput;
  label: string;
  type: 'number' | 'select';
  hint?: string;
  options?: { value: number; label: string }[];
}> = [
  { key: 'age', label: 'Age', type: 'number', hint: 'Years' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 0, label: 'Female' },
      { value: 1, label: 'Male' },
    ],
  },
  { key: 'pulse_rate', label: 'Pulse Rate', type: 'number', hint: 'BPM' },
  { key: 'systolic_bp', label: 'Systolic BP', type: 'number', hint: 'mmHg' },
  { key: 'diastolic_bp', label: 'Diastolic BP', type: 'number', hint: 'mmHg' },
  { key: 'glucose', label: 'Glucose', type: 'number', hint: 'mmol/L' },
  { key: 'height', label: 'Height', type: 'number', hint: 'meters' },
  { key: 'weight', label: 'Weight', type: 'number', hint: 'kg' },
  { key: 'bmi', label: 'BMI', type: 'number', hint: 'kg/m²' },
  {
    key: 'family_diabetes',
    label: 'Family Diabetes',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    key: 'hypertensive',
    label: 'Hypertensive',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    key: 'family_hypertension',
    label: 'Family Hypertension',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    key: 'cardiovascular_disease',
    label: 'Cardiovascular Disease',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    key: 'stroke',
    label: 'Stroke History',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
];

export function Predictions() {
  const [formData, setFormData] = useState<PredictionInput>(initialFormData);
  const [result, setResult] = useState<number | null>(null);

  const { data: recentPredictions, refetch } = useQuery({
    queryKey: ['recent'],
    queryFn: getRecentPredictions,
  });

  const mutation = useMutation({
    mutationFn: makePrediction,
    onSuccess: (data) => {
      setResult(data.prediction);
      refetch();
    },
  });

  const handleChange = (key: keyof PredictionInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Predictions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Make manual predictions with custom input
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Prediction Form"
              subtitle="Enter patient data to get a diabetes prediction"
              action={
                <Button variant="ghost" size="sm" onClick={handleReset} icon={<RefreshCw className="w-4 h-4" />}>
                  Reset
                </Button>
              }
            />
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {formFields.map((field) => (
                  <div key={field.key}>
                    {field.type === 'select' ? (
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {field.label}
                        </label>
                        <select
                          value={formData[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deep-blue dark:focus:ring-teal"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Input
                        label={field.label}
                        type="number"
                        step="any"
                        value={formData[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        hint={field.hint}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                loading={mutation.isPending}
                icon={<Send className="w-4 h-4" />}
                className="w-full md:w-auto"
              >
                Get Prediction
              </Button>
            </form>
          </Card>
        </div>

        {/* Result Card */}
        <div>
          <Card className="h-full">
            <CardHeader title="Prediction Result" />
            {result !== null ? (
              <div className="text-center py-8">
                {result === 1 ? (
                  <>
                    <XCircle className="w-16 h-16 text-danger mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-danger mb-2">Diabetic</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      The model predicts diabetes risk
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-success mb-2">Healthy</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No diabetes risk detected
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Submit the form to get a prediction</p>
              </div>
            )}
            {mutation.isError && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-danger text-sm">
                Error: {(mutation.error as Error).message}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Recent Predictions Table */}
      <Card>
        <CardHeader
          title="Prediction History"
          subtitle="Recent predictions from all sources"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Time
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Result
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Age
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  BMI
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Glucose
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  BP (Sys/Dia)
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions?.slice(0, 20).map((p, idx) => (
                <tr
                  key={`${p.timestamp}-${idx}`}
                  className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-mono text-xs">
                    {new Date(p.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.prediction === 1
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}
                    >
                      {p.prediction === 1 ? 'Diabetic' : 'Healthy'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">
                    {p.age}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">
                    {p.bmi?.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">
                    {p.glucose?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">
                    {p.systolic_bp}/{p.diastolic_bp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!recentPredictions || recentPredictions.length === 0) && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No prediction history available
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
