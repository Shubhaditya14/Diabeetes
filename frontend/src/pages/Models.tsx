import { useState } from 'react';
import { BarChart3, GitCompare, Database, ExternalLink, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';

const MODEL_COMPARISON_DATA = [
  {
    name: 'Logistic Regression',
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.91,
    f1: 0.89,
    color: '#3b82f6',
  },
  {
    name: 'Random Forest',
    accuracy: 0.92,
    precision: 0.90,
    recall: 0.94,
    f1: 0.92,
    color: '#10b981',
  },
  {
    name: 'SVM',
    accuracy: 0.88,
    precision: 0.85,
    recall: 0.92,
    f1: 0.88,
    color: '#f59e0b',
  },
];

const COMET_MODELS = [
  {
    name: 'diabetes-lr-model',
    version: '1.0.0',
    created: '2025-12-25',
    metrics: { accuracy: 0.89, f1: 0.89 },
    url: '#',
  },
  {
    name: 'diabetes-rf-model',
    version: '1.0.0',
    created: '2025-12-25',
    metrics: { accuracy: 0.92, f1: 0.92 },
    url: '#',
  },
  {
    name: 'diabetes-svm-model',
    version: '1.0.0',
    created: '2025-12-25',
    metrics: { accuracy: 0.88, f1: 0.88 },
    url: '#',
  },
];

export function Models() {
  const [selectedView, setSelectedView] = useState<'metrics' | 'images' | 'comet'>('metrics');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Model Comparison</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Compare model performance and view Comet ML model registry
        </p>
      </div>

      <div className="flex gap-2">
        {(['metrics', 'images', 'comet'] as const).map((view) => (
          <Button
            key={view}
            variant={selectedView === view ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedView(view)}
          >
            {view === 'metrics' && <BarChart3 className="w-4 h-4 mr-2" />}
            {view === 'images' && <ImageIcon className="w-4 h-4 mr-2" />}
            {view === 'comet' && <Database className="w-4 h-4 mr-2" />}
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </div>

      {selectedView === 'metrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Model Performance Metrics" subtitle="Comparison of accuracy, precision, recall, and F1 scores" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Model</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Accuracy</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Precision</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Recall</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">F1 Score</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_COMPARISON_DATA.map((model) => (
                    <tr key={model.name} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                          <span className="font-medium text-gray-900 dark:text-white">{model.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm font-medium">
                          {model.accuracy.toFixed(2)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-300">{model.precision.toFixed(2)}</td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-300">{model.recall.toFixed(2)}</td>
                      <td className="text-center py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm font-medium">
                          {model.f1.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader title="Best Performer" subtitle="Random Forest achieves highest accuracy" />
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <GitCompare className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Random Forest</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Best overall performance</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">92%</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">F1 Score</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">0.92</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Model Summary" subtitle="Performance insights" />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm text-blue-900 dark:text-blue-300">Best Accuracy</span>
                <span className="font-semibold text-blue-900 dark:text-blue-300">Random Forest (92%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm text-green-900 dark:text-green-300">Best Recall</span>
                <span className="font-semibold text-green-900 dark:text-green-300">Random Forest (94%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <span className="text-sm text-orange-900 dark:text-orange-300">Best Precision</span>
                <span className="font-semibold text-orange-900 dark:text-orange-300">Random Forest (90%)</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedView === 'images' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Confusion Matrix Comparison" subtitle="Prediction accuracy visualization for each model" />
            <div className="p-4 space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confusion Matrix</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Confusion matrices for all three models showing prediction distribution
                </p>
                <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-slate-700">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      confusion_matrix.png
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      14KB - Generated from model evaluation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="ROC Curve Comparison" subtitle="True Positive Rate vs False Positive Rate" />
            <div className="p-4 space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">ROC Curves</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  ROC curves comparing all three models with AUC scores
                </p>
                <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-slate-700">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      roc_curve.png
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      28KB - AUC: LR=0.94, RF=0.96, SVM=0.93
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="Model Visualization Details" subtitle="Interpretation of comparison metrics" />
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Logistic Regression</h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Linear decision boundary</li>
                  <li>• Fast inference time</li>
                  <li>• Interpretable coefficients</li>
                  <li>• AUC: 0.94</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Random Forest</h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Ensemble of 200 trees</li>
                  <li>• Handles non-linear relationships</li>
                  <li>• Robust to outliers</li>
                  <li>• AUC: 0.96</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support Vector Machine</h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• RBF kernel</li>
                  <li>• Effective in high dimensions</li>
                  <li>• Memory efficient</li>
                  <li>• AUC: 0.93</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedView === 'comet' && (
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Comet ML Model Registry"
              subtitle="Models stored and versioned in Comet ML"
              action={
                <Button variant="ghost" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
                  Refresh
                </Button>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Model Name</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Version</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Created</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Accuracy</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">F1 Score</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {COMET_MODELS.map((model) => (
                    <tr key={model.name} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-purple-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{model.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm">
                          {model.version}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-300">{model.created}</td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-300">{(model.metrics.accuracy * 100).toFixed(0)}%</td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-300">{model.metrics.f1.toFixed(2)}</td>
                      <td className="text-right py-3 px-4">
                        <a
                          href={model.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-deep-blue dark:text-teal hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Comet ML Integration" subtitle="Experiment tracking and model registry" />
              <div className="p-4 space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Experiment Tracking</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All training metrics, hyperparameters, and artifacts are logged to Comet ML automatically.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Model Versioning</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Each trained model is registered with version, metrics, and lineage information.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Production Model" subtitle="Currently deployed version" />
              <div className="p-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Database className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-300">diabetes-rf-model:v1.0.0</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">Deployed to production</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                      <p className="font-semibold text-gray-900 dark:text-white">92%</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-400">F1 Score</p>
                      <p className="font-semibold text-gray-900 dark:text-white">0.92</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
