import { apiRequest } from './api';
import type { LoginRequest, LoginResponse, MeResponse } from '@/types/auth.types';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
  });
}

export async function logout(): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>('/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getMe(): Promise<MeResponse> {
  return apiRequest<MeResponse>('/auth/me', {
    method: 'GET',
    credentials: 'include',
  });
}
