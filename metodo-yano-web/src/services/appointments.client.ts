import { apiRequest } from './api';
import { Appointment, AppointmentEvent } from '@/types/appointment.types';
import { AppointmentFormValues } from '@/schemas/appointment.schema';

export const appointmentsClient = {
  list: (params='') => apiRequest(`/appointments${params}`),
  events: (professionalId: string, start: string, end: string) => apiRequest<AppointmentEvent[]>(`/appointments/events?professionalId=${professionalId}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`),
  getById: (id: string) => apiRequest<Appointment>(`/appointments/${id}`),
  create: (payload: any) => apiRequest<Appointment>('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id: string, payload: any) => apiRequest<Appointment>(`/appointments/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  cancel: (id: string, reason?: string) => apiRequest<Appointment>(`/appointments/${id}/cancel`, { method: 'PATCH', body: JSON.stringify({ reason }) }),
};
