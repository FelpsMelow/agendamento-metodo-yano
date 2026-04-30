import type { ApiResponse } from './api.types';

export interface DashboardData {
  totalPatients: number;
  todayAppointments: number;
}

export type DashboardResponse = ApiResponse<DashboardData>;
