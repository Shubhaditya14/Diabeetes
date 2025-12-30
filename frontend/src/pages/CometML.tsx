import { ExternalLink, BarChart3, Database, Clock, Target, Layers } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';

export function CometML() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comet ML</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Experiment tracking, model registry, and performance monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Comet ML Dashboard"
            subtitle="Open your experiment tracking and model management"
          />
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <BarChart3 className="w-12 h-12 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                View Your Experiments
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                Access your Comet ML workspace to view experiment runs, compare models, 
                analyze metrics, and manage registered models.
              </p>
              <a
                href="https://www.comet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Open Comet ML Dashboard
              </a>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Quick Links" subtitle="Direct access to Comet resources" />
            <div className="p-4 space-y-3">
              <a
                href="https://www.comet.com/experiments"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Experiments</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View all experiment runs</p>
                </div>
              </a>

              <a
                href="https://www.comet.com/models"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Model Registry</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage registered models</p>
                </div>
              </a>

              <a
                href="https://www.comet.com/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <Layers className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Projects</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Organize experiments by project</p>
                </div>
              </a>
            </div>
          </Card>

          <Card>
            <CardHeader title="Integration Status" subtitle="Connected MLOps tools" />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Experiment Logging</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Model Registry</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Metrics Tracking</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">Active</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="p-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full inline-block mb-3">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Experiments</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full inline-block mb-3">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Models Registered</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full inline-block mb-3">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Metrics Logged</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full inline-block mb-3">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Training Runs</p>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent Activity" subtitle="Latest Comet ML events" />
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
              <Database className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Model Registered: diabetes-rf-model:v1.0.0
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Random Forest with 92% accuracy
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">2 days ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Experiment Completed: diabetes-training-v3
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All 3 models trained successfully
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">2 days ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Metrics Uploaded: Confusion Matrix & ROC Curves
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Visualization artifacts saved
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">2 days ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
