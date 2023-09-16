import { statsApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useStatAction() {
  const queryClient = useQueryClient();

  const fetchCountsBetweenMutation = useMutation({
    mutationFn: statsApi.getCountsBetween,
    mutationKey: ['countsBetween'],
  });

  const fetchMonthlyCountsBetweenMutation = useMutation({
    mutationFn: statsApi.getMonthlyCountsBetween,
    mutationKey: ['monthlyCounts'],
  });

  const fetchTotals = () =>
    useQuery({
      queryKey: ['totals'],
      queryFn: async () => await statsApi.getTotalCounts(),
    });

  const fetchBestSellers = () =>
    useQuery({
      queryKey: ['best-sellers'],
      queryFn: async () => await statsApi.getBestSellers(),
    });

  return {
    fetchCountsBetweenMutation,
    fetchMonthlyCountsBetweenMutation,
    fetchTotals,
    fetchBestSellers,
  };
}

export default useStatAction;
