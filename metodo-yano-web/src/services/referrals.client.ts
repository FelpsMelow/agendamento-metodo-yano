import { apiRequest } from './api';
import { ReferralFormValues } from '@/schemas/referral.schema';
import { Referral, ReferralsListResponse } from '@/types/referral.types';

export const referralsClient = {
  list: (q = '', page = 1, limit = 10) => apiRequest<ReferralsListResponse>(`/referrals?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
  getById: (id: string) => apiRequest<Referral>(`/referrals/${id}`),
  create: (payload: ReferralFormValues) => apiRequest<Referral>('/referrals', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id: string, payload: ReferralFormValues) => apiRequest<Referral>(`/referrals/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (id: string) => apiRequest<{ success: boolean }>(`/referrals/${id}`, { method: 'DELETE' }),
};
