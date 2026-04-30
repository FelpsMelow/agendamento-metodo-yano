import { apiRequest } from './api';
import { ProfessionalSchedule, ProfessionalSchedulePayload } from '@/types/professional-schedule.types';

export const professionalSchedulesClient = {
  list: () => apiRequest<ProfessionalSchedule[]>('/professional-schedules', { credentials: 'include' }),
  create: (payload: ProfessionalSchedulePayload) => apiRequest<ProfessionalSchedule>('/professional-schedules', { method: 'POST', credentials: 'include', body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<ProfessionalSchedulePayload>) => apiRequest<ProfessionalSchedule>(`/professional-schedules/${id}`, { method: 'PATCH', credentials: 'include', body: JSON.stringify(payload) }),
  remove: (id: string) => apiRequest<{ success: boolean }>(`/professional-schedules/${id}`, { method: 'DELETE', credentials: 'include' }),
};
