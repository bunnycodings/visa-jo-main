export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface AdminUser extends User {
  id: number;
  role: 'admin';
  permissions: string[];
  lastLogin?: Date | null;
}

export interface UserRow {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  permissions: string | null;
  is_active: number;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}