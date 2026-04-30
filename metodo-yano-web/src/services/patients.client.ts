import { apiRequest, API_BASE_URL } from './api';
import { PatientFormValues } from '@/schemas/patient.schema';
import { Patient, PatientsListResponse } from '@/types/patient.types';

export const patientsClient = {
  list: (q = '', page = 1, limit = 10) => apiRequest<PatientsListResponse>(`/patients?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
  getById: (id: string) => apiRequest<Patient>(`/patients/${id}`),
  create: (payload: PatientFormValues) => apiRequest<Patient>('/patients', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id: string, payload: PatientFormValues) => apiRequest<Patient>(`/patients/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (id: string) => apiRequest<{ success: boolean }>(`/patients/${id}`, { method: 'DELETE' }),
  exportUrl: () => `${API_BASE_URL}/patients/export`,
};
