export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  pseudo: string;
  role: UserRole;
}
