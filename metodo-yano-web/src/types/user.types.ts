export type UserRole = 'admin' | 'professional' | 'receptionist';

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isProfessional: boolean;
  isActive: boolean;
};

export type UsersListResponse = { items: User[] };
