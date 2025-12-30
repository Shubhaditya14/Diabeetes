import { useState } from 'react';
import {
  Zap,
  Wind,
  Sparkles,
  BarChart3,
  Brain,
  Container,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GitBranch,
  Database,
  RefreshCw,
  Monitor,
} from 'lucide-react';
import { Card } from '../components/common/Card';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  useCases: string[];
  link: string;
  details: string;
}

const tools: Tool[] = [
  {
    id: 'fastapi',
    name: 'FastAPI',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: 'Modern, high-performance Python web framework for building APIs',
    useCases: [
      'REST API endpoints (/predict, /train, /drift)',
      'Server-Sent Events for real-time updates',
      'Health checks and monitoring endpoints',
      'Automatic OpenAPI documentation',
    ],
    link: 'https://fastapi.tiangolo.com',
    details:
      'FastAPI powers our backend API, handling prediction requests, training triggers, and drift detection. It provides automatic request validation, serialization, and interactive API documentation at /docs.',
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    icon: <Wind className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Platform to programmatically author, schedule, and monitor workflows',
    useCases: [
      'Orchestrating the diabetes_training_pipeline DAG',
      'Scheduling and triggering model retraining',
      'Logging and monitoring training runs',
      'Task dependency management',
    ],
    link: 'https://airflow.apache.org',
    details:
      'Airflow manages our ML training workflows through Directed Acyclic Graphs (DAGs). The diabetes_training_pipeline DAG handles data preprocessing, model training, and artifact logging. Access the UI at localhost:8080 with admin/admin.',
  },
  {
    id: 'comet',
    name: 'Comet ML',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'MLOps platform for tracking experiments, models, and production monitoring',
    useCases: [
      'Logging training parameters and metrics',
      'Storing model artifacts (LR, SVM, RF)',
      'Visualizations (confusion matrix, ROC curves)',
      'Model versioning and registry',
    ],
    link: 'https://comet.com',
    details:
      'Comet ML serves as our experiment tracker and model registry. Every training run logs accuracy, F1 score, precision, recall, and model artifacts. The production model is fetched from Comet at startup, with fallback to local pickle files.',
  },
  {
    id: 'evidently',
    name: 'Evidently',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'Open-source ML observability platform for data and model quality monitoring',
    useCases: [
      'Data drift detection between training & production',
      'Statistical tests on feature distributions',
      'Interactive HTML drift reports',
      'Automated drift scoring with 15% threshold',
    ],
    link: 'https://evidentlyai.com',
    details:
      'Evidently compares the training reference data against recent predictions to detect data drift. When the mean feature shift exceeds 15%, drift is flagged, triggering automatic retraining via the monitor service.',
  },
  {
    id: 'sklearn',
    name: 'Scikit-learn',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'Simple and efficient tools for predictive data analysis',
    useCases: [
      'LogisticRegression (primary production model)',
      'Support Vector Machine (SVM)',
      'Random Forest Classifier',
      'StandardScaler for feature normalization',
    ],
    link: 'https://scikit-learn.org',
    details:
      'Scikit-learn provides our ML models and preprocessing tools. We train three models per run: Logistic Regression (liblinear solver), SVM (RBF kernel), and Random Forest (200 estimators). SMOTE from imbalanced-learn handles class imbalance.',
  },
  {
    id: 'docker',
    name: 'Docker & Docker Compose',
    icon: <Container className="w-6 h-6" />,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    description: 'Container platform for building and running applications in isolated environments',
    useCases: [
      'backend (FastAPI - port 8000)',
      'airflow (Orchestration - port 8080)',
      'frontend (React - port 3000)',
      'generator & monitor (background services)',
    ],
    link: 'https://docker.com',
    details:
      'Docker Compose orchestrates our microservices architecture. Five services run in containers: backend (API), airflow (training), frontend (UI), generator (synthetic data), and monitor (drift detection). All services communicate over an internal network.',
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`p-3 rounded-lg ${tool.bgColor}`}>
          <span className={tool.color}>{tool.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {tool.description}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{tool.details}</p>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Used for:
            </h4>
            <ul className="space-y-1">
              {tool.useCases.map((useCase, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-deep-blue dark:text-teal hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            View Documentation
          </a>
        </div>
      )}
    </Card>
  );
}

export function About() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          About This MLOps System
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          A production-ready machine learning pipeline for diabetes prediction with automated
          monitoring and retraining capabilities.
        </p>
      </div>

      {/* Architecture Diagram */}
      <Card className="overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-deep-blue/5 to-teal/5 dark:from-deep-blue/20 dark:to-teal/20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            System Architecture
          </h2>
          <div className="flex flex-col items-center gap-4">
            {/* Frontend */}
            <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
              <Monitor className="w-5 h-5 text-teal" />
              <span className="font-medium text-gray-900 dark:text-white">React Frontend</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">(Dashboard UI)</span>
            </div>

            <div className="w-0.5 h-6 bg-gray-300 dark:bg-slate-600" />

            {/* Backend Row */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Database className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Generator
                </span>
              </div>

              <div className="flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-300">
                  FastAPI Backend
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <RefreshCw className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                  Monitor
                </span>
              </div>
            </div>

            <div className="w-0.5 h-6 bg-gray-300 dark:bg-slate-600" />

            {/* Services Row */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Wind className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Airflow DAG
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <BarChart3 className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                  Evidently
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  Comet ML
                </span>
              </div>
            </div>

            <div className="w-0.5 h-6 bg-gray-300 dark:bg-slate-600" />

            {/* Models */}
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
              <Brain className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Trained Models</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                LR | SVM | RF
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Flow */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Data Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: 'Data Generation',
              desc: 'Generator samples from training CSV with noise',
              icon: <Database className="w-5 h-5" />,
            },
            {
              step: 2,
              title: 'Inference',
              desc: 'Backend runs prediction and logs results',
              icon: <Brain className="w-5 h-5" />,
            },
            {
              step: 3,
              title: 'Drift Detection',
              desc: 'Monitor polls drift endpoint every 10s',
              icon: <BarChart3 className="w-5 h-5" />,
            },
            {
              step: 4,
              title: 'Auto-Retraining',
              desc: 'If drift detected, trigger training pipeline',
              icon: <RefreshCw className="w-5 h-5" />,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 bg-deep-blue dark:bg-teal text-white rounded-full text-sm font-bold">
                  {item.step}
                </span>
                <span className="text-gray-400">{item.icon}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tools Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          MLOps Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="http://localhost:8080"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Wind className="w-6 h-6 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Airflow UI</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">localhost:8080</p>
            </div>
          </a>
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Zap className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">API Docs</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">localhost:8000/docs</p>
            </div>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <GitBranch className="w-6 h-6 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Source Code</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Repository</p>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
}
