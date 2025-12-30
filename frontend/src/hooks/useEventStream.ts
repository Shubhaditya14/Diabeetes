import { useEffect, useState, useCallback } from 'react';
import { getEventsUrl } from '../services/api';
import type { PredictionRecord } from '../types';

export function useEventStream() {
  const [latestPrediction, setLatestPrediction] = useState<PredictionRecord | null>(null);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    const eventSource = new EventSource(getEventsUrl());

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const prediction = JSON.parse(event.data) as PredictionRecord;
        setLatestPrediction(prediction);
        setPredictions((prev) => {
          const updated = [prediction, ...prev];
          return updated.slice(0, 50); // Keep last 50 predictions
        });
      } catch (e) {
        console.error('Failed to parse SSE data:', e);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      setError('Connection lost. Reconnecting...');
      eventSource.close();
      // Reconnect after 3 seconds
      setTimeout(connect, 3000);
    };

    return eventSource;
  }, []);

  useEffect(() => {
    const eventSource = connect();
    return () => {
      eventSource.close();
    };
  }, [connect]);

  return {
    latestPrediction,
    predictions,
    isConnected,
    error,
  };
}
