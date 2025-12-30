import { useQuery } from '@tanstack/react-query';
import { checkDrift, getDriftLog } from '../services/api';

export function useDrift() {
  const driftQuery = useQuery({
    queryKey: ['drift'],
    queryFn: checkDrift,
    refetchInterval: 10000, // Poll every 10 seconds
    retry: 2,
  });

  const driftLogQuery = useQuery({
    queryKey: ['driftLog'],
    queryFn: getDriftLog,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  return {
    drift: driftQuery.data,
    driftLog: driftLogQuery.data || [],
    isLoading: driftQuery.isLoading,
    isError: driftQuery.isError,
    refetch: driftQuery.refetch,
  };
}
