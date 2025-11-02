"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/utils/api';

interface AdminAuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    // Initialize from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (stored) {
      setTokenState(stored);
    }
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    apiClient.setToken(newToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
    }
  };

  const logout = async () => {
    await apiClient.logout();
    setTokenState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const value: AdminAuthContextValue = {
    token,
    isAuthenticated: !!token,
    setToken,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
