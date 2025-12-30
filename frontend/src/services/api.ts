import axios from 'axios';
import type {
  HealthResponse,
  PredictionInput,
  PredictionResponse,
  PredictionRecord,
  TrainingResponse,
  TrainingLogEntry,
  DriftResponse,
  DriftLogEntry,
  ModelComparisonData,
  CometModel,
} from '../types';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const getHealth = async (): Promise<HealthResponse> => {
  const { data } = await api.get<HealthResponse>('/health');
  return data;
};

// Make prediction
export const makePrediction = async (input: PredictionInput): Promise<PredictionResponse> => {
  const { data } = await api.post<PredictionResponse>('/predict', input);
  return data;
};

// Trigger training
export const triggerTraining = async (): Promise<TrainingResponse> => {
  const { data } = await api.post<TrainingResponse>('/train');
  return data;
};

// Get training log
export const getTrainingLog = async (): Promise<TrainingLogEntry[]> => {
  const { data } = await api.get<TrainingLogEntry[]>('/training_log');
  return data;
};

// Check drift
export const checkDrift = async (): Promise<DriftResponse> => {
  const { data } = await api.get<DriftResponse>('/drift');
  return data;
};

// Get drift log
export const getDriftLog = async (): Promise<DriftLogEntry[]> => {
  const { data } = await api.get<DriftLogEntry[]>('/drift_log');
  return Array.isArray(data) ? data : [];
};

// Get recent predictions
export const getRecentPredictions = async (): Promise<PredictionRecord[]> => {
  const { data } = await api.get<PredictionRecord[] | { error: string }>('/recent');
  if ('error' in data) {
    return [];
  }
  return data;
};

// Get drift report URL
export const getDriftReportUrl = (): string => {
  return `${API_BASE}/drift_report`;
};

// SSE events URL
export const getEventsUrl = (): string => {
  return `${API_BASE}/events`;
};

// Get model comparison data
export const getModelComparison = async (): Promise<ModelComparisonData[]> => {
  const { data } = await api.get<ModelComparisonData[]>('/model_comparison');
  return data;
};

// Get Comet ML registered models
export const getCometModels = async (): Promise<CometModel[]> => {
  const { data } = await api.get<CometModel[]>('/comet_models');
  return data;
};

export default api;
