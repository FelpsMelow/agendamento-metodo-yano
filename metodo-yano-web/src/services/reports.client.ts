import { API_BASE_URL, apiRequest } from './api';

export const reportsClient = {
  patients: (search = '', page = 1, limit = 10) => apiRequest<any>(`/reports/patients?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`),
  referrals: () => apiRequest<any[]>(`/reports/referrals`),
  referralsSummary: (startDate?: string, endDate?: string) => apiRequest<any>(`/reports/referrals-summary?startDate=${startDate ?? ''}&endDate=${endDate ?? ''}`),
  birthdays: (month?: number) => apiRequest<any[]>(`/reports/birthdays?month=${month ?? ''}`),
  patientsExportUrl: (search = '') => `${API_BASE_URL}/reports/patients/export?search=${encodeURIComponent(search)}`,
};
