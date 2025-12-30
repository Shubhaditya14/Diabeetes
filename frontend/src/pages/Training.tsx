import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Play, History, ExternalLink, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { triggerTraining, getTrainingLog, getHealth } from '../services/api';

export function Training() {
  const queryClient = useQueryClient();

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
  });

  const { data: trainingLog, isLoading } = useQuery({
    queryKey: ['trainingLog'],
    queryFn: getTrainingLog,
    refetchInterval: 10000,
  });

  const mutation = useMutation({
    mutationFn: triggerTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingLog'] });
    },
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Trigger model retraining and view training history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Control */}
        <Card className="lg:col-span-1">
          <CardHeader title="Training Control" subtitle="Manually trigger model retraining" />
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Current Model
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {health?.model_type || 'Loading...'}
              </p>
            </div>

            <Button
              onClick={() => mutation.mutate()}
              loading={mutation.isPending}
              icon={<Play className="w-4 h-4" />}
              className="w-full"
            >
              {mutation.isPending ? 'Training...' : 'Start Training'}
            </Button>

            {mutation.isSuccess && (
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-success">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Training triggered successfully!</span>
              </div>
            )}

            {mutation.isError && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-danger text-sm">
                Error: {(mutation.error as Error).message}
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Training Pipeline
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Training is orchestrated by Apache Airflow. View the DAG for detailed logs.
              </p>
              <a
                href="http://localhost:8080"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-deep-blue dark:text-teal hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Open Airflow UI (admin/admin)
              </a>
            </div>
          </div>
        </Card>

        {/* Model Info */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Training Pipeline Details"
            subtitle="Models trained in each run"
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Logistic Regression */}
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Logistic Regression
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Primary production model
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>Solver: liblinear</li>
                  <li>Class weight: balanced</li>
                </ul>
              </div>

              {/* SVM */}
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Support Vector Machine
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Alternative classifier
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>Kernel: RBF</li>
                  <li>Class weight: balanced</li>
                </ul>
              </div>

              {/* Random Forest */}
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Random Forest
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Ensemble model
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>Estimators: 200</li>
                  <li>Max depth: 10</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                Training Process
              </h4>
              <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside">
                <li>Load and preprocess Diabetes_Final_Data_V2.csv</li>
                <li>Encode categorical features (6 columns)</li>
                <li>Apply StandardScaler normalization</li>
                <li>Handle class imbalance with SMOTE</li>
                <li>Train 3 models (LR, SVM, RF)</li>
                <li>Log metrics and models to Comet ML</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>

      {/* Training History */}
      <Card>
        <CardHeader
          title="Training History"
          subtitle="Past training triggers and completions"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['trainingLog'] })}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          }
        />
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Loading training history...
            </div>
          ) : trainingLog && trainingLog.length > 0 ? (
            trainingLog
              .slice()
              .reverse()
              .slice(0, 20)
              .map((entry, idx) => (
                <div
                  key={`${entry.timestamp}-${idx}`}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <History className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Training {entry.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Diabetes training pipeline
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No training history available. Trigger a training run to get started.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
