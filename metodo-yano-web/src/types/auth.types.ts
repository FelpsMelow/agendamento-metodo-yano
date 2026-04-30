export interface AuthUser {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  role: 'admin' | 'professional' | 'receptionist';
  isProfessional: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
  authenticatedBy: 'cookie' | 'bearer';
}
