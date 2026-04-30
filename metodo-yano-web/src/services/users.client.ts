import { apiRequest } from './api';
import { User, UsersListResponse } from '@/types/user.types';

export const usersClient = {
  list: () => apiRequest<UsersListResponse>('/users', { credentials: 'include' }),
  create: (payload: Partial<User> & { password?: string }) => apiRequest<User>('/users', { method: 'POST', credentials: 'include', body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<User> & { password?: string }) => apiRequest<User>(`/users/${id}`, { method: 'PATCH', credentials: 'include', body: JSON.stringify(payload) }),
  remove: (id: string) => apiRequest<{ success: boolean }>(`/users/${id}`, { method: 'DELETE', credentials: 'include' }),
};
