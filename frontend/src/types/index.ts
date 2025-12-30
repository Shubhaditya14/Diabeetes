// Health check response
export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  model_type: string;
}

// Prediction input data (14 features)
export interface PredictionInput {
  age: number;
  gender: number;
  pulse_rate: number;
  systolic_bp: number;
  diastolic_bp: number;
  glucose: number;
  height: number;
  weight: number;
  bmi: number;
  family_diabetes: number;
  hypertensive: number;
  family_hypertension: number;
  cardiovascular_disease: number;
  stroke: number;
}

// Prediction response
export interface PredictionResponse {
  prediction: number;
}

// Prediction with timestamp (from /recent and SSE)
export interface PredictionRecord extends PredictionInput {
  prediction: number;
  timestamp: string;
}

// Training response
export interface TrainingResponse {
  status: string;
}

// Training log entry
export interface TrainingLogEntry {
  timestamp: string;
  action: string;
}

// Drift check response
export interface DriftResponse {
  drift_detected: boolean;
  drift_score: number;
  feature_shifts?: Record<string, number>;
}

// Drift log entry
export interface DriftLogEntry {
  timestamp: string;
  drift_detected: boolean;
  drift_score: number;
  feature_shifts?: string;
}

// Status types for UI
export type ModelStatus = 'healthy' | 'drift' | 'training' | 'error';

// MLOps tool info for About page
export interface MLOpsTool {
  name: string;
  icon: string;
  description: string;
  useCases: string[];
  link: string;
  color: string;
}

// Model comparison data
export interface ModelComparisonData {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  color: string;
}

// Comet ML model registry entry
export interface CometModel {
  name: string;
  version: string;
  created: string;
  metrics: {
    accuracy: number;
    f1: number;
  };
  url: string;
}
