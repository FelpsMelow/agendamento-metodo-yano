import { apiRequest } from './api';
import type { DashboardData, DashboardResponse } from '@/types/dashboard.types';

export async function getDashboardData(): Promise<DashboardData> {
  const response = await apiRequest<DashboardResponse>('/dashboard', {
    method: 'GET',
    credentials: 'include',
  });

  return response.data;
}
